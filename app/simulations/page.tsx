"use client";

import { useState } from "react";
import {
  active,
  layoutThrash,
  optimistic,
  pessimistic,
  total,
  visibleRange,
  waterfall,
  type Simulation,
} from "@/lib/sim";

const chained = waterfall("chained", "Chained Network Requests", [
  { name: "html", ms: 200 },
  { name: "css", ms: 150, after: "html" },
  { name: "font", ms: 250, after: "css" },
  { name: "image", ms: 300, after: "font" },
]);

const parallel = waterfall("parallel", "Parallel Network Requests", [
  { name: "html", ms: 200 },
  { name: "css", ms: 150 },
  { name: "font", ms: 250 },
  { name: "image", ms: 300 },
]);

function Timeline({ sim }: { sim: Simulation }) {
  const W = total(sim);
  const [t, setT] = useState(0);
  const on = active(sim, t);

  return (
    <section className="table-plate p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#4a3428]/10 pb-3">
        <h2 className="text-lg font-black text-[#4a3428]">
          {sim.title}
        </h2>
        <span className="badge-pill bg-[#ffc93c] text-[#4a3428]">
          {W}ms total
        </span>
      </div>

      <div className="my-4 space-y-2 rounded-2xl border-2 border-[#4a3428] bg-[#fdf5e0] p-3 shadow-inner">
        {sim.events.map((e) => {
          const isActive = on.includes(e);
          return (
            <div
              key={e.lane + e.start}
              className="relative h-7 w-full overflow-hidden rounded-xl border border-[#4a3428]/20 bg-[#fffdf7]"
            >
              <div
                className={`absolute top-0 h-full flex items-center px-2 text-xs font-black transition-colors ${
                  isActive
                    ? "border-2 border-[#4a3428] bg-[#ff7d9e] text-[#4a3428] shadow-[0_2px_0_#4a3428]"
                    : "bg-[#75c3ff]/40 text-[#4a3428]"
                }`}
                style={{
                  left: `${(e.start / W) * 100}%`,
                  width: `${(e.dur / W) * 100}%`,
                }}
              >
                <span className="truncate uppercase">{e.lane}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-col md:flex-row md:items-center gap-4">
        <input
          type="range"
          aria-label="Time in ms"
          min={0}
          max={W}
          value={t}
          onChange={(e) => setT(+e.target.value)}
          className="h-2 flex-1 rounded-lg border-2 border-[#4a3428] bg-[#fdf5e0]"
        />

        <div
          role="status"
          className="inline-flex items-center gap-2 rounded-xl border-2 border-[#4a3428] bg-[#fffdf7] px-3 py-1.5 text-xs font-black text-[#4a3428] shadow-[0_2px_0_#4a3428]"
        >
          <span className="text-[#ff7d9e]">⏱️</span>
          <span>t = {t}ms</span>
          <span className="text-[#4a3428]">|</span>
          <span>active: {on.map((e) => e.lane).join(", ") || "none"}</span>
        </div>
      </div>
    </section>
  );
}

function Virtual() {
  const [top, setTop] = useState(0);
  const { start, end } = visibleRange(top, 32, 192, 10000);

  return (
    <section className="table-plate p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#4a3428]/10 pb-3">
        <h2 className="text-lg font-black text-[#4a3428]">Virtualized list</h2>
        <span className="badge-pill bg-[#6ccfa2] text-[#4a3428]">
          10,000 Total Elements
        </span>
      </div>

      <p className="mt-2 text-xs font-bold text-[#4a3428]">
        Scroll the viewport below to inspect how virtual windowing recycles only the visible slice of DOM nodes.
      </p>

      <div
        tabIndex={0}
        aria-label="10,000 rows"
        className="mt-4 h-48 overflow-y-auto rounded-2xl border-2 border-[#4a3428] bg-[#fdf5e0] p-1 shadow-inner"
        onScroll={(e) => setTop(e.currentTarget.scrollTop)}
      >
        <div className="relative" style={{ height: 10000 * 32 }}>
          {Array.from({ length: end - start }, (_, i) => (
            <div
              key={start + i}
              className="absolute flex w-full items-center justify-between px-3 text-xs font-black text-[#4a3428] leading-8"
              style={{ top: (start + i) * 32 }}
            >
              <span className="rounded-lg border border-[#4a3428]/20 bg-[#fffdf7] px-2 py-0.5">
                Virtual Row #{start + i + 1}
              </span>
              <span className="text-[10px] text-[#4a3428]">
                node_offset: {(start + i) * 32}px
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="rounded-xl border-2 border-[#4a3428] bg-[#fffdf7] px-3 py-1.5 text-xs font-black text-[#4a3428] shadow-[0_2px_0_#4a3428]">
          Rendered DOM rows: <span className="text-[#ff7d9e]">{end - start}</span> of 10000
        </p>
        <span className="text-[11px] font-bold text-[#4a3428]">
          Window size: 192px / 32px per row
        </span>
      </div>
    </section>
  );
}

export default function Simulations() {
  return (
    <main className="space-y-6">
      {/* Hero Header */}
      <section className="table-mat p-6 md:p-8">
        <div className="flex items-center justify-between">
          <span className="badge-pill bg-[#6ccfa2] text-xs font-black text-[#4a3428]">
            ⚡ INTERACTION LIFECYCLES
          </span>
          <span className="text-xs font-extrabold text-[#4a3428]">
            TIMELINE SCRUBBER & PROFILER
          </span>
        </div>

        <h1 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-[#4a3428]">
          Simulations
        </h1>

        <p className="mt-2 text-sm md:text-base font-bold text-[#4a3428] max-w-2xl leading-relaxed">
          Scrub time to see why chained requests are slow, how layout thrashing triggers forced reflows,
          and how optimistic UI decouples perceived latency from network round trips.
        </p>
      </section>

      {/* Simulation Timelines */}
      <div className="space-y-6">
        <Timeline sim={chained} />
        <Timeline sim={parallel} />
        <Timeline sim={layoutThrash(6, false)} />
        <Timeline sim={layoutThrash(6, true)} />
        <Timeline sim={pessimistic} />
        <Timeline sim={optimistic} />
        <Virtual />
      </div>
    </main>
  );
}
