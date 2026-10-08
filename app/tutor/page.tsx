"use client";
import { useState } from "react";
import { concepts } from "@/lib/domain";
import { MODES } from "@/lib/tutor";
export default function Tutor() {
  const [slug, setSlug] = useState(concepts[0].slug); const [mode, setMode] = useState<string>("explain");
  const [question, setQ] = useState(""); const [out, setOut] = useState(""); const [busy, setBusy] = useState(false);
  async function ask() {
    setBusy(true); setOut("");
    let status; try { status = JSON.parse(localStorage.getItem("atlas") || "{}")[slug]; } catch {}
    try {
      const r = await fetch("/api/tutor", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ slug, mode, status, question }) });
      const d = await r.json();
      setOut(d.answer ?? `No ANTHROPIC_API_KEY configured. Prompt you can paste into any AI:\n\n${d.prompt ?? d.error}`);
    } catch { setOut("Request failed. Try again."); } finally { setBusy(false); }
  }
  return (<main><h1 className="text-3xl font-bold">AI Tutor</h1>
    <div className="mt-4 flex flex-wrap gap-3">
      <label>Concept <select className="rounded border p-1" value={slug} onChange={(e) => setSlug(e.target.value)}>{concepts.map((c) => <option key={c.slug} value={c.slug}>{c.term}</option>)}</select></label>
      <label>Mode <select className="rounded border p-1" value={mode} onChange={(e) => setMode(e.target.value)}>{MODES.map((m) => <option key={m}>{m}</option>)}</select></label></div>
    <textarea aria-label="Your question" className="mt-3 w-full rounded border p-2" value={question} onChange={(e) => setQ(e.target.value)} placeholder="Optional question" />
    <button className="btn mt-2" disabled={busy} onClick={ask}>{busy ? "Thinking…" : "Ask"}</button>
    <pre role="status" className="mt-4 whitespace-pre-wrap rounded bg-slate-100 p-3 text-sm">{out}</pre></main>);
}
