import Link from "next/link";
import { concepts, type Concept } from "@/lib/domain";
import { Demo, NextUp } from "@/components/Demos";

const CAT_COLORS: Record<string, string> = {
  scroll: "bg-[#75c3ff]",
  motion: "bg-[#ff7d9e]",
  feedback: "bg-[#ffc93c]",
  overlay: "bg-[#c4a1ff]",
  disclosure: "bg-[#fed7aa]",
  loading: "bg-[#6ccfa2]",
  navigation: "bg-[#99f6e4]",
  interaction: "bg-[#ffd3de]",
  form: "bg-[#fde68a]",
};

export default function Home() {
  return (
    <main className="space-y-8">
      {/* Hero Table Mat */}
      <section className="table-mat relative overflow-hidden p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="badge-pill bg-[#ffc93c] text-xs font-black text-[#4a3428]">
            🕹️ INTERACTIVE UI COOKBOOK
          </span>
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#4a3428]">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#6ccfa2] border border-[#4a3428]" />
            <span>30 CONCEPTS LOADED</span>
          </div>
        </div>

        <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-[#4a3428]">
          UI Interaction Atlas
        </h1>

        <p className="mt-2 text-sm md:text-base font-bold text-[#4a3428] max-w-2xl leading-relaxed">
          Touch each demo, learn the term, then copy the prompt. Master browser rendering physics,
          compositor-friendly transforms, accessibility focus traps, and state machines.
        </p>

        {/* Feature Highlights Pills */}
        <div className="mt-5 flex flex-wrap gap-2 text-xs font-black">
          <span className="table-plate inline-flex items-center gap-1.5 px-3 py-1 bg-[#fffdf7]">
            <span>✨</span> 30 Hands-On Sandboxes
          </span>
          <span className="table-plate inline-flex items-center gap-1.5 px-3 py-1 bg-[#fffdf7]">
            <span>📐</span> Pure Domain Architecture
          </span>
          <span className="table-plate inline-flex items-center gap-1.5 px-3 py-1 bg-[#fffdf7]">
            <span>♿</span> WCAG & A11y Semantics
          </span>
          <span className="table-plate inline-flex items-center gap-1.5 px-3 py-1 bg-[#fffdf7]">
            <span>🤖</span> Zero-Hallucination Prompts
          </span>
        </div>

        {/* Quest / Next Up */}
        <NextUp />
      </section>

      {/* Concept Cards Stack */}
      <div className="space-y-8">
        {concepts.map((c: Concept) => {
          const catColor = CAT_COLORS[c.cat] || "bg-[#fdf5e0]";
          return (
            <section
              key={c.slug}
              className="table-plate p-5 md:p-6 transition-transform"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#4a3428]/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`badge-pill ${catColor} text-[#4a3428]`}>
                    {c.cat}
                  </span>
                  <span className="text-xs font-extrabold text-[#4a3428]">
                    #{c.slug}
                  </span>
                </div>
                <div className="text-xs font-bold text-[#4a3428]">
                  Prerequisites: {c.needs.length ? c.needs.join(", ") : "none"}
                </div>
              </div>

              <div className="my-3">
                <h2 className="text-2xl font-black text-[#4a3428] tracking-tight">
                  {c.term}
                </h2>
                <p className="mt-1 text-sm font-bold text-[#4a3428]">
                  {c.what}
                </p>
              </div>

              {/* Demo Sandbox Frame */}
              <div className="demo-stage my-4">
                <Demo k={c.slug} />
              </div>

              {/* Footer bar with details and lesson link */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {c.tradeoffs.slice(0, 1).map((t, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg border border-[#4a3428]/20 bg-[#fdf5e0] px-2.5 py-1 text-[11px] font-bold text-[#4a3428]"
                    >
                      ⚠️ {t}
                    </span>
                  ))}
                </div>

                <Link
                  className="btn btn-primary text-xs font-black inline-flex items-center gap-1"
                  href={`/concepts/${c.slug}`}
                >
                  <span>Full lesson</span>
                  <span>→</span>
                </Link>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
