
// Usage: node scripts/smoke.mjs http://localhost:3000
// Why: Quick sanity test after deploy; fails with non-zero exit on errors.
const base = process.argv[2] || process.env.BASE_URL || 'http://localhost:3001/';

async function mustGet(path) {
  const url = `${base}${path}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

async function mustPost(path, body) {
  const url = `${base}${path}`;
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

(async () => {
  console.log('Base URL:', base);

  // 1) Env check
  const health = await mustGet('/api/health');
  if (!health.ok) throw new Error('Health check failed: ' + JSON.stringify(health));
  console.log('✓ /api/health ok');

  // 2) Read HPVReal (expects your table to exist)
  const hpv = await mustGet('/api/hpvreal?limit=3');
  if (!Array.isArray(hpv.rows)) throw new Error('hpvreal returned unexpected shape');
  console.log(`✓ /api/hpvreal ok (${hpv.rows.length} rows)`);

  // 3) Optional: records insert if table exists (skip failure silently)
  try {
    const rec = await mustPost('/api/records', { email: 'smoke@example.com', payload: { ts: Date.now() } });
    console.log('✓ /api/records insert ok (id:', rec.id + ')');
  } catch (e) {
    console.warn('! /api/records skipped or failed (likely table not created):', e.message);
  }

  console.log('All smoke checks passed.');
})().catch((err) => {
  console.error('Smoke test failed:', err);
  process.exit(1);
});
