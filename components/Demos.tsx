"use client";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { motion as m, useReducedMotion } from "motion/react";
import { motion as tok } from "@/lib/tokens";
import { next, type S } from "@/lib/machine";
import { concepts, learnNext, type Status as LS } from "@/lib/domain";

if (typeof window !== "undefined") {
  window.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K" || e.code === "KeyK")) {
      const d = document.querySelector('dialog[aria-label="Command palette"]') as HTMLDialogElement | null;
      if (d && !d.open) {
        e.preventDefault();
        d.showModal();
      }
    }
  });
}
const box = "h-44 overflow-y-auto rounded-xl border-2 border-[#4a3428] bg-[#fffdf7] p-3 shadow-[0_3px_0_#4a3428]";
const rows = (n: number) =>
  Array.from({ length: n }, (_, i) => (
    <div key={i} className="my-1.5 flex items-center justify-between rounded-lg border border-[#4a3428]/20 bg-[#fdf5e0] px-3 py-1.5 text-xs font-bold text-[#4a3428]">
      <span>Row #{i + 1}</span>
      <span className="text-[10px] text-[#4a3428]">item_{i + 1}</span>
    </div>
  ));

function Snap() {
  const cards = [
    { num: 1, bg: "bg-[#ff7d9e]", label: "ITEM A" },
    { num: 2, bg: "bg-[#ffc93c]", label: "ITEM B" },
    { num: 3, bg: "bg-[#6ccfa2]", label: "ITEM C" },
    { num: 4, bg: "bg-[#75c3ff]", label: "ITEM D" },
  ];
  return (
    <div tabIndex={0} aria-label="Snap gallery" className="flex h-36 snap-x snap-mandatory gap-3 overflow-x-auto p-1">
      {cards.map((c) => (
        <div
          key={c.num}
          className={`grid h-full w-4/5 shrink-0 snap-center place-items-center rounded-2xl border-2 border-[#4a3428] ${c.bg} p-3 text-[#4a3428] shadow-[0_4px_0_#4a3428]`}
        >
          <div className="text-center">
            <span className="block text-2xl font-black">{c.num}</span>
            <span className="text-xs font-extrabold tracking-wider">{c.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Sticky() {
  return (
    <div tabIndex={0} aria-label="Sticky demo" className={box}>
      <div className="sticky top-0 z-10 rounded-lg border-2 border-[#4a3428] bg-[#ffc93c] p-2 text-center text-xs font-black uppercase tracking-wider text-[#4a3428] shadow-[0_2px_0_#4a3428]">
        📌 I stick to the top
      </div>
      <div className="pt-2">{rows(12)}</div>
    </div>
  );
}

function Progress() {
  const [p, setP] = useState(0);
  return (
    <div>
      <div
        role="progressbar"
        aria-label="Scroll progress"
        aria-valuenow={Math.round(p * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-3.5 rounded-full border-2 border-[#4a3428] bg-[#fdf5e0] p-0.5 shadow-[0_2px_0_#4a3428]"
      >
        <div
          className="h-full rounded-full bg-[#ff7d9e] transition-all duration-75"
          style={{ width: `${p * 100}%` }}
        />
      </div>
      <div
        tabIndex={0}
        aria-label="Scroll me"
        className={`mt-3 ${box}`}
        onScroll={(e) => {
          const t = e.currentTarget;
          setP(t.scrollTop / (t.scrollHeight - t.clientHeight));
        }}
      >
        {rows(14)}
      </div>
    </div>
  );
}

function Reveal() {
  const root = useRef<HTMLDivElement>(null);
  const rm = useReducedMotion();
  return (
    <div ref={root} tabIndex={0} aria-label="Reveal demo" className={box}>
      {Array.from({ length: 8 }, (_, i) => (
        <m.div
          key={i}
          initial={rm ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ root, once: true }}
          transition={tok.spring.snappy}
          className="mb-2 flex items-center justify-between rounded-xl border-2 border-[#4a3428] bg-[#6ccfa2] p-3 font-bold text-[#4a3428] shadow-[0_2px_0_#4a3428]"
        >
          <span>Card {i + 1}</span>
          <span className="text-xs">✨ Enter In View</span>
        </m.div>
      ))}
    </div>
  );
}

function Driven() {
  return (
    <div tabIndex={0} aria-label="Scroll-driven demo" className={box}>
      <div className="sd-bar sticky top-0 z-10 h-3 rounded-full border-2 border-[#4a3428] bg-[#ff7d9e] shadow-[0_2px_0_#4a3428]" />
      <div className="pt-2">{rows(14)}</div>
    </div>
  );
}

function Overscroll() {
  const [on, setOn] = useState(true);
  return (
    <div>
      <label className="mb-2 inline-flex items-center gap-2 text-xs font-black uppercase text-[#4a3428]">
        <input type="checkbox" checked={on} onChange={(e) => setOn(e.target.checked)} />
        overscroll-behavior: contain
      </label>
      <div className="h-48 overflow-y-auto rounded-xl border-2 border-[#4a3428] bg-[#fdf5e0] p-3 shadow-[0_3px_0_#4a3428]">
        <p className="text-xs font-bold text-[#4a3428]">Outer container content</p>
        <div
          tabIndex={0}
          aria-label="Inner list"
          className={`my-2 h-24 overflow-y-auto rounded-lg border-2 border-[#4a3428] bg-[#fffdf7] p-2 ${
            on ? "overscroll-contain" : ""
          }`}
        >
          {rows(8)}
        </div>
        {rows(8)}
      </div>
    </div>
  );
}

function Spring() {
  return (
    <m.button
      className="btn btn-primary"
      whileHover={{ y: -3, boxShadow: "0 6px 0 #4a3428" }}
      whileTap={{ y: 2, scale: 0.98, boxShadow: "0 1px 0 #4a3428" }}
      transition={tok.spring.snappy}
    >
      <span>🎯 Hover and press me</span>
    </m.button>
  );
}

function Feedback() {
  const [s, setS] = useState<S>("idle");
  const n = useRef(0);
  const go = (e: string) => setS((c) => next(c, e));
  const press = () => {
    go("press");
    const ok = n.current++ % 2 === 0;
    setTimeout(() => go(ok ? "ok" : "fail"), 900);
  };
  return (
    <div>
      <button
        className={`btn ${s === "success" ? "btn-mint" : s === "error" ? "bg-[#ff7d9e]" : "btn-gold"}`}
        disabled={s === "loading"}
        onClick={s === "success" ? () => go("reset") : press}
      >
        {{ idle: "Save", loading: "Saving…", success: "Saved ✓ (reset)", error: "Failed - retry" }[s]}
      </button>
      <p role="status" className="mt-2 text-xs font-bold text-[#4a3428]">
        state: {s} (alternates success / error)
      </p>
    </div>
  );
}

function Optimistic() {
  const [liked, setL] = useState(false);
  const [msg, setMsg] = useState("");
  const tap = () => {
    const v = !liked;
    setL(v);
    setMsg("");
    setTimeout(() => {
      if (Math.random() < 0.4) {
        setL(!v);
        setMsg("Server failed - change rolled back.");
      }
    }, 800);
  };
  return (
    <div>
      <button
        className={`btn ${liked ? "btn-primary" : "bg-[#fffdf7]"}`}
        aria-pressed={liked}
        onClick={tap}
      >
        {liked ? "♥ Liked" : "♡ Like"}
      </button>
      <p role="status" className="mt-2 text-xs font-bold text-red-600">
        {msg}
      </p>
    </div>
  );
}

function Dialog() {
  const r = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button className="btn btn-primary" onClick={() => r.current?.showModal()}>
        Open dialog
      </button>
      <dialog
        ref={r}
        aria-label="Demo dialog"
        className="m-auto table-mat max-w-sm p-6 backdrop:bg-[#181004]/60 backdrop:backdrop-blur-xs"
      >
        <h3 className="text-lg font-black text-[#4a3428]">Modal Dialog</h3>
        <p className="mt-2 text-xs font-bold text-[#4a3428]">
          Esc closes. Tab stays inside. Focus returns to the opener.
        </p>
        <button className="btn btn-gold mt-4" onClick={() => r.current?.close()}>
          Close
        </button>
      </dialog>
    </>
  );
}

function Accordion() {
  return (
    <div className="space-y-2">
      {["What is it?", "Why use it?"].map((q) => (
        <details key={q} className="table-plate p-3">
          <summary className="cursor-pointer font-black text-[#4a3428]">{q}</summary>
          <p className="pt-2 text-xs font-bold text-[#4a3428]">
            Show only what the current decision needs. Native details/summary disclosure.
          </p>
        </details>
      ))}
    </div>
  );
}

function Skeleton() {
  const [l, setL] = useState(true);
  return (
    <div>
      <button className="btn mb-3" onClick={() => setL(!l)}>
        {l ? "Show content" : "Show skeleton"}
      </button>
      <div aria-busy={l} className="space-y-2.5">
        {l ? (
          [80, 60, 70].map((w) => (
            <div
              key={w}
              className="h-5 animate-pulse rounded-lg border border-[#4a3428]/20 bg-[#fdf5e0] motion-reduce:animate-none"
              style={{ width: `${w}%` }}
            />
          ))
        ) : (
          <div className="table-plate p-3 text-xs font-bold text-[#4a3428]">
            Loaded content in the same layout without layout shifts.
          </div>
        )}
      </div>
    </div>
  );
}

function Parallax() {
  const [y, setY] = useState(0);
  const rm = useReducedMotion();
  return (
    <div
      tabIndex={0}
      aria-label="Parallax demo"
      className="h-44 overflow-y-auto rounded-xl border-2 border-[#4a3428] bg-[#fdf5e0] shadow-[0_3px_0_#4a3428]"
      onScroll={(e) => setY(e.currentTarget.scrollTop)}
    >
      <div className="sticky top-0 h-0">
        <div
          className="h-44 bg-gradient-to-b from-[#75c3ff] to-[#ff7d9e]"
          style={{ transform: rm ? undefined : `translateY(${-y * 0.5}px)` }}
        />
      </div>
      <div className="relative pt-32">
        <div className="table-plate m-2 p-3">{rows(12)}</div>
      </div>
    </div>
  );
}

function Smooth() {
  const r = useRef<HTMLDivElement>(null);
  return (
    <div>
      <div className="mb-2 flex gap-2">
        <button className="btn" onClick={() => r.current?.scrollTo({ top: 9999 })}>
          Jump to bottom
        </button>
        <button className="btn" onClick={() => r.current?.scrollTo({ top: 0 })}>
          Jump to top
        </button>
      </div>
      <div
        ref={r}
        tabIndex={0}
        aria-label="Smooth scroll demo"
        className={`${box} scroll-smooth motion-reduce:scroll-auto`}
      >
        {rows(20)}
      </div>
    </div>
  );
}

function Tabs() {
  const T = ["Overview", "Specs", "Reviews"];
  const [i, setI] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const key = (e: React.KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    const n = (i + d + T.length) % T.length;
    setI(n);
    refs.current[n]?.focus();
  };
  return (
    <div>
      <div role="tablist" aria-label="Demo tabs" onKeyDown={key} className="flex gap-2">
        {T.map((t, n) => (
          <button
            key={t}
            ref={(el) => {
              refs.current[n] = el;
            }}
            role="tab"
            id={`tab-${n}`}
            aria-selected={i === n}
            aria-controls="panel"
            tabIndex={i === n ? 0 : -1}
            onClick={() => setI(n)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-black transition-all ${
              i === n
                ? "border-2 border-[#4a3428] bg-[#ff7d9e] text-[#4a3428] shadow-[0_3px_0_#4a3428]"
                : "border-2 border-[#4a3428] bg-[#fffdf7] text-[#4a3428] shadow-[0_1px_0_#4a3428] hover:bg-[#fdf5e0]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id="panel"
        aria-labelledby={`tab-${i}`}
        className="table-plate mt-2 p-3 text-xs font-bold text-[#4a3428]"
      >
        {T[i]} content. Arrow keys move between tabs with roving tabindex.
      </div>
    </div>
  );
}

function Pop() {
  return (
    <>
      <button className="btn btn-gold" popoverTarget="demo-pop">
        Toggle popover
      </button>
      <div
        id="demo-pop"
        popover="auto"
        className="table-mat max-w-xs p-4 text-xs font-bold text-[#4a3428]"
      >
        Light dismiss: click outside or press Esc. Native popover API!
      </div>
    </>
  );
}

function Toast() {
  const [t, setT] = useState<{ id: number; msg: string }[]>([]);
  const n = useRef(0);
  const add = () => {
    const id = n.current++;
    setT((p) => [...p, { id, msg: `Saved at ${new Date().toLocaleTimeString()}` }]);
    setTimeout(() => setT((p) => p.filter((x) => x.id !== id)), 3000);
  };
  return (
    <div>
      <button className="btn btn-mint" onClick={add}>
        Show toast
      </button>
      <div role="status" aria-live="polite" className="mt-2 space-y-1.5">
        {t.map((x) => (
          <m.div
            key={x.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={tok.spring.snappy}
            className="table-plate flex items-center justify-between border-2 border-[#4a3428] bg-[#ffc93c] px-3 py-1.5 text-xs font-black text-[#4a3428]"
          >
            <span>🔔 {x.msg}</span>
          </m.div>
        ))}
      </div>
    </div>
  );
}

function Drag() {
  const [p, setP] = useState({ x: 20, y: 20 });
  const d = useRef<{ dx: number; dy: number } | null>(null);
  const keys: Record<string, [number, number]> = {
    ArrowLeft: [-10, 0],
    ArrowRight: [10, 0],
    ArrowUp: [0, -10],
    ArrowDown: [0, 10],
  };
  return (
    <div className="relative h-44 overflow-hidden rounded-xl border-2 border-[#4a3428] bg-[#fdf5e0] shadow-[0_3px_0_#4a3428]">
      <div
        role="button"
        tabIndex={0}
        aria-label="Draggable card, arrow keys also move it"
        className="absolute flex h-14 w-28 cursor-grab touch-none select-none items-center justify-center rounded-xl border-2 border-[#4a3428] bg-[#ff7d9e] p-2 text-xs font-black text-[#4a3428] shadow-[0_3px_0_#4a3428] active:cursor-grabbing active:translate-y-0.5"
        style={{ left: p.x, top: p.y }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          d.current = { dx: e.clientX - p.x, dy: e.clientY - p.y };
        }}
        onPointerMove={(e) => {
          if (d.current) setP({ x: e.clientX - d.current.dx, y: e.clientY - d.current.dy });
        }}
        onPointerUp={() => {
          d.current = null;
        }}
        onKeyDown={(e) => {
          const v = keys[e.key];
          if (v) {
            e.preventDefault();
            setP((q) => ({ x: q.x + v[0], y: q.y + v[1] }));
          }
        }}
      >
        🎮 Drag me
      </div>
    </div>
  );
}

function Palette() {
  const r = useRef<HTMLDialogElement>(null);
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const hits = concepts.filter((c) => c.term.toLowerCase().includes(q.toLowerCase())).slice(0, 5);
  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K" || e.code === "KeyK")) {
        e.preventDefault();
        r.current?.showModal();
      }
    };
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, []);
  return (
    <>
      <button className="btn btn-sky" onClick={() => r.current?.showModal()}>
        Open palette (Ctrl/⌘ K)
      </button>
      <dialog
        ref={r}
        aria-label="Command palette"
        className="m-auto table-mat w-88 p-4 backdrop:bg-[#181004]/60 backdrop:backdrop-blur-xs"
      >
        <div className="mb-2 flex items-center gap-2">
          <span className="text-sm font-black text-[#4a3428]">⚡ PALETTE</span>
        </div>
        <input
          autoFocus
          aria-label="Search concepts"
          className="w-full text-sm"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setI(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setI((v) => Math.min(v + 1, hits.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setI((v) => Math.max(v - 1, 0));
            } else if (e.key === "Enter" && hits[i]) {
              location.href = `/concepts/${hits[i].slug}`;
            }
          }}
          placeholder="Jump to a concept…"
        />
        <ul className="mt-3 space-y-1">
          {hits.map((c, n) => (
            <li key={c.slug}>
              <a
                aria-current={n === i}
                className={`block rounded-xl border-2 border-[#4a3428] p-2 text-xs font-black transition-all ${
                  n === i ? "bg-[#ffc93c] shadow-[0_2px_0_#4a3428]" : "bg-[#fffdf7] hover:bg-[#fdf5e0]"
                }`}
                href={`/concepts/${c.slug}`}
              >
                {c.term}
              </a>
            </li>
          ))}
        </ul>
      </dialog>
    </>
  );
}

function Carousel() {
  const r = useRef<HTMLDivElement>(null);
  const go = (d: number) => r.current?.scrollBy({ left: d * r.current.clientWidth * 0.8 });
  return (
    <section aria-roledescription="carousel" aria-label="Demo carousel">
      <div
        ref={r}
        tabIndex={0}
        aria-label="Slides"
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth p-1 motion-reduce:scroll-auto"
      >
        {[
          { id: "A", bg: "bg-[#ff7d9e]" },
          { id: "B", bg: "bg-[#ffc93c]" },
          { id: "C", bg: "bg-[#6ccfa2]" },
          { id: "D", bg: "bg-[#75c3ff]" },
        ].map((s) => (
          <div
            key={s.id}
            className={`grid h-28 w-3/5 shrink-0 snap-start place-items-center rounded-2xl border-2 border-[#4a3428] ${s.bg} text-2xl font-black text-[#4a3428] shadow-[0_4px_0_#4a3428]`}
          >
            Slide {s.id}
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button className="btn" onClick={() => go(-1)}>
          Previous
        </button>
        <button className="btn" onClick={() => go(1)}>
          Next
        </button>
      </div>
    </section>
  );
}

function Stagger() {
  const [k, setK] = useState(0);
  const rm = useReducedMotion();
  return (
    <div>
      <button className="btn btn-mint mb-2" onClick={() => setK(k + 1)}>
        Replay
      </button>
      <m.ul key={k} initial={false} animate="s" variants={{ s: { transition: { staggerChildren: 0.08 } } }}>
        {["One", "Two", "Three", "Four"].map((t) => (
          <m.li
            key={t}
            variants={{ h: { opacity: rm ? 1 : 0, x: rm ? 0 : -16 }, s: { opacity: 1, x: 0 } }}
            transition={tok.spring.snappy}
            className="mb-1.5 flex items-center justify-between rounded-xl border-2 border-[#4a3428] bg-[#fffdf7] px-3 py-1.5 text-xs font-black text-[#4a3428] shadow-[0_2px_0_#4a3428]"
          >
            <span>{t}</span>
            <span className="text-[10px] font-bold text-[#4a3428]">stagger_in</span>
          </m.li>
        ))}
      </m.ul>
    </div>
  );
}

function ViewT() {
  const [a, setA] = useState(true);
  const flip = () => {
    const d = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (d.startViewTransition) d.startViewTransition(() => flushSync(() => setA((v) => !v)));
    else setA((v) => !v);
  };
  return (
    <div>
      <button className="btn btn-gold mb-2" onClick={flip}>
        Swap sides
      </button>
      <div className={`flex ${a ? "justify-start" : "justify-end"}`}>
        <div
          style={{ viewTransitionName: "vt-box" } as React.CSSProperties}
          className="grid h-16 w-28 place-items-center rounded-xl border-2 border-[#4a3428] bg-[#ff7d9e] text-xs font-black text-[#4a3428] shadow-[0_3px_0_#4a3428]"
        >
          View Box
        </div>
      </div>
    </div>
  );
}

function Elev() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {["Flat", "Raised"].map((t, i) => (
        <div
          key={t}
          tabIndex={0}
          className={`rounded-xl border-2 border-[#4a3428] bg-[#fffdf7] p-5 text-center text-xs font-black text-[#4a3428] ${
            i
              ? "shadow-[0_2px_0_#4a3428] hover:shadow-[0_6px_0_#4a3428] focus-visible:shadow-[0_6px_0_#4a3428] motion-safe:transition motion-safe:hover:-translate-y-1"
              : "shadow-none"
          }`}
        >
          {t}
          {i ? " (hover or focus)" : ""}
        </div>
      ))}
    </div>
  );
}

function useEsc() {
  const [off, setOff] = useState(false);
  return {
    off,
    props: {
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === "Escape") setOff(true);
      },
      onMouseLeave: () => setOff(false),
      onBlur: () => setOff(false),
    },
  };
}

function Tip() {
  const { off, props } = useEsc();
  return (
    <span className="group relative inline-block" {...props}>
      <button className="btn" aria-describedby="tip1">
        Hover or focus me (Esc hides)
      </button>
      <span
        id="tip1"
        role="tooltip"
        className={`pointer-events-none absolute left-0 top-full z-10 mt-2 w-52 rounded-xl border-2 border-[#4a3428] bg-[#181004] p-2.5 text-xs font-bold text-[#fffdf7] opacity-0 shadow-[0_3px_0_#4a3428] motion-safe:transition-opacity ${
          off ? "" : "group-focus-within:opacity-100 group-hover:opacity-100"
        }`}
      >
        💡 Extra hint, never essential info.
      </span>
    </span>
  );
}

function HoverCard() {
  const { off, props } = useEsc();
  return (
    <span className="group relative inline-block" {...props}>
      <a href="/concepts/dialog" className="font-black text-[#4a3428] underline hover:text-[#ff7d9e]">
        Modal dialog
      </a>
      <span
        className={`absolute left-0 top-full z-10 mt-2 hidden w-60 rounded-2xl border-2 border-[#4a3428] bg-[#fffdf7] p-3 text-xs shadow-[0_4px_0_#4a3428] ${
          off ? "" : "group-focus-within:block group-hover:block"
        }`}
      >
        <strong className="text-sm font-black text-[#4a3428]">Modal dialog</strong>
        <p className="mt-1 text-[#4a3428]">A focused layer that blocks the page until dismissed.</p>
      </span>
    </span>
  );
}

function Infinite() {
  const [n, setN] = useState(10);
  const root = useRef<HTMLDivElement>(null);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setN((v) => Math.min(v + 10, 100));
      },
      { root: root.current }
    );
    if (end.current) o.observe(end.current);
    return () => o.disconnect();
  }, []);
  return (
    <div>
      <div ref={root} tabIndex={0} aria-label="Infinite list" className={box}>
        {Array.from({ length: n }, (_, i) => (
          <div
            key={i}
            className="my-1.5 flex items-center justify-between rounded-lg border border-[#4a3428]/20 bg-[#fdf5e0] px-3 py-1.5 text-xs font-bold text-[#4a3428]"
          >
            <span>Item {i + 1}</span>
            <span className="text-[10px] text-[#4a3428]">stream_node</span>
          </div>
        ))}
        <div ref={end} className="h-1" />
      </div>
      <p role="status" className="mt-2 text-xs font-black text-[#4a3428]">
        Loaded {n} of 100
      </p>
    </div>
  );
}

function Pull() {
  const [dy, setDy] = useState(0);
  const [busy, setBusy] = useState(false);
  const y0 = useRef<number | null>(null);
  const refresh = () => {
    setBusy(true);
    setTimeout(() => setBusy(false), 1000);
  };
  const end = () => {
    if (dy > 60) refresh();
    y0.current = null;
    setDy(0);
  };
  return (
    <div>
      <button className="btn btn-mint mb-2" onClick={refresh}>
        Refresh (button alternative)
      </button>
      <div className="overflow-hidden rounded-xl border-2 border-[#4a3428] bg-[#fffdf7] shadow-[0_3px_0_#4a3428]">
        <div
          className="touch-none select-none border-b-2 border-[#4a3428] bg-[#ffc93c] text-center text-xs font-black text-[#4a3428]"
          style={{ height: 34 + dy }}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            y0.current = e.clientY;
          }}
          onPointerMove={(e) => {
            if (y0.current !== null) setDy(Math.max(0, Math.min(80, e.clientY - y0.current)));
          }}
          onPointerUp={end}
          onPointerCancel={end}
        >
          <p role="status" className="pt-2">
            {busy ? "Refreshing…" : dy > 60 ? "Release to refresh" : "Pull this bar down"}
          </p>
        </div>
        <div
          tabIndex={0}
          aria-label="Refreshable list"
          className="h-32 overflow-y-auto p-3"
          style={{ overscrollBehaviorY: "contain" }}
        >
          {rows(8)}
        </div>
      </div>
    </div>
  );
}

function Swipe() {
  const all = ["Message A", "Message B", "Message C"];
  const [items, setI] = useState(all);
  const drop = (t: string) => setI((p) => p.filter((x) => x !== t));
  return (
    <div>
      <ul className="space-y-2">
        {items.map((t) => (
          <m.li
            key={t}
            drag="x"
            dragSnapToOrigin
            onDragEnd={(_, i) => {
              if (Math.abs(i.offset.x) > 100) drop(t);
            }}
            className="flex items-center justify-between rounded-xl border-2 border-[#4a3428] bg-[#fffdf7] p-3 text-xs font-black text-[#4a3428] shadow-[0_3px_0_#4a3428]"
          >
            <span>{t}</span>
            <button className="btn bg-[#ff7d9e] text-xs py-1 px-2.5" onClick={() => drop(t)}>
              Dismiss
            </button>
          </m.li>
        ))}
      </ul>
      {items.length === 0 && (
        <button className="btn btn-gold mt-2" onClick={() => setI(all)}>
          Reset
        </button>
      )}
    </div>
  );
}

function Sheet() {
  const r = useRef<HTMLDialogElement>(null);
  const [dy, setDy] = useState(0);
  const y0 = useRef<number | null>(null);
  const end = () => {
    if (dy > 80) r.current?.close();
    y0.current = null;
    setDy(0);
  };
  return (
    <>
      <button className="btn btn-primary" onClick={() => r.current?.showModal()}>
        Open bottom sheet
      </button>
      <dialog
        ref={r}
        aria-label="Bottom sheet"
        style={{ transform: `translateY(${dy}px)` }}
        className="fixed inset-x-0 bottom-0 top-auto m-0 w-full max-w-none rounded-t-3xl border-t-4 border-[#4a3428] bg-[#fdf5e0] p-6 shadow-[0_-8px_0_#4a3428] backdrop:bg-[#181004]/60 backdrop:backdrop-blur-xs"
      >
        <div
          aria-hidden
          className="mx-auto mb-4 h-2.5 w-16 cursor-grab touch-none rounded-full border-2 border-[#4a3428] bg-[#ffc93c]"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            y0.current = e.clientY;
          }}
          onPointerMove={(e) => {
            if (y0.current !== null) setDy(Math.max(0, e.clientY - y0.current));
          }}
          onPointerUp={end}
          onPointerCancel={end}
        />
        <h4 className="text-base font-black text-[#4a3428]">Bottom Sheet Drawer</h4>
        <p className="mt-1 text-xs font-bold text-[#4a3428]">
          Drag the handle down, press Esc, or use the button.
        </p>
        <button className="btn btn-gold mt-4" onClick={() => r.current?.close()}>
          Close
        </button>
      </dialog>
    </>
  );
}

