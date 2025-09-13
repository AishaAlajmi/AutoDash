// onefile-multi-model.js
// Single-file Multi-Model Lab (server + UI)
// Run:
//   npm i express morgan cors dotenv openai @anthropic-ai/sdk @google/generative-ai
//   node onefile-multi-model.js
// .env (same folder):
//   OPENAI_API_KEY=sk-...
//   ANTHROPIC_API_KEY=sk-ant-...
//   GOOGLE_API_KEY=AIza...
//   OPENROUTER_API_KEY=or-...
//
// Open http://localhost:8787

import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("tiny"));

/* -------------------- Providers -------------------- */
async function callOpenAI({ model, prompt, system, temperature, maxTokens }) {
  if (!process.env.OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const t0 = Date.now();
  const r = await openai.chat.completions.create({
    model,
    temperature: Number(temperature ?? 0.7),
    max_tokens: Number(maxTokens ?? 512),
    messages: [
      ...(system ? [{ role: "system", content: system }] : []),
      { role: "user", content: prompt }
    ]
  });
  return { text: r.choices?.[0]?.message?.content ?? "", usage: r.usage ?? {}, elapsedMs: Date.now()-t0 };
}
async function callAnthropic({ model, prompt, system, temperature, maxTokens }) {
  if (!process.env.ANTHROPIC_API_KEY) throw new Error("Missing ANTHROPIC_API_KEY");
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const t0 = Date.now();
  const r = await anthropic.messages.create({
    model,
    temperature: Number(temperature ?? 0.7),
    max_tokens: Number(maxTokens ?? 512),
    system: system || undefined,
    messages: [{ role:"user", content: prompt }]
  });
  const text = r.content?.map(p => p.text).join("") ?? "";
  return { text, usage: r.usage ?? {}, elapsedMs: Date.now()-t0 };
}
async function callGoogle({ model, prompt, system, temperature, maxTokens }) {
  if (!process.env.GOOGLE_API_KEY) throw new Error("Missing GOOGLE_API_KEY");
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const m = genAI.getGenerativeModel({ model, systemInstruction: system || undefined });
  const t0 = Date.now();
  const r = await m.generateContent({
    contents: [{ role:"user", parts:[{ text: prompt }] }],
    generationConfig: { temperature:Number(temperature ?? 0.7), maxOutputTokens:Number(maxTokens ?? 512) }
  });
  return { text: r.response?.text() ?? "", usage:{}, elapsedMs: Date.now()-t0 };
}
async function callOpenRouter({ model, prompt, system, temperature, maxTokens }) {
  if (!process.env.OPENROUTER_API_KEY) throw new Error("Missing OPENROUTER_API_KEY");
  const t0 = Date.now();
  const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      temperature: Number(temperature ?? 0.7),
      max_tokens: Number(maxTokens ?? 512),
      messages: [
        ...(system ? [{ role:"system", content: system }] : []),
        { role:"user", content: prompt }
      ]
    })
  });
  if (!resp.ok) throw new Error(`OpenRouter: ${await resp.text()}`);
  const j = await resp.json();
  return { text: j.choices?.[0]?.message?.content ?? "", usage: j.usage ?? {}, elapsedMs: Date.now()-t0 };
}

/* -------------------- API -------------------- */
app.get("/health", (_,res)=>res.json({ok:true}));

// Simple fetcher to ground with a URL
app.get("/api/fetch", async (req,res)=>{
  try{
    const { url } = req.query;
    if (!url) return res.status(400).json({ error:"Missing url" });
    const r = await fetch(url);
    const text = await r.text();
    res.json({ ok:true, text });
  }catch(e){ res.status(500).json({ ok:false, error:e.message }); }
});

// Unified generation
app.post("/api/generate", async (req,res)=>{
  const { provider, model, prompt, system, temperature, maxTokens } = req.body || {};
  if (!provider || !model || !prompt) return res.status(400).json({ error:"provider, model, prompt required" });
  try{
    let out;
    if (provider==="openai") out = await callOpenAI({ model, prompt, system, temperature, maxTokens });
    else if (provider==="anthropic") out = await callAnthropic({ model, prompt, system, temperature, maxTokens });
    else if (provider==="google") out = await callGoogle({ model, prompt, system, temperature, maxTokens });
    else if (provider==="openrouter") out = await callOpenRouter({ model, prompt, system, temperature, maxTokens });
    else throw new Error("Unknown provider");
    res.json({ ok:true, ...out });
  }catch(e){ res.status(500).json({ ok:false, error:e.message }); }
});

