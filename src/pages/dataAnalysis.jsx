// File: src/pages/HelpersAndStats.jsx
/***********************************
 * Helpers
 ***********************************/
export function hexToRgba(hex, alpha = 1) {
  const h = hex.replace("#", "");
  const bigint = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16 
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// --- Date helpers & downsampling (ADDED) ---
export function isExcelSerial(n) {
  return typeof n === "number" && n > 35000 && n < 60000; // ~1996–2064
}
export function excelSerialToDate(n) {
  const ms = (n - 25569) * 86400 * 1000;
  return new Date(ms);
}
export function asTimestamp(v) {
  if (v instanceof Date) return v.getTime();
  if (typeof v === "number" && isExcelSerial(v))
    return excelSerialToDate(v).getTime();
  const dt = new Date(v);
  return isNaN(dt.getTime()) ? null : dt.getTime();
}
export function formatDateShort(ts) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
}
export function downsampleEveryN(arr, maxPoints = 200) {
  if (arr.length <= maxPoints) return arr;
  const step = Math.ceil(arr.length / maxPoints);
  const out = [];
  for (let i = 0; i < arr.length; i += step) out.push(arr[i]);
  if (out[out.length - 1] !== arr[arr.length - 1])
    out.push(arr[arr.length - 1]);
  return out;
}
/***********************************
 * Local stats engine (categorical counts + numeric stats)
 ***********************************/
export function isNumeric(x) {
  if (x === null || x === undefined) return false;
  const n = Number(x);
  return Number.isFinite(n);
}

export function detectTypes(rows) {
  const headers = Object.keys(rows[0] || {});
  const numeric = [];
  const categorical = [];
  for (const h of headers) {
    // consider numeric if at least one row has a numeric value in this column
    const anyNum = rows.some((r) => isNumeric(r[h]));
    if (anyNum) numeric.push(h);
    else categorical.push(h);
  }
  return { headers, numeric, categorical };
}

export function buildStats(rows) {
  const { headers, numeric, categorical } = detectTypes(rows);

  // valueCounts for each categorical column
  const valueCounts = {};
  for (const col of categorical) {
    const map = new Map();
    for (const r of rows) {
      const raw = r[col];
      const k = raw === undefined || raw === null ? "" : String(raw).trim();
      if (!k) continue;
      map.set(k, (map.get(k) || 0) + 1);
    }
    valueCounts[col] = Array.from(map, ([key, count]) => ({ key, count })).sort(
      (a, b) => b.count - a.count
    );
  }

  // simple numeric stats
  const numStats = {};
  for (const col of numeric) {
    let sum = 0,
      cnt = 0,
      min = Infinity,
      max = -Infinity;
    for (const r of rows) {
      const v = Number(r[col]);
      if (!Number.isFinite(v)) continue;
      sum += v;
      cnt++;
      if (v < min) min = v;
      if (v > max) max = v;
    }
    numStats[col] = { sum, avg: cnt ? sum / cnt : 0, min, max, count: cnt };
  }

  return { headers, numeric, categorical, valueCounts, numStats };
}
/***********************************
 * Generic schema + NLQ (NO domain hints)
 ***********************************/
export function norm(s){ return String(s||"").toLowerCase().trim(); }
export function tokensOf(s){ return norm(s).replace(/[^a-z0-9\s]/g," ").split(/\s+/).filter(Boolean); }

export function bestMatch(headers, tokens, restrictSet=null){
  // returns the header with max overlap to tokens (no hard-coded synonyms)
  let best=null, bestScore=-1;
  const pool = restrictSet ? headers.filter(h => restrictSet.has(h)) : headers;
  for(const h of pool){
    const H = norm(h);
    let score=0;
    for(const t of tokens){ if(!t) continue; if(H===t) score+=3; else if(H.includes(t)) score+=1; }
    if(score>bestScore){ best=h; bestScore=score; }
  }
  return best || pool[0] || null;
}

export function cardinalityFor(col, rows){
  const set = new Set();
  for(const r of rows){ const v=r[col]; if(v!==undefined && v!==null && v!=="") set.add(String(v)); }
  return set.size;
}

