"use client";
import { useState } from "react";
import { active, layoutThrash, optimistic, pessimistic, total, visibleRange, waterfall, type Simulation } from "@/lib/sim";
const chained = waterfall("chained", "Chained requests", [{ name: "html", ms: 200 }, { name: "css", ms: 150, after: "html" }, { name: "font", ms: 250, after: "css" }, { name: "image", ms: 300, after: "font" }]);
const parallel = waterfall("parallel", "Parallel requests", [{ name: "html", ms: 200 }, { name: "css", ms: 150 }, { name: "font", ms: 250 }, { name: "image", ms: 300 }]);
function Timeline({ sim }: { sim: Simulation }) {
  const W = total(sim); const [t, setT] = useState(0); const on = active(sim, t);
  return (<section className="my-6"><h2 className="font-semibold">{sim.title}: {total(sim)}ms total</h2>
    {sim.events.map((e) => <div key={e.lane + e.start} className="relative my-1 h-6 rounded bg-slate-100"><div className={`absolute h-6 rounded px-1 text-xs text-white ${on.includes(e) ? "bg-indigo-600" : "bg-slate-400"}`} style={{ left: `${(e.start / W) * 100}%`, width: `${(e.dur / W) * 100}%` }}>{e.lane}</div></div>)}
    <input type="range" aria-label="Time in ms" min={0} max={W} value={t} onChange={(e) => setT(+e.target.value)} className="w-full" />
    <p role="status">t = {t}ms, active: {on.map((e) => e.lane).join(", ") || "none"}</p></section>);
}
function Virtual() {
  const [top, setTop] = useState(0); const { start, end } = visibleRange(top, 32, 192, 10000);
  return (<section className="my-6"><h2 className="font-semibold">Virtualized list</h2>
    <div tabIndex={0} aria-label="10,000 rows" className="h-48 overflow-y-auto rounded border" onScroll={(e) => setTop(e.currentTarget.scrollTop)}>
      <div className="relative" style={{ height: 10000 * 32 }}>{Array.from({ length: end - start }, (_, i) => <div key={start + i} className="absolute w-full px-2 leading-8" style={{ top: (start + i) * 32 }}>Row {start + i + 1}</div>)}</div></div>
    <p>Rendered DOM rows: {end - start} of 10000</p></section>);
}
export default function Simulations() {
  return (<main><h1 className="text-3xl font-bold">Simulations</h1><p className="text-slate-600">Scrub time to see why chained requests are slow.</p><Timeline sim={chained} /><Timeline sim={parallel} /><Timeline sim={layoutThrash(6, false)} /><Timeline sim={layoutThrash(6, true)} /><Timeline sim={pessimistic} /><Timeline sim={optimistic} /><Virtual /></main>);
}
