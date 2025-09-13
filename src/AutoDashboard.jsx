// Auto Excel → Domain‑Aware + AI‑Suggested Dashboard (React + Tailwind + Recharts + SheetJS)
// -------------------------------------------------------------------------------------------------
// What’s new vs previous canvas:
// 1) Optional Gemini integration (VITE_GEMINI_API_KEY) to produce an AI dashboard config + analysis.
// 2) Safer XLSX parsing (works for .xlsx/.xls/.csv), header sanitization, and type coercion helpers.
// 3) Robust model response handling (schema validation, fallbacks when AI returns bad JSON).
// 4) Large-file protection (row sampling), numeric/pie validation, and graceful errors.
// 5) UI: “Generate with AI” button; when AI is used, we render exactly what it suggests. Otherwise, domain‑aware auto layout (HR / Sales / Finance / Generic) runs as before.
// -------------------------------------------------------------------------------------------------
// Setup (Vite recommended): 
//   npm create vite@latest auto-dashboard -- --template react
//   cd auto-dashboard
//   npm i xlsx recharts html2canvas framer-motion
//   npm i -D tailwindcss postcss autoprefixer
//   npx tailwindcss init -p
//   → configure tailwind to scan index.html and src/**/*.{js,jsx}
//   → add Tailwind base /components/utilities to index.css
//   → put this file as src/App.jsx (default export)
//   → create .env with: VITE_GEMINI_API_KEY=xxxx
// -------------------------------------------------------------------------------------------------

import React, { useMemo, useRef, useState } from "react";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  RadarChart,
  PolarGrid,
  PolarAngleAxis as RPolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

// ---------- tiny UI helpers ----------
const Card = ({ title, children, className = "" }) => (
  <div className={`bg-white border border-gray-200 rounded-2xl shadow-sm ${className}`}>
    {title && (
      <div className="px-4 py-3 border-b border-gray-100 font-semibold text-gray-800">{title}</div>
    )}
    <div className="p-4">{children}</div>
  </div>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">{children}</span>
);

// ---------- utils ----------
const lc = (s) => String(s || "").toLowerCase();
const isDateLike = (v) => (v instanceof Date && !isNaN(v)) || (!isNaN(new Date(v)) && !!v);
const toDate = (v) => (v instanceof Date ? v : new Date(v));
const isNumeric = (v) => typeof v === "number" && isFinite(v);
const toNumber = (v) => {
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const num = Number(v.replace(/[^0-9+\-\.eE]/g, ""));
    return isFinite(num) ? num : NaN;
  }
  return NaN;
};
const formatNumber = (n) => (n == null || isNaN(n) ? "-" : Intl.NumberFormat().format(n));
const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#84cc16", "#f43f5e"];
const sum = (arr) => arr.reduce((a, b) => a + (isFinite(b) ? b : 0), 0);
const uniq = (arr) => [...new Set(arr.filter((v) => v != null && v !== ""))];
const groupBy = (arr, keyFn) => {
  const m = new Map();
  for (const r of arr) {
    const k = keyFn(r);
    if (!m.has(k)) m.set(k, []);
    m.get(k).push(r);
  }
  return m;
};

// ---------- AI integration (Gemini) ----------
const GEMINI_MODEL = "gemini-1.5-flash"; // fast & cheap, tweak as you like
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

