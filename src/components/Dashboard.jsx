// Vaccination Admin Dashboard (Arabic RTL) — Charts + Exact Table
// ---------------------------------------------------------------
// ENV (Vite):
//   VITE_SUPABASE_URL=...
//   VITE_SUPABASE_ANON_KEY=...
// Table "daily_entries" expected columns (at least):
//   entry_date (YYYY-MM-DD), facility, clinic_name, school_name,
//   vaccinated, refused, absent, not_accounted, school_total (optional)

import React, { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Bar, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import * as XLSX from "xlsx";

// --- Supabase client ---
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// --- helpers ---
const uniq = (arr) => Array.from(new Set(arr.filter((x) => x !== null && x !== undefined)));
const safeDiv = (a, b) => (b ? a / b : 0);
const isOther = (s) =>
  !s || ["other", "أخرى", "-", "أخري", "other ", "Other"].includes(String(s).trim().toLowerCase());

const groupSum = (rows, key) => {
  const map = new Map();
  rows.forEach((r) => {
    const k = r[key] || "—";
    const o =
      map.get(k) || {
        vaccinated: 0,
        refused: 0,
        absent: 0,
        not_accounted: 0,
        school_total: 0,
      };
    o.vaccinated += r.vaccinated ?? 0;
    o.refused += r.refused ?? 0;
    o.absent += r.absent ?? 0;
    o.not_accounted += r.not_accounted ?? 0;
    o.school_total += r.school_total ?? 0;
    map.set(k, o);
  });
  return Array.from(map, ([name, vals]) => ({ name, ...vals }));
};

const schoolsAgg = (rows) => {
  const map = new Map();
  rows.forEach((r) => {
    const s = r.school_name || "";
    if (isOther(s)) return;
    const o = map.get(s) || { v: 0, r: 0, a: 0, n: 0, tot: 0 };
    o.v += r.vaccinated ?? 0;
    o.r += r.refused ?? 0;
    o.a += r.absent ?? 0;
    o.n += r.not_accounted ?? 0;
    // if there are multiple entries per school, take the max declared total
    o.tot = Math.max(o.tot, r.school_total ?? 0);
    map.set(s, o);
  });
  return Array.from(map, ([school, o]) => ({
    school,
    ...o,
    covered: o.v === o.tot && o.r === 0 && o.a === 0,
    coverage: safeDiv(o.v, o.tot),
  }));
};

export default function VaccinationAdminDashboardAR() {
  // top filters (cascading)
  const [facility, setFacility] = useState("All");
  const [clinic, setClinic] = useState("All");
  const [school, setSchool] = useState("All");

  // table extra filters
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [q, setQ] = useState("");

  // pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // data
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // fetch once
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("daily_entries")
          .select(
            "entry_date, facility, clinic_name, school_name, vaccinated, refused, absent, not_accounted, school_total"
          )
          .limit(100000);
        if (error) throw error;
        setRows(data || []);
      } catch (e) {
        setError(e.message || String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // top filter options
  const facilities = useMemo(() => uniq(rows.map((r) => r.facility)).sort(), [rows]);

  const clinicsForFacility = useMemo(() => {
    const base = facility === "All" ? rows : rows.filter((r) => r.facility === facility);
    return uniq(base.map((r) => r.clinic_name)).sort();
  }, [rows, facility]);

  const schoolsForSelection = useMemo(() => {
    let base = rows;
    if (facility !== "All") base = base.filter((r) => r.facility === facility);
    if (clinic !== "All") base = base.filter((r) => r.clinic_name === clinic);
    return uniq(base.map((r) => r.school_name)).sort();
  }, [rows, facility, clinic]);

  // keep cascading selections valid
  useEffect(() => {
    setClinic((prev) => (prev === "All" || clinicsForFacility.includes(prev) ? prev : "All"));
    setSchool("All");
  }, [facility, clinicsForFacility]);
  useEffect(() => {
    setSchool((prev) => (prev === "All" || schoolsForSelection.includes(prev) ? prev : "All"));
  }, [clinic, schoolsForSelection]);

  // apply top filters
  const filteredTop = useMemo(() => {
    return rows.filter(
      (r) =>
        (facility === "All" || r.facility === facility) &&
        (clinic === "All" || r.clinic_name === clinic) &&
        (school === "All" || r.school_name === school)
    );
  }, [rows, facility, clinic, school]);

  // apply date-range + search (used by both charts and table so they match)
  const filtered = useMemo(() => {
    const inRange = (d, f, t) => (!f || d >= f) && (!t || d <= t);
    const qLower = q.trim().toLowerCase();
    return filteredTop.filter((r) => {
      const dateIso = r.entry_date || "";
      const dateOk = inRange(dateIso, fromDate, toDate);
      const text = `${r.clinic_name || ""} ${r.school_name || ""}`.toLowerCase();
      const searchOk = !qLower || text.includes(qLower);
      return dateOk && searchOk;
    });
  }, [filteredTop, fromDate, toDate, q]);

  // KPIs
  const totals = useMemo(
    () =>
      filtered.reduce(
        (a, c) => ({
          v: a.v + (c.vaccinated || 0),
          r: a.r + (c.refused || 0),
          a: a.a + (c.absent || 0),
          n: a.n + (c.not_accounted || 0),
          t: a.t + (c.school_total || 0),
        }),
        { v: 0, r: 0, a: 0, n: 0, t: 0 }
      ),
    [filtered]
  );
  const denom = totals.v + totals.r + totals.a + totals.n;

  const kpis = useMemo(
    () => ({
      total_vaccinated: totals.v,
      coverage_pct: safeDiv(totals.v, totals.t) * 100,
      refused_pct: safeDiv(totals.r, denom) * 100,
      absent_pct: safeDiv(totals.a, denom) * 100,
      not_accounted_pct: safeDiv(totals.n, denom) * 100,
      visited_schools: new Set(filtered.map((r) => r.school_name).filter((s) => !isOther(s))).size,
      fully_covered_schools: schoolsAgg(filtered).filter((s) => s.covered).length,
      facilities: new Set(filtered.map((r) => r.facility)).size,
      clinics: new Set(filtered.map((r) => r.clinic_name)).size,
    }),
    [filtered, totals, denom]
  );

  // dynamic primary chart
  const primaryMode = clinic !== "All" ? "school" : facility !== "All" ? "clinic" : "facility";
  const primaryTitle =
    primaryMode === "facility"
      ? "نسبة التغطية حسب المنشأة"
      : primaryMode === "clinic"
      ? `نسبة التغطية حسب المركز${facility !== "All" ? ` (المنشأة: ${facility})` : ""}`
      : `نسبة التغطية حسب المدرسة${clinic !== "All" ? ` (المركز: ${clinic})` : ""}`;

  const byPrimary = useMemo(() => {
    if (primaryMode === "facility") {
      return groupSum(filtered, "facility")
        .map((x) => ({ ...x, coverage: safeDiv(x.vaccinated, x.school_total) }))
        .sort((a, b) => b.coverage - a.coverage);
    }
    if (primaryMode === "clinic") {
      return groupSum(filtered, "clinic_name")
        .map((x) => ({ ...x, coverage: safeDiv(x.vaccinated, x.school_total) }))
        .sort((a, b) => b.coverage - a.coverage);
    }
    const items = schoolsAgg(filtered).map((s) => ({
      name: s.school,
      vaccinated: s.v,
      school_total: s.tot,
      coverage: safeDiv(s.v, s.tot),
    }));
    return items.sort((a, b) => b.coverage - a.coverage).slice(0, 20);
  }, [filtered, primaryMode]);

  const primaryData = useMemo(
    () => ({
      labels: byPrimary.map((x) => x.name || "—"),
      datasets: [{ label: "نسبة التغطية %", data: byPrimary.map((x) => Math.round((x.coverage || 0) * 100)) }],
    }),
    [byPrimary]
  );
  const primaryOpts = {
    indexAxis: "y",
    plugins: { title: { display: true, text: primaryTitle } },
    maintainAspectRatio: false,
    scales: { x: { ticks: { callback: (v) => `${v}%` }, suggestedMax: 100 } },
  };

  // other charts
  const byFacility = useMemo(() => {
    return groupSum(filtered, "facility")
      .map((x) => ({ ...x, coverage: safeDiv(x.vaccinated, x.school_total) }))
      .sort((a, b) => b.coverage - a.coverage);
  }, [filtered]);

  const stackedData = useMemo(
    () => ({
      labels: byFacility.map((x) => x.name),
      datasets: [
        { label: "مطعم", data: byFacility.map((x) => x.vaccinated), type: "bar", stack: "tot" },
        { label: "رفض", data: byFacility.map((x) => x.refused), type: "bar", stack: "tot" },
        { label: "غياب", data: byFacility.map((x) => x.absent), type: "bar", stack: "tot" },
        { label: "غير محسوب", data: byFacility.map((x) => x.not_accounted), type: "bar", stack: "tot" },
      ],
    }),
    [byFacility]
  );
  const stackedOpts = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { x: { stacked: true }, y: { stacked: true } },
    plugins: { title: { display: true, text: "الحالات حسب المنشأة (تجميعي)" } },
  };

  const byClinicTop = useMemo(() => {
    return groupSum(filtered, "clinic_name").sort((a, b) => b.vaccinated - a.vaccinated).slice(0, 10);
  }, [filtered]);
  const clinicData = useMemo(
    () => ({
      labels: byClinicTop.map((x) => x.name || "—"),
      datasets: [{ label: "مطعم", data: byClinicTop.map((x) => x.vaccinated) }],
    }),
    [byClinicTop]
  );
  const clinicOpts = {
    plugins: { title: { display: true, text: "أعلى 10 مراكز بالتطعيم" } },
    maintainAspectRatio: false,
  };

  const bottomConfig = useMemo(() => {
    const list = schoolsAgg(filtered).filter((s) => s.tot > 0);
    const hasAnyCoverage = list.some((s) => s.coverage > 0 || s.v + s.r + s.a + s.n > 0);
    if (!hasAnyCoverage || list.length === 0) {
      const topVacc = schoolsAgg(filtered)
        .filter((s) => s.v > 0)
        .sort((a, b) => b.v - a.v)
        .slice(0, 10);
      return {
        title: "أعلى 10 مدارس حسب عدد المطعمين (بديل)",
        labels: topVacc.map((s) => s.school),
        values: topVacc.map((s) => s.v),
        isFallback: true,
      };
    }
    const bottom = list.sort((a, b) => a.coverage - b.coverage).slice(0, 10);
    return {
      title: "أقل 10 مدارس في نسبة التغطية",
      labels: bottom.map((s) => s.school),
      values: bottom.map((s) => Math.round((s.coverage || 0) * 100)),
      isFallback: false,
    };
  }, [filtered]);

  const bottomData = useMemo(
    () => ({
      labels: bottomConfig.labels,
      datasets: [
        {
          label: bottomConfig.isFallback ? "مطعم" : "نسبة التغطية %",
          data: bottomConfig.values,
        },
      ],
    }),
    [bottomConfig]
  );
  const bottomOpts = {
    indexAxis: "y",
    plugins: { title: { display: true, text: bottomConfig.title } },
    maintainAspectRatio: false,
    scales: bottomConfig.isFallback
      ? { x: { ticks: {} } }
      : { x: { ticks: { callback: (v) => `${v}%` }, suggestedMax: 100 } },
  };

  const statusData = useMemo(
    () => ({
      labels: ["مطعم", "رفض", "غياب", "غير محسوب"],
      datasets: [{ data: [totals.v, totals.r, totals.a, totals.n], borderWidth: 0 }],
    }),
    [totals]
  );
  const statusOpts = {
    plugins: { title: { display: true, text: "توزيع الحالات الإجمالي" } },
    maintainAspectRatio: false,
    cutout: "60%",
  };

  // ---------- table derivations ----------
  const tableRowsAR = useMemo(() => {
    return filtered.map((r) => ({
      entry_date: r.entry_date || "",
            facility: r.facility || "",        // NEW
      clinic_name: r.clinic_name || "",
      school_name: r.school_name || "",
      vaccinated: r.vaccinated ?? 0,
      refused: r.refused ?? 0,
      absent: r.absent ?? 0,
      not_accounted: r.not_accounted ?? 0,
    }));
  }, [filtered]);

  const totalPages = Math.max(1, Math.ceil(tableRowsAR.length / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const pageStart = (pageSafe - 1) * pageSize;
  const pageSliceAR = tableRowsAR.slice(pageStart, pageStart + pageSize);

  useEffect(() => {
    setPage(1);
  }, [facility, clinic, school, fromDate, toDate, q, pageSize]);

  // export (filtered)
  function exportExcel(rowsToExport, filename = "vaccination_records_filtered.xlsx") {
    const headersMap = {
      entry_date: "التاريخ",
        facility: "المنشأة",          // NEW

      clinic_name: "المركز",
      school_name: "المكان",
      vaccinated: "مطعم",
      refused: "رفض",
      absent: "غياب",
      not_accounted: "غير مطعم",
    };
    const data = rowsToExport.map((r) => {
      const out = {};
      Object.entries(headersMap).forEach(([k, lbl]) => (out[lbl] = r[k]));
      return out;
    });
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "سجلات");
    XLSX.writeFile(wb, filename);
  }

  // --- UI ---
  return (
    <div dir="rtl" className="min-h-screen w-full bg-[#F5F7FB] text-slate-900 p-4">
      {/* Filters row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm">
          <span className="text-emerald-600 text-xl">▣</span>
          <span className="font-semibold">لوحة متابعة التطعيم</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Facility */}
          <label className="flex items-center gap-2 text-slate-700 text-xs">
            <span className="opacity-80 w-20 truncate">المنشأة</span>
            <select
              className="bg-white border border-slate-300 rounded-xl px-2 py-1 text-xs min-w-[160px]"
              value={facility}
              onChange={(e) => {
                setFacility(e.target.value);
                setClinic("All");
                setSchool("All");
              }}
            >
              <option value="All">الكل</option>
              {facilities.map((o) => (
                <option key={o || "—"} value={o}>
                  {o || "—"}
                </option>
              ))}
            </select>
          </label>

          {/* Clinic */}
          <label className="flex items-center gap-2 text-slate-700 text-xs">
            <span className="opacity-80 w-20 truncate">المركز</span>
            <select
              className="bg-white border border-slate-300 rounded-xl px-2 py-1 text-xs min-w-[160px]"
              value={clinic}
              onChange={(e) => {
                setClinic(e.target.value);
                setSchool("All");
              }}
            >
              <option value="All">الكل</option>
              {clinicsForFacility.map((o) => (
                <option key={o || "—"} value={o}>
                  {o || "—"}
                </option>
              ))}
            </select>
          </label>

          {/* School */}
          <label className="flex items-center gap-2 text-slate-700 text-xs">
            <span className="opacity-80 w-20 truncate">المدرسة</span>
            <select
              className="bg-white border border-slate-300 rounded-xl px-2 py-1 text-xs min-w-[160px]"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            >
              <option value="All">الكل</option>
              {schoolsForSelection.map((o) => (
                <option key={o || "—"} value={o}>
                  {o || "—"}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {loading && <div className="mt-6 text-sm text-slate-600">جاري تحميل البيانات…</div>}
      {error && <div className="mt-6 text-sm text-rose-700">خطأ: {error}</div>}

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mt-4">
        <KPI icon="🏫" label="مدارس تمت زيارتها" value={kpis.visited_schools} />
        <KPI icon="❔" label="% غير محسوب" value={Math.round(kpis.not_accounted_pct)} />
        <KPI icon="⏳" label="% غياب" value={Math.round(kpis.absent_pct)} />
        <KPI icon="🧍" label="% رفض" value={Math.round(kpis.refused_pct)} />
        <KPI icon="🎯" label="% التغطية" value={Math.round(kpis.coverage_pct)} />
        <KPI icon="💉" label="إجمالي المطعمين" value={kpis.total_vaccinated} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
        <div className="lg:col-span-7 bg-white rounded-xl p-4 h-[260px] border">
          <Bar data={primaryData} options={primaryOpts} />
        </div>
        <div className="lg:col-span-5 bg-white rounded-xl p-4 h-[260px] border">
          <Doughnut data={statusData} options={statusOpts} />
        </div>
        <div className="lg:col-span-12 bg-white rounded-xl p-4 h-[320px] border">
          <Bar data={stackedData} options={stackedOpts} />
        </div>
        <div className="lg:col-span-6 bg-white rounded-xl p-4 h-[280px] border">
          <Bar data={clinicData} options={clinicOpts} />
        </div>
        <div className="lg:col-span-6 bg-white rounded-xl p-4 h-[280px] border">
          <Bar data={bottomData} options={bottomOpts} />
        </div>
      </div>

      {/* ===== Redesigned Arabic Table (exact style) ===== */}
      <div className="mt-6 bg-white border rounded-2xl shadow-sm">
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center justify-between p-4">
          <div className="font-extrabold text-slate-800">
            سجلاي{" "}
            <span className="text-slate-500 font-medium text-sm">
              {tableRowsAR.length} سجل
            </span>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-2">
              <span className="text-slate-700">من</span>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border border-slate-300 rounded-xl px-3 py-2 text-sm w-[180px]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-700">إلى</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border border-slate-300 rounded-xl px-3 py-2 text-sm w-[180px]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-700">بحث</span>
              <input
                type="text"
                placeholder="ابحث في المركز/المدرسة"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="border border-slate-300 rounded-xl px-3 py-2 text-sm w-64"
              />
            </div>

            <button
              onClick={() => {
                setFromDate("");
                setToDate("");
                setQ("");
              }}
              className="rounded-full px-5 py-2 text-sm bg-slate-100 text-slate-800 hover:bg-slate-200"
            >
              تصفية البحث
            </button>

            <button
              onClick={() => exportExcel(tableRowsAR)}
              className="rounded-full px-6 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
            >
              تصدير إلى Excel
            </button>

            {/* Optional: page size selector (kept minimal to match screenshot) */}
            <select
              className="border border-slate-300 rounded-xl px-2 py-2 text-sm"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 20, 50, 100].map((n) => (
                <option key={n} value={n}>
                  {n}/صفحة
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto">
          <table className="min-w-full text-sm text-right">
            <thead className="sticky top-0 bg-slate-50 text-slate-700 border-y">
              <tr className="whitespace-nowrap">
                <th className="px-4 py-3">التاريخ</th>
                <th className="px-4 py-3">المنشأة</th>   {/* NEW */}
                <th className="px-4 py-3">المركز</th>
                <th className="px-4 py-3">المكان</th>
                <th className="px-4 py-3">مطعم</th>
                <th className="px-4 py-3">رفض</th>
                <th className="px-4 py-3">غياب</th>
                <th className="px-4 py-3">غير مطعم</th>
              </tr>
            </thead>
            <tbody>
              {pageSliceAR.map((r, idx) => (
                <tr key={idx} className="border-b last:border-b-0">
                  <td className="px-4 py-3">{r.entry_date || "—"}</td>
                        <td className="px-4 py-3">{r.facility}</td>             {/* NEW */}

                  <td className="px-4 py-3">{r.clinic_name}</td>
                  <td className="px-4 py-3">{r.school_name}</td>
                  <td className="px-4 py-3">{r.vaccinated}</td>
                  <td className="px-4 py-3">{r.refused}</td>
                  <td className="px-4 py-3">{r.absent}</td>
                  <td className="px-4 py-3">{r.not_accounted}</td>
                </tr>
              ))}
              {pageSliceAR.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-center text-slate-500" colSpan={7}>
                    لا توجد سجلات مطابقة للبحث الحالي
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 text-sm text-slate-700">
          <div>
            عرض <b>{pageStart + 1}</b>–<b>{Math.min(pageStart + pageSize, tableRowsAR.length)}</b>{" "}
            من <b>{tableRowsAR.length}</b>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={pageSafe === 1}
              className="px-3 py-1.5 rounded-xl border border-slate-300 disabled:opacity-40"
            >
              السابق
            </button>
            <span className="px-2 py-1.5">صفحة {pageSafe} / {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={pageSafe === totalPages}
              className="px-3 py-1.5 rounded-xl border border-slate-300 disabled:opacity-40"
            >
              التالي
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// small KPI card (Arabic)
function KPI({ icon, label, value }) {
  return (
    <div className="bg-white rounded-lg px-3 py-3 flex flex-col items-center justify-center text-center gap-1 shadow-sm border border-slate-200 h-[92px]">
      <div className="text-2xl leading-none">{icon}</div>
      <div className="text-[11px] text-slate-500">{label}</div>
      <div className="text-4xl font-extrabold tracking-tight text-slate-900">
        {Number.isFinite(value) ? value : "—"}
      </div>
    </div>
  );
}
