/**
 * Vercel Serverless Function for Google Gemini API
 * Securely proxies client requests using server-side GEMINI_API_KEY environment variable.
 * Optimized for sub-2-second response latency using a single high-performance Flash model.
 */

const PRIMARY_MODEL = "gemini-flash-lite-latest";
const REQUEST_TIMEOUT_MS = 9000;

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

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey || apiKey === "your_key_here") {
    return res.status(500).json({
      error: "GEMINI_API_KEY is not configured on the server."
    });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const { prompt, systemInstruction } = req.body || {};

    if (!prompt) {
      clearTimeout(timeoutId);
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

    // Call ONE reliable primary Gemini Flash model directly
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${PRIMARY_MODEL}:generateContent?key=${apiKey}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

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
    clearTimeout(timeoutId);
    console.error("Gemini serverless function error:", error.name || error.message);
    const isTimeout = error.name === "AbortError";
    return res.status(isTimeout ? 504 : 500).json({
      error: isTimeout
        ? "Gemini request timed out."
        : "Internal server error occurred while contacting Gemini API."
    });
  }
}