export function inferGenericSchema(stats, rows){
  const headers = stats.headers || Object.keys(rows[0]||{});
  const numericSet = new Set(stats.numeric||[]);
  const categoricalSet = new Set(stats.categorical||headers.filter(h=>!numericSet.has(h)));

  // candidate dimensions = categorical with reasonable cardinality (2..100), pick the most descriptive (higher but not crazy)
  const dims = [...categoricalSet].map(h => ({h, card: cardinalityFor(h, rows)}))
    .filter(x => x.card>=2 && x.card<=100)
    .sort((a,b)=> b.card - a.card);

  // candidate measures = numeric, pick the one with biggest sum (from numStats)
  const numStats = stats.numStats || {};
  const meas = [...numericSet].map(h => ({h, sum: (numStats[h]?.sum ?? 0), spread: (numStats[h]?.max ?? 0) - (numStats[h]?.min ?? 0)}))
    .sort((a,b)=> b.sum - a.sum || b.spread - a.spread);

  return {
    headers,
    dims: dims.map(d=>d.h),
    measures: meas.map(m=>m.h),
    defaultDim: (dims[0]?.h) || ([...categoricalSet][0]||headers[0]||null),
    defaultMeasure: (meas[0]?.h) || null,
  };
}

export function sumBy(rows, nameKey, valueKey){
  const map=new Map();
  for(const r of rows){
    const n=r[nameKey]; if(n===undefined||n===null||n==="") continue;
    let v=Number(r[valueKey]); if(!Number.isFinite(v)) v=1;
    map.set(n,(map.get(n)||0)+v);
  }
  return Array.from(map,([name,value])=>({name,value}));
}
export function countBy(rows, nameKey){
  const map=new Map();
  for(const r of rows){
    const n=r[nameKey]; if(n===undefined||n===null||n==="") continue;
    map.set(n,(map.get(n)||0)+1);
  }
  return Array.from(map,([name,value])=>({name,value}));
}
export function sortTop(list,k=1,dir="desc"){
  const s=[...list].sort((a,b)=> dir==="desc"? b.value-a.value : a.value-b.value);
  return s.slice(0,k);
}

/** Parse intents in a generic way (no domain words) */
export function parseQuery(q, schema){
  const txt = norm(q);
  const toks = tokensOf(q);

  // top / best / highest / top N  [optionally "by <col>"]
  const topRe = /(top\s*\d*|best|highest|max|top-?selling)/;
  if(topRe.test(txt)){
    const m = txt.match(/top\s*(\d+)/);
    const k = m ? Math.max(1, parseInt(m[1],10)) : 1;
    let byCol = null;
    const byM = txt.match(/\bby\s+([a-z0-9 _-]+)$/);
    if(byM){
      const byTokens = tokensOf(byM[1]);
      byCol = bestMatch(schema.headers, byTokens, new Set(schema.measures));
    }
    // dimension: try to match any header tokens, but prefer dims
    const dim = bestMatch(schema.headers, toks, new Set(schema.dims)) || schema.defaultDim;
    // measure: if "by" picked a numeric, use it; else choose the best numeric match from user tokens; else default
    const measFromTokens = bestMatch(schema.headers, toks, new Set(schema.measures));
    const measure = byCol || measFromTokens || schema.defaultMeasure;
    return {type:"top", k, dim, measure};
  }

  // totals / averages (optionally grouped by <col>)
  const isTotal = /(total|sum|overall|grand\s*total)/.test(txt);
  const isAvg   = /(average|avg|mean)/.test(txt);
  if(isTotal || isAvg){
    let measure = bestMatch(schema.headers, toks, new Set(schema.measures)) || schema.defaultMeasure;
    let dim = null;
    const byM = txt.match(/\bby\s+([a-z0-9 _-]+)$/);
    if(byM){
      const byTokens = tokensOf(byM[1]);
      dim = bestMatch(schema.headers, byTokens, new Set(schema.dims)) || null;
    }
    return {type: isAvg ? "avg":"total", measure, dim};
  }

  // counts by X / each X how many
  if(/(counts?\s+by\s+|each\s+.+\s+how\s+many)/.test(txt)){
    const dim = bestMatch(schema.headers, toks, new Set(schema.dims)) || schema.defaultDim;
    return {type:"counts-by", dim};
  }

  // most common <dim>
  const m = txt.match(/most\s+(?:common|frequent)\s+(.+)$/);
  if(m){
    const dim = bestMatch(schema.headers, tokensOf(m[1]), new Set(schema.dims)) || schema.defaultDim;
    return {type:"most-common", dim};
  }

  // very short follow-ups like "what is it?" / "which one?"
  if(/^(what\s+is\s+it|which\s+one)\??$/.test(txt)){
    return {type:"followup-top-name"};
  }

  // "what is the <header>?" as a follow-up name request
  const whatHeader = txt.match(/^what\s+is\s+the\s+(.+)\??$/);
  if(whatHeader){ return {type:"followup-top-name", askedHeader: whatHeader[1]}; }

  return {type:"unknown"};
}

