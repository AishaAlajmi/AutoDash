import { useState } from 'react';
import { submitDailyEntry } from '../lib/storage';

export default function PublicDailyForm() {
  const [form, setForm] = useState({ facility:'', clinic_name:'', school_name:'', gender:'غير محدد', authority:'', stage:'', vaccinated:0, refused:0, absent:0, not_accounted:0, school_total:0, region:'', created_by:'' });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  function set(k, v) { setForm((s) => ({ ...s, [k]: v })); }

  async function onSubmit(e) {
    e.preventDefault(); setBusy(true); setMsg('');
    try { await submitDailyEntry(form); setMsg('تم الحفظ بنجاح'); }
    catch (e) { setMsg('خطأ: ' + e.message); }
    finally { setBusy(false); }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8 }}>
      {/* Map these inputs to your current UI fields */}
      <input placeholder="المنشأة الصحية" value={form.facility} onChange={(e)=>set('facility', e.target.value)} required />
      <input placeholder="اسم المركز الصحي" value={form.clinic_name} onChange={(e)=>set('clinic_name', e.target.value)} />
      <input placeholder="اسم المدرسة" value={form.school_name} onChange={(e)=>set('school_name', e.target.value)} required />
      <select value={form.gender} onChange={(e)=>set('gender', e.target.value)}>
        <option value="غير محدد">غير محدد</option>
        <option value="بنين">بنين</option>
        <option value="بنات">بنات</option>
      </select>
      <input placeholder="السلطة" value={form.authority} onChange={(e)=>set('authority', e.target.value)} />
      <input placeholder="المرحلة" value={form.stage} onChange={(e)=>set('stage', e.target.value)} />
      <input type="number" min="0" placeholder="عدد المطعّمين" value={form.vaccinated} onChange={(e)=>set('vaccinated', e.target.value)} />
      <input type="number" min="0" placeholder="عدد الرفض" value={form.refused} onChange={(e)=>set('refused', e.target.value)} />
      <input type="number" min="0" placeholder="عدد الغياب" value={form.absent} onChange={(e)=>set('absent', e.target.value)} />
      <input type="number" min="0" placeholder="غير مطعّم (محسوب)" value={form.not_accounted} onChange={(e)=>set('not_accounted', e.target.value)} />
      <input type="number" min="0" placeholder="إجمالي المدرسة" value={form.school_total} onChange={(e)=>set('school_total', e.target.value)} />
      <input placeholder="المنطقة" value={form.region} onChange={(e)=>set('region', e.target.value)} />
      <input placeholder="البريد (اختياري)" value={form.created_by} onChange={(e)=>set('created_by', e.target.value)} />
      <button type="submit" disabled={busy}>{busy ? 'جارٍ الحفظ…' : 'حفظ'}</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}

