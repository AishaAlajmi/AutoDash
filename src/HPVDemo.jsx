import React, { useState, useEffect } from "react";
import { META } from "./data/meta";
import Dashboard from "./components/Dashboard";
import UserForm from "./components/common/UserForm";
import MyRecordsSmart from "./components/common/MyRecordsSmart";
import exportToExcel from "./utils/exportToExcel";
import { submitDailyEntry, getEntries } from "./lib/storage";
import { supabase } from "./lib/supabaseClient";
import LoginPage from "./components/LoginPage";
import AssignedSchoolProgress from "./components/AssignedSchoolProgress";

/* ---------- Small Card ---------- */
function Card({ title, children, className = "" }) {
  return (
    <div className={`p-6 rounded-2xl shadow bg-white ${className}`}>
      {title && <div className="text-base font-semibold mb-3">{title}</div>}
      {children}
    </div>
  );
}

/* ---------- In-memory users only (no localStorage) ---------- */
const USERS = {
  "fahad@gmail.com": { role: "user", facility: "م. ا فهد مع المدارس العالمية" },
  "abdullah@gmail.com": { role: "user", facility: "مجمع الملك عبد الله" },
  "rabigh@gmail.com": { role: "user", facility: "رابغ" },
  "admin@gmail.com": { role: "admin", facility: null },
};

const BrandStyles = () => (
  <style>{`
    :root{--brand:#1691D0;--brand-dark:#15508A;--brand-alt:#3AC0C3}
    *{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif}
    .brand-gradient{background:linear-gradient(135deg,var(--brand),var(--brand-dark))}
    .btn{border-radius:1rem;padding:.6rem 1rem;display:inline-flex;align-items:center;gap:.5rem}
    .btn-primary{background:var(--brand);color:#fff}
    .btn-ghost{border:1px solid #e5e7eb;background:#fff}
  `}</style>
);

export default function HPVDemo() {
  const [user, setUser] = useState(null);
  const [responses, setRows] = useState([]);
  const [schoolInfo, setSchoolInfoState] = useState({});

  useEffect(() => {
    setRows([]);
  }, []);

  const signOut = () => {
    setUser(null);
    setRows([]);
  };

  function mapEntryToLocal(r) {
    return {
      email: r.created_by,
      date: (r.entry_date || r.created_at || "").slice(0, 10),
      facility: r.facility,
      center: r.clinic_name,
      school: r.school_name,
      sex: r.gender,
      authority: r.authority,
      stage: r.stage,
      vaccinated: r.vaccinated ?? 0,
      refused: r.refused ?? 0,
      absent: r.absent ?? 0,
      unvaccinated: r.not_accounted ?? 0,
      schoolTotal: r.school_total ?? 0,
    };
  }

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const params = user.role === "user" ? { created_by: user.email } : {};
        const { rows, error } = await getEntries(params);
        if (error) throw error;
        const mapped = (rows || []).map(mapEntryToLocal);
        setRows(mapped);
      } catch (e) {
        console.error("Error fetching data:", e);
        setRows([]);
      }
    })();
  }, [user?.email, user?.role]);

  const upsertLocalRow = (list, row) => {
    const idx = list.findIndex(
      (r) =>
        r.email === (row.email || user?.email) &&
        r.center === row.center &&
        r.school === row.school
    );
    if (idx >= 0) {
      const next = [...list];
      next[idx] = { ...next[idx], ...row };
      return next;
    }
    return [...list, row];
  };

  const addRow = async (previewRow) => {
    const isPlace = previewRow.mode === "place";
    const payload = {
      entry_date: previewRow.date,
      facility: previewRow.facility,
      created_by: previewRow.email || user?.email || "",
      clinic_name: isPlace ? "اخرى" : previewRow.center,
      school_name: isPlace ? previewRow.place : previewRow.school,
      gender: isPlace ? null : previewRow.sex || null,
      authority: isPlace ? null : previewRow.authority || null,
      stage: isPlace ? null : previewRow.stage || null,
      vaccinated: Number(previewRow.vaccinated) || 0,
      refused: isPlace ? 0 : Number(previewRow.refused || 0),
      absent: isPlace ? 0 : Number(previewRow.absent || 0),
      not_accounted: isPlace ? 0 : Number(previewRow.unvaccinated || 0),
      school_total: isPlace ? 0 : Number(previewRow.schoolTotal || 0),
    };

    const { data, error } = await submitDailyEntry(payload);
    if (error) throw error;

    const clinicName = isPlace ? "اخرى" : previewRow.center;
    const schoolName = isPlace ? previewRow.place : previewRow.school;

    const localRow = {
      ...previewRow,
      email: user?.email || previewRow.email || "",
      date:
        previewRow.date ||
        (data?.entry_date || data?.created_at || "").slice(0, 10),
      clinic_name: clinicName,
      school_name: schoolName,
      center: clinicName,
      school: schoolName,
      refused: isPlace ? 0 : previewRow.refused,
      absent: isPlace ? 0 : previewRow.absent,
      unvaccinated: isPlace ? 0 : previewRow.unvaccinated,
      schoolTotal: isPlace ? 0 : previewRow.schoolTotal,
    };
    setRows((prev) => upsertLocalRow(prev, localRow));
    return data;
  };

  const onExport = (rows) => exportToExcel(rows);

  const onUpdateSchoolInfo = (map) => setSchoolInfoState(map);

  return (
    <div dir="rtl" className="min-h-screen bg-[#F6F9FF]">
      <BrandStyles />
      <header className="sticky top-0 z-10 text-white brand-gradient">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="font-bold">
            الحملة الوطنية للتطعيم باللقاح الثلاثي الفيروسي
          </div>
          {user && (
            <button
              className="ml-auto px-4 py-2 rounded-xl bg-[#1691D0] text-white font-medium shadow hover:bg-[#127ab0] transition"
              onClick={signOut}
            >
              تسجيل الخروج
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        {!user && (
          <LoginPage
            users={USERS}
            onLogin={(u) => {
              const email = (
                typeof u === "string" ? u : u?.email || ""
              ).toLowerCase();
              const info = USERS[email];
              if (info)
                setUser({ email, role: info.role, facility: info.facility });
              else setUser(null);
            }}
          />
        )}

        {user && user.role === "user" && (
          <div className="grid gap-4">
            <Card>
              <UserForm
                email={user.email}
                facility={user.facility}
                meta={META}
                onSubmit={addRow}
                schoolInfo={schoolInfo}
              />
            </Card>
            <div className="grid gap-4">
              <AssignedSchoolProgress
                META={META}
                facility={user.facility}
                rows={responses}
                email={user.email}
              />
              <MyRecordsSmart
                email={user.email}
                rows={responses}
                onExport={onExport}
              />
            </div>
          </div>
        )}

        {user && user.role === "admin" && (
          <Dashboard
            responses={responses}
            onExport={onExport}
            schoolInfo={schoolInfo}
            onUpdateSchoolInfo={onUpdateSchoolInfo}
          />
        )}
      </main>

      <footer className="max-w-6xl mx-auto p-4 text-center text-gray-500">
        حقوق النشر محفوظة لدى{" "}
        <span className="font-bold">تجمع جدة الصحي الثاني</span>
      </footer>
    </div>
  );
}
