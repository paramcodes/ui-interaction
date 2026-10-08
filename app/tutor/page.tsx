"use client";

import { useState } from "react";
import { concepts } from "@/lib/domain";
import { MODES } from "@/lib/tutor";

export default function Tutor() {
  const [slug, setSlug] = useState(concepts[0].slug);
  const [mode, setMode] = useState<string>("explain");
  const [question, setQ] = useState("");
  const [out, setOut] = useState("");
  const [busy, setBusy] = useState(false);

  async function ask() {
    setBusy(true);
    setOut("");
    let status;
    try {
      status = JSON.parse(localStorage.getItem("atlas") || "{}")[slug];
    } catch {}

    try {
      const r = await fetch("/api/tutor", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slug, mode, status, question }),
      });
      const d = await r.json();
      setOut(
        d.answer ??
          `No ANTHROPIC_API_KEY configured on server. Here is the grounded prompt context ready for any AI assistant:\n\n${d.prompt ?? d.error}`
      );
    } catch {
      setOut("Request failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="space-y-6">
      {/* Hero Header */}
      <section className="table-mat p-6 md:p-8">
        <div className="flex items-center justify-between">
          <span className="badge-pill bg-[#ff7d9e] text-xs font-black text-[#4a3428]">
            🤖 GROUNDED AI TUTOR
          </span>
          <span className="text-xs font-extrabold text-[#4a3428]">
            KNOWLEDGE BASE INTEGRATED
          </span>
        </div>

        <h1 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-[#4a3428]">
          AI Tutor
        </h1>

        <p className="mt-2 text-sm md:text-base font-bold text-[#4a3428] max-w-2xl leading-relaxed">
          Ask questions about UI interaction mechanics, request code breakdowns, get quizzed on edge cases,
          or critique implementations grounded in the Atlas domain model.
        </p>
      </section>

      {/* Inquiry Controls Plate */}
      <section className="table-plate p-5 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b-2 border-[#4a3428]/10 pb-4">
          <label className="flex flex-col gap-1.5 text-xs font-black uppercase text-[#4a3428]">
            <span>🎯 Target Concept:</span>
            <select
              className="rounded-xl border-2 border-[#4a3428] bg-[#fdf5e0] p-2.5 font-black text-sm text-[#4a3428]"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            >
              {concepts.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.term} ({c.cat})
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-xs font-black uppercase text-[#4a3428]">
            <span>🧠 Tutor Mode:</span>
            <select
              className="rounded-xl border-2 border-[#4a3428] bg-[#fdf5e0] p-2.5 font-black text-sm text-[#4a3428]"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              {MODES.map((m) => (
                <option key={m} value={m}>
                  {m.toUpperCase()}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4">
          <label className="block text-xs font-black uppercase text-[#4a3428] mb-1.5">
            Your Question / Prompt:
          </label>
          <textarea
            aria-label="Your question"
            className="w-full text-sm font-bold min-h-24"
            value={question}
            onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. How do I prevent background scrolling when a modal opens? What are the WCAG requirements?"
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            className="btn btn-primary"
            disabled={busy}
            onClick={ask}
          >
            <span>{busy ? "⏳ Thinking…" : "⚡ Ask AI Tutor"}</span>
          </button>

          <span className="text-xs font-bold text-[#4a3428]">
            Grounded in lib/domain.ts concept specs
          </span>
        </div>
      </section>

      {/* Terminal Output Plate */}
      <section className="dark-plate p-5 md:p-6 font-mono">
        <div className="flex items-center justify-between border-b border-[#4a3428] pb-3 text-xs font-bold text-[#ffc93c]">
          <span>💻 TUTOR RESPONSE TERMINAL</span>
          <span>STATUS: {busy ? "STREAMING" : "IDLE"}</span>
        </div>

        <pre
          role="status"
          className="mt-4 whitespace-pre-wrap text-xs md:text-sm font-semibold leading-relaxed text-[#fdf5e0]"
        >
          {out || "Select a concept and mode, then click 'Ask AI Tutor' to inspect grounded explanations, quizzes, and code."}
        </pre>
      </section>
    </main>
  );
}
