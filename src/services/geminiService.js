/**
 * WanderAI Gemini Service
 * Handles AI chat and structured itinerary generation with serverless proxy support,
 * direct browser fallback (if local key present), safe JSON extraction, and offline fallback synthesis.
 */

const VITE_GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * Cleanly strips markdown fences and extracts a JSON string from AI response
 * @param {string} text - Raw AI string output
 * @returns {Object|null}
 */
export function safelyParseJSON(text) {
  if (!text) return null;

  try {
    // 1. First attempt direct parse
    return JSON.parse(text);
  } catch {
    // 2. Strip markdown code fences
    let cleaned = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

    try {
      return JSON.parse(cleaned);
    } catch {
      // 3. Try to locate the outermost JSON object bounds { ... }
      const firstBrace = cleaned.indexOf("{");
      const lastBrace = cleaned.lastIndexOf("}");

      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        const sliced = cleaned.slice(firstBrace, lastBrace + 1);
        try {
          return JSON.parse(sliced);
        } catch (innerErr) {
          console.warn("Extracted JSON substring failed to parse:", innerErr);
        }
      }
    }
  }

  return null;
}

/**
 * Sends a prompt to Gemini via Serverless API route or direct API
 * @param {string} prompt - User or system prompt
 * @param {string} [systemInstruction] - Optional system personality
 * @returns {Promise<string>}
 */
export async function queryGemini(prompt, systemInstruction = "") {
  // Strategy 1: Try Vercel Serverless Function (/api/gemini)
  try {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, systemInstruction })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.text) return data.text;
    }
  } catch {
    // Serverless route not reachable (e.g. running vite preview/dev without vercel dev)
  }

  // Strategy 2: Direct browser API call if VITE_GEMINI_API_KEY is configured
  if (
    VITE_GEMINI_API_KEY &&
    VITE_GEMINI_API_KEY !== "your_key_here" &&
    VITE_GEMINI_API_KEY.trim().length > 10
  ) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${VITE_GEMINI_API_KEY}`;
      const payload = {
        contents: [{ parts: [{ text: prompt }] }]
      };
      if (systemInstruction) {
        payload.systemInstruction = {
          parts: [{ text: systemInstruction }]
        };
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      }
    } catch (err) {
      console.warn("Direct Gemini call failed:", err);
    }
  }

  throw new Error("AI service unavailable");
}

/**
 * Chat with WanderAI travel assistant with full destination context
 */
export async function askWanderAIChatbot(destination, question, chatHistory = []) {
  const systemInstruction = `You are WanderAI, an expert travel planning assistant.
You provide helpful, concise, practical, and inspiring travel advice for ${destination.name}, ${destination.country}.
Specialize in:
- Destinations & hidden gems
- Attractions & famous landmarks
- Recommended stay duration & timing
- Best seasons and weather considerations
- Local cuisine and iconic dishes
- Budgeting and estimated costs
- Transportation, metro passes, and walking tips
- Packing essentials and etiquette.

Current destination:
Name: ${destination.name}
Country: ${destination.country}
Category: ${destination.category}
Currency: ${destination.currency}
Language: ${destination.language}
Best Time: ${destination.bestTime}
Recommended Stay: ${destination.recommendedStay}
Famous Places: ${destination.famousPlaces?.map(p => p.name).join(", ")}

Respond warmly, concisely, and format with clear bullet points where helpful.`;

  const recentHistoryText = chatHistory
    .slice(-4)
    .map(m => `${m.role === "user" ? "Traveler" : "WanderAI"}: ${m.text}`)
    .join("\n");

  const prompt = recentHistoryText
    ? `${recentHistoryText}\nTraveler: ${question}\nWanderAI:`
    : `Traveler Question about ${destination.name}: ${question}`;

  try {
    return await queryGemini(prompt, systemInstruction);
  } catch {
    // Intelligent contextual offline generator if API keys are missing/offline
    return getOfflineChatResponse(destination, question);
  }
}

/**
 * Generate structured travel itinerary
 */
export async function generateItinerary({ destination, country, days, style, interests, famousPlaces = [] }) {
  const famousList = famousPlaces.map(p => p.name).join(", ");
  const interestsList = interests && interests.length > 0 ? interests.join(", ") : "Sightseeing, Local Culture, Food";

  const prompt = `You are an expert travel planner.
Create a detailed, inspiring travel itinerary for:
Destination: ${destination}
Country: ${country}
Number of days: ${days}
Travel style: ${style}
Interests: ${interestsList}
Notable landmarks to include if relevant: ${famousList}