function DatePicker() {
  const [d, setD] = useState("");
  return (
    <div>
      <label className="block text-xs font-black uppercase text-[#4a3428]">
        Pick a date{" "}
        <input
          type="date"
          className="ml-2 font-bold"
          value={d}
          onChange={(e) => setD(e.target.value)}
        />
      </label>
      <p role="status" className="mt-2 text-xs font-black text-[#4a3428]">
        {d ? `Selected: ${d}` : "No date selected"}
      </p>
    </div>
  );
}

const DEMOS: Record<string, () => React.JSX.Element> = {
  "scroll-snap": Snap,
  sticky: Sticky,
  "scroll-progress": Progress,
  "scroll-reveal": Reveal,
  "scroll-driven": Driven,
  overscroll: Overscroll,
  spring: Spring,
  "feedback-states": Feedback,
  "optimistic-ui": Optimistic,
  dialog: Dialog,
  accordion: Accordion,
  skeleton: Skeleton,
  parallax: Parallax,
  "smooth-scroll": Smooth,
  tabs: Tabs,
  popover: Pop,
  toast: Toast,
  drag: Drag,
  "command-palette": Palette,
  carousel: Carousel,
  stagger: Stagger,
  "view-transition": ViewT,
  "hover-elevation": Elev,
  tooltip: Tip,
  "hover-card": HoverCard,
  "infinite-scroll": Infinite,
  "pull-to-refresh": Pull,
  "swipe-to-dismiss": Swipe,
  "bottom-sheet": Sheet,
  "date-picker": DatePicker,
};

