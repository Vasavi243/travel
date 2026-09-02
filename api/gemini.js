/**
 * Vercel Serverless Function for Google Gemini API
 * Securely proxies client requests using server-side GEMINI_API_KEY environment variable.
 */

export default async function handler(req, res) {
  // Allow CORS for local development
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "your_key_here") {
    return res.status(500).json({
      error: "GEMINI_API_KEY is not configured on the server."
    });
  }

  try {
    const { prompt, systemInstruction } = req.body || {};

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const payload = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    };

    if (systemInstruction) {
      payload.systemInstruction = {
        parts: [{ text: systemInstruction }]
      };
    }

    // Call Google Gemini API (gemini-2.5-flash or gemini-1.5-flash)
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      return res.status(geminiResponse.status).json({
        error: "Failed to fetch response from Gemini API.",
        details: errorText
      });
    }

    const data = await geminiResponse.json();
    const candidateText =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return res.status(200).json({ text: candidateText });
  } catch (error) {
    console.error("Gemini serverless function error:", error);
    return res.status(500).json({
      error: "Internal server error occurred while contacting Gemini API."
    });
  }
}