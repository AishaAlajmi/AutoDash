// File: src/lib/engine.js
// Purpose: Centralize AI / prompts logic and guarantee FULL-DATA accuracy (no sampling).

/**
 * Optional: if you already have a helper that computes dataset stats,
 * you can keep it. We still provide a robust local fallback below.
 */
// import { buildLocalFallback } from "../pages/dataAnalysis";

/* ------------------------------ Utilities ------------------------------ */

const isFiniteNumber = (v) =>
  typeof v === "number" ? Number.isFinite(v) : (v != null && v !== "" && Number.isFinite(Number(v)));

const toNumber = (v) => (isFiniteNumber(v) ? Number(v) : NaN);

const isDateLike = (v) => {
  if (v instanceof Date && !isNaN(v)) return true;
  if (typeof v === "number" && v > 0 && v < 32503680000000) return true; // timestamp-ish
  if (typeof v === "string") {
    // ISO/date-ish
    const d = new Date(v);
    return !isNaN(d);
  }
  return false;
};

const toDate = (v) => {
  if (v instanceof Date && !isNaN(v)) return v;
  const d = new Date(v);
  return isNaN(d) ? null : d;
};

function detectColumnTypes(rows) {
  const cols = rows.length ? Object.keys(rows[0]) : [];
  const colTypes = {};
  for (const c of cols) {
    let numeric = 0, dates = 0, bools = 0, strings = 0, nonNull = 0;
    const sampleCount = Math.min(rows.length, 1000); // still scanning all later, this is just for type hint
    for (let i = 0; i < sampleCount; i++) {
      const v = rows[i]?.[c];
      if (v === null || v === undefined || v === "") continue;
      nonNull++;
      if (typeof v === "boolean") { bools++; continue; }
      if (isFiniteNumber(v)) { numeric++; continue; }
      if (isDateLike(v)) { dates++; continue; }
      strings++;
    }
    const maxType = Math.max(numeric, dates, bools, strings);
    let type = "string";
    if (maxType === numeric) type = "number";
    else if (maxType === dates) type = "date";
    else if (maxType === bools) type = "boolean";
    colTypes[c] = { type, nonNull, samples: sampleCount };
  }
  return colTypes;
}

function summarizeColumns(rows, colTypes) {
  const colSummary = {};
  for (const [col, info] of Object.entries(colTypes)) {
    const type = info.type;
    if (type === "number") {
      let count = 0, sum = 0, min = Infinity, max = -Infinity, nulls = 0;
      for (const r of rows) {
        const raw = r?.[col];
        if (raw === null || raw === undefined || raw === "") { nulls++; continue; }
        const n = toNumber(raw);
        if (!Number.isFinite(n)) { nulls++; continue; }
        count++; sum += n; if (n < min) min = n; if (n > max) max = n;
      }
      const mean = count ? sum / count : 0;
      colSummary[col] = { type, count, nulls, sum, min: count ? min : 0, max: count ? max : 0, mean };
    } else if (type === "string" || type === "boolean") {
      const freq = new Map();
      let nulls = 0;
      for (const r of rows) {
        let v = r?.[col];
        if (v === null || v === undefined || v === "") { nulls++; continue; }
        if (typeof v === "boolean") v = v ? "true" : "false";
        v = String(v);
        freq.set(v, (freq.get(v) || 0) + 1);
      }
      const entries = Array.from(freq.entries()).sort((a,b)=>b[1]-a[1]);
      const distinct = entries.length;
      const top = entries.slice(0, 20).map(([value, count]) => ({ value, count }));
      colSummary[col] = { type, nulls, distinct, top };
    } else if (type === "date") {
      let nulls = 0;
      const byDay = new Map();
      for (const r of rows) {
        const d = toDate(r?.[col]);
        if (!d) { nulls++; continue; }
        const dayKey = d.toISOString().slice(0,10);
        byDay.set(dayKey, (byDay.get(dayKey) || 0) + 1);
      }
      const timeline = Array.from(byDay.entries())
        .map(([date, count]) => ({ date, count }))
        .sort((a,b)=>a.date.localeCompare(b.date));
      colSummary[col] = { type, nulls, timeline };
    }
  }
  return colSummary;
}

