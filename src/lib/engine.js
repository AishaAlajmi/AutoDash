// File: src/lib/engine.js
// Purpose: Centralize AI / prompts logic and guarantee FULL-DATA accuracy (no sampling),
//          with meaningful manager-grade cards & reliable charts for ANY dataset type.

/* ------------------------------ Utilities ------------------------------ */

// Excel serial dates are ~ 20k-60k for modern data
const isLikelyExcelSerial = (n) => typeof n === "number" && n >= 20000 && n <= 60000;

const isFiniteNumber = (v) => {
  if (typeof v === "number") return Number.isFinite(v);
  if (v == null || v === "") return false;
  const n = Number(v);
  return Number.isFinite(n);
};

const toNumber = (v) => (isFiniteNumber(v) ? Number(v) : NaN);

// parse ISO, human-readable, or Excel serials
function toDate(val, headerHint = "") {
  if (val == null || val === "") return null;
  if (val instanceof Date && !isNaN(val)) return val;

  // Excel serial
  if (typeof val === "number" && isLikelyExcelSerial(val)) {
    // Excel starts 1899-12-30
    const ms = (val - 25569) * 86400 * 1000;
    const d = new Date(ms);
    return isNaN(d) ? null : d;
  }

  // timestamp-like
  if (typeof val === "number" && val > 1000000000 && val < 32503680000) {
    // assume seconds
    const d = new Date(val * 1000);
    if (!isNaN(d)) return d;
  }
  if (typeof val === "number" && val > 1000000000000 && val < 32503680000000) {
    const d = new Date(val);
    if (!isNaN(d)) return d;
  }

  // strings
  const d = new Date(val);
  if (!isNaN(d)) return d;

  return null;
}

const dateHeaderRegex = /(date|day|time|created|updated|timestamp|period|month|week|year)/i;
const entityHeaderHints = [
  "employee","user","customer","client","student","patient","vendor","supplier","account","department","team","project","product","service","course","clinic","facility","school","region","branch","category","type","channel","status"
];
const moneyHeaderRegex = /(amount|revenue|income|sales|price|cost|expense|spend|payroll|salary|wage|profit|total|value)/i;
const qtyHeaderRegex = /(qty|quantity|units|count|items|hours|headcount|visits|orders|tickets)/i;

function detectColumnTypes(rows) {
  const cols = rows.length ? Object.keys(rows[0]) : [];
  const colTypes = {};
  for (const col of cols) {
    let num = 0, date = 0, bool = 0, str = 0, nonNull = 0;

    const headerLooksDate = dateHeaderRegex.test(col);

    for (const r of rows) {
      const v = r?.[col];
      if (v === null || v === undefined || v === "") continue;
      nonNull++;

      // Evaluate date BEFORE numeric so Excel serials become dates
      const d = toDate(v, col);
      if (d) { date++; continue; }

      if (typeof v === "boolean") { bool++; continue; }
      if (isFiniteNumber(v)) { num++; continue; }

      str++;
    }

    // small tie-breaking nudges
    if (headerLooksDate) date += 2;

    const scores = [{t:"date",s:date},{t:"number",s:num},{t:"boolean",s:bool},{t:"string",s:str}]
      .sort((a,b)=>b.s-a.s);
    colTypes[col] = { type: scores[0].t, nonNull };
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
      const top = entries.slice(0, 25).map(([value, count]) => ({ value, count }));
      colSummary[col] = { type, nulls, distinct, top };
    } else if (type === "date") {
      let nulls = 0;
      const byDay = new Map();
      let minDate = null, maxDate = null;
      for (const r of rows) {
        const d = toDate(r?.[col], col);
        if (!d) { nulls++; continue; }
        const dayKey = d.toISOString().slice(0,10);
        byDay.set(dayKey, (byDay.get(dayKey) || 0) + 1);
        if (!minDate || d < minDate) minDate = d;
        if (!maxDate || d > maxDate) maxDate = d;
      }
      const timeline = Array.from(byDay.entries())
        .map(([date, count]) => ({ date, count }))
        .sort((a,b)=>a.date.localeCompare(b.date));
      colSummary[col] = { type, nulls, timeline, minDate: minDate?.toISOString() ?? null, maxDate: maxDate?.toISOString() ?? null };
    }
  }
  return colSummary;
}

/* --------------------- Dataset intent + primary columns --------------------- */

