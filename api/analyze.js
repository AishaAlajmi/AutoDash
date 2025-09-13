// File: api/analyze.js
// Node.js Serverless Function for Vercel – robust JSON body parsing

export default async function handler(req, res) {
  try {
    // Read raw body (Vercel Node functions don't parse body for you)
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString('utf8');

    let body = {};
    try {
      body = raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.error("Invalid JSON in request body:", e);
      return res.status(400).json({ error: "Invalid JSON body" });
    }

    const { payload } = body || {};
    if (!payload) {
      return res.status(400).json({ error: "Missing 'payload' in request body." });
    }

    const key = process.env.GOOGLE_API_KEY;
    if (!key) {
      console.error("API key is not configured on the server.");
      return res.status(500).json({ error: "API key is not configured on the server." });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${key}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API call failed with status: ${response.status}`, errorText);
      return res.status(response.status).json({ error: `API call failed: ${errorText}` });
    }

    const result = await response.json();
    return res.status(200).json(result);
  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
