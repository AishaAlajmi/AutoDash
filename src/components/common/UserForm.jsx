import React, { useEffect, useState, useMemo } from "react";
import {
  submitDailyEntry,
  fetchSchoolDayTotals,
  getEntries,
} from "../../lib/storage";
import { getSchoolStatic } from "../../data/meta";

const DEBUG = true;
const log = (...args) => DEBUG && console.log("[UserForm]", ...args);

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}
function numberOrNull(v) {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

/* ---------- Reusable UI ---------- */
function Card({ title, subtitle, children, className = "" }) {
  return (
    <div className={`p-5 rounded-2xl shadow bg-white ${className}`}>
      {(title || subtitle) && (
        <div className="mb-3">
          {title && <div className="text-base font-bold">{title}</div>}
          {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
function Badge({ children, tone = "brand" }) {
  const toneClass =
    tone === "ok"
      ? "bg-green-50 text-green-700 border-green-200"
      : tone === "warn"
      ? "bg-yellow-50 text-yellow-700 border-yellow-200"
      : tone === "error"
      ? "bg-red-50 text-red-700 border-red-200"
      : "bg-sky-50 text-sky-700 border-sky-200";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border ${toneClass}`}
    >
      {children}
    </span>
  );
}
function Modal({ open, title, children, onClose, actions }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-[95%] md:w-[760px] max-h-[85vh] overflow-auto">
        <div
          className="h-1.5 w-full rounded-t-2xl"
          style={{
            background: "linear-gradient(90deg,var(--brand),var(--brand-dark))",
          }}
        />
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <div
              className="font-extrabold text-lg"
              style={{ color: "var(--brand-dark)" }}
            >
              {title}
            </div>
            <button className="ml-auto btn btn-ghost" onClick={onClose}>
              إغلاق
            </button>
          </div>
          {children}
          {actions && (
            <div className="mt-4 flex gap-2 justify-end">{actions}</div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */
function fmtKsaTimeOnly(v) {
  if (!v) return "—";
  const d = new Date(v);
  if (isNaN(d)) return "—";
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Riyadh",
  });
}

/* ---------- Main Form ---------- */
export default function UserForm({
  email,
  facility,
  meta,
  onSubmit,
  schoolInfo,
}) {
  const centers = meta?.centersByFacility?.[facility] || [];
  const [mode, setMode] = useState(centers.length > 0 ? "school" : "place");

  // School state
  const [center, setCenter] = useState(centers[0] || "");
  const schools = meta
    ? meta.schoolsByCenter?.[facility + "::" + center] || []
    : [];
  const [school, setSchool] = useState("");
  const [vaccinated, setVaccinated] = useState("");
  const [refused, setRefused] = useState("");
  const [absent, setAbsent] = useState("");
  const [todaySoFar, setTodaySoFar] = useState({
    vaccinated: 0,
    refused: 0,
    absent: 0,
    loading: false,
    error: "",
  });

  const PLACE_OPTIONS = [
    "مركز صحي",
    "مولات وأماكن عامة",
    "دور الرعاية والأيتام",
    "السجون",
    "المعاهد الفنية والحرفية",
    "الحضانات",
    "أخرى",
  ];

  const [place, setPlace] = useState("");

  // Shared UI
  const [status, setStatus] = useState({ type: "idle", msg: "" });
  const [preview, setPreview] = useState(null);

  // Last updated (time-only) from DB updated_at
  const [lastUpdatedTime, setLastUpdatedTime] = useState("—");

  // TABLE state
  const [tableRows, setTableRows] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [tableErr, setTableErr] = useState("");

  // Arabic UI styles
  const brandStyles = useMemo(
    () => (
      <style>{`
      :root{--brand:#1691D0;--brand-dark:#15508A;--brand-alt:#3AC0C3}
      @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');
      .hpv-form, .hpv-form * { font-family: "Tajawal","Noto Kufi Arabic","Cairo",system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif !important; }
      .hpv-input, .hpv-select { border-radius: .9rem; padding: .75rem 1rem; border: 1px solid #e5e7eb; background:#fff; transition: border-color .15s, box-shadow .15s, background .15s; }
      .hpv-input[disabled], .hpv-select[disabled] { background:#f3f4f6; color:#6b7280; }
      .hpv-input:focus, .hpv-select:focus { outline: none; border-color: var(--brand); box-shadow: 0 0 0 3px #3AC0C326; }
      .hpv-label { font-size:.85rem; color:#374151; margin-bottom:.35rem; }
      .hpv-btn-primary { border-radius:1rem; padding:.75rem 1.2rem; color:#fff; background: linear-gradient(135deg,var(--brand),var(--brand-dark)); box-shadow: 0 6px 16px rgba(22,145,208,.25); transition: transform .15s, box-shadow .15s, filter .15s, background .15s; }
      .hpv-btn-primary:hover { background: linear-gradient(135deg,var(--brand-dark),var(--brand)); transform: translateY(-1px); box-shadow: 0 8px 18px rgba(18,111,167,.28); }
      .hpv-btn-ghost { border-radius:1rem; padding:.75rem 1.2rem; background:#fff; border:1px solid #e5e7eb; color:#374151; }
      .hpv-btn-ghost:hover { background:#f9fafb; border-color:#d1d5db; }
      .hpv-help { font-size:.75rem; color:#6b7280; }
      .hpv-section-title { display:flex; align-items:center; gap:.5rem; font-weight:800; color:var(--brand-dark); }
      .hpv-section-title .dot { width:.6rem; height:.6rem; border-radius:999px; background:var(--brand); display:inline-block; }
    `}</style>
    ),
    []
  );

  // keep center valid
  useEffect(() => {
    if (mode !== "school") return;
    setCenter((curr) => (centers.includes(curr) ? curr : centers[0] || ""));
  }, [facility, meta, mode]); // eslint-disable-line

  // default school on center change
  useEffect(() => {
    if (mode !== "school") return;
    const s =
      (meta?.schoolsByCenter?.[facility + "::" + center] || [""])[0] || "";
    setSchool(s);
  }, [center, facility, meta, mode]);

  // clear fields on mode switch
  useEffect(() => {
    setStatus({ type: "idle", msg: "" });
    setPreview(null);
    setVaccinated("");
    setRefused("");
    setAbsent("");
    setPlace("");
  }, [mode]);

  // fixed meta
  const fixedMeta = useMemo(
    () => (mode === "school" ? getSchoolStatic(facility, center, school) : {}),
    [facility, center, school, mode]
  );
  const fixed = useMemo(() => {
    if (mode !== "school")
      return { sex: "", authority: "", stage: "", schoolTotal: 0 };
    const fallback = schoolInfo?.[school] || {};
    return {
      sex: fixedMeta.gender || fallback.sex || "",
      authority: fixedMeta.authority || fallback.authority || "",
      stage: fixedMeta.stage || fallback.stage || "",
      schoolTotal:
        (Number.isFinite(fixedMeta.total) ? fixedMeta.total : 0) ||
        Number(fallback.schoolTotal) ||
        0,
    };
  }, [fixedMeta, school, schoolInfo, mode]);

  const unvaccinated =
    mode === "school"
      ? (numberOrNull(refused) || 0) + (numberOrNull(absent) || 0)
      : 0;

  // fetch today's totals (and last updated time)
  useEffect(() => {
    if (mode !== "school" || !center || !school || !email) return;
    let cancelled = false;
    (async () => {
      try {
        setTodaySoFar((s) => ({ ...s, loading: true, error: "" }));
        const { data, error } = await fetchSchoolDayTotals({
          created_by: email,
          facility,
          clinic_name: center,
          school_name: school,
          entry_date: todayStr(),
        });
        if (cancelled) return;
        if (error) {
          setTodaySoFar({
            vaccinated: 0,
            refused: 0,
            absent: 0,
            loading: false,
            error: error.message || String(error),
          });
          setLastUpdatedTime("—");
        } else {
          setTodaySoFar({ ...data, loading: false, error: "" });
          setLastUpdatedTime(fmtKsaTimeOnly(data.lastUpdated)); // time-only badge
        }
      } catch (err) {
        if (!cancelled)
          setTodaySoFar({
            vaccinated: 0,
            refused: 0,
            absent: 0,
            loading: false,
            error: String(err),
          });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [mode, center, school, facility, email]);

  // Fetch rows for TABLE — only when a school is selected in school mode
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!email) return;
      if (mode === "school" && !school) {
        // guard until school chosen
        setTableRows([]);
        return;
      }
      try {
        setTableLoading(true);
        setTableErr("");
        const { rows, error } = await getEntries({ created_by: email });
        if (cancelled) return;
        if (error) {
          setTableErr(error.message || String(error));
          setTableRows([]);
          return;
        }
        const filtered = (rows || []).filter((r) => {
          if (mode !== "school") return true;
          return (
            r.facility === facility &&
            r.clinic_name === center &&
            r.school_name === school
          );
        });
        setTableRows(filtered); // already ordered by updated_at DESC by API
      } catch (e) {
        if (!cancelled) {
          setTableErr(String(e));
          setTableRows([]);
        }
      } finally {
        if (!cancelled) setTableLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [email, facility, center, school, mode]);

  // ===== Derived values from the table (سجلات هذه المدرسة) =====
  const lastEntry = useMemo(
    () => ((tableRows && tableRows.length > 0) ? tableRows[0] : null),
    [tableRows]
  );
  const lastEntryVaccinated = useMemo(
    () => (lastEntry ? (Number(lastEntry.vaccinated) || 0) : 0),
    [lastEntry]
  );
  const cumulativeVaccinated = useMemo(
    () => (tableRows || []).reduce((sum, r) => sum + (Number(r.vaccinated) || 0), 0),
    [tableRows]
  );
  const schoolTotalFixed = Number(fixed.schoolTotal) || 0;
  const remainingFromSchoolTotal = Math.max(0, schoolTotalFixed - cumulativeVaccinated);
  const willExceedTotal = schoolTotalFixed > 0 && cumulativeVaccinated > schoolTotalFixed;
  const lastEntryTime = lastEntry
    ? fmtKsaTimeOnly(lastEntry.updated_at || lastEntry.created_at)
    : "—";

  function askPreview(e) {
    e.preventDefault();

    if (mode === "place") {
      const v = numberOrNull(vaccinated);
      if (!place || v === null) {
        setStatus({ type: "error", msg: "اختر المكان وأدخل عدد المطعّمين" });
        return;
      }
      const data = {
        mode,
        date: todayStr(),
        email,
        facility,
        place,
        vaccinated: v,
        refused: 0,
        absent: 0,
        unvaccinated: 0,
        sex: null,
        authority: null,
        stage: null,
        schoolTotal: 0,
      };
      setStatus({ type: "idle", msg: "" });
      setPreview(data);
      log("previewData (place)", data);
      return;
    }

    const v = numberOrNull(vaccinated);
    const r = numberOrNull(refused);
    const a = numberOrNull(absent);
    if (v === null || r === null || a === null || !center || !school) {
      setStatus({ type: "error", msg: "تأكد من تعبئة الحقول بشكل صحيح" });
      return;
    }
    const total = Number(fixed.schoolTotal) || 0;
    const wouldBeVaccinated = (todaySoFar.vaccinated || 0) + v;
    const wouldExceed = total > 0 && wouldBeVaccinated > total;

    const data = {
      mode,
      date: todayStr(),
      email,
      facility,
      center,
      school,
      vaccinated: v,
      refused: r,
      absent: a,
      unvaccinated: r + a,
      sex: fixed.sex,
      authority: fixed.authority,
      stage: fixed.stage,
      schoolTotal: total,
      _warnExceed: wouldExceed,
      _wouldBeVaccinated: wouldBeVaccinated,
      _todaySoFar: todaySoFar.vaccinated || 0,
    };
    setStatus({ type: "idle", msg: "" });
    setPreview(data);
    log("previewData (school)", data);
  }

  async function saveToAPI(p) {
    const isPlace = p.mode === "place";
    const input = {
      entry_date: p.date,
      facility: p.facility,
      created_by: email || p.email || null,

      clinic_name: isPlace ? "اخرى" : p.center,
      school_name: isPlace ? p.place : p.school,

      gender: isPlace ? null : p.sex || null,
      authority: isPlace ? null : p.authority || null,
      stage: isPlace ? null : p.stage || null,

      vaccinated: Number(p.vaccinated) || 0,
      refused: isPlace ? 0 : Number(p.refused) || 0,
      absent: isPlace ? 0 : Number(p.absent) || 0,
      not_accounted: isPlace ? 0 : Number(p.unvaccinated) || 0,
      school_total: isPlace ? 0 : Number(p.schoolTotal) || 0,
    };

    log("submitDailyEntry payload ->", input);
    const res = await submitDailyEntry(input);
    if (res?.error) throw new Error(res.error.message || "فشل حفظ السجل");
    return res.data ?? res;
  }

  async function confirmSave() {
    if (!preview) return;
    try {
      setStatus({ type: "saving", msg: "جارٍ الحفظ…" });
      const saver = onSubmit || saveToAPI;
      const result = await saver(preview);
      log("save result ->", result);

      const t = fmtKsaTimeOnly(result?.updated_at || result?.created_at);
      setLastUpdatedTime(t);

      setVaccinated("");
      setRefused("");
      setAbsent("");
      setPlace("");
      setPreview(null);
      setStatus({ type: "ok", msg: "تم الحفظ بنجاح" });

      if (mode === "school" && center && school) {
        const { data } = await fetchSchoolDayTotals({
          created_by: email,
          facility,
          clinic_name: center,
          school_name: school,
          entry_date: todayStr(),
        });
        if (data) {
          setTodaySoFar({ ...data, loading: false, error: "" });
          setLastUpdatedTime(fmtKsaTimeOnly(data.lastUpdated));
        }
      }

      // Refresh table if visible
      if (mode === "school" && school) {
        const { rows, error } = await getEntries({ created_by: email });
        if (!error && Array.isArray(rows)) {
          const filtered = rows.filter(
            (r) =>
              r.facility === facility &&
              r.clinic_name === center &&
              r.school_name === school
          );
          setTableRows(filtered);
        }
      }
    } catch (e) {
      const raw = e?.message || String(e);
      console.error("Save failed:", e);
      setStatus({ type: "error", msg: raw });
    }
  }

  const isSaving = status.type === "saving";

  return (
    <form onSubmit={askPreview} className="hpv-form space-y-5">
      {brandStyles}
      <Card>
        <div className="flex flex-wrap items-center gap-3">
          <div className="hpv-section-title">
            <span className="dot" />
            <span>بيانات الإدخال</span>
          </div>
        </div>
      </Card>

      {/* Mode selection */}
      <Card>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex flex-col md:col-span-3">
            <label className="hpv-label">نوع الإدخال</label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setMode("school")}
                className={`hpv-btn-ghost ${
                  mode === "school" ? "ring-2 ring-sky-300" : ""
                }`}
              >
                مطعمين داخل المدارس
              </button>
              <button
                type="button"
                onClick={() => setMode("place")}
                className={`hpv-btn-ghost ${
                  mode === "place" ? "ring-2 ring-sky-300" : ""
                }`}
              >
                أماكن أخرى
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* ======= SCHOOL MODE ======= */}
      {mode === "school" && (
        <>
          <Card>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="hpv-label">المنشأة الصحية</label>
                <input
                  value={facility}
                  disabled
                  className="hpv-input bg-gray-100"
                />
                <span className="hpv-help mt-1">
                  يتم تحديدها تلقائيًا حسب صلاحياتك.
                </span>
              </div>
              <div className="flex flex-col">
                <label className="hpv-label">اسم المركز الصحي</label>
                <select
                  value={center}
                  onChange={(e) => setCenter(e.target.value)}
                  className="hpv-select"
                >
                  {centers.length === 0 && (
                    <option value="">— لا توجد مراكز —</option>
                  )}
                  {centers.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="hpv-label">اسم المدرسة</label>
                <select
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="hpv-select"
                >
                  {schools.length === 0 && (
                    <option value="">— لا توجد مدارس لهذا المركز —</option>
                  )}
                  {schools.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>

          <Card
            title="الحقول الثابتة"
            subtitle="تُعرض للمرجع ولا يمكن تعديلها هنا."
          >
            <div className="grid md:grid-cols-4 gap-3 text-sm">
              <div className="flex flex-col">
                <label className="hpv-label">الجنس</label>
                <input
                  disabled
                  className="hpv-input bg-gray-100"
                  value={fixed.sex || "غير محدد"}
                />
              </div>
              <div className="flex flex-col">
                <label className="hpv-label">السلطة</label>
                <input
                  disabled
                  className="hpv-input bg-gray-100"
                  value={fixed.authority || "غير محدد"}
                />
              </div>
              <div className="flex flex-col">
                <label className="hpv-label">المرحلة</label>
                <input
                  disabled
                  className="hpv-input bg-gray-100"
                  value={fixed.stage || "غير محدد"}
                />
              </div>
              <div className="flex flex-col">
                <label className="hpv-label">إجمالي المدرسة</label>
                <input
                  disabled
                  className="hpv-input bg-gray-100"
                  value={fixed.schoolTotal || 0}
                />
              </div>
            </div>
          </Card>

          {/* ===== Calculations from the table ===== */}
          <Card>
            <div className="grid md:grid-cols-5 gap-4 text-sm">
              <div className="flex flex-col">
                <label className="hpv-label">آخر إدخال اليوم</label>
                <input
                  disabled
                  className="hpv-input bg-gray-100"
                  value={tableLoading ? "…" : lastEntryVaccinated}
                />
                {/* اختياري: */}
                {/* <span className="hpv-help mt-1">آخر تحديث: {lastEntryTime}</span> */}
              </div>
              <div className="flex flex-col">
                <label className="hpv-label">عدد المطعمين تراكمياً</label>
                <input
                  disabled
                  className="hpv-input bg-gray-100"
                  value={tableLoading ? "…" : cumulativeVaccinated}
                />
              </div>
              <div className="flex flex-col">
                <label className="hpv-label">المتبقي من إجمالي المدرسة</label>
                <input
                  disabled
                  className="hpv-input bg-gray-100"
                  value={tableLoading ? "…" : remainingFromSchoolTotal}
                />
              </div>

              <div className="flex flex-col justify-end">
                {willExceedTotal ? (
                  <Badge tone="warn">
                    تنبيه: التراكمي تجاوز إجمالي المدرسة
                  </Badge>
                ) : (
                  <Badge tone="ok">الحسابات من سجلات هذه المدرسة</Badge>
                )}
              </div>
            </div>
          </Card>

          {/* numbers */}
          <Card>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <label className="hpv-label">عدد المطعّمين</label>
                <input
                  type="number"
                  min="0"
                  value={vaccinated}
                  onChange={(e) => setVaccinated(e.target.value)}
                  className="hpv-input"
                  inputMode="numeric"
                />
              </div>
              <div className="flex flex-col">
                <label className="hpv-label">عدد الرفض</label>
                <input
                  type="number"
                  min="0"
                  value={refused}
                  onChange={(e) => setRefused(e.target.value)}
                  className="hpv-input"
                  inputMode="numeric"
                />
              </div>
              <div className="flex flex-col">
                <label className="hpv-label">عدد الغياب</label>
                <input
                  type="number"
                  min="0"
                  value={absent}
                  onChange={(e) => setAbsent(e.target.value)}
                  className="hpv-input"
                  inputMode="numeric"
                />
              </div>
              <div className="flex flex-col">
                <label className="hpv-label">غير مطعّم (محسوب)</label>
                <input
                  value={unvaccinated}
                  disabled
                  className="hpv-input bg-gray-100"
                />
              </div>
            </div>
            <div className="mt-3">
              <Badge tone="warn">تذكير: غير مطعّم = رفض + غياب</Badge>
            </div>
          </Card>

          {/* ===== TABLE: only show when a school is selected ===== */}
          {school && (
            <Card
              title={
                <div className="flex items-center gap-3">
                  <i className="fas fa-school text-sky-600 text-lg"></i>

                  {/* النص الرئيسي */}
                  <span className="font-extrabold text-lg text-black">
                    سجلات هذه المدرسة
                  </span>

                  {/* اسم المدرسة باللون الأزرق */}
                  {school && (
                    <span className="text-sky-700 font-bold text-lg">
                      {school}
                    </span>
                  )}

                  {/* Badge يوضح عدد السجلات */}
                  {school && (
                    <span className="ml-auto bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                      {tableRows.length} سجل
                    </span>
                  )}
                </div>
              }
              subtitle="جميع السجلات الخاصة بهذه المدرسة، مرتبة من الأحدث إلى الأقدم"
            >
              {tableErr && (
                <div className="text-red-600 mb-2">خطأ: {tableErr}</div>
              )}
              <div className="overflow-auto border border-gray-200 rounded-xl">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 text-right">التاريخ</th>
                      <th className="p-2 text-right">المركز</th>
                      <th className="p-2 text-right">المدرسة</th>
                      <th className="p-2 text-right">مطعّم</th>
                      <th className="p-2 text-right">رفض</th>
                      <th className="p-2 text-right">غياب</th>
                      <th className="p-2 text-right">غير مطعّم</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableLoading ? (
                      <tr>
                        <td
                          className="p-4 text-center text-gray-500"
                          colSpan={8}
                        >
                          جاري التحميل…
                        </td>
                      </tr>
                    ) : tableRows.length === 0 ? (
                      <tr>
                        <td
                          className="p-4 text-center text-gray-500"
                          colSpan={8}
                        >
                          لا توجد سجلات.
                        </td>
                      </tr>
                    ) : (
                      tableRows.map((r) => (
                        <tr
                          key={
                            r.id ||
                            `${r.created_by}-${r.entry_date}-${r.school_name}-${r.updated_at}`
                          }
                        >
                          <td className="p-2 border-t">{r.entry_date}</td>
                          <td className="p-2 border-t">{r.clinic_name}</td>
                          <td className="p-2 border-t">{r.school_name}</td>
                          <td className="p-2 border-t">{r.vaccinated}</td>
                          <td className="p-2 border-t">{r.refused}</td>
                          <td className="p-2 border-t">{r.absent}</td>
                          <td className="p-2 border-t">{r.not_accounted}</td>
                          <td className="p-2 border-t"></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </>
      )}

      {/* ======= PLACE MODE ======= */}
      {mode === "place" && (
        <>
          <Card>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="hpv-label">المنشأة الصحية</label>
                <input
                  value={facility || "—"}
                  disabled
                  className="hpv-input bg-gray-100"
                />
                <span className="hpv-help mt-1"></span>
              </div>
              <div className="flex flex-col">
                <label className="hpv-label">المكان</label>
                <select
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  className="hpv-select"
                >
                  <option value="">— اختر المكان —</option>
                  {PLACE_OPTIONS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>

          <Card>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="hpv-label">عدد المطعّمين</label>
                <input
                  type="number"
                  min="0"
                  value={vaccinated}
                  onChange={(e) => setVaccinated(e.target.value)}
                  className="hpv-input"
                  inputMode="numeric"
                />
              </div>
            </div>
          </Card>
        </>
      )}

      {/* actions */}
      <div className="flex flex-wrap gap-2 items-center">
        <button type="submit" className="hpv-btn-primary" disabled={isSaving}>
          مراجعة
        </button>
        {status.type === "ok" && (
          <span className="text-green-600 text-sm">{status.msg}</span>
        )}
        {status.type === "error" && (
          <span className="text-red-600 text-sm">{status.msg}</span>
        )}
        {isSaving && <span className="text-gray-500 text-sm">جارٍ الحفظ…</span>}
      </div>

      {/* modal */}
      <Modal
        open={!!preview}
        onClose={() => setPreview(null)}
        title="تأكيد الإرسال"
        actions={
          <>
            <button
              onClick={confirmSave}
              type="button"
              className="hpv-btn-primary"
              disabled={isSaving}
            >
              إرسال
            </button>
            <button
              onClick={() => setPreview(null)}
              type="button"
              className="hpv-btn-ghost"
              disabled={isSaving}
            >
              تعديل
            </button>
          </>
        }
      >
        {preview && (
          <>
            {preview.mode === "place" ? (
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div>
                  <b>التاريخ:</b> {preview.date}
                </div>
                <div>
                  <b>المنشأة:</b> {preview.facility}
                </div>
                <div>
                  <b>المكان:</b> {preview.place}
                </div>
                <div>
                  <b>مطعّم:</b> {preview.vaccinated}
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div>
                  <b>التاريخ:</b> {preview.date}
                </div>
                <div>
                  <b>المنشأة:</b> {preview.facility}
                </div>
                <div>
                  <b>المركز:</b> {preview.center}
                </div>
                <div>
                  <b>المدرسة:</b> {preview.school}
                </div>
                <div>
                  <b>مطعّم (سيصبح):</b> {preview._wouldBeVaccinated}
                </div>
                <div>
                  <b>آخر إدخال اليوم:</b> {preview._todaySoFar}
                </div>
                <div>
                  <b>رفض:</b> {preview.refused}
                </div>
                <div>
                  <b>غياب:</b> {preview.absent}
                </div>
                <div>
                  <b>غير مطعّم:</b> {preview.unvaccinated}
                </div>
                <div>
                  <b>الجنس:</b> {preview.sex || "—"}
                </div>
                <div>
                  <b>السلطة:</b> {preview.authority || "—"}
                </div>
                <div>
                  <b>المرحلة:</b> {preview.stage || "—"}
                </div>
                <div>
                  <b>العدد الإجمالي للمدرسة:</b> {preview.schoolTotal || 0}
                </div>
              </div>
            )}
          </>
        )}
      </Modal>
    </form>
  );
}