function classifyDatasetIntent(cols) {
  const joined = cols.join(" ").toLowerCase();
  if (/employee|payroll|salary|department|position|hire|leave|absence|hr\b/.test(joined)) return "HR";
  if (/invoice|expense|account|vendor|supplier|ap\b|ar\b|gl\b|budget|amount|payment|finance/.test(joined)) return "Finance";
  if (/order|product|sku|customer|revenue|sales|ship|channel|region/.test(joined)) return "Sales";
  if (/ticket|case|priority|sla|issue|status|resolution|incident|service/.test(joined)) return "Ops";
  if (/student|course|grade|faculty|school|class|attendance/.test(joined)) return "Education";
  if (/patient|clinic|diagnosis|treatment|appointment|visit|doctor|hospital/.test(joined)) return "Healthcare";
  return "Generic";
}

function choosePrimaryColumns(colSummary) {
  const dateCols = Object.entries(colSummary).filter(([, s]) => s.type === "date");
  const numCols  = Object.entries(colSummary).filter(([, s]) => s.type === "number");
  const catCols  = Object.entries(colSummary).filter(([, s]) => (s.type === "string" || s.type === "boolean"));

  // pick best date: longest coverage (max timeline length)
  const dateCol = dateCols.length
    ? dateCols.map(([k,v]) => [k, v]).sort((a,b)=> (b[1].timeline?.length||0) - (a[1].timeline?.length||0))[0][0]
    : null;

  // numeric preference: names hinting money/amount > quantities > largest count
  const scoredNum = numCols.map(([k,v]) => {
    const name = k.toLowerCase();
    let score = (v.count||0);
    if (moneyHeaderRegex.test(name)) score += 1000000;
    else if (qtyHeaderRegex.test(name)) score += 500000;
    return { col: k, score, meta: v };
  }).sort((a,b)=>b.score-a.score);
  const numCol = scoredNum[0]?.col || null;

  // categorical preference: entity-like names with many distinct
  const scoredCat = catCols.map(([k,v]) => {
    const name = k.toLowerCase();
    let score = (v.distinct||0);
    if (entityHeaderHints.some(h => name.includes(h))) score += 10000;
    return { col: k, score, meta: v };
  }).sort((a,b)=>b.score-a.score);
  const catCol = scoredCat[0]?.col || null;

  return { dateCol, numCol, catCol, scoredNum, scoredCat };
}

/* ------------------------------ Charts builder ------------------------------ */

function buildCharts(rows, colSummary) {
  const { dateCol, numCol, catCol } = choosePrimaryColumns(colSummary);
  const charts = [];

  // Pre-aggregated charts with data embedded (UI will render directly)
  // 1) Bar: Top categories
  if (catCol) {
    const top = (colSummary[catCol].top || []).slice(0, 15);
    const barData = top.map(t => ({ name: t.value, value: t.count }));
    if (barData.length) {
      charts.push({
        type: "bar",
        title: `Top ${catCol}`,
        dataKey: "value",
        nameKey: "name",
        data: barData,
        currentType: "bar"
      });
    }
  }

  // 2) Line: over time
  if (dateCol) {
    // default to counts over time
    const timeline = colSummary[dateCol].timeline || [];
    let lineData = timeline.map(d => ({ date: d.date, ts: new Date(d.date).getTime(), value: d.count }));
    // if we have a numeric column, sum it by day instead of count
    if (dateCol && numCol) {
      const byDay = new Map();
      for (const r of rows) {
        const d = toDate(r?.[dateCol], dateCol);
        const n = toNumber(r?.[numCol]);
        if (!d || !Number.isFinite(n)) continue;
        const key = d.toISOString().slice(0,10);
        byDay.set(key, (byDay.get(key) || 0) + n);
      }
      lineData = Array.from(byDay.entries())
        .map(([date, value]) => ({ date, ts: new Date(date).getTime(), value }))
        .sort((a,b)=>a.ts-b.ts);
    }
    if (lineData.length) {
      charts.push({
        type: "line",
        title: dateCol && numCol ? `Daily ${numCol}` : `Entries over time`,
        dataKey: "value",
        nameKey: "date",
        data: lineData,
        currentType: "line"
      });
    }
  }

  // 3) Pie: category distribution (by count)
  if (catCol) {
    const top = (colSummary[catCol].top || []).slice(0, 12);
    const pieData = top.map(t => ({ name: t.value, value: t.count }));
    if (pieData.length) {
      charts.push({
        type: "pie",
        title: `Distribution of ${catCol}`,
        dataKey: "value",
        nameKey: "name",
        data: pieData,
        currentType: "pie"
      });
    }
  }

  // 4) Area: numeric by category (sum)
  if (catCol && numCol) {
    const agg = new Map();
    for (const r of rows) {
      const c = r?.[catCol];
      const n = toNumber(r?.[numCol]);
      if (c == null || c === "" || !Number.isFinite(n)) continue;
      agg.set(String(c), (agg.get(String(c)) || 0) + n);
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
        data: areaData,
        currentType: "area"
      });
    }
  }

  // 5) Composed: value + count per category
  if (catCol) {
    const agg = new Map();
    for (const r of rows) {
      const c = r?.[catCol];
      if (c == null || c === "") continue;
      const k = String(c);
      const a = agg.get(k) || { name: k, value: 0, count: 0 };
      a.count += 1;
      if (numCol && isFiniteNumber(r?.[numCol])) a.value += Number(r[numCol]);
      agg.set(k, a);
    }
    const composed = Array.from(agg.values()).sort((a,b)=> (b.value||b.count) - (a.value||a.count)).slice(0, 20);
    if (composed.length) {
      charts.push({
        type: "composed",
        title: numCol ? `${numCol} & Count by ${catCol}` : `Count by ${catCol}`,
        dataKey: "value",
        nameKey: "name",
        data: composed,
        currentType: "composed"
      });
    }
  }

  return charts;
}