/**
 * Attempts a reasonable default: choose one date column, one primary numeric,
 * and one primary categorical for charts.
 */
function choosePrimaryColumns(colSummary) {
  const dateCols = Object.entries(colSummary).filter(([, s]) => s.type === "date");
  const numCols  = Object.entries(colSummary).filter(([, s]) => s.type === "number");
  const catCols  = Object.entries(colSummary).filter(([, s]) => (s.type === "string" || s.type === "boolean"));

  const dateCol = dateCols.length ? dateCols[0][0] : null;
  // pick numeric with largest non-null count
  const numCol = numCols.length
    ? numCols.map(([k,v]) => [k, v]).sort((a,b)=> (b[1].count||0) - (a[1].count||0) )[0][0]
    : null;
  // pick categorical with most distinct (but capped)
  const catCol = catCols.length
    ? catCols.map(([k,v]) => [k, v]).sort((a,b)=> (b[1].distinct||0) - (a[1].distinct||0) )[0][0]
    : null;

  return { dateCol, numCol, catCol };
}

function buildCharts(rows, colSummary) {
  const { dateCol, numCol, catCol } = choosePrimaryColumns(colSummary);
  const charts = [];

  // Bar: top categories (count of rows) for catCol
  if (catCol) {
    const top = colSummary[catCol].top || [];
    const barData = top.map(t => ({ name: t.value, value: t.count }));
    charts.push({
      type: "bar",
      title: `Top ${catCol}`,
      dataKey: "value",
      nameKey: "name",
      data: barData
    });
  }

  // Line: time series count by date
  if (dateCol) {
    const timeline = colSummary[dateCol].timeline || [];
    charts.push({
      type: "line",
      title: `Entries over time by ${dateCol}`,
      dataKey: "count",
      nameKey: "date",
      data: timeline
    });
  }

  // Pie: distribution of boolean/string top categories
  if (catCol) {
    const top = colSummary[catCol].top || [];
    const pieData = top.map(t => ({ name: t.value, value: t.count }));
    charts.push({
      type: "pie",
      title: `Distribution of ${catCol}`,
      dataKey: "value",
      nameKey: "name",
      data: pieData
    });
  }

  // Area: numeric values over categories (if both exist)
  if (catCol && numCol) {
    // aggregate numeric sum by category
    const agg = new Map();
    for (const r of rows) {
      const c = r?.[catCol];
      const n = toNumber(r?.[numCol]);
      if (c === null || c === undefined || c === "" || !Number.isFinite(n)) continue;
      agg.set(c, (agg.get(c) || 0) + n);
    }
    const areaData = Array.from(agg.entries())
      .sort((a,b)=>b[1]-a[1])
      .slice(0, 20)
      .map(([name, value]) => ({ name, value }));

    if (areaData.length) {
      charts.push({
        type: "area",
        title: `${numCol} by ${catCol}`,
        dataKey: "value",
        nameKey: "name",
        data: areaData
      });
    }
  }

  // Composed: if we have date + numeric, show sum per day
  if (dateCol && numCol) {
    const byDay = new Map();
    for (const r of rows) {
      const d = toDate(r?.[dateCol]);
      const n = toNumber(r?.[numCol]);
      if (!d || !Number.isFinite(n)) continue;
      const dayKey = d.toISOString().slice(0,10);
      const prev = byDay.get(dayKey) || 0;
      byDay.set(dayKey, prev + n);
    }
    const composedData = Array.from(byDay.entries())
      .map(([date, value]) => ({ date, value }))
      .sort((a,b)=>a.date.localeCompare(b.date));
    if (composedData.length) {
      charts.push({
        type: "composed",
        title: `Daily ${numCol} (sum)`,
        dataKey: "value",
        nameKey: "date",
        data: composedData
      });
    }
  }

  return charts;
}