/** Purely generic answering */
export function answerFromData(query, rows, stats, lastCtxRef){
  if(!rows?.length) return null;
  const schema = inferGenericSchema(stats, rows);
  const intent = parseQuery(query, schema);
  const setCtx = (o)=>{ if(lastCtxRef) lastCtxRef.current=o; };

  switch(intent.type){
    case "top": {
      const dim = intent.dim || schema.defaultDim;
      const measure = intent.measure || schema.defaultMeasure;
      if(!dim || !measure) return null;
      const data = sumBy(rows, dim, measure);
      const winners = sortTop(data, intent.k, "desc");
      setCtx({ type:"top", dim, measure, winners });
      if(!winners.length) return `I can't answer that from this data.`;
      if(intent.k===1) return `Top **${dim}** by **${measure}** is **${winners[0].name}** with **${winners[0].value}**.`;
      const list = winners.map((d,i)=>`${i+1}) **${d.name}** (${d.value})`).join(" · ");
      return `Top ${intent.k} **${dim}** by **${measure}** → ${list}`;
    }
    case "followup-top-name": {
      const ctx = lastCtxRef?.current;
      if(ctx?.type==="top" && ctx.winners?.length){
        // if user asked "what is the <header>?" and it equals ctx.dim header name, still return name
        return `**${ctx.winners[0].name}**`;
      }
      return `I can't answer that from this data.`;
    }
    case "total": {
      const m = intent.measure || schema.defaultMeasure;
      if(!m) return null;
      if(intent.dim){
        const data = sumBy(rows, intent.dim, m);
        if(!data.length) return `I can't answer that from this data.`;
        return `Total **${m}** by **${intent.dim}** → ` + data.map(d=>`**${d.name}**: ${d.value}`).join(" · ");
      }
      const total = rows.reduce((s,r)=> s+(Number(r[m])||0), 0);
      return `Total **${m}** is **${total}**.`;
    }
    case "avg": {
      const m = intent.measure || schema.defaultMeasure;
      if(!m) return null;
      if(intent.dim){
        const map=new Map();
        for(const r of rows){
          const k=r[intent.dim]; if(k===undefined||k===null||k==="") continue;
          const v=Number(r[m]); if(!Number.isFinite(v)) continue;
          const o=map.get(k)||{sum:0,cnt:0}; o.sum+=v; o.cnt+=1; map.set(k,o);
        }
        const parts = Array.from(map,([name,o])=>`**${name}**: ${(o.cnt? o.sum/o.cnt : 0).toFixed(2)}`);
        if(!parts.length) return `I can't answer that from this data.`;
        return `Average **${m}** by **${intent.dim}** → ` + parts.join(" · ");
      }
      const arr = rows.map(r=>Number(r[m])).filter(Number.isFinite);
      const avg = arr.length? (arr.reduce((a,b)=>a+b,0)/arr.length):0;
      return `Average **${m}** is **${avg.toFixed(2)}**.`;
    }
    case "most-common": {
      const dim = intent.dim || schema.defaultDim;
      const data = countBy(rows, dim);
      if(!data.length) return `I can't answer that from this data.`;
      const top = sortTop(data,1,"desc")[0];
      setCtx({ type:"top", dim, measure:"count", winners:[{name:top.name,value:top.value}] });
      return `Most common **${dim}** is **${top.name}** with **${top.value}** records.`;
    }
    case "counts-by": {
      const dim = intent.dim || schema.defaultDim;
      const data = countBy(rows, dim);
      if(!data.length) return `I can't answer that from this data.`;
      return `Counts by **${dim}** → ` + data.map(d=>`**${d.name}**: ${d.value}`).join(" · ");
    }
    default:
      return null;
  }
}

export function findHeader(headers, queryLike) {
  if (!queryLike) return null;
  const q = queryLike.toLowerCase().trim();
  // exact
  let h = headers.find((h) => h.toLowerCase() === q);
  if (h) return h;
  // partial
  h = headers.find((h) => h.toLowerCase().includes(q));
  if (h) return h;
  return null;
}

// Helpful: if user asks about “payment”, try to map to real header like “Payment Method”
export function guessPaymentHeader(headers) {
  return headers.find((h) => /payment/.test(h.toLowerCase()));
}

/***********************************
 * Local Q&A using stats (handles: most used X, each X how many, count value in column)
 ***********************************/