/* ------------------------------ Key metrics ------------------------------ */

function pct(n, d) { return d ? Math.round((n / d) * 1000) / 10 : 0; }

function completionRateFromStatus(summary) {
  // try common status fields
  for (const [col, s] of Object.entries(summary)) {
    if (s.type !== "string" && s.type !== "boolean") continue;
    const L = col.toLowerCase();
    if (!/status|state|stage|phase|result|outcome/.test(L)) continue;
    const top = s.top || [];
    const total = top.reduce((a,b)=>a + b.count, 0);
    const done = top.filter(x => /done|closed|complete|completed|delivered|paid|approved|resolved|shipped|posted/i.test(x.value)).reduce((a,b)=>a+b.count,0);
    const open = top.filter(x => /open|pending|in.?progress|new|draft|unpaid|unshipped|waiting/i.test(x.value)).reduce((a,b)=>a+b.count,0);
    return { column: col, total, done, open, rate: pct(done, total) };
  }
  return null;
}

function trendLast30(colSummary, dateCol) {
  if (!dateCol) return null;
  const tl = colSummary[dateCol]?.timeline || [];
  if (!tl.length) return null;
  const now = new Date(colSummary[dateCol]?.maxDate || Date.now());
  const dayMs = 86400000;
  const start2 = new Date(now.getTime() - 60*dayMs);
  const start1 = new Date(now.getTime() - 30*dayMs);

  let p1 = 0, p2 = 0;
  for (const d of tl) {
    const ts = new Date(d.date).getTime();
    if (ts > start1.getTime() && ts <= now.getTime()) p1 += d.count;
    else if (ts > start2.getTime() && ts <= start1.getTime()) p2 += d.count;
  }
  const delta = p2 ? Math.round(((p1 - p2) / p2) * 1000) / 10 : null;
  return { current: p1, previous: p2, deltaPct: delta, windowDays: 30 };
}

function buildKeyMetrics(rows, colSummary) {
  const rowCount = rows.length;
  const cols = Object.keys(colSummary);
  const intent = classifyDatasetIntent(cols);

  const { dateCol, numCol, catCol, scoredCat, scoredNum } = choosePrimaryColumns(colSummary);

  const metrics = [
    { title: "Total Records", value: String(rowCount), description: "Total number of entries in the dataset." },
    { title: "Columns", value: String(cols.length), description: "Number of fields." },
  ];

  // Time coverage
  if (dateCol) {
    const minISO = colSummary[dateCol].minDate;
    const maxISO = colSummary[dateCol].maxDate;
    if (minISO && maxISO) {
      metrics.push({
        title: "Time Coverage",
        value: `${minISO.slice(0,10)} → ${maxISO.slice(0,10)}`,
        description: `From first to last ${dateCol}.`,
      });

      const t = trendLast30(colSummary, dateCol);
      if (t) {
        const sign = t.deltaPct === null ? "" : (t.deltaPct >= 0 ? "▲" : "▼");
        metrics.push({
          title: `Last ${t.windowDays} days`,
          value: `${t.current} (${sign}${t.deltaPct ?? 0}%)`,
          description: `vs previous ${t.windowDays} days (${t.previous}).`,
        });
      }
    }
  }

  // Distinct entities (most “entity-like” categorical)
  const entityCat = scoredCat.find(c => entityHeaderHints.some(h => c.col.toLowerCase().includes(h)))?.col || catCol;
  if (entityCat && colSummary[entityCat]?.distinct != null) {
    metrics.push({
      title: `Distinct ${entityCat}`,
      value: String(colSummary[entityCat].distinct),
      description: `Unique ${entityCat} values.`,
    });
  }

  // Primary numeric KPI (money preferred, otherwise most-complete numeric)
  if (numCol) {
    const nMeta = colSummary[numCol];
    const sum = nMeta?.sum ?? 0;
    const mean = nMeta?.mean ?? 0;
    metrics.push(
      { title: `Total ${numCol}`, value: String(Math.round(sum * 100) / 100), description: `Sum across all records.` },
      { title: `Avg ${numCol}`, value: String(Math.round(mean * 100) / 100), description: `Average per record.` }
    );
  }

  // Completion/Delivery/Closed rate if present
  const comp = completionRateFromStatus(colSummary);
  if (comp) {
    metrics.push({
      title: `Completion (${comp.column})`,
      value: `${comp.rate}%`,
      description: `${comp.done} done of ${comp.total}; ${comp.open} open.`,
    });
  }

  // Keep the top 6 most useful
  return metrics.slice(0, 6);
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
    charts,            // pre-aggregated data arrays for reliable rendering
    keyMetrics,        // manager-grade metrics
  };
}