function buildKeyMetrics(rows, colSummary) {
  const rowCount = rows.length;
  const columnCount = Object.keys(colSummary).length;

  // pick prominent numeric for totals/mean
  const numericCols = Object.entries(colSummary)
    .filter(([, s]) => s.type === "number")
    .map(([k, v]) => ({ col: k, ...v }))
    .sort((a,b)=> (b.count||0) - (a.count||0));

  const metrics = [
    { title: "Rows", value: String(rowCount), description: "Total number of records." },
    { title: "Columns", value: String(columnCount), description: "Total number of fields." },
  ];

  if (numericCols.length) {
    const primary = numericCols[0];
    metrics.push(
      { title: `Sum of ${primary.col}`, value: String(primary.sum ?? 0), description: "Sum over all non-null values." },
      { title: `Avg ${primary.col}`, value: String((primary.mean ?? 0).toFixed(2)), description: "Average over all non-null values." },
      { title: `Min ${primary.col}`, value: String(primary.min ?? 0), description: "Minimum non-null value." },
      { title: `Max ${primary.col}`, value: String(primary.max ?? 0), description: "Maximum non-null value." },
    );
  }

  // Nulls across dataset
  let totalNulls = 0;
  for (const [col, s] of Object.entries(colSummary)) {
    if (s && typeof s.nulls === "number") totalNulls += s.nulls;
  }
  metrics.push({ title: "Missing values", value: String(totalNulls), description: "Total empty/null cells across all columns." });

  return metrics.slice(0, 6); // keep it tidy
}

function computePreStats(rows) {
  const colTypes = detectColumnTypes(rows);
  const colSummary = summarizeColumns(rows, colTypes);
  const charts = buildCharts(rows, colSummary);
  const keyMetrics = buildKeyMetrics(rows, colSummary);

  return {
    rows: rows.length,
    columns: Object.keys(colSummary),
    columnTypes: Object.fromEntries(Object.entries(colTypes).map(([k,v]) => [k, v.type])),
    columnSummary: colSummary,
    charts,            // includes actual data arrays for the charts (already computed over FULL dataset)
    keyMetrics,        // numeric values are from FULL dataset
  };
}

/* ------------------------------ AI Calls ------------------------------ */

/**
 * Analyze a dataset using AI ONLY for the narrative,
 * while metrics + charts are computed locally over the FULL dataset.
 *
 * Returns:
 * {
 *   analysisText: string,
 *   keyMetrics: [...computed locally...],
 *   charts:     [...computed locally...]
 * }
 */
export async function analyzeDatasetWithAI({ headers, fileData }) {
  // 1) Compute full-data stats locally (no sampling).
  const rows = Array.isArray(fileData) ? fileData : [];
  const preStats = computePreStats(rows);

  // 2) Construct a strict prompt: AI must use ONLY provided aggregates.
  const prompt = [
    "ROLE: You are a precise data analyst.",
    "DATA POLICY:",
    "- You MUST base every number and claim ONLY on the provided PRE_STATS object.",
    "- NEVER infer, predict, estimate, or sample.",
    "- If something is not present in PRE_STATS, you must say it's not available.",
    "",
    "TASK:",
    "Write a clear, business-friendly narrative analysis of the dataset using PRE_STATS.",
    "Focus on concrete facts: totals, averages, distributions, trends over time, and notable categories.",
    "Call out top categories, spikes/dips in the timeline, and any interesting contrasts.",
    "",
    "OUTPUT:",
    "- Return ONLY valid JSON (no markdown) with fields:",
    '{ "analysisText": string }',
    "",
    "PRE_STATS (authoritative, computed over the FULL dataset):",
    JSON.stringify(preStats)
  ].join("\n");

  const payload = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0,
      topK: 1,
      topP: 0,
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          analysisText: { type: "STRING" }
        },
        required: ["analysisText"]
      }
    }
  };

  // 3) Call your serverless proxy (keeps API key server-side).
  let analysisText = "Automated analysis generated from full-data aggregates.";
  try {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const result = await res.json();
      const jsonString = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (jsonString) {
        const parsed = JSON.parse(jsonString);
        if (parsed?.analysisText) analysisText = parsed.analysisText;
      }
    }
  } catch {
    // Soft fail; keep local deterministic parts.
  }

  // 4) Return deterministic charts & metrics computed over FULL dataset.
  return {
    analysisText,
    keyMetrics: preStats.keyMetrics,
    charts: preStats.charts,
    preStats // expose for QA mode
  };
}

