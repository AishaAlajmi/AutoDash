import { useEffect, useState } from 'react';
import { getRecords } from '../lib/storage';

export default function AdminDashboard() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load() {
    setLoading(true); setError('');
    try {
      setRows(await getRecords());
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  function downloadCSV() {
    const header = ['id', 'email', 'created_at', 'payload'];
    const lines = [header.join(',')].concat(
      rows.map(r => [r.id, r.email, r.created_at, JSON.stringify(r.payload).replaceAll('"', '""')].join(','))
    );
    const blob = new Blob(["﻿" + lines.join('')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'records.csv'; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: 16 }}>
      <h2>Admin Dashboard (Public)</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={load} disabled={loading}>{loading ? 'Loading…' : 'Refresh'}</button>
        <button onClick={downloadCSV} disabled={!rows.length}>Export CSV</button>
      </div>
      {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 6 }}>ID</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 6 }}>Email</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 6 }}>Created</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 6 }}>Payload</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td style={{ borderBottom: '1px solid #eee', padding: 6 }}>{r.id}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: 6 }}>{r.email}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: 6 }}>{new Date(r.created_at).toLocaleString()}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: 6 }}><pre style={{ margin: 0 }}>{JSON.stringify(r.payload, null, 2)}</pre></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}