/* ------------------------------ AI Calls ------------------------------ */
/**
 * We use AI ONLY for narrative text. Metrics and charts are deterministic and based
 * on FULL dataset aggregates computed above. (Per your request, chatbot code remains unchanged.)
 */

export async function analyzeDatasetWithAI({ headers, fileData }) {
  const rows = Array.isArray(fileData) ? fileData : [];
  const preStats = computePreStats(rows);

  // Strict prompt (narrative only)
  const prompt = [
    "ROLE: You are a precise data analyst.",
    "RULES:",
    "- Use ONLY the numbers inside PRE_STATS; do not estimate or predict.",
    "- Write in clear, executive-friendly language (2-5 sentences).",
    "",
    "OUTPUT JSON: { \"analysisText\": string }",
    "",
    "PRE_STATS:",
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
        properties: { analysisText: { type: "STRING" } },
        required: ["analysisText"]
      }
    }
  };

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
    /* ignore; keep local results */
  }

  return {
    analysisText,
    keyMetrics: preStats.keyMetrics,
    charts: preStats.charts,
    preStats
  };
}

/**
 * DO NOT TOUCH: you asked to keep chatbot logic as-is.
 * Answer a user question strictly from FULL-DATA aggregates (preStats).
 */
export async function answerQuestionWithAI({ userQuery, fullData, preStats }) {
  // (unchanged) — keep your existing implementation
  const stats = preStats || computePreStats(Array.isArray(fullData) ? fullData : []);

  const prompt = [
    "ROLE: You are a precise data analyst and must answer using ONLY the aggregates provided.",
    "",
    "USER QUESTION:",
    userQuery,
    "",
    "PRE_STATS:",
    JSON.stringify(stats),
    "",
    "STRICT RULES:",
    "- Use only numbers in PRE_STATS. No estimates.",
    "- If unavailable, say so briefly and offer the closest metric.",
    "- Keep it concise and actionable.",
    "",
    "FORMAT: plain text",
  ].join("\n");

  const payload = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0, topK: 1, topP: 0 },
  };

  try {
    const response = await fetch("/api/answer-question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) return localQAFallback(userQuery, stats);

    const result = await response.json();
    const aiResponseText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponseText) return localQAFallback(userQuery, stats);

    return aiResponseText;
  } catch {
    return localQAFallback(userQuery, stats);
  }
}

/* ------------------------------ Local QA Fallback (unchanged) ------------------------------ */

function localQAFallback(userQuery, stats) {
  const q = (userQuery || "").toLowerCase();

  if (q.includes("row") || q.includes("record") || q.includes("count")) {
    return `Total rows: ${stats.rows}.`;
  }

  const catCandidates = Object.entries(stats.columnSummary || {}).filter(
    ([, s]) => s.type === "string" || s.type === "boolean"
  );
  if ((/most\s+(sold|popular|common)/.test(q) || q.includes("top")) && catCandidates.length) {
    const best = catCandidates
      .map(([k, s]) => ({ col: k, first: s.top?.[0]?.count || 0, label: s.top?.[0]?.value }))
      .sort((a, b) => b.first - a.first)[0];

    if (best && best.label) return `Top ${best.col}: ${best.label} (${best.first}).`;
  }

  const numCols = Object.entries(stats.columnSummary || {})
    .filter(([, s]) => s.type === "number")
    .map(([k, v]) => ({ col: k, sum: v.sum || 0, count: v.count || 0 }))
    .sort((a, b) => b.count - a.count);

  if (numCols.length) return `Sum of ${numCols[0].col}: ${numCols[0].sum}.`;

  return "I can only answer from aggregates computed over the full dataset. Please ask about totals, averages, top categories, or trends that exist in the current fields.";
}
