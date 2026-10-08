"use client";
import { useState } from "react";
import { buildPrompt } from "@/lib/prompt";
const OPT: Record<string, string[]> = {
  behaviors: ["focus trap", "Escape dismissal", "background scroll locking", "scroll snap"],
  motion: ["fade + scale enter/exit", "spring entrance", "ease-out timing", "stagger"],
  a11y: ["keyboard support", "focus restoration", "accessible name", "live region announcements"],
  visual: ["subtle backdrop", "rounded surface", "hover elevation", "strong visual hierarchy"],
};
export default function PromptLab() {
  const [component, setC] = useState("dialog");
  const [sel, setSel] = useState<Record<string, string[]>>({ behaviors: [], motion: [], a11y: [], visual: [] });
  const toggle = (k: string, v: string) => setSel((p) => ({ ...p, [k]: p[k].includes(v) ? p[k].filter((x) => x !== v) : [...p[k], v] }));
  return (<main><h1 className="text-3xl font-bold">Prompt Lab</h1>
    <label className="mt-4 block">Component <select className="rounded border p-1" value={component} onChange={(e) => setC(e.target.value)}>{["dialog", "popover", "accordion", "tabs", "carousel", "command palette"].map((x) => <option key={x}>{x}</option>)}</select></label>
    {Object.entries(OPT).map(([k, vs]) => (<fieldset key={k} className="mt-3"><legend className="font-semibold capitalize">{k}</legend>
      {vs.map((v) => <label key={v} className="mr-4"><input type="checkbox" checked={sel[k].includes(v)} onChange={() => toggle(k, v)} /> {v}</label>)}</fieldset>))}
    <textarea readOnly aria-label="Generated prompt" className="mt-4 h-72 w-full rounded border p-2 font-mono text-sm" value={buildPrompt({ component, behaviors: sel.behaviors, motion: sel.motion, a11y: sel.a11y, visual: sel.visual })} /></main>);
}