/**
 * Answer a user question strictly from FULL-DATA aggregates (preStats).
 * The AI is used only to interpret the question and compose the answer text.
 */
export async function answerQuestionWithAI({ userQuery, fullData, preStats }) {
  // Hard guard: if preStats missing, build from fullData (FULL dataset, no sampling).
  const stats = preStats || computePreStats(Array.isArray(fullData) ? fullData : []);

  const prompt = [
    "ROLE: You are a precise data analyst and must answer using ONLY the aggregates provided.",
    "",
    "USER QUESTION:",
    userQuery,
    "",
    "DATA YOU MAY USE (authoritative, built over the FULL dataset):",
    "PRE_STATS:",
    JSON.stringify(stats),
    "",
    "STRICT RULES:",
    "- Cite numbers exactly as they appear/derive from PRE_STATS (e.g., sums, counts, means, top categories, timelines).",
    "- DO NOT fabricate columns or values. DO NOT estimate or predict.",
    "- If the question asks for something unavailable (e.g., a metric we don't have), say so briefly and offer the closest available view from PRE_STATS.",
    "- Keep the answer concise, actionable, and data-backed.",
    "",
    "FORMAT:",
    "- Return plain text only (no markdown)."
  ].join("\n");

  const payload = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0, topK: 1, topP: 0 }
  };

  try {
    const response = await fetch("/api/answer-question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      // Graceful local fallback: basic, direct stat lookups
      return localQAFallback(userQuery, stats);
    }

    const result = await response.json();
    const aiResponseText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponseText) {
      return localQAFallback(userQuery, stats);
    }

    return aiResponseText;
  } catch {
    return localQAFallback(userQuery, stats);
  }
}

/* ------------------------------ Local QA Fallback ------------------------------ */

function localQAFallback(userQuery, stats) {
  const q = (userQuery || "").toLowerCase();

  // Very rough heuristics to answer a few common intents without AI.
  // Everything sourced from "stats".
  if (q.includes("row") || q.includes("record") || q.includes("count")) {
    return `Total rows: ${stats.rows}.`;
  }

  // If the user asks "most sold product" or "top category"
  const catCandidates = Object.entries(stats.columnSummary || {})
    .filter(([, s]) => s.type === "string" || s.type === "boolean");
  if ((/most\s+(sold|popular|common)/.test(q) || q.includes("top")) && catCandidates.length) {
    // pick the categorical column with highest top[0]
    const best = catCandidates
      .map(([k, s]) => ({ col: k, first: s.top?.[0]?.count || 0, label: s.top?.[0]?.value }))
      .sort((a,b)=> (b.first - a.first))[0];

    if (best && best.label) {
      return `Top ${best.col}: ${best.label} (${best.first}).`;
    }
  }

  // Numeric sum
  if (q.includes("total") || q.includes("sum")) {
    const numCols = Object.entries(stats.columnSummary || {})
      .filter(([, s]) => s.type === "number")
      .map(([k,v]) => ({ col: k, sum: v.sum || 0, count: v.count || 0 }))
      .sort((a,b)=> b.count - a.count);

    if (numCols.length) {
      const n = numCols[0];
      return `Sum of ${n.col}: ${n.sum}.`;
    }
  }

  // Otherwise generic helpful note
  return "I can only answer from aggregates computed over the full dataset. Please ask about totals, averages, top categories, or trends that exist in the current fields.";
}
