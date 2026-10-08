import Link from "next/link";
import { notFound } from "next/navigation";
import { concepts } from "@/lib/domain";
import { Demo, Status } from "@/components/Demos";

export const generateStaticParams = () => concepts.map((c) => ({ slug: c.slug }));

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

export default async function Lesson({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = concepts.find((x) => x.slug === slug);
  if (!c) notFound();

  const catColor = CAT_COLORS[c.cat] || "bg-[#fdf5e0]";

  return (
    <main className="space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="table-plate-action inline-flex items-center gap-2 rounded-full border-2 border-[#4a3428] bg-[#fffdf7] px-4 py-1.5 text-xs font-black text-[#4a3428] shadow-[0_2px_0_#4a3428] hover:bg-[#fdf5e0]"
        >
          <span>←</span>
          <span>Back to Atlas Catalog</span>
        </Link>
        <span className="badge-pill bg-[#ffc93c] text-xs text-[#4a3428]">
          LESSON CONTRACT
        </span>
      </div>

      {/* Main Lesson Hero Card */}
      <section className="table-mat p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-2 border-b-2 border-[#4a3428]/10 pb-4">
          <span className={`badge-pill ${catColor} text-[#4a3428]`}>
            {c.cat}
          </span>
          <span className="rounded-full border border-[#4a3428]/30 bg-[#fffdf7] px-2.5 py-0.5 text-xs font-extrabold text-[#4a3428]">
            pattern_id: {c.slug}
          </span>
        </div>

        <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-[#4a3428]">
          {c.term}
        </h1>

        <p className="mt-3 text-base md:text-lg font-bold text-[#4a3428] leading-relaxed">
          {c.what}
        </p>

        {/* Quick Prereqs & Category Meta */}
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="table-plate inline-flex items-center gap-2 px-3 py-1 text-xs font-black text-[#4a3428]">
            <span>📋 Needs:</span>
            <span>{c.needs.length ? c.needs.join(", ") : "None (Foundational)"}</span>
          </div>
          <div className="table-plate inline-flex items-center gap-2 px-3 py-1 text-xs font-black text-[#4a3428]">
            <span>🔗 Category:</span>
            <span className="uppercase">{c.cat}</span>
          </div>
        </div>
      </section>

      {/* Live Interactive Sandbox */}
      <section className="table-plate p-6">
        <div className="flex items-center justify-between border-b-2 border-[#4a3428]/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl border-2 border-[#4a3428] bg-[#ff7d9e] text-sm shadow-[0_2px_0_#4a3428]">
              🎮
            </span>
            <h2 className="text-xl font-black text-[#4a3428]">Live Example Sandbox</h2>
          </div>
          <span className="text-xs font-bold text-[#4a3428]">Interactive sandbox</span>
        </div>

        <div className="demo-stage my-5">
          <Demo k={c.slug} />
        </div>

        <p className="text-xs font-bold text-[#4a3428]">
          Interact directly with the demo above to observe state transitions, layout constraints, and event lifecycles.
        </p>
      </section>

      {/* Mechanics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="table-plate p-5">
          <div className="flex items-center gap-2 text-sm font-black text-[#4a3428]">
            <span>⚠️</span>
            <h2>Problem without it</h2>
          </div>
          <p className="mt-2 text-sm font-bold text-[#4a3428] leading-relaxed">
            {c.problem}
          </p>
        </section>

        <section className="table-plate p-5">
          <div className="flex items-center gap-2 text-sm font-black text-[#4a3428]">
            <span>⚙️</span>
            <h2>How it works</h2>
          </div>
          <p className="mt-2 text-sm font-bold text-[#4a3428] leading-relaxed">
            {c.how}
          </p>
        </section>

        <section className="table-plate p-5 border-l-4 border-l-[#6ccfa2]">
          <div className="flex items-center gap-2 text-sm font-black text-[#4a3428]">
            <span>✅</span>
            <h2>When to use it</h2>
          </div>
          <p className="mt-2 text-sm font-bold text-[#4a3428] leading-relaxed">
            {c.when}
          </p>
        </section>

        <section className="table-plate p-5 border-l-4 border-l-[#ff7d9e]">
          <div className="flex items-center gap-2 text-sm font-black text-[#4a3428]">
            <span>⛔</span>
            <h2>When not to use it</h2>
          </div>
          <p className="mt-2 text-sm font-bold text-[#4a3428] leading-relaxed">
            {c.whenNot}
          </p>
        </section>
      </div>

      {/* Trade-offs, Accessibility, and Performance Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="table-plate p-5">
          <h2 className="text-base font-black text-[#4a3428] flex items-center gap-1.5">
            <span>⚖️</span> Trade-offs
          </h2>
          <ul className="mt-3 space-y-2">
            {c.tradeoffs.map((item, idx) => (
              <li
                key={idx}
                className="rounded-xl border border-[#4a3428]/20 bg-[#fdf5e0] p-2.5 text-xs font-bold text-[#4a3428]"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="table-plate p-5">
          <h2 className="text-base font-black text-[#4a3428] flex items-center gap-1.5">
            <span>♿</span> Accessibility
          </h2>
          <ul className="mt-3 space-y-2">
            {c.a11y.map((item, idx) => (
              <li
                key={idx}
                className="rounded-xl border border-[#4a3428]/20 bg-[#fdf5e0] p-2.5 text-xs font-bold text-[#4a3428]"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="table-plate p-5">
          <h2 className="text-base font-black text-[#4a3428] flex items-center gap-1.5">
            <span>⚡</span> Performance
          </h2>
          <ul className="mt-3 space-y-2">
            {c.perf.map((item, idx) => (
              <li
                key={idx}
                className="rounded-xl border border-[#4a3428]/20 bg-[#fdf5e0] p-2.5 text-xs font-bold text-[#4a3428]"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* DevTools Evidence & Prompt Terminal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="dark-plate p-5 font-mono">
          <div className="flex items-center justify-between border-b border-[#4a3428] pb-2 text-xs font-bold text-[#ffc93c]">
            <span>🔬 OBSERVE IN DEVTOOLS</span>
            <span>TERMINAL</span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-[#fdf5e0]">
            {c.evidence}
          </p>
        </section>

        <section className="table-plate p-5">
          <div className="flex items-center justify-between border-b-2 border-[#4a3428]/10 pb-2 text-xs font-black text-[#4a3428]">
            <span>🤖 PROMPT VOCABULARY</span>
            <span className="badge-pill bg-[#ff7d9e] text-[10px]">AI SPEC</span>
          </div>
          <div className="mt-3 rounded-xl border-2 border-[#4a3428] bg-[#fdf5e0] p-3 font-mono text-xs font-bold text-[#4a3428]">
            "{c.prompt}"
          </div>
          <p className="mt-2 text-[11px] font-bold text-[#4a3428]">
            Copy this sentence when briefing AI assistants to produce accurate interaction mechanics.
          </p>
        </section>
      </div>

      {/* Goes Deeper & Related Patterns */}
      <section className="table-plate p-6">
        <div className="border-b-2 border-[#4a3428]/10 pb-3">
          <h2 className="text-lg font-black text-[#4a3428]">Goes deeper (Frontend Atlas)</h2>
          <p className="mt-1 text-xs font-bold text-[#4a3428]">{c.deeper}</p>
        </div>

        <div className="mt-4">
          <h3 className="text-xs font-black uppercase text-[#4a3428]">Related Concepts:</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {c.related.map((r) => (
              <Link
                key={r}
                href={`/concepts/${r}`}
                className="table-plate-action inline-flex items-center gap-1 rounded-full border-2 border-[#4a3428] bg-[#fffdf7] px-3 py-1 text-xs font-black text-[#4a3428] shadow-[0_2px_0_#4a3428] hover:bg-[#ffc93c]"
              >
                <span>🔗</span>
                <span>{r}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Learner Progress Status */}
      <Status slug={c.slug} />
    </main>
  );
}