export function answerFromStats(query, stats) {
  if (!stats) return null;
  const q = String(query || "")
    .toLowerCase()
    .trim();
  const headers = stats.headers || [];

  // Pattern 1: "most used X" / "most common X"
  const mostUsedMatch = q.match(/most\s+(?:used|common)\s+(.+)$/);
  if (mostUsedMatch) {
    const colQ = mostUsedMatch[1].trim();
    const col =
      findHeader(headers, colQ) ||
      (/(method|type)/.test(colQ) ? guessPaymentHeader(headers) : null);
    if (col && stats.valueCounts[col]?.length) {
      const top = stats.valueCounts[col][0];
      return `The most used ${col} is **${top.key}** with **${top.count}**.`;
    }
  }

  // Pattern 2: "each X how many" / "count of each X" / "counts by X"
  const eachHowMany = q.match(
    /(?:each\s+(.+)\s+how\s+many|count(?:s)?\s+by\s+(.+)|count\s+of\s+each\s+(.+))/
  );
  if (eachHowMany) {
    const colQ = (
      eachHowMany[1] ||
      eachHowMany[2] ||
      eachHowMany[3] ||
      ""
    ).trim();
    const col =
      findHeader(headers, colQ) ||
      (/(payment)/.test(colQ) ? guessPaymentHeader(headers) : null);
    if (col && stats.valueCounts[col]?.length) {
      const list = stats.valueCounts[col]
        .map((v) => `**${v.key}**: ${v.count}`)
        .join(" · ");
      return `Counts by **${col}** → ${list}`;
    }
  }

  // Pattern 3: "how many VALUE in COLUMN" / "count VALUE in COLUMN"
  // e.g., "how many debit card in payment method"
  const howManyIn = q.match(/(?:how\s+many|count)\s+(.+?)\s+in\s+(.+)$/);
  if (howManyIn) {
    const valueQ = howManyIn[1].trim();
    const colQ = howManyIn[2].trim();
    const col =
      findHeader(headers, colQ) ||
      (/(payment)/.test(colQ) ? guessPaymentHeader(headers) : null);
    if (col && stats.valueCounts[col]) {
      const row = stats.valueCounts[col].find(
        (v) => v.key.toLowerCase() === valueQ.toLowerCase()
      );
      const count = row ? row.count : 0;
      return `The number of **${valueQ}** in **${col}** is **${count}**.`;
    }
  }

  // Lightweight follow-up like: "debit card?" → assume payment column
  if (/(debit|credit|cash|online|gift)/.test(q)) {
    const col = guessPaymentHeader(headers);
    if (col && stats.valueCounts[col]) {
      const row = stats.valueCounts[col].find((v) => v.key.toLowerCase() === q);
      if (row) return `**${row.key}** count in **${col}**: **${row.count}**.`;
    }
  }

  return null; // let the LLM try if we don't recognize the intent
}
/***********************************
 * Tiny Markdown renderer (bold/italic/code + sanitize)
 ***********************************/
export function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderMarkdownSafe(str) {
  // 1) escape any HTML to avoid XSS
  let html = escapeHtml(str);

  // 2) bold **text**
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // 3) italics *text* (avoid eating bold)
  html = html.replace(/(^|[^*])\*(?!\*)(.+?)\*(?!\*)/g, "$1<em>$2</em>");

  // 4) inline code `code`
  html = html.replace(/`(.+?)`/g, "<code>$1</code>");

  // 5) line breaks
  html = html.replace(/\n/g, "<br/>");

  return html;
}

/***********************************
 * Local fallback (non-AI)
 ***********************************/
export function buildLocalFallback(headers, rows) {
  const numericKeys = headers.filter((h) =>
    rows.some((r) => typeof r[h] === "number")
  );
  const catKeys = headers.filter((h) =>
    rows.some((r) => typeof r[h] === "string")
  );
  const dataKey =
    numericKeys[0] ||
    headers.find(
      (h) =>
        h.toLowerCase().includes("amount") ||
        h.toLowerCase().includes("sales")
    ) ||
    headers[0];
  const nameKey = catKeys[0] || headers[0];

  return {
    analysisText: `Automatic summary: ${rows.length} records across ${headers.length} columns. Top fields include ${nameKey} and ${dataKey}.`,
    keyMetrics: [
      {
        title: "Unique Categories",
        value: String(new Set(rows.map((r) => r[nameKey])).size),
        description: `Distinct values in ${nameKey}.`,
      },
      {
        title: "Sum",
        value: String(
          rows.reduce((s, r) => s + (parseFloat(r[dataKey]) || 0), 0)
        ),
        description: `Total of ${dataKey}.`,
      },
      {
        title: "Average",
        value: String(
          (
            rows.reduce((s, r) => s + (parseFloat(r[dataKey]) || 0), 0) /
            Math.max(1, rows.length)
          ).toFixed(2)
        ),
        description: `Average ${dataKey}.`,
      },
    ],
    charts: [
      { type: "bar", title: `${dataKey} by ${nameKey}`, dataKey, nameKey },
      { type: "line", title: `Trend of ${dataKey}`, dataKey, nameKey },
      { type: "pie", title: `Share of ${nameKey}`, dataKey, nameKey },
      { type: "area", title: `Area ${dataKey}`, dataKey, nameKey },
      { type: "composed", title: `Composed view`, dataKey, nameKey },
    ],
  };
}
