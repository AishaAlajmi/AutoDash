// File: api/answer-question.js
// This is a Vercel Serverless Function (API Route).
// It securely handles AI question-answering requests.

// The Vercel helper types are not needed for a standard Node.js function.
// We'll use the native Node.js request and response objects.

export default async function handler(req, res) {
  try {
    // Log the request body to help with debugging in Vercel's logs.
    console.log('Received request body:', req.body);

    const { payload } = req.body;

    // Access the API key from a non-Vite prefixed environment variable.
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
