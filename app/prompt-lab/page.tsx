"use client";

import { useState } from "react";
import { buildPrompt } from "@/lib/prompt";

const OPT: Record<string, { title: string; icon: string; items: string[] }> = {
  behaviors: {
    title: "Behaviors & Platform APIs",
    icon: "🕹️",
    items: ["focus trap", "Escape dismissal", "background scroll locking", "scroll snap"],
  },
  motion: {
    title: "Motion Tokens & Physics",
    icon: "✨",
    items: ["fade + scale enter/exit", "spring entrance", "ease-out timing", "stagger"],
  },
  a11y: {
    title: "Accessibility & WCAG",
    icon: "♿",
    items: ["keyboard support", "focus restoration", "accessible name", "live region announcements"],
  },
  visual: {
    title: "Visual Hierarchy & Surface",
    icon: "🎨",
    items: ["subtle backdrop", "rounded surface", "hover elevation", "strong visual hierarchy"],
  },
};

export default function PromptLab() {
  const [component, setC] = useState("dialog");
  const [sel, setSel] = useState<Record<string, string[]>>({
    behaviors: [],
    motion: [],
    a11y: [],
    visual: [],
  });
  const [copied, setCopied] = useState(false);

  const toggle = (k: string, v: string) =>
    setSel((p) => ({
      ...p,
      [k]: p[k].includes(v) ? p[k].filter((x) => x !== v) : [...p[k], v],
    }));

  const promptText = buildPrompt({
    component,
    behaviors: sel.behaviors,
    motion: sel.motion,
    a11y: sel.a11y,
    visual: sel.visual,
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <main className="space-y-6">
      {/* Hero Header */}
      <section className="table-mat p-6 md:p-8">
        <div className="flex items-center justify-between">
          <span className="badge-pill bg-[#c4a1ff] text-xs font-black text-[#4a3428]">
            🧪 PROMPT COMPILER
          </span>
          <span className="text-xs font-extrabold text-[#4a3428]">
            FOR CODEX • CLAUDE • GPT-4
          </span>
        </div>

        <h1 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-[#4a3428]">
          Prompt Lab
        </h1>

        <p className="mt-2 text-sm md:text-base font-bold text-[#4a3428] max-w-2xl leading-relaxed">
          Synthesize bulletproof interface specifications. Select platform behaviors, motion tokens,
          and accessibility constraints to generate zero-hallucination prompts.
        </p>
      </section>

      {/* Configuration Controls */}
      <section className="table-plate p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#4a3428]/10 pb-4">
          <label className="flex items-center gap-2 text-sm font-black text-[#4a3428]">
            <span>🎯 Target Component:</span>
            <select
              className="rounded-xl border-2 border-[#4a3428] bg-[#fdf5e0] px-3 py-1.5 font-black uppercase text-[#4a3428]"
              value={component}
              onChange={(e) => setC(e.target.value)}
            >
              {["dialog", "popover", "accordion", "tabs", "carousel", "command palette"].map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </label>

          <span className="text-xs font-bold text-[#4a3428]">
            Click chips below to toggle prompt clauses
          </span>
        </div>

        {/* Categories */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          {Object.entries(OPT).map(([k, group]) => (
            <fieldset
              key={k}
              className="rounded-2xl border-2 border-[#4a3428] bg-[#fdf5e0] p-4 shadow-sm"
            >
              <legend className="px-2 text-xs font-black uppercase tracking-wider text-[#4a3428]">
                {group.icon} {group.title}
              </legend>

              <div className="mt-2 flex flex-wrap gap-2">
                {group.items.map((v) => {
                  const isChecked = sel[k].includes(v);
                  return (
                    <label
                      key={v}
                      className={`table-plate-action inline-flex items-center gap-2 rounded-xl border-2 border-[#4a3428] px-3 py-1.5 text-xs font-black transition-all ${
                        isChecked
                          ? "bg-[#ff7d9e] text-[#4a3428] shadow-[0_3px_0_#4a3428] translate-y-[-1px]"
                          : "bg-[#fffdf7] text-[#4a3428] shadow-[0_1px_0_#4a3428] hover:bg-[#fff9eb]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggle(k, v)}
                        className="h-4 w-4 rounded accent-[#4a3428]"
                      />
                      <span>{v}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
      </section>

      {/* Output Console Plate */}
      <section className="table-plate p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#4a3428]/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl border-2 border-[#4a3428] bg-[#ffc93c] text-sm shadow-[0_2px_0_#4a3428]">
              🤖
            </span>
            <h2 className="text-lg font-black text-[#4a3428]">
              Generated Specification Prompt
            </h2>
          </div>

          <button
            onClick={handleCopy}
            className="btn btn-primary text-xs font-black"
          >
            {copied ? "✓ Copied to Clipboard!" : "📋 Copy Prompt"}
          </button>
        </div>

        <div className="mt-4">
          <textarea
            readOnly
            aria-label="Generated prompt"
            className="h-72 w-full rounded-2xl border-2 border-[#4a3428] bg-[#181004] p-4 font-mono text-xs font-semibold leading-relaxed text-[#fdf5e0] shadow-inner focus:outline-none"
            value={promptText}
          />
        </div>
      </section>
    </main>
  );
}