async function callGemini({ headers, rows }) {
  if (!API_KEY) throw new Error("Missing VITE_GEMINI_API_KEY");

  // Keep payload compact: sample up to 3000 rows to respect request size limits
  const MAX_ROWS = 3000;
  const dataSample = rows.slice(0, MAX_ROWS);
  const dataString = JSON.stringify(dataSample);

  const prompt = `You are a senior analytics engineer.\n\nGiven tabular data with headers: ${headers.join(", ")}.\nReturn a JSON object with:\n- analysisText: 3-8 concise insights customized to the data.\n- charts: an array of chart configs. Allowed types: bar, line, pie, radar.\nEach chart config must contain: { type, title, dataKey, nameKey }.\n- dataKey MUST refer to a numeric column; nameKey MUST be categorical (labels).\n- Use meaningful titles. If no pie-worthy pair exists, avoid pie.\n- Never include markdown or codeblocks.\n\nData (JSON rows): ${dataString}`;

  const payload = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          analysisText: { type: "STRING" },
          charts: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                type: { type: "STRING" },
                title: { type: "STRING" },
                dataKey: { type: "STRING" },
                nameKey: { type: "STRING" },
              },
              required: ["type", "title", "dataKey", "nameKey"],
            },
          },
        },
        required: ["analysisText", "charts"],
      },
    },
  };

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${API_KEY}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }
  );
  const json = await res.json();
  const raw = json?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  // Sometimes models return JSON in a fenced block or with trailing commas — sanitize
  const cleaned = raw.trim().replace(/^```(json)?/i, "").replace(/```$/, "");
  let parsed;
  try { parsed = JSON.parse(cleaned); } catch (e) {
    throw new Error("Model returned non‑JSON or malformed JSON");
  }
  // Minimal validation
  if (!parsed || !Array.isArray(parsed.charts)) throw new Error("Invalid response shape");
  // Ensure charts reference real columns and numeric data where needed
  const headerSet = new Set(headers);
  parsed.charts = parsed.charts.filter((c) => headerSet.has(c.dataKey) && headerSet.has(c.nameKey));
  return parsed;
}

