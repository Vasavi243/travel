/**
 * WanderAI Gemini Service
 * High-performance travel AI assistant service.
 * Uses a single fast primary Flash model (gemini-flash-lite-latest), AbortController timeouts,
 * streamlined system prompts, and instantaneous contextual offline fallbacks.
 */

const PRIMARY_MODEL = "gemini-flash-lite-latest";
const CLIENT_TIMEOUT_MS = 9500;

const VITE_GEMINI_API_KEY =
  typeof import.meta !== "undefined" && import.meta.env
    ? import.meta.env.VITE_GEMINI_API_KEY
    : (typeof process !== "undefined" && process.env ? process.env.VITE_GEMINI_API_KEY : undefined);

/**
 * Cleanly strips markdown fences and extracts a JSON string from AI response
 * @param {string} text - Raw AI string output
 * @returns {Object|null}
 */
export function safelyParseJSON(text) {
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    let cleaned = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

    try {
      return JSON.parse(cleaned);
    } catch {
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
 * Sends prompt to Gemini with AbortController timeout.
 * Calls ONE primary serverless endpoint without multi-model retry loops.
 * @param {string} prompt - User or system prompt
 * @param {string} [systemInstruction] - Streamlined system personality
 * @returns {Promise<string>}
 */
export async function queryGemini(prompt, systemInstruction = "") {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);

  // Strategy 1: Preferred secure serverless route (/api/gemini)
  try {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, systemInstruction }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.text) return data.text;
    }
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === "AbortError") {
      console.warn("Gemini request timed out after", CLIENT_TIMEOUT_MS, "ms");
    }
  }

  // Strategy 2: Direct browser API fallback for standalone dev if key is present
  if (
    VITE_GEMINI_API_KEY &&
    VITE_GEMINI_API_KEY !== "your_key_here" &&
    VITE_GEMINI_API_KEY.trim().length > 10
  ) {
    const directController = new AbortController();
    const directTimeout = setTimeout(() => directController.abort(), 6000);

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${PRIMARY_MODEL}:generateContent?key=${VITE_GEMINI_API_KEY}`;
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
        body: JSON.stringify(payload),
        signal: directController.signal
      });

      clearTimeout(directTimeout);

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch {
      clearTimeout(directTimeout);
    }
  }

  throw new Error("AI service unavailable or timed out");
}

/**
 * Chat with WanderAI travel assistant with concise destination context and limited history
 */
export async function askWanderAIChatbot(destination, question, chatHistory = []) {
  const famousList =
    destination.famousPlaces?.map((p) => p.name).slice(0, 4).join(", ") || "Main landmarks";

  // Streamlined system instruction to reduce token overhead and maximize generation speed
  const systemInstruction = `You are WanderAI, a helpful, concise travel assistant.

Current destination:
${destination.name}, ${destination.country}

Useful context:
Category: ${destination.category || "General"}
Currency: ${destination.currency || "Local Currency"}
Best time to visit: ${destination.bestTime || "Year-round"}
Recommended stay: ${destination.recommendedStay || "3–4 days"}
Famous landmarks: ${famousList}

Instructions:
Answer questions specifically in the context of ${destination.name}.
Keep answers practical, accurate, engaging, and concise (2–3 short paragraphs or bullet points).`;

  // Retain only the last 4 messages to preserve conversational continuity without token bloat
  const recentHistoryText = chatHistory
    .slice(-4)
    .filter((m) => m.id !== "welcome" && m.id !== "welcome-reset" && m.text)
    .map((m) => `${m.role === "user" ? "Traveler" : "WanderAI"}: ${m.text}`)
    .join("\n\n");

  const prompt = recentHistoryText
    ? `${recentHistoryText}\n\nTraveler: ${question}\nWanderAI:`
    : `Traveler Question about ${destination.name}, ${destination.country}: ${question}`;

  try {
    return await queryGemini(prompt, systemInstruction);
  } catch {
    // Immediate, high-quality destination-aware offline synthesis if API is slow or offline
    return getOfflineChatResponse(destination, question);
  }
}

/**
 * Generate structured travel itinerary
 */
export async function generateItinerary({ destination, country, days, style, interests, famousPlaces = [] }) {
  const famousList = famousPlaces.map((p) => p.name).join(", ");
  const interestsList =
    interests && interests.length > 0 ? interests.join(", ") : "Sightseeing, Local Culture, Food";

  const prompt = `You are an expert travel planner.
Create a detailed, inspiring travel itinerary for:
Destination: ${destination}
Country: ${country}
Number of days: ${days}
Travel style: ${style}
Interests: ${interestsList}
Notable landmarks: ${famousList}

Return ONLY a single valid JSON object following this EXACT schema:
{
  "destination": "${destination}",
  "country": "${country}",
  "days": [
    {
      "day": 1,
      "title": "Iconic Landmarks & First Impressions",
      "morning": {
        "activity": "Activity Name",
        "description": "Engaging description."
      },
      "afternoon": {
        "activity": "Activity Name",
        "description": "Engaging description."
      },
      "evening": {
        "activity": "Activity Name",
        "description": "Engaging description."
      },
      "tips": [
        "First practical tip",
        "Second practical tip"
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
    console.warn("Itinerary generation fallback triggered:", err);
  }

  return generateOfflineItinerary({ destination, country, days, style, interests, famousPlaces });
}

/**
 * Offline contextual chatbot responses
 */
export function getOfflineChatResponse(destination, question) {
  const q = question.toLowerCase();
  const landmarks = destination.famousPlaces?.map((p) => p.name).slice(0, 3).join(", ") || "the historic center";

  if (q.includes("day") || q.includes("long") || q.includes("duration") || q.includes("spend")) {
    return `For **${destination.name}, ${destination.country}**, a stay of **${destination.recommendedStay || "3–5 days"}** is ideal. This gives you ample time to explore top landmarks like ${landmarks}, savor regional dishes, and discover charming neighborhoods without rushing!`;
  }

  if (q.includes("photo") || q.includes("picture") || q.includes("camera") || q.includes("view") || q.includes("instagram")) {
    return `The most breathtaking photography spots in **${destination.name}** include:\n\n` +
      `• **${destination.famousPlaces?.[0]?.name || "The Main Landmark"}**: Best visited in early morning for golden-hour light and minimal crowds.\n` +
      `• **${destination.famousPlaces?.[1]?.name || "The Scenic Promenade"}**: Ideal for dramatic architectural shots and street portraits.\n` +
      `• **High panoramic viewpoints**: Perfect for capturing the sunset glow across the skyline of ${destination.name}!`;
  }

  if (q.includes("best time") || q.includes("season") || q.includes("when to visit") || q.includes("weather") || q.includes("month")) {
    return `The ideal window to visit **${destination.name}** is **${destination.bestTime || "Spring or Autumn"}**. During these months, you'll experience pleasant temperatures and optimal conditions for outdoor sightseeing and walking tours.`;
  }

  if (q.includes("food") || q.includes("eat") || q.includes("try") || q.includes("dish") || q.includes("cuisine") || q.includes("restaurant") || q.includes("dinner") || q.includes("lunch")) {
    return `Dining in **${destination.name}** is an absolute delight! Here is what you must experience:\n\n` +
      `• **Signature Local Specialties**: Seek out traditional neighborhood eateries serving authentic regional favorites.\n` +
      `• **Vibrant Food Markets**: Head to local markets to sample artisanal street delicacies and fresh local produce.\n` +
      `• **Iconic Dining Tip**: Make dinner reservations in advance for popular heritage spots, and ask servers for local seasonal dishes!`;
  }

  if (q.includes("expensive") || q.includes("cost") || q.includes("budget") || q.includes("money") || q.includes("currency") || q.includes("price") || q.includes("cheap")) {
    return `**${destination.name}** primarily uses **${destination.currency || "local currency"}**.\n\n` +
      `• **Budget Travelers**: Can expect to spend roughly $45–$75 per day utilizing guesthouses, public transit, and casual eateries.\n` +
      `• **Mid-Range / Comfort**: Around $120–$200 per day for 4-star hotels, guided landmark visits, and seated dining.\n` +
      `• **Payment Tip**: Credit cards are widely accepted at most shops and restaurants, but keep small cash for street markets and transport.`;
  }

  if (q.includes("pack") || q.includes("clothes") || q.includes("wear") || q.includes("luggage")) {
    return `Essential packing recommendations for **${destination.name}**:\n\n` +
      `• **Comfortable footwear**: Sturdy walking shoes or broken-in sneakers are non-negotiable for exploring ${destination.name}.\n` +
      `• **Versatile layers**: Breathable daywear plus a light jacket or shawl for cooler evenings or air-conditioned indoor spaces.\n` +
      `• **Electronics**: Universal travel plug adapter and a portable power bank for navigation and photography.\n` +
      `• **Modest coverage**: A light scarf or covering if you plan to visit sacred or historical religious monuments.`;
  }

  if (q.includes("travel") || q.includes("metro") || q.includes("bus") || q.includes("transit") || q.includes("cab") || q.includes("taxi") || q.includes("get around")) {
    return `Getting around **${destination.name}** is straightforward:\n\n` +
      `• **Public Transit**: The metro and bus network connects all primary attractions efficiently and affordably.\n` +
      `• **Walking**: The historic core around ${landmarks} is best enjoyed on foot.\n` +
      `• **Rideshare & Taxis**: Readily accessible for airport transfers or late-night returns to your hotel.`;
  }

  if (q.includes("beach") || q.includes("sea") || q.includes("coast") || q.includes("ocean") || q.includes("swim")) {
    return `If you're looking for coastal bliss around **${destination.name}**, explore scenic waterfront promenades and nearby beaches. Pack reef-safe sunscreen, a quick-dry towel, and arrive early to claim a relaxing spot!`;
  }

  return `Visiting **${destination.name}, ${destination.country}** is an extraordinary journey! From iconic monuments like ${landmarks} to rich culture and warm hospitality, you're going to have an unforgettable trip. Feel free to ask about custom daily plans, local dining hotspots, or transit advice!`;
}

/**
 * Offline structured itinerary generator
 */
function generateOfflineItinerary({ destination, country, days = 3, style = "Standard", interests = [], famousPlaces = [] }) {
  const numDays = Math.min(Math.max(Number(days) || 3, 1), 7);
  const interestNote = interests && interests.length > 0 ? `featuring ${interests.join(" & ")}` : "highlighting iconic sights";
  const places =
    famousPlaces && famousPlaces.length > 0
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
      title:
        i === 1
          ? `Welcome to ${destination} & Iconic Sights (${interestNote})`
          : i === numDays
          ? `Hidden Gems & Farewell Panorama`
          : `Cultural Discoveries & Local Flavor`,
      morning: {
        activity: `Morning at ${p1.name}`,
        description: `Start your morning discovering ${p1.name}. ${
          p1.description || "Enjoy the tranquil morning atmosphere and snap stunning golden-hour photographs."
        }`
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