Return ONLY a single valid JSON object. No conversational intro or markdown notes outside the JSON.
Follow this EXACT schema:
{
  "destination": "${destination}",
  "country": "${country}",
  "days": [
    {
      "day": 1,
      "title": "Iconic Landmarks & First Impressions",
      "morning": {
        "activity": "Activity Name",
        "description": "Engaging 1-2 sentence description of the morning experience."
      },
      "afternoon": {
        "activity": "Activity Name",
        "description": "Engaging 1-2 sentence description of the afternoon experience."
      },
      "evening": {
        "activity": "Activity Name",
        "description": "Engaging 1-2 sentence description of the evening experience."
      },
      "tips": [
        "First practical tip for this day",
        "Second practical tip for transport or dining"
      ]
    }
  ]
}`;

  try {
    const rawText = await queryGemini(prompt);
    const parsed = safelyParseJSON(rawText);

    if (parsed && Array.isArray(parsed.days) && parsed.days.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.warn("Gemini itinerary generation failed or API unavailable:", err);
  }

  // Graceful, high-quality fallback structured itinerary generator
  return generateOfflineItinerary({ destination, country, days, style, interests, famousPlaces });
}

/**
 * Offline contextual chatbot responses
 */
function getOfflineChatResponse(destination, question) {
  const q = question.toLowerCase();

  if (q.includes("day") || q.includes("long") || q.includes("duration") || q.includes("spend")) {
    return `For **${destination.name}**, a stay of **${destination.recommendedStay}** is ideal. This gives you ample time to explore top landmarks like ${destination.famousPlaces[0]?.name || "the main sights"}, savor local food, and discover charming neighborhoods without rushing!`;
  }
  if (q.includes("photo") || q.includes("picture") || q.includes("camera") || q.includes("view")) {
    return `The most breathtaking photography spots in **${destination.name}** include:\n\n` +
      `• **${destination.famousPlaces[0]?.name || "The City Center"}**: Best visited early morning for golden hour light and minimal crowds.\n` +
      `• **${destination.famousPlaces[1]?.name || "The historic promenade"}**: Phenomenal for dramatic architectural angles.\n` +
      `• **High vantage points & rooftop spots**: Perfect for sunset panoramas over ${destination.name}!`;
  }
  if (q.includes("best time") || q.includes("season") || q.includes("when to visit") || q.includes("weather")) {
    return `The ideal window to visit **${destination.name}** is **${destination.bestTime}**. During these months, you will experience comfortable weather conditions ideal for outdoor exploration and sightseeing.`;
  }
  if (q.includes("expensive") || q.includes("cost") || q.includes("budget") || q.includes("money") || q.includes("currency")) {
    return `**${destination.name}** accepts **${destination.currency}**. Budget travelers can spend around $50-$80/day staying in boutique guesthouses and dining at local eateries, while luxury travelers can experience world-class 5-star hospitality from $250+/day. Always keep some local cash on hand for small vendors!`;
  }
  if (q.includes("food") || q.includes("eat") || q.includes("try") || q.includes("dish") || q.includes("restaurant")) {
    return `When in **${destination.name}**, make sure you indulge in traditional dishes and local street food. Don't hesitate to visit historic food markets and neighborhood bistros where locals gather!`;
  }
  if (q.includes("pack") || q.includes("clothes") || q.includes("wear")) {
    return `Essential packing tips for **${destination.name}**:\n\n` +
      `• Extremely comfortable walking sneakers (you'll easily clock 15k+ steps daily).\n` +
      `• Light, breathable layers with a light evening jacket.\n` +
      `• Universal power adapter and high-capacity portable power bank.\n` +
      `• Modest attire covering shoulders/knees if visiting religious or heritage sites.`;
  }
  if (q.includes("travel") || q.includes("metro") || q.includes("bus") || q.includes("transit") || q.includes("cab")) {
    return `Getting around **${destination.name}** is very convenient:\n\n` +
      `• The local public transit and metro network is fast, clean, and economical.\n` +
      `• Ridesharing apps and licensed metered taxis are widely accessible.\n` +
      `• Many historic quarters are best experienced simply on foot!`;
  }

  return `Visiting **${destination.name}, ${destination.country}** is an extraordinary journey! From iconic monuments like ${destination.famousPlaces?.map(p => p.name).slice(0, 3).join(", ")} to vibrant culture and warm hospitality, you're going to have an unforgettable trip. Feel free to ask about custom daily plans, dining hotspots, or transit advice!`;
}

/**
 * Offline structured itinerary generator
 */
function generateOfflineItinerary({ destination, country, days = 3, style = "Standard", interests = [], famousPlaces = [] }) {
  const numDays = Math.min(Math.max(Number(days) || 3, 1), 7);
  const interestNote = interests && interests.length > 0 ? `featuring ${interests.join(" & ")}` : "highlighting iconic sights";
  const places = famousPlaces && famousPlaces.length > 0
    ? famousPlaces
    : [
        { name: "Historic District", description: "Explore the timeless center of the city." },
        { name: "Cultural Landmark", description: "Visit the world-renowned cultural icon." },
        { name: "Scenic Waterfront", description: "Stroll along scenic vistas and panoramic views." }
      ];

  const generatedDays = [];

  for (let i = 1; i <= numDays; i++) {
    const p1 = places[(i - 1) % places.length];
    const p2 = places[i % places.length];
    const p3 = places[(i + 1) % places.length];

    generatedDays.push({
      day: i,
      title: i === 1
        ? `Welcome to ${destination} & Iconic Sights (${interestNote})`
        : i === numDays
        ? `Hidden Gems & Farewell Panorama`
        : `Cultural Discoveries & Local Flavor`,
      morning: {
        activity: `Morning at ${p1.name}`,
        description: `Start your morning discovering ${p1.name}. ${p1.description || "Enjoy the tranquil morning atmosphere and snap stunning golden-hour photographs."}`
      },
      afternoon: {
        activity: `Explore ${p2.name} & Local Dining`,
        description: `Head over to ${p2.name}. Savor authentic local cuisine at a nearby authentic bistro tailored for ${style.toLowerCase()} travel, followed by guided sightseeing.`
      },
      evening: {
        activity: `Sunset & Evening at ${p3.name}`,
        description: `Unwind the day around ${p3.name}. Watch the sunset cast warm hues across the city skyline, capped off with nighttime strolls and relaxed dessert.`
      },
      tips: [
        `Book admissions in advance for ${p1.name} to bypass queue lines.`,
        `Comfortable walking shoes are strongly recommended for today's itinerary.`
      ]
    });
  }

  return {
    destination,
    country,
    style,
    days: generatedDays
  };
}