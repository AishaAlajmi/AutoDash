import React, { useMemo, useState, useEffect } from "react";
import * as XLSX from "xlsx"; // Ensure the XLSX library is imported

/* Local, Arabic-friendly styles kept inside this component only */
const LocalStyles = () => (
  <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');
      @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
      .hpv-screen, .hpv-screen * {
        font-family: "Tajawal","Noto Kufi Arabic","Cairo",system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif !important;
      }
      .hpv-card { background:#fff; border-radius:1rem; box-shadow: 0 8px 24px rgba(0,0,0,.04); }
      .hpv-card .hd { display:flex; align-items:center; gap:.75rem; padding: .9rem 1rem .3rem; }
      .hpv-card .hd .title { font-weight:800; color:var(--brand-dark); }
      .hpv-card .body { padding: .75rem 1rem 1rem; }
      .hpv-btn { border-radius: 999px; padding: .55rem 1rem; font-weight:600; transition: background .15s ease, box-shadow .15s ease, transform .15s ease; }
      .hpv-btn-primary { background: linear-gradient(135deg, #1691d0, #165b93); color:#fff; box-shadow: 0 6px 16px rgba(22,145,208,.25); }
      .hpv-btn-primary:hover { background: linear-gradient(135deg, #165b93, #1691d0); transform: translateY(-1px); box-shadow: 0 8px 18px rgba(18,111,167,.28); }
      .hpv-btn-icon { background:#f1f5f9; border-radius:50%; width:40px; height:40px; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background .2s; }
      .hpv-btn-icon:hover { background:#e2e8f0; }
      table.hpv-table { width:100%; border-collapse:separate; border-spacing:0; font-size:.95rem; }
      table.hpv-table thead th { padding:.7rem .6rem; text-align:right; color:#4b5563; font-weight:700; background:#f9fafb; position:sticky; top:0; z-index:1; }
      table.hpv-table tbody td { padding:.7rem .6rem; border-top:1px solid #f1f5f9; }
      table.hpv-table tbody tr:hover { background:#fcfcfd; }
      .hpv-table-wrap { overflow:auto; border:1px solid #eef2f7; border-radius: .9rem; }
      .hpv-input { width: 100%; padding: 0.5rem 0.75rem; border-radius: 0.5rem; border: 1px solid #d1d5db; transition: border-color 0.2s; }
      .hpv-input:focus { outline: none; border-color: #1691d0; }
    `}</style>
);

function Field({ label, children }) {
  return (
    <div className="flex flex-col">
      <label className="hpv-label text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

function num(n) {
  const v = Number(n);
  return Number.isFinite(v) ? v : 0;
}

// Parse YYYY-MM-DD or DD/MM/YYYY or any Date-parsable string/epoch
function parseDateLoose(v) {
  if (!v) return null;
  if (typeof v === "number") return new Date(v);
  if (typeof v !== "string") {
    const d = new Date(v);
    return isNaN(d) ? null : d;
  }
  if (v.includes("/")) {
    const [dd, mm, yyyy] = v.split("/").map((s) => s.trim());
    if (dd && mm && yyyy) {
      const d = new Date(+yyyy, +mm - 1, +dd);
      return isNaN(d) ? null : d;
    }
  }
  const d2 = new Date(v);
  return isNaN(d2) ? null : d2;
}

/** Prefer "last touched" time for ordering newest first. */
function getLastTouchedDate(r) {
  // updated_at → created_at → ts → timestamp → entry_date → date
  const first =
    r?.updated_at ??
    r?.created_at ??
    r?.ts ??
    r?.timestamp ??
    r?.entry_date ??
    r?.date ??
    null;
  const d = parseDateLoose(first);
  return d || new Date(0);
}

/** Nicely format a timestamp for the table (YYYY-MM-DD HH:mm). */
function fmtDateTime(v) {
  const d = parseDateLoose(v);
  if (!d) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

// Row (includes "آخر تحديث" = updated_at)
function ReadOnlyRow({ record }) {
  const updatedDisplay = fmtDateTime(
    record.updated_at ?? record.ts ?? record.timestamp ?? record.created_at
  );

  return (
    <tr
      key={
        record.uid ||
        `${record.email || record.created_by}-${
          record.entry_date || record.date
        }-${record.school || record.center || ""}`
      }
    >
      <td>{record.entry_date || record.date}</td>
      <td>{record.center}</td>
      <td>{record.school}</td>
      <td>{num(record.vaccinated)}</td>
      <td>{num(record.refused)}</td>
      <td>{num(record.absent)}</td>
      <td>
        {num(record.unvaccinated) || num(record.refused) + num(record.absent)}
      </td>
      <td>{updatedDisplay}</td>
    </tr>
  );
}

export default function MyRecordsSmart({ email, rows }) {
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    // Default: newest on top by last touched
    sortBy: "lastTouched",
    dir: "desc",
    q: "",
    entryType: "",
  });

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // initial load / refresh when rows prop changes
  useEffect(() => {
    refreshData();
  }, [rows]);

  const refreshData = () => {
    setLoading(true);
    setRecords(Array.isArray(rows) ? rows : []);
    setTimeout(() => setLoading(false), 300);
  };

  // Filtered
  const filtered = useMemo(() => {
    const fromD = parseDateLoose(filters.from);
    const toD = parseDateLoose(filters.to);

    return (records || []).filter((r) => {
      if (
        r.email &&
        r.email !== email &&
        r.created_by &&
        r.created_by !== email
      ) {
        // keep if either email or created_by matches; else skip
        const matchesByEmail = r.email === email || r.created_by === email;
        if (!matchesByEmail) return false;
      }

      const dForRange =
        parseDateLoose(r.entry_date || r.date) || getLastTouchedDate(r);
      if (
        fromD &&
        dForRange <
          new Date(fromD.getFullYear(), fromD.getMonth(), fromD.getDate())
      )
        return false;
      if (
        toD &&
        dForRange >
          new Date(
            toD.getFullYear(),
            toD.getMonth(),
            toD.getDate(),
            23,
            59,
            59,
            999
          )
      )
        return false;

      const q = (filters.q || "").trim();
      if (q && !(r.center?.includes(q) || r.school?.includes(q))) return false;

      if (filters.entryType === "مطعمين داخل المدارس" && !r.school)
        return false;
      if (filters.entryType === "أماكن أخرى" && r.school) return false;

      return true;
    });
  }, [records, email, filters.from, filters.to, filters.q, filters.entryType]);

  // Sorted (DESC by lastTouched by default)
  const sorted = useMemo(() => {
    const arr = [...filtered];
    const dir = filters.dir === "asc" ? 1 : -1;

    arr.sort((a, b) => {
      if (filters.sortBy === "vaccinated")
        return (num(a.vaccinated) - num(b.vaccinated)) * dir;

      if (filters.sortBy === "unvaccinated") {
        const ua = num(a.unvaccinated) || num(a.refused) + num(a.absent);
        const ub = num(b.unvaccinated) || num(b.refused) + num(b.absent);
        return (ua - ub) * dir;
      }

      if (filters.sortBy === "date") {
        const da = parseDateLoose(a.entry_date || a.date) || new Date(0);
        const db = parseDateLoose(b.entry_date || b.date) || new Date(0);
        return (da - db) * dir;
      }

      // Default: lastTouched (updated_at → created_at → …)
      const ta = getLastTouchedDate(a).getTime();
      const tb = getLastTouchedDate(b).getTime();
      return (ta - tb) * dir;
    });

    return arr;
  }, [filtered, filters.sortBy, filters.dir]);

  // Export to Excel (includes updated_at + derived "آخر وقت ترتيب")
  const exportToExcel = () => {
    const arabicHeaders = {
      entry_date: "التاريخ",
      date: "التاريخ",
      email: "البريد الإلكتروني",
      created_by: "أُدخِل بواسطة",
      facility: "المنشأة",
      // clinic_name: "اسم العيادة",
      // school_name: "اسم المدرسة",
      center: "المركز",
      school: "المكان",
      vaccinated: "المطعّم",
      refused: "رفض",
      absent: "غياب",
      unvaccinated: "غير مطعّم",
      schoolTotal: "إجمالي المدرسة",
      updated_at: "آخر تحديث",
      created_at: "تاريخ الإدخال",
      ts: "الطابع الزمني",
      timestamp: "الطابع الزمني",
    };

    const dataWithArabicHeaders = sorted.map((row) => {
      const translatedRow = {};
      for (const [key, value] of Object.entries(row)) {
        if (arabicHeaders[key]) translatedRow[arabicHeaders[key]] = value;
      }
      translatedRow["آخر تعديل"] = fmtDateTime(getLastTouchedDate(row));
      return translatedRow;
    });

    try {
      const ws = XLSX.utils.json_to_sheet(dataWithArabicHeaders);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "سجلاتي");
      XLSX.writeFile(wb, "vaccination_records.xlsx");
    } catch (err) {
      console.error("Error exporting to Excel:", err);
      setError("حدث خطأ أثناء تصدير البيانات.");
    }
  };

  const clearFilters = () => {
    setFilters({
      from: "",
      to: "",
      sortBy: "lastTouched",
      dir: "desc",
      q: "",
      entryType: "",
    });
  };

  return (
    <section className="hpv-screen p-4">
      <LocalStyles />
      <div className="hpv-card">
        <div className="hd">
          <div className="title">سجلاتي</div>
          <div className="ml-auto flex items-center gap-2">
            {loading && (
              <i className="fas fa-spinner fa-spin text-gray-500"></i>
            )}
            <button
              className="hpv-btn-icon"
              onClick={refreshData}
              title="تحديث البيانات"
            >
              <i className="fas fa-sync-alt"></i>
            </button>
            <div className="text-xs text-gray-500">
              {loading ? "جاري التحميل..." : `${sorted.length} سجلّ`}
            </div>
          </div>
        </div>
        <div className="body">
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="grid gap-3 md:grid-cols-5 items-end mb-3">
            <Field label="من">
              <input
                type="date"
                value={filters.from}
                onChange={(e) =>
                  setFilters((x) => ({ ...x, from: e.target.value }))
                }
                className="hpv-input"
              />
            </Field>
            <Field label="إلى">
              <input
                type="date"
                value={filters.to}
                onChange={(e) =>
                  setFilters((x) => ({ ...x, to: e.target.value }))
                }
                className="hpv-input"
              />
            </Field>
            <Field label="بحث">
              <input
                placeholder="ابحث في المركز/المدرسة"
                value={filters.q}
                onChange={(e) =>
                  setFilters((x) => ({ ...x, q: e.target.value }))
                }
                className="hpv-input"
              />
            </Field>

            <div className="flex gap-2 mb-3 md:col-span-2">
              <button
                type="button"
                className="hpv-btn hpv-btn-primary"
                onClick={exportToExcel}
              >
                تصدير إلى Excel
              </button>
              <button
                type="button"
                className="hpv-btn hpv-btn-ghost"
                onClick={clearFilters}
              >
                تصفية البحث
              </button>
            </div>
          </div>

          <div className="hpv-table-wrap">
            <table className="hpv-table text-sm">
              <thead>
                <tr>
                  <th>التاريخ</th>
                  <th>المركز</th>
                  <th>المكان</th>
                  <th>مطعّم</th>
                  <th>رفض</th>
                  <th>غياب</th>
                  <th>غير مطعّم</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="text-center text-gray-500 py-6">
                      <i className="fas fa-spinner fa-spin text-xl mb-2"></i>
                      <div className="text-sm">جاري تحميل السجلات...</div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {/* Show newest 500 by last touched (updated_at first) */}
                    {sorted.slice(0, 500).map((r) => (
                      <ReadOnlyRow
                        key={
                          r.uid ||
                          `${r.email || r.created_by}-${
                            r.entry_date || r.date
                          }-${r.school || r.center || ""}`
                        }
                        record={r}
                      />
                    ))}
                    {sorted.length === 0 && (
                      <tr>
                        <td
                          colSpan={8}
                          className="text-center text-gray-500 py-6"
                        >
                          لا توجد سجلات مطابقة للفلاتر الحالية.
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
