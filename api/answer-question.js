// File: api/answer-question.js
// Same parsing + validation as analyze.js

export default async function handler(req, res) {
  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString("utf8");

    let body = {};
    try {
      body = raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.error("Invalid JSON:", e);
      return res.status(400).json({ error: "Invalid JSON body" });
    }

    const payload = body?.payload ?? body;
    console.log("Received payload keys:", Object.keys(payload || {}));

    if (!payload || !Array.isArray(payload.contents)) {
      return res.status(400).json({
        error: "Missing or invalid 'contents'. Send the Gemini request body at the top level or under { payload }."
      });
    }

    const key = process.env.GOOGLE_API_KEY;
    if (!key) {
      console.error("Missing GOOGLE_API_KEY");
      return res.status(500).json({ error: "Server is missing GOOGLE_API_KEY" });
    }

    const apiUrl =
      `https://generativelanguage.googleapis.com/v1beta/models/` +
      `gemini-2.5-flash-preview-05-20:generateContent?key=${key}`;

    const upstream = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await upstream.text();
    if (!upstream.ok) {
      console.error("Gemini error", upstream.status, text);
      return res.status(upstream.status).json({ error: text });
    }

    return res.status(200).send(text);
  } catch (err) {
    console.error("Serverless error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
