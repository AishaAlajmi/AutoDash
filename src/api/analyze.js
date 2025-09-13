// File: src/pages/api/analyze.js
// This is a Vercel Serverless Function (API Route).
// It acts as a secure proxy to the Gemini API, protecting your API key.

import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req, res) {
  // Use a try-catch block to gracefully handle any potential errors.
  try {
    // Vercel automatically parses the JSON body for you.
    const { payload } = req.body;

    // Use a non-Vite prefixed environment variable for the server-side key.
    const key = process.env.GOOGLE_API_KEY;

    if (!key) {
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
      return res.status(response.status).json({ error: `API call failed: ${errorText}` });
    }

    const result = await response.json();
    return res.status(200).json(result);
  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
