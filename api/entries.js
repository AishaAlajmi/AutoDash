// /api/entries.js
import { createClient } from '@supabase/supabase-js';

// Server-only key (Service Role) so we can read both tables
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// GET /api/entries?created_by=email@x.com&facility=...&from=YYYY-MM-DD&to=YYYY-MM-DD
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');
    const created_by = url.searchParams.get('created_by');
    const facility = url.searchParams.get('facility');

    // 1) Pull recent daily entries with basic numeric fields
    // Prefer filtering by entry_date (date only) when provided.
    let q = supabase
      .from('daily_entries')
      .select('id, created_by, created_at, entry_date, authority, stage, vaccinated, refused, absent, not_accounted, school_total')
      .order('created_at', { ascending: false })
      .limit(1000);

    if (created_by) q = q.eq('created_by', created_by);
    if (from) q = q.gte('entry_date', from);
    if (to) q = q.lte('entry_date', to);

    const { data: daily, error: e1 } = await q;
    if (e1) throw e1;

    if (!daily || daily.length === 0) {
      res.status(200).json({ rows: [] });
      return;
    }

    // 2) Fetch metadata (facility/clinic/school/gender) from HPVReal and join by id
    const ids = daily.map((d) => d.id).filter(Boolean);
    const { data: real, error: e2 } = await supabase
      .from('HPVReal')
      .select('id, facility, clinic_name, school_name, gender, authority')  // keep authority as backup
      .in('id', ids);

    if (e2) throw e2;

    const byId = new Map((real || []).map((r) => [r.id, r]));

    let rows = daily.map((d) => {
      const extra = byId.get(d.id) || {};
      return {
        // numeric + time fields
        id: d.id,
        created_by: d.created_by || null,
        created_at: d.created_at || null,
        entry_date: d.entry_date || null,

        vaccinated: d.vaccinated ?? 0,
        refused: d.refused ?? 0,
        absent: d.absent ?? 0,
        not_accounted: d.not_accounted ?? 0,
        school_total: d.school_total ?? 0,

        // categorical (prefer from daily; fallback to HPVReal)
        authority: d.authority ?? extra.authority ?? null,
        stage: d.stage ?? null,

        // JOINed fields needed by the dashboard filters
        facility: extra.facility || null,
        clinic_name: extra.clinic_name || null,
        school_name: extra.school_name || null,
        gender: extra.gender || null,
      };
    });

    // 3) Optional facility filter (applied after join)
    if (facility) {
      const wanted = facility.trim();
      rows = rows.filter((r) => (r.facility || '').trim() === wanted);
    }

    res.status(200).json({ rows });
  } catch (e) {
    console.error('[entries] fetch failed:', e);
    res.status(500).json({ error: e.message || 'Failed to load entries' });
  }
}
