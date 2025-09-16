// /api/records.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('[records] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.');
}

// Service role on server only (never ship to browser)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});

// Read JSON safely whether body is parsed or a stream
async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8') || '{}';
  try { return JSON.parse(raw); } catch { return {}; }
}

const firstOrNull = (d) => (Array.isArray(d) ? (d[0] ?? null) : (d ?? null));

export default async function handler(req, res) {
  // CORS (adjust as needed)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'POST') {
      const body = await readJson(req);
      const email = String(body.email || '').trim();
      const payload = body.payload ?? {};

      if (!email) {
        return res.status(400).json({ error: 'email is required' });
      }

      const { data, error } = await supabase
        .from('records')
        .insert([{ email, payload }])
        .select('*')
        .maybeSingle(); // ← don’t force single-row coercion

      if (error) throw error;

      // Normalize: maybeSingle can still return an array; return the first row
      return res.status(201).json(firstOrNull(data));
    }

    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('records')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      return res.status(200).json(data);
    }

    res.setHeader('Allow', 'GET, POST, OPTIONS');
    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err) {
    console.error('API /api/records error', err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}