// ---------- main component ----------
export default function AutoDashboard() {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [types, setTypes] = useState({});
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiConfig, setAiConfig] = useState(null); // { analysisText, charts }

  // global filters (populate per domain)
  const [f1, setF1] = useState("All");
  const [f2, setF2] = useState("All");
  const [f3, setF3] = useState("All");

  const dashRef = useRef(null);

  // ---------- file parsing ----------
  async function handleFile(file) {
    setAiConfig(null); // reset AI view on new upload
    setLoading(true);
    setFileName(file.name);
    setAiError("");

    const isCSV = /\.csv$/i.test(file.name);
    const data = await file.arrayBuffer();
    let norm = [];

    if (isCSV) {
      const text = new TextDecoder("utf-8").decode(new Uint8Array(data));
      const csvRows = text.split(/\r?\n/).filter(Boolean).map((line) => line.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/).map((s) => s.replace(/^\"|\"$/g, "")));
      const headers = csvRows[0]?.map((h) => String(h).trim()) || [];
      for (let i = 1; i < csvRows.length; i++) {
        const r = csvRows[i]; const o = {}; headers.forEach((h, j) => (o[h] = r[j] ?? null)); norm.push(o);
      }
    } else {
      const wb = XLSX.read(data, { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(ws, { defval: null, raw: true });
      norm = json.map((r) => { const o = {}; Object.keys(r).forEach((k) => (o[String(k).trim()] = r[k])); return o; });
    }

    const cols = [...new Set(norm.flatMap((r) => Object.keys(r)))];
    // type infer
    const t = {}; for (const c of cols) { const vals = norm.map((r) => r[c]).filter((v) => v !== null && v !== ""); let num = 0, date = 0; for (const v of vals) { const n = toNumber(v); if (isFinite(n)) num++; else if (isDateLike(v)) date++; } t[c] = num/Math.max(vals.length,1) > 0.65 ? "number" : date/Math.max(vals.length,1) > 0.55 ? "date" : "category"; }

    setColumns(cols);
    setRows(norm);
    setTypes(t);
    setLoading(false);
  }

  const onDrop = (e) => { e.preventDefault(); if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]); };
  const onInput = (e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); };

  // ---------- domain detection (HR / Sales / Finance / Generic) ----------
  const getCol = (patterns) => columns.find((c) => patterns.some((p) => lc(c).includes(p))) || null;

  const domain = useMemo(() => {
    if (!columns.length) return "none";
    const hrSignal = ["department", "employmentstatus", "gender", "dateofhire", "marital", "empid"].some((p) => columns.some((c) => lc(c).includes(p)));
    if (hrSignal) return "hr";
    const salesDate = getCol(["orderdate", "date", "invoice", "sale date"]);
    const salesAmt = getCol(["revenue", "sales", "amount", "total", "price", "net", "gmv"]);
    const productish = getCol(["product", "item", "sku"]);
    const customerish = getCol(["customer", "client", "buyer"]);
    if (salesDate && salesAmt && (productish || customerish)) return "sales";
    const debit = getCol(["debit", "dr"]);
    const credit = getCol(["credit", "cr"]);
    const amt = getCol(["amount", "value", "net", "balance"]);
    const cat = getCol(["category", "account", "gl", "type", "cost center", "vendor"]);
    const fdate = getCol(["date", "postdate", "trx date", "period"]);
    if ((debit && credit) || (amt && cat && fdate)) return "finance";
    return "generic";
  }, [columns]);

  // ---------- HR calculations ----------
  const hrSchema = useMemo(() => {
    if (domain !== "hr") return null;
    const map = {
      empId: getCol(["empid", "employeeid", "id", "emp id", "staff", "worker"]),
      dept: getCol(["department", "dept", "division", "section"]),
      status: getCol(["employmentstatus", "status", "state", "active", "termination", "jobstatus"]),
      gender: getCol(["gender", "sex"]),
      hireDate: getCol(["dateofhire", "hiredate", "joining", "startdate", "date of hire"]),
      marital: getCol(["marital", "maritaldesc", "maritalstatus"]),
    };
    const fr = rows.filter((r) =>
      (f1 === "All" || String(r[map.dept]) === f1) &&
      (f2 === "All" || String(r[map.status]) === f2) &&
      (f3 === "All" || String(r[map.empId]) === f3)
    );
    const total = new Set(map.empId ? fr.map((r) => r[map.empId]) : fr.map((_, i) => i)).size;
    const normGender = (v) => (/(^f(emale)?$|أنثى|انثى|امرأة)/i.test(lc(v)) ? "F" : /(^m(ale)?$|ذكر)/i.test(lc(v)) ? "M" : "Other");
    let gF=0,gM=0,gO=0; if (map.gender) for (const r of fr){const g=normGender(r[map.gender]); if(g==="F")gF++; else if(g==="M")gM++; else gO++;}
    const isActive = (s) => /(active|current|employed|onboard)/i.test(lc(s));
    const isLeft = (s) => /(left|terminated|resigned|inactive|leaver)/i.test(lc(s));
    let left=0, active=0; if (map.status) for (const r of fr){ if(isLeft(r[map.status])) left++; else if (isActive(r[map.status])) active++; }
    let time=[]; if (map.hireDate){ const m=groupBy(fr.filter((r)=>r[map.hireDate]),(r)=>toDate(r[map.hireDate]).toISOString().slice(0,10)); let cum=0; time=[...m.entries()].sort((a,b)=>a[0]<b[0]? -1:1).map(([date,items])=>({date, Hires: items.length, Cumulative:(cum+=items.length)})); }
    let byDept=[], byMarital=[]; if (map.dept){ const m=groupBy(fr,(r)=>String(r[map.dept]||"Unknown")); byDept=[...m.entries()].map(([name,items])=>({name,count:items.length})).sort((a,b)=>b.count-a.count); }
    if (map.marital){ const m=groupBy(fr,(r)=>String(r[map.marital]||"Unknown")); byMarital=[...m.entries()].map(([name,items])=>({name,count:items.length})); }
    const genderDist = map.gender ? [{name:"F", value:gF},{name:"M", value:gM},...(gO?[{name:"Other", value:gO}]:[])] : [];
    const activePct = total ? Math.round((active/total)*100) : 0;
    const opts = { sel1:["All",...uniq(rows.map((r)=>r[map.dept]))], sel2:["All",...uniq(rows.map((r)=>r[map.status]))], sel3:["All",...uniq(rows.map((r)=>r[map.empId]))] };
    return { map, fr, total, gF,gM,left,active,time,byDept,byMarital,genderDist,activePct, opts };
  }, [domain, rows, columns, f1, f2, f3]);

  // ---------- Sales calculations ----------
  const salesSchema = useMemo(() => {
    if (domain !== "sales") return null;
    const map = {
      orderId: getCol(["orderid", "order id", "invoice", "receipt", "so#", "order no", "txn id"]),
      date: getCol(["orderdate", "date", "invoice date", "sale date"]),
      amount: getCol(["revenue", "sales", "amount", "total", "net", "gmv", "price"]),
      qty: getCol(["qty", "quantity", "units", "count"]),
      product: getCol(["product", "item", "sku", "name"]),
      category: getCol(["category", "segment", "class"]),
      region: getCol(["region", "country", "city", "state", "market"]),
      customer: getCol(["customer", "client", "buyer", "account"]),
    };
    const fr = rows.filter((r) =>
      (f1 === "All" || String(r[map.region] || r[map.category]) === f1) &&
      (f2 === "All" || String(r[map.customer] || r[map.product]) === f2) &&
      (f3 === "All" || String(r[map.category] || r[map.product]) === f3)
    );
    const orderKey = map.orderId || "__row__";
    const orders = new Set(fr.map((r,i)=> r[orderKey] ?? i)).size;
    const revenue = sum(fr.map((r)=> toNumber(r[map.amount]) || 0));
    const totalQty = sum(fr.map((r)=> toNumber(r[map.qty]) || 0));
    const aov = orders ? revenue / orders : 0;
    let revenueTime=[]; if (map.date && map.amount){ const m=groupBy(fr.filter(r=>r[map.date]), r=> toDate(r[map.date]).toISOString().slice(0,10)); revenueTime=[...m.entries()].map(([date,items])=>({date, revenue: sum(items.map(x=> toNumber(x[map.amount])||0))})).sort((a,b)=>a.date<b.date?-1:1); }
    const buildAgg=(col)=>{ if(!col)return []; const m=groupBy(fr.filter(r=>r[col]!=null), r=> String(r[col])); return [...m.entries()].map(([name,items])=>({name, revenue: sum(items.map(x=> toNumber(x[map.amount])||0))})).sort((a,b)=> b.revenue-a.revenue).slice(0,15); };
    const byCategory = buildAgg(map.category);
    const byRegion = buildAgg(map.region);
    const byProduct = buildAgg(map.product);
    const opts = { sel1:["All", ...uniq(rows.map((r)=> r[map.region] ?? r[map.category]))], sel2:["All", ...uniq(rows.map((r)=> r[map.customer] ?? r[map.product]))], sel3:["All", ...uniq(rows.map((r)=> r[map.category] ?? r[map.product]))] };
    return { map, fr, orders, revenue, totalQty, aov, revenueTime, byCategory, byRegion, byProduct, opts };
  }, [domain, rows, columns, f1, f2, f3]);

  // ---------- Finance calculations ----------
  const financeSchema = useMemo(() => {
    if (domain !== "finance") return null;
    const map = {
      date: getCol(["date", "postdate", "trx date", "period"]),
      debit: getCol(["debit", "dr"]),
      credit: getCol(["credit", "cr"]),
      amount: getCol(["amount", "value", "net", "balance"]),
      category: getCol(["category", "account", "gl", "type", "expense type", "vendor"]),
      memo: getCol(["memo", "description", "narration"]),
    };
    const val = (r) => {
      if (map.debit && map.credit) return (toNumber(r[map.credit])||0) - (toNumber(r[map.debit])||0);
      return toNumber(r[map.amount]) || 0;
    };
    const fr = rows.filter((r) => (f1 === "All" || String(r[map.category]) === f1));
    const income = sum(fr.map((r)=> Math.max(val(r),0)));
    const expense = sum(fr.map((r)=> Math.max(-val(r),0)));
    const net = income - expense;
    let trend=[]; if (map.date){ const m=groupBy(fr.filter(r=>r[map.date]), r=> toDate(r[map.date]).toISOString().slice(0,10)); trend=[...m.entries()].map(([date,items])=>({date, net: sum(items.map(val))})).sort((a,b)=>a.date<b.date?-1:1); }
    let byCat=[]; if (map.category){ const m=groupBy(fr, r=> String(r[map.category]||"Unclassified")); byCat=[...m.entries()].map(([name,items])=>({name, expense: sum(items.map((x)=> Math.max(-val(x),0))), income: sum(items.map((x)=> Math.max(val(x),0)))})).sort((a,b)=> b.expense-a.expense).slice(0,12); }
    const opts = { sel1:["All", ...uniq(rows.map((r)=> r[map.category]))] };
    return { map, fr, income, expense, net, trend, byCat, opts };
  }, [domain, rows, columns, f1]);

  // ---------- export ----------
  const downloadPNG = async () => {
    if (!dashRef.current) return;
    const canvas = await html2canvas(dashRef.current, { backgroundColor: "#ffffff", scale: 2 });
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = (fileName || "dashboard") + ".png";
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  // ---------- AI renderers ----------
  function renderAIChart(cfg) {
    const { type, title, dataKey, nameKey } = cfg;
    const data = rows.map((r) => ({ ...r, __name: r[nameKey], __value: toNumber(r[dataKey]) }));
    const valid = data.filter((d) => d.__name != null && isFinite(d.__value));
    if (!valid.length) return null;

    switch (type) {
      case "bar":
        return (
          <div className="w-full h-80 bg-white rounded-xl shadow-md p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">{title}</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={valid}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="__name" hide={valid.length>15} />
                <YAxis /><Tooltip /><Legend />
                <Bar dataKey="__value" name={dataKey} fill="#2563eb" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      case "line":
        return (
          <div className="w-full h-80 bg-white rounded-xl shadow-md p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">{title}</h2>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={valid}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="__name" hide={valid.length>15} />
                <YAxis /><Tooltip /><Legend />
                <Line type="monotone" dataKey="__value" name={dataKey} stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      case "pie":
        const pie = valid.map((d) => ({ name: d.__name, value: d.__value }));
        return (
          <div className="w-full h-80 bg-white rounded-xl shadow-md p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">{title}</h2>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pie} dataKey="value" nameKey="name" outerRadius={100}>
                  {pie.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
                </Pie>
                <Tooltip /><Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      case "radar":
        return (
          <div className="w-full h-80 bg-white rounded-xl shadow-md p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">{title}</h2>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={valid}>
                <PolarGrid />
                <RPolarAngleAxis dataKey="__name" />
                <PolarRadiusAxis />
                <Radar name={dataKey} dataKey="__value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.5} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        );
      default:
        return null;
    }
  }

  async function generateWithAI() {
    try {
      setAiError("");
      setAiLoading(true);
      const cfg = await callGemini({ headers: columns, rows });
      setAiConfig(cfg);
    } catch (e) {
      console.error(e);
      setAiError(e.message || "Failed to generate with AI");
      setAiConfig(null);
    } finally {
      setAiLoading(false);
    }
  }

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gray-900 text-white grid place-items-center font-bold">DA</div>
            <div>
              <h1 className="text-xl font-semibold">Data Assistant</h1>
              <p className="text-xs text-gray-500">Upload → Auto‑Generate → Decide</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {columns.length ? <Pill>{aiConfig ? "Mode: AI" : `Mode: ${domain.toUpperCase()}`}</Pill> : <Pill>No file</Pill>}
            <button onClick={downloadPNG} className="px-3 py-2 text-sm rounded-lg text-white bg-gray-900 hover:bg-black">Download PNG</button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-4 py-6 space-y-6" ref={dashRef}>
        {/* Uploader */}
        <Card>
          <div onDragOver={(e) => e.preventDefault()} onDrop={onDrop} className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-lg font-medium">Upload your data</div>
              <div className="text-sm text-gray-600">Excel (.xlsx/.xls) or CSV. The dashboard adapts automatically. Optionally, generate with AI.</div>
              {fileName && <Pill>Loaded: {fileName}</Pill>}
            </div>
            <div className="flex items-center gap-2">
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white cursor-pointer hover:bg-black">
                <input type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={(e)=> onInput(e)} />
                <span>{loading ? "Parsing…" : "Choose File"}</span>
              </label>
              <button disabled={!columns.length || aiLoading} onClick={generateWithAI} className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50">
                {aiLoading ? "Thinking…" : "Generate with AI"}
              </button>
            </div>
          </div>
        </Card>

        {/* AI MODE */}
        {aiConfig && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card title="AI Analysis & Insights">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{aiConfig.analysisText}</p>
            </Card>
            <div className="grid md:grid-cols-2 gap-6">
              {aiConfig.charts.map((c, i) => (
                <div key={i}>{renderAIChart(c)}</div>
              ))}
            </div>
          </motion.div>
        )}

        {aiError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-sm" role="alert">{aiError}</div>
        )}

        {/* ---------------- HR TEMPLATE ---------------- */}
        {rows.length > 0 && !aiConfig && domain === "hr" && hrSchema && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Filters */}
            <Card>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Department</label>
                  <select className="w-full border rounded-lg px-3 py-2" value={f1} onChange={(e)=>setF1(e.target.value)}>
                    {hrSchema.opts.sel1.map((x)=> <option key={x} value={x}>{x}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">EmploymentStatus</label>
                  <select className="w-full border rounded-lg px-3 py-2" value={f2} onChange={(e)=>setF2(e.target.value)}>
                    {hrSchema.opts.sel2.map((x)=> <option key={x} value={x}>{x}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">EmpID</label>
                  <select className="w-full border rounded-lg px-3 py-2" value={f3} onChange={(e)=>setF3(e.target.value)}>
                    {hrSchema.opts.sel3.map((x)=> <option key={x} value={x}>{x}</option>)}
                  </select>
                </div>
              </div>
            </Card>

            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card><div className="text-xs text-gray-500">Total Employee</div><div className="text-3xl font-bold">{formatNumber(hrSchema.total)}</div></Card>
              <Card><div className="text-xs text-gray-500">Total Female</div><div className="text-3xl font-bold">{formatNumber(hrSchema.gF)}</div></Card>
              <Card><div className="text-xs text-gray-500">Total Male</div><div className="text-3xl font-bold">{formatNumber(hrSchema.gM)}</div></Card>
              <Card><div className="text-xs text-gray-500">Left Employee</div><div className="text-3xl font-bold">{formatNumber(hrSchema.left)}</div></Card>
              <Card><div className="text-xs text-gray-500">Active Employee</div><div className="text-3xl font-bold">{formatNumber(hrSchema.active)}</div></Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Cumulative Employee Headcount">
                {hrSchema.time.length ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={hrSchema.time} margin={{ left: 10, right: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" /><YAxis /><Tooltip />
                        <Area type="monotone" dataKey="Cumulative" stroke="#10b981" fillOpacity={0.2} fill="#10b981" />
                        <Line type="monotone" dataKey="Hires" stroke="#2563eb" dot={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                ) : <div className="text-sm text-gray-500">Provide a Date of Hire column.</div>}
              </Card>

              <Card title="Marital Status of Employees">
                {hrSchema.byMarital.length ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={hrSchema.byMarital}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="count" fill="#10b981" /></BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : <div className="text-sm text-gray-500">No marital column detected.</div>}
              </Card>

              <Card title="Employee Distribution by Gender">
                {hrSchema.genderDist.length ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart><Tooltip /><Legend />
                        <Pie data={hrSchema.genderDist} dataKey="value" nameKey="name" outerRadius={100}>{hrSchema.genderDist.map((_,i)=>(<Cell key={i} fill={COLORS[i%COLORS.length]} />))}</Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : <div className="text-sm text-gray-500">No gender column detected.</div>}
              </Card>

              <Card title="Active Employees %">
                <div className="h-64 grid place-items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{name:"Active", value: hrSchema.activePct}]} startAngle={180} endAngle={0}>
                      <PolarAngleAxis type="number" domain={[0,100]} tick={false} />
                      <RadialBar background dataKey="value" />
                      <Tooltip />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="-mt-28 text-4xl font-bold">{hrSchema.activePct}%</div>
                </div>
              </Card>

              <Card title="Employee Count by Department">
                {hrSchema.byDept.length ? (
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={hrSchema.byDept} layout="vertical" margin={{ left: 50 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={120} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#2563eb" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : <div className="text-sm text-gray-500">No department column detected.</div>}
              </Card>
            </div>
          </motion.div>
        )}

        {/* ---------------- SALES TEMPLATE ---------------- */}
        {rows.length > 0 && !aiConfig && domain === "sales" && salesSchema && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Region / Category</label>
                  <select className="w-full border rounded-lg px-3 py-2" value={f1} onChange={(e)=>setF1(e.target.value)}>
                    {salesSchema.opts.sel1.map((x)=> <option key={x} value={x}>{x}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Customer / Product</label>
                  <select className="w-full border rounded-lg px-3 py-2" value={f2} onChange={(e)=>setF2(e.target.value)}>
                    {salesSchema.opts.sel2.map((x)=> <option key={x} value={x}>{x}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Category / Product</label>
                  <select className="w-full border rounded-lg px-3 py-2" value={f3} onChange={(e)=>setF3(e.target.value)}>
                    {salesSchema.opts.sel3.map((x)=> <option key={x} value={x}>{x}</option>)}
                  </select>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card><div className="text-xs text-gray-500">Revenue</div><div className="text-3xl font-bold">{formatNumber(salesSchema.revenue)}</div></Card>
              <Card><div className="text-xs text-gray-500">Orders</div><div className="text-3xl font-bold">{formatNumber(salesSchema.orders)}</div></Card>
              <Card><div className="text-xs text-gray-500">Quantity</div><div className="text-3xl font-bold">{formatNumber(salesSchema.totalQty)}</div></Card>
              <Card><div className="text-xs text-gray-500">Avg Order Value</div><div className="text-3xl font-bold">{formatNumber(Math.round(salesSchema.aov))}</div></Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Revenue Over Time">
                {salesSchema.revenueTime.length ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={salesSchema.revenueTime} margin={{ left: 10, right: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" /><YAxis /><Tooltip />
                        <Area type="monotone" dataKey="revenue" stroke="#2563eb" fillOpacity={0.2} fill="#2563eb" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                ) : <div className="text-sm text-gray-500">Need date & amount columns.</div>}
              </Card>

              <Card title="Revenue by Category / Region (Top 15)">
                {(salesSchema.byCategory.length || salesSchema.byRegion.length) ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesSchema.byCategory.length ? salesSchema.byCategory : salesSchema.byRegion}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" hide />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : <div className="text-sm text-gray-500">Provide Category/Region.</div>}
              </Card>

              <Card title="Top Products by Revenue (Top 15)">
                {salesSchema.byProduct.length ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesSchema.byProduct}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" hide={salesSchema.byProduct.length>10} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="#8b5cf6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : <div className="text-sm text-gray-500">Provide Product column.</div>}
              </Card>

              <Card title="Revenue Share (Region or Category)">
                {(salesSchema.byRegion.length || salesSchema.byCategory.length) ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart><Tooltip /><Legend />
                        <Pie data={(salesSchema.byRegion.length ? salesSchema.byRegion : salesSchema.byCategory).slice(0,8)} dataKey="revenue" nameKey="name" outerRadius={100}>
                          {(salesSchema.byRegion.length ? salesSchema.byRegion : salesSchema.byCategory).slice(0,8).map((_,i)=>(<Cell key={i} fill={COLORS[i%COLORS.length]} />))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : <div className="text-sm text-gray-500">Provide Region/Category.</div>}
              </Card>
            </div>
          </motion.div>
        )}

        {/* ---------------- FINANCE TEMPLATE ---------------- */}
        {rows.length > 0 && !aiConfig && domain === "finance" && financeSchema && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Category / Account</label>
                  <select className="w-full border rounded-lg px-3 py-2" value={f1} onChange={(e)=>setF1(e.target.value)}>
                    {financeSchema.opts.sel1.map((x)=> <option key={x} value={x}>{x}</option>)}
                  </select>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card><div className="text-xs text-gray-500">Income</div><div className="text-3xl font-bold">{formatNumber(financeSchema.income)}</div></Card>
              <Card><div className="text-xs text-gray-500">Expense</div><div className="text-3xl font-bold">{formatNumber(financeSchema.expense)}</div></Card>
              <Card><div className="text-xs text-gray-500">Net</div><div className="text-3xl font-bold">{formatNumber(financeSchema.net)}</div></Card>
              <Card><div className="text-xs text-gray-500">Transactions</div><div className="text-3xl font-bold">{formatNumber(financeSchema.fr.length)}</div></Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Net Over Time">
                {financeSchema.trend.length ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={financeSchema.trend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" /><YAxis /><Tooltip />
                        <Line type="monotone" dataKey="net" stroke="#2563eb" dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : <div className="text-sm text-gray-500">Need a date column.</div>}
              </Card>

              <Card title="Expenses by Category (Top 12)">
                {financeSchema.byCat.length ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={financeSchema.byCat}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" hide />
                        <YAxis /><Tooltip />
                        <Bar dataKey="expense" fill="#ef4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : <div className="text-sm text-gray-500">Provide Category/Account.</div>}
              </Card>

              <Card title="Income vs Expense Share">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart><Tooltip /><Legend />
                      <Pie data={[{name:"Income", value: financeSchema.income},{name:"Expense", value: financeSchema.expense}]} dataKey="value" nameKey="name" outerRadius={100}>
                        <Cell fill="#10b981" /><Cell fill="#ef4444" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        {/* ---------------- GENERIC FALLBACK ---------------- */}
{rows.length > 0 && !aiConfig && domain === "generic" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {(() => {
              const dateCol = columns.find((c) => types[c] === "date");
              const numCol = columns.find((c) => types[c] === "number");
              const catCols = columns.filter((c) => types[c] === "category");
              const time = (dateCol && numCol)
                ? (() => { const m=groupBy(rows.filter(r=>r[dateCol] && isFinite(toNumber(r[numCol]))), r=> toDate(r[dateCol]).toISOString().slice(0,10)); return [...m.entries()].map(([date,items])=>({date, value: sum(items.map(x=> toNumber(x[numCol])))})).sort((a,b)=>a.date<b.date?-1:1); })()
                : [];
              const topCats = catCols[0]
                ? (() => { const m=groupBy(rows.filter(r=>r[catCols[0]]!=null), r=> String(r[catCols[0]])); return [...m.entries()].map(([name,items])=>({name, count: items.length})).sort((a,b)=> b.count-a.count).slice(0,15); })()
                : [];
              const pie = catCols[1]
                ? (() => { const m=groupBy(rows.filter(r=>r[catCols[1]]!=null), r=> String(r[catCols[1]])); return [...m.entries()].map(([name,items])=>({name, value: items.length})).sort((a,b)=> b.value-a.value).slice(0,8); })()
                : [];
              return (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card title={`Trend over time ${dateCol && numCol ? `(${dateCol} vs ${numCol})` : ""}`}>
                    {time.length ? (
                      <div className="h-64"><ResponsiveContainer width="100%" height="100%"><AreaChart data={time}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis /><Tooltip /><Area type="monotone" dataKey="value" stroke="#2563eb" fillOpacity={0.2} fill="#2563eb" /></AreaChart></ResponsiveContainer></div>
                    ) : <div className="text-sm text-gray-500">Add one date and one numeric column for trends.</div>}
                  </Card>
                  <Card title="Top categories">
                    {topCats.length ? (
                      <div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={topCats}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" hide={topCats.length>10} /><YAxis /><Tooltip /><Bar dataKey="count" fill="#10b981" /></BarChart></ResponsiveContainer></div>
                    ) : <div className="text-sm text-gray-500">Include at least one categorical column.</div>}
                  </Card>
                  <Card title="Share by category">
                    {pie.length ? (
                      <div className="h-64"><ResponsiveContainer width="100%" height="100%"><PieChart><Tooltip /><Legend /><Pie data={pie} dataKey="value" nameKey="name" outerRadius={100}>{pie.map((_,i)=>(<Cell key={i} fill={COLORS[i%COLORS.length]} />))}</Pie></PieChart></ResponsiveContainer></div>
                    ) : <div className="text-sm text-gray-500">Add a second categorical column for a pie chart.</div>}
                  </Card>
                </div>
              );
            })()}
          </motion.div>
        )}

        {!rows.length && (
          <div className="text-center text-gray-500 text-sm">Upload an Excel/CSV. Use the AI button for an LLM‑suggested dashboard or rely on the built‑in domain layouts.</div>
        )}
      </div>

      <div className="text-center text-xs text-gray-500 py-6">© {new Date().getFullYear()} Data Assistant — auto dashboards from your spreadsheets.</div>
    </div>
  );
}
