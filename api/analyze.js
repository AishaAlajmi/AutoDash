// File: api/analyze.js
// This is a Vercel Serverless Function (API Route).
// It acts as a secure proxy to the Gemini API, protecting your API key.

// The Vercel helper types are not needed for a standard Node.js function.
// We'll use the native Node.js request and response objects.

export default async function handler(req, res) {
  // Use a try-catch block to gracefully handle any potential errors.
  try {
    // Log the request body to help with debugging in Vercel's logs.
    console.log('Received request body:', req.body);

    const { payload } = req.body;

    // Use a non-Vite prefixed environment variable for the server-side key.
    const key = process.env.GOOGLE_API_KEY;

    if (!key) {
      // Log the error to Vercel's logs
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
