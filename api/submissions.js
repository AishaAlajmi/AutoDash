// /api/submissions.js
import { createClient } from '@supabase/supabase-js';

// ---- Supabase client (server-only key) ----
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;


const supabase = (supabaseUrl && supabaseServiceKey)
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;

// ---- tiny helpers ----
const todayStr = () => new Date().toISOString().slice(0, 10);
const toInt = (v) => (Number.isFinite(Number(v)) ? Number(v) : 0);

// Works on Node serverless (no Buffer usage)
async function readJson(req) {
    if (req && typeof req.body === 'object') return req.body;
    const chunks = [];
    for await (const c of req) chunks.push(c);
    let text;
    if (typeof chunks[0] === 'string') text = chunks.join('');
    else {
        const total = chunks.reduce((n, c) => n + c.length, 0);
        const joined = new Uint8Array(total);
        let off = 0;
        for (const c of chunks) { joined.set(c, off); off += c.length; }
        text = new TextDecoder('utf-8').decode(joined);
    }
    try { return text ? JSON.parse(text) : {}; } catch { return {}; }
}

export default async function handler(req, res) {
    // Open CORS (ok for same-origin apps)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');

    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        if (!supabase) {
            console.error('[submissions] Missing env vars');
            return res.status(500).json({ error: 'Server misconfigured (env vars missing)' });
        }

        const body = await readJson(req);

        // pick upsert scope
        // - "pair"   => unique(created_by, clinic_name, school_name)
        // - "per_day"=> unique(created_by, clinic_name, school_name, entry_date)
        const mode = body?._upsert === 'pair' ? 'pair' : 'per_day';
        const onConflict =
            mode === 'pair'
                ? 'created_by,clinic_name,school_name'
                : 'created_by,clinic_name,school_name,entry_date';

        // required fields
        if (!body?.facility) return res.status(400).json({ error: 'facility is required' });
        if (!body?.school_name) return res.status(400).json({ error: 'school_name is required' });

        // normalize payload
        const payload = {
            facility: body.facility,
            clinic_name: body.clinic_name,
            school_name: body.school_name,
            gender: body.gender || null,
            authority: body.authority || null,
            stage: body.stage || null,
            vaccinated: toInt(body.vaccinated),
            refused: toInt(body.refused),
            absent: toInt(body.absent),
            not_accounted: toInt(body.not_accounted),
            school_total: toInt(body.school_total),
            region: body.region || null,
            created_by: body.created_by || null,
            // ensure entry_date (DATE)
            entry_date: (body.entry_date || body.date || todayStr()),
        };

        // UPSERT (insert or update on conflict)
        const { data, error } = await supabase
            .from('daily_entries')
            .upsert([payload], {
                onConflict,          // must match a UNIQUE constraint
                ignoreDuplicates: false,
                defaultToNull: false,
                returning: 'representation',
            })
            .select()
            .single();

        if (error) throw error;
        return res.status(200).json(data);
    } catch (e) {
        console.error('[submissions] upsert failed:', e);
        return res.status(500).json({ error: e.message || 'Upsert failed' });
    }
}