export function Demo({ k }: { k: string }) {
  const C = DEMOS[k];
  return C ? <C /> : null;
}

const LEVELS: LS[] = ["known", "learning", "review", "mastered", "confused"];

function useStatus() {
  const [s, setS] = useState<Record<string, LS>>({});
  useEffect(() => {
    try {
      setS(JSON.parse(localStorage.getItem("atlas") || "{}"));
    } catch {}
  }, []);
  const set = (k: string, v: LS) => {
    const n = { ...s, [k]: v };
    setS(n);
    try {
      localStorage.setItem("atlas", JSON.stringify(n));
    } catch {}
  };
  return [s, set] as const;
}

export function Status({ slug }: { slug: string }) {
  const [s, set] = useStatus();
  return (
    <div className="table-plate mt-6 flex flex-wrap items-center justify-between gap-3 p-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-black text-[#4a3428]">🎯 LEARNING STATUS</span>
        <span className="text-xs font-bold text-[#4a3428]">Saved to local browser storage</span>
      </div>
      <label className="flex items-center gap-2 text-xs font-black uppercase text-[#4a3428]">
        My status:
        <select
          className="rounded-xl border-2 border-[#4a3428] bg-[#fdf5e0] font-black"
          value={s[slug] ?? ""}
          onChange={(e) => set(slug, e.target.value as LS)}
        >
          <option value="">unmarked</option>
          {LEVELS.map((l) => (
            <option key={l} value={l}>
              {l.toUpperCase()}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export function NextUp() {
  const [s] = useStatus();
  const c = learnNext(concepts, s);
  return (
    <div className="table-plate mt-5 flex flex-wrap items-center justify-between gap-3 border-2 border-[#4a3428] bg-[#fffdf7] p-4">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-xl border-2 border-[#4a3428] bg-[#ffc93c] text-sm shadow-[0_2px_0_#4a3428]">
          🎯
        </span>
        <div>
          <span className="block text-[11px] font-black uppercase tracking-wider text-[#4a3428]">
            RECOMMENDED QUEST
          </span>
          {c ? (
            <div className="text-sm font-black text-[#4a3428]">
              Learn next:{" "}
              <a
                className="underline decoration-[#ff7d9e] decoration-2 underline-offset-2 hover:text-[#ff7d9e]"
                href={`/concepts/${c.slug}`}
              >
                {c.term}
              </a>
            </div>
          ) : (
            <span className="text-sm font-black text-[#4a3428]">
              All concepts mastered! Outstanding work.
            </span>
          )}
        </div>
      </div>
      {c && (
        <a
          href={`/concepts/${c.slug}`}
          className="btn btn-primary text-xs font-black"
        >
          Start Lesson →
        </a>
      )}
    </div>
  );
}