/* -------------------- Single-page UI -------------------- */
const HTML = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>⚡ Multi-Model Lab (One-File)</title>
<style>
:root{--bg:#0f1115;--panel:#151821;--muted:#9aa5b1;--brand:#6ea8fe;--err:#ff6b6b}
*{box-sizing:border-box} body{margin:0;background:var(--bg);color:#e6e8ee;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif}
.app{max-width:1280px;margin:0 auto;padding:20px 14px 40px}
.header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.brand{font-weight:800;letter-spacing:.3px}
.controls{display:grid;grid-template-columns:1fr 200px 120px 110px;gap:10px;margin-bottom:10px}
input,textarea,select,button{background:#0d0f14;color:#e6e8ee;border:1px solid #2a2f3a;border-radius:10px;padding:10px 12px;outline:none}
textarea{min-height:90px}
button.primary{background:var(--brand);border-color:var(--brand);color:#0b0e14;font-weight:800}
button.ghost{background:transparent}
.grid{display:grid;gap:12px;grid-template-columns:repeat(4,1fr)}
.panel{background:var(--panel);border:1px solid #2a2f3a;border-radius:14px;padding:12px;min-height:260px;display:flex;flex-direction:column}
.panel header{display:flex;gap:8px;align-items:center;margin-bottom:6px}
.badge{font-size:12px;color:var(--muted)}
.meta{margin-left:auto;font-size:12px;color:var(--muted);display:flex;gap:8px}
.output{white-space:pre-wrap;line-height:1.45;font-size:.95rem}
.small{font-size:12px;color:var(--muted)}
hr{border:none;height:1px;background:#2a2f3a;margin:8px 0}
.row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
@media(max-width:1100px){.grid{grid-template-columns:1fr 1fr}.controls{grid-template-columns:1fr}}
@media(max-width:640px){.grid{grid-template-columns:1fr}}
</style></head>
<body><div class="app">
  <div class="header">
    <div class="brand">⚡ Multi-Model Lab</div>
    <div class="small">Tip: add a URL and it will fetch + inject page text.</div>
  </div>

  <div class="controls">
    <input id="url" placeholder="(Optional) Research URL"/>
    <select id="select">
      <option value="all">All models</option>
      <option value="0">OpenAI • gpt-4o-mini</option>
      <option value="1">Anthropic • Claude 3.5 Sonnet</option>
      <option value="2">Google • Gemini 1.5 Flash</option>
      <option value="3">OpenRouter • Llama 3.1-70B</option>
    </select>
    <input id="temp" type="number" min="0" max="1" step="0.1" value="0.7" title="temperature"/>
    <input id="max" type="number" min="64" max="4096" step="64" value="512" title="max tokens"/>
  </div>

  <textarea id="system" placeholder="(Optional) System instruction"></textarea>
  <div class="row" style="margin:10px 0">
    <textarea id="prompt" placeholder="Your prompt…"
      style="flex:1"></textarea>
    <button class="primary" id="run">Run ▶</button>
    <button class="ghost" id="judge">Judge 🔎</button>
    <button class="ghost" id="export">Export ⬇</button>
  </div>

  <div class="grid" id="grid"></div>
</div>

<script>
const MODELS = [
  { provider:"openai",     model:"gpt-4o-mini", label:"OpenAI • gpt-4o-mini" },
  { provider:"anthropic",  model:"claude-3-5-sonnet-20240620", label:"Anthropic • Claude 3.5 Sonnet" },
  { provider:"google",     model:"gemini-1.5-flash", label:"Google • Gemini 1.5 Flash" },
  { provider:"openrouter", model:"meta-llama/llama-3.1-70b-instruct:free", label:"OpenRouter • Llama 3.1-70B" }
];
const grid = document.getElementById("grid");
let latest = [];

function panelTemplate(i){
  const m = MODELS[i];
  return \`
    <div class="panel" id="p\${i}">
      <header><div class="badge">\${m.label}</div><div class="meta"><span id="t\${i}">⏱ …</span><span id="c\${i}">💲 ~?</span></div></header>
      <hr/>
      <div class="output" id="o\${i}"></div>
      <hr/>
      <div class="row"><button class="ghost" onclick="copyText(\${i})">Copy</button><span class="small" id="s\${i}"></span></div>
    </div>\`;
}

function mountPanels(indices){
  grid.innerHTML = indices.map(panelTemplate).join("");
}
function estimateCost(model, inputText, outputText){
  const price = {
    "gpt-4o-mini:in":0.15,"gpt-4o-mini:out":0.60,
    "claude-3-5-sonnet-20240620:in":3.0,"claude-3-5-sonnet-20240620:out":15.0,
    "gemini-1.5-flash:in":0.35,"gemini-1.5-flash:out":0.53,
    "meta-llama/llama-3.1-70b-instruct:free:in":0,"meta-llama/llama-3.1-70b-instruct:free:out":0
  };
  const inTok=Math.ceil((inputText?.length||0)/4), outTok=Math.ceil((outputText?.length||0)/4);
  const cost=(inTok/1e6)*(price[\`\${model}:in\`]||0)+(outTok/1e6)*(price[\`\${model}:out\`]||0);
  return { inTok, outTok, cost:Number(cost.toFixed(6)) };
}
function copyText(i){
  const el = document.getElementById("o"+i);
  navigator.clipboard.writeText(el.textContent||"");
}

async function maybeFetchUrl(url){
  if(!url) return "";
  try{
    const r = await fetch("/api/fetch?url="+encodeURIComponent(url));
    const j = await r.json();
    if(!j.ok) return "";
    return "\\n\\n---\\nContext from "+url+" (first 20k chars):\\n"+(j.text||"").slice(0,20000);
  }catch{ return ""; }
}

function getSelection(){
  const val = document.getElementById("select").value;
  if (val==="all") return MODELS.map((_,i)=>i);
  return [Number(val)];
}

document.getElementById("run").onclick = async ()=>{
  const url = document.getElementById("url").value.trim();
  const system = document.getElementById("system").value;
  const prompt = document.getElementById("prompt").value;
  const temperature = document.getElementById("temp").value || 0.7;
  const maxTokens = document.getElementById("max").value || 512;

  const indices = getSelection();
  mountPanels(indices);

  const context = await maybeFetchUrl(url);
  const fullPrompt = prompt + context;

  latest = [];
  await Promise.all(indices.map(async (i)=>{
    const m = MODELS[i];
    const t0 = performance.now();
    const res = await fetch("/api/generate", {
      method:"POST", headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ provider:m.provider, model:m.model, prompt:fullPrompt, system, temperature, maxTokens })
    });
    const j = await res.json();
    const elapsed = Math.round(performance.now()-t0);
    const out = (j.ok && j.text) ? j.text : ("Error: "+(j.error||"unknown"));
    latest[i] = out;
    document.getElementById("o"+i).textContent = out;
    document.getElementById("t"+i).textContent = "⏱ "+elapsed+"ms";
    const est = estimateCost(m.model, fullPrompt, out);
    document.getElementById("c"+i).textContent = "💲 ~"+est.cost;
    document.getElementById("s"+i).textContent = "Tok~ in:"+est.inTok+" out:"+est.outTok;
  }));
};

document.getElementById("judge").onclick = async ()=>{
  const firstIdx = getSelection()[0];
  if(firstIdx==null){ alert("Run first."); return; }
  const judgeModel = MODELS[firstIdx];
  const promptBox = document.getElementById("prompt").value;
  const summaryPrompt = \`You are a strict evaluator. Compare answers for the same prompt.
Give a short summary, then rank 1..n with one-line reasons.

PROMPT:
<<<
\${promptBox}
>>>

ANSWERS:
\${MODELS.map((m,i)=>"- "+m.label+":\\n"+(latest[i]||"(no output)")).join("\\n\\n")}
\`;
  const r = await fetch("/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ provider:judgeModel.provider, model:judgeModel.model, prompt:summaryPrompt, system:"Be concise.", temperature:0.2, maxTokens:400 })
  });
  const j = await r.json();
  alert(j.text || j.error || "No judge output");
};

document.getElementById("export").onclick = ()=>{
  const md = [
    "# Multi-Model Run",
    "**Prompt:** "+(document.getElementById("prompt").value||""),
    "**System:** "+(document.getElementById("system").value||"(none)"),
    "",
    ...MODELS.map((m,i)=>"## "+m.label+"\\n"+(latest[i]||"_no output_"))
  ].join("\\n\\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([md],{type:"text/markdown"}));
  a.download = "multi-model-run.md";
  a.click();
};

// initial mount
mountPanels(MODELS.map((_,i)=>i));
</script>
</body></html>`;

app.get("/", (_,res)=>res.type("html").send(HTML));

const port = Number(process.env.PORT || 8787);
app.listen(port, ()=>console.log("Multi-Model Lab at http://localhost:"+port));
