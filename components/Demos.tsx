"use client";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { motion as m, useReducedMotion } from "motion/react";
import { motion as tok } from "@/lib/tokens";
import { next, type S } from "@/lib/machine";
import { concepts, learnNext, type Status as LS } from "@/lib/domain";

const box = "h-44 overflow-y-auto rounded-xl border p-3";
const rows = (n: number) => Array.from({ length: n }, (_, i) => <p key={i} className="py-2">Row {i + 1}</p>);

function Snap() {
  return (<div tabIndex={0} aria-label="Snap gallery" className="flex h-36 snap-x snap-mandatory gap-3 overflow-x-auto">
    {[1, 2, 3, 4].map((i) => <div key={i} className="grid h-full w-4/5 shrink-0 snap-center place-items-center rounded-xl bg-indigo-500 text-2xl text-white">{i}</div>)}</div>);
}
function Sticky() {
  return (<div tabIndex={0} aria-label="Sticky demo" className={box}><div className="sticky top-0 bg-amber-300 p-2 font-semibold">I stick to the top</div>{rows(12)}</div>);
}
function Progress() {
  const [p, setP] = useState(0);
  return (<div><div role="progressbar" aria-label="Scroll progress" aria-valuenow={Math.round(p * 100)} aria-valuemin={0} aria-valuemax={100} className="h-2 rounded bg-slate-200"><div className="h-2 rounded bg-indigo-600" style={{ width: `${p * 100}%` }} /></div>
    <div tabIndex={0} aria-label="Scroll me" className={`mt-2 ${box}`} onScroll={(e) => { const t = e.currentTarget; setP(t.scrollTop / (t.scrollHeight - t.clientHeight)); }}>{rows(14)}</div></div>);
}
function Reveal() {
  const root = useRef<HTMLDivElement>(null); const rm = useReducedMotion();
  return (<div ref={root} tabIndex={0} aria-label="Reveal demo" className={box}>{Array.from({ length: 8 }, (_, i) =>
    <m.div key={i} initial={rm ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ root, once: true }} transition={tok.spring.snappy} className="mb-3 rounded-lg bg-emerald-100 p-4">Card {i + 1}</m.div>)}</div>);
}
function Driven() {
  return (<div tabIndex={0} aria-label="Scroll-driven demo" className={box}><div className="sd-bar sticky top-0 h-2 bg-pink-500" />{rows(14)}</div>);
}
function Overscroll() {
  const [on, setOn] = useState(true);
  return (<div><label className="mb-2 flex gap-2"><input type="checkbox" checked={on} onChange={(e) => setOn(e.target.checked)} />overscroll-behavior: contain</label>
    <div className="h-48 overflow-y-auto rounded-xl border p-3"><p>Page content</p>
      <div tabIndex={0} aria-label="Inner list" className={`my-2 h-24 overflow-y-auto bg-slate-100 p-2 ${on ? "overscroll-contain" : ""}`}>{rows(8)}</div>{rows(8)}</div></div>);
}
function Spring() {
  return (<m.button className="btn" whileHover={{ y: -4, boxShadow: "0 8px 16px rgba(0,0,0,.2)" }} whileTap={{ scale: 0.95 }} transition={tok.spring.snappy}>Hover and press me</m.button>);
}
function Feedback() {
  const [s, setS] = useState<S>("idle"); const n = useRef(0);
  const go = (e: string) => setS((c) => next(c, e));
  const press = () => { go("press"); const ok = n.current++ % 2 === 0; setTimeout(() => go(ok ? "ok" : "fail"), 900); };
  return (<div><button className="btn" disabled={s === "loading"} onClick={s === "success" ? () => go("reset") : press}>{{ idle: "Save", loading: "Saving…", success: "Saved ✓ (reset)", error: "Failed - retry" }[s]}</button>
    <p role="status" className="mt-2 text-sm text-slate-600">state: {s} (alternates success / error)</p></div>);
}
function Optimistic() {
  const [liked, setL] = useState(false); const [msg, setMsg] = useState("");
  const tap = () => { const v = !liked; setL(v); setMsg(""); setTimeout(() => { if (Math.random() < 0.4) { setL(!v); setMsg("Server failed - change rolled back."); } }, 800); };
  return (<div><button className="btn" aria-pressed={liked} onClick={tap}>{liked ? "♥ Liked" : "♡ Like"}</button><p role="status" className="mt-2 text-sm text-red-700">{msg}</p></div>);
}
function Dialog() {
  const r = useRef<HTMLDialogElement>(null);
  return (<><button className="btn" onClick={() => r.current?.showModal()}>Open dialog</button>
    <dialog ref={r} aria-label="Demo dialog" className="m-auto rounded-xl p-6 backdrop:bg-black/40"><p>Esc closes. Tab stays inside. Focus returns to the opener.</p><button className="btn mt-4" onClick={() => r.current?.close()}>Close</button></dialog></>);
}
function Accordion() {
  return (<div>{["What is it?", "Why use it?"].map((q) => <details key={q} className="mb-1 rounded border p-2"><summary className="cursor-pointer font-medium">{q}</summary><p className="pt-2">Show only what the current decision needs.</p></details>)}</div>);
}
function Skeleton() {
  const [l, setL] = useState(true);
  return (<div><button className="btn mb-2" onClick={() => setL(!l)}>{l ? "Show content" : "Show skeleton"}</button>
    <div aria-busy={l} className="space-y-2">{l ? [80, 60, 70].map((w) => <div key={w} className="h-4 animate-pulse rounded bg-slate-200 motion-reduce:animate-none" style={{ width: `${w}%` }} />) : <p>Loaded content in the same layout.</p>}</div></div>);
}
function Parallax() {
  const [y, setY] = useState(0); const rm = useReducedMotion();
  return (<div tabIndex={0} aria-label="Parallax demo" className="h-44 overflow-y-auto rounded-xl border" onScroll={(e) => setY(e.currentTarget.scrollTop)}>
    <div className="sticky top-0 h-0"><div className="h-44 bg-gradient-to-b from-sky-300 to-indigo-400" style={{ transform: rm ? undefined : `translateY(${-y * 0.5}px)` }} /></div>
    <div className="relative pt-32"><div className="bg-white/90 p-4">{rows(12)}</div></div></div>);
}
function Smooth() {
  const r = useRef<HTMLDivElement>(null);
  return (<div><div className="mb-2 flex gap-2"><button className="btn" onClick={() => r.current?.scrollTo({ top: 9999 })}>Jump to bottom</button><button className="btn" onClick={() => r.current?.scrollTo({ top: 0 })}>Jump to top</button></div>
    <div ref={r} tabIndex={0} aria-label="Smooth scroll demo" className={`${box} scroll-smooth motion-reduce:scroll-auto`}>{rows(20)}</div></div>);
}
function Tabs() {
  const T = ["Overview", "Specs", "Reviews"]; const [i, setI] = useState(0); const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const key = (e: React.KeyboardEvent) => { const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0; if (!d) return; const n = (i + d + T.length) % T.length; setI(n); refs.current[n]?.focus(); };
  return (<div><div role="tablist" aria-label="Demo tabs" onKeyDown={key} className="flex gap-1 border-b">{T.map((t, n) =>
    <button key={t} ref={(el) => { refs.current[n] = el; }} role="tab" id={`tab-${n}`} aria-selected={i === n} aria-controls="panel" tabIndex={i === n ? 0 : -1} onClick={() => setI(n)} className={`px-3 py-2 ${i === n ? "border-b-2 border-indigo-600 font-semibold" : ""}`}>{t}</button>)}</div>
    <div role="tabpanel" id="panel" aria-labelledby={`tab-${i}`} className="p-3">{T[i]} content. Arrow keys move between tabs.</div></div>);
}
function Pop() {
  return (<><button className="btn" popoverTarget="demo-pop">Toggle popover</button><div id="demo-pop" popover="auto" className="rounded-xl border p-4 shadow-lg">Light dismiss: click outside or press Esc.</div></>);
}
function Toast() {
  const [t, setT] = useState<{ id: number; msg: string }[]>([]); const n = useRef(0);
  const add = () => { const id = n.current++; setT((p) => [...p, { id, msg: `Saved at ${new Date().toLocaleTimeString()}` }]); setTimeout(() => setT((p) => p.filter((x) => x.id !== id)), 3000); };
  return (<div><button className="btn" onClick={add}>Show toast</button><div role="status" aria-live="polite" className="mt-2 space-y-1">{t.map((x) =>
    <m.div key={x.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={tok.spring.snappy} className="rounded bg-slate-800 p-2 text-white">{x.msg}</m.div>)}</div></div>);
}
function Drag() {
  const [p, setP] = useState({ x: 20, y: 20 }); const d = useRef<{ dx: number; dy: number } | null>(null);
  const keys: Record<string, [number, number]> = { ArrowLeft: [-10, 0], ArrowRight: [10, 0], ArrowUp: [0, -10], ArrowDown: [0, 10] };
  return (<div className="relative h-44 overflow-hidden rounded-xl border bg-slate-50"><div role="button" tabIndex={0} aria-label="Draggable card, arrow keys also move it" className="absolute h-14 w-24 cursor-grab touch-none select-none rounded-lg bg-indigo-700 p-2 text-white active:cursor-grabbing" style={{ left: p.x, top: p.y }}
    onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); d.current = { dx: e.clientX - p.x, dy: e.clientY - p.y }; }}
    onPointerMove={(e) => { if (d.current) setP({ x: e.clientX - d.current.dx, y: e.clientY - d.current.dy }); }}
    onPointerUp={() => { d.current = null; }}
    onKeyDown={(e) => { const v = keys[e.key]; if (v) { e.preventDefault(); setP((q) => ({ x: q.x + v[0], y: q.y + v[1] })); } }}>Drag me</div></div>);
}
function Palette() {
  const r = useRef<HTMLDialogElement>(null); const [q, setQ] = useState(""); const [i, setI] = useState(0);
  const hits = concepts.filter((c) => c.term.toLowerCase().includes(q.toLowerCase())).slice(0, 5);
  useEffect(() => { const f = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); r.current?.showModal(); } }; window.addEventListener("keydown", f); return () => window.removeEventListener("keydown", f); }, []);
  return (<><button className="btn" onClick={() => r.current?.showModal()}>Open palette (Ctrl/⌘ K)</button>
    <dialog ref={r} aria-label="Command palette" className="m-auto w-80 rounded-xl p-3 backdrop:bg-black/40"><input autoFocus aria-label="Search concepts" className="w-full rounded border p-2" value={q} onChange={(e) => { setQ(e.target.value); setI(0); }} onKeyDown={(e) => { if (e.key === "ArrowDown") { e.preventDefault(); setI((v) => Math.min(v + 1, hits.length - 1)); } else if (e.key === "ArrowUp") { e.preventDefault(); setI((v) => Math.max(v - 1, 0)); } else if (e.key === "Enter" && hits[i]) location.href = `/concepts/${hits[i].slug}`; }} placeholder="Jump to a concept…" />
      <ul className="mt-2">{hits.map((c, n) => <li key={c.slug}><a aria-current={n === i} className={`block rounded p-2 hover:bg-indigo-50 focus-visible:bg-indigo-50 ${n === i ? "bg-indigo-100" : ""}`} href={`/concepts/${c.slug}`}>{c.term}</a></li>)}</ul></dialog></>);
}
function Carousel() {
  const r = useRef<HTMLDivElement>(null);
  const go = (d: number) => r.current?.scrollBy({ left: d * r.current.clientWidth * 0.8 });
  return (<section aria-roledescription="carousel" aria-label="Demo carousel"><div ref={r} tabIndex={0} aria-label="Slides" className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth motion-reduce:scroll-auto">{["A", "B", "C", "D"].map((t) => <div key={t} className="grid h-28 w-3/5 shrink-0 snap-start place-items-center rounded-xl bg-teal-700 text-2xl text-white">{t}</div>)}</div>
    <div className="mt-2 flex gap-2"><button className="btn" onClick={() => go(-1)}>Previous</button><button className="btn" onClick={() => go(1)}>Next</button></div></section>);
}
function Stagger() {
  const [k, setK] = useState(0);
  return (<div><button className="btn mb-2" onClick={() => setK(k + 1)}>Replay</button>
    <m.ul key={k} initial="h" animate="s" variants={{ s: { transition: { staggerChildren: 0.08 } } }}>{["One", "Two", "Three", "Four"].map((t) => <m.li key={t} variants={{ h: { opacity: 0, x: -16 }, s: { opacity: 1, x: 0 } }} transition={tok.spring.snappy} className="mb-1 rounded bg-sky-100 p-2">{t}</m.li>)}</m.ul></div>);
}
function ViewT() {
  const [a, setA] = useState(true);
  const flip = () => { const d = document as Document & { startViewTransition?: (cb: () => void) => unknown }; if (d.startViewTransition) d.startViewTransition(() => flushSync(() => setA((v) => !v))); else setA((v) => !v); };
  return (<div><button className="btn mb-2" onClick={flip}>Swap sides</button>
    <div className={`flex ${a ? "justify-start" : "justify-end"}`}><div style={{ viewTransitionName: "vt-box" } as React.CSSProperties} className="grid h-16 w-24 place-items-center rounded-lg bg-rose-700 text-white">Box</div></div></div>);
}
function Elev() {
  return (<div className="grid grid-cols-2 gap-3">{["Flat", "Raised"].map((t, i) => <div key={t} tabIndex={0} className={`rounded-xl border bg-white p-6 text-center ${i ? "shadow-sm hover:shadow-xl focus-visible:shadow-xl motion-safe:transition motion-safe:hover:-translate-y-1" : ""}`}>{t}{i ? " (hover or focus)" : ""}</div>)}</div>);
}
function useEsc() {
  const [off, setOff] = useState(false);
  return { off, props: { onKeyDown: (e: React.KeyboardEvent) => { if (e.key === "Escape") setOff(true); }, onMouseLeave: () => setOff(false), onBlur: () => setOff(false) } };
}
function Tip() {
  const { off, props } = useEsc();
  return (<span className="group relative inline-block" {...props}><button className="btn" aria-describedby="tip1">Hover or focus me (Esc hides)</button><span id="tip1" role="tooltip" className={`pointer-events-none absolute left-0 top-full z-10 mt-1 w-48 rounded bg-slate-800 p-2 text-sm text-white opacity-0 motion-safe:transition-opacity ${off ? "" : "group-focus-within:opacity-100 group-hover:opacity-100"}`}>Extra hint, never essential info.</span></span>);
}
function HoverCard() {
  const { off, props } = useEsc();
  return (<span className="group relative inline-block" {...props}><a href="/concepts/dialog" className="underline">Modal dialog</a><span className={`absolute left-0 top-full z-10 mt-1 hidden w-56 rounded-xl border bg-white p-3 shadow-lg ${off ? "" : "group-focus-within:block group-hover:block"}`}><strong>Modal dialog</strong><br />A focused layer that blocks the page until dismissed.</span></span>);
}
function Infinite() {
  const [n, setN] = useState(10); const root = useRef<HTMLDivElement>(null); const end = useRef<HTMLDivElement>(null);
  useEffect(() => { const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setN((v) => Math.min(v + 10, 100)); }, { root: root.current }); if (end.current) o.observe(end.current); return () => o.disconnect(); }, []);
  return (<div><div ref={root} tabIndex={0} aria-label="Infinite list" className={box}>{Array.from({ length: n }, (_, i) => <p key={i} className="py-2">Item {i + 1}</p>)}<div ref={end} className="h-1" /></div><p role="status" className="mt-1 text-sm">Loaded {n} of 100</p></div>);
}
function Pull() {
  const [dy, setDy] = useState(0); const [busy, setBusy] = useState(false); const y0 = useRef<number | null>(null);
  const refresh = () => { setBusy(true); setTimeout(() => setBusy(false), 1000); };
  const end = () => { if (dy > 60) refresh(); y0.current = null; setDy(0); };
  return (<div><button className="btn mb-2" onClick={refresh}>Refresh (button alternative)</button>
    <div className="rounded-xl border"><div className="touch-none select-none rounded-t-xl bg-slate-100 text-center text-sm text-slate-700" style={{ height: 32 + dy }}
      onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); y0.current = e.clientY; }} onPointerMove={(e) => { if (y0.current !== null) setDy(Math.max(0, Math.min(80, e.clientY - y0.current))); }} onPointerUp={end} onPointerCancel={end}>
      <p role="status" className="pt-1.5">{busy ? "Refreshing…" : dy > 60 ? "Release to refresh" : "Pull this bar down"}</p></div>
      <div tabIndex={0} aria-label="Refreshable list" className="h-32 overflow-y-auto p-3" style={{ overscrollBehaviorY: "contain" }}>{rows(8)}</div></div></div>);
}
function Swipe() {
  const all = ["Message A", "Message B", "Message C"]; const [items, setI] = useState(all);
  const drop = (t: string) => setI((p) => p.filter((x) => x !== t));
  return (<div><ul className="space-y-2">{items.map((t) => <m.li key={t} drag="x" dragSnapToOrigin onDragEnd={(_, i) => { if (Math.abs(i.offset.x) > 100) drop(t); }} className="flex items-center justify-between rounded border bg-white p-3">{t}<button className="btn" onClick={() => drop(t)}>Dismiss</button></m.li>)}</ul>
    {items.length === 0 && <button className="btn" onClick={() => setI(all)}>Reset</button>}</div>);
}
function Sheet() {
  const r = useRef<HTMLDialogElement>(null); const [dy, setDy] = useState(0); const y0 = useRef<number | null>(null);
  const end = () => { if (dy > 80) r.current?.close(); y0.current = null; setDy(0); };
  return (<><button className="btn" onClick={() => r.current?.showModal()}>Open bottom sheet</button>
    <dialog ref={r} aria-label="Bottom sheet" style={{ transform: `translateY(${dy}px)` }} className="fixed inset-x-0 bottom-0 top-auto m-0 w-full max-w-none rounded-t-2xl p-6 backdrop:bg-black/40">
      <div aria-hidden className="mx-auto mb-3 h-2 w-12 cursor-grab touch-none rounded bg-slate-300" onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); y0.current = e.clientY; }} onPointerMove={(e) => { if (y0.current !== null) setDy(Math.max(0, e.clientY - y0.current)); }} onPointerUp={end} onPointerCancel={end} />
      <p>Drag the handle down, press Esc, or use the button.</p><button className="btn mt-3" onClick={() => r.current?.close()}>Close</button></dialog></>);
}
function DatePicker() {
  const [d, setD] = useState("");
  return (<div><label className="block">Pick a date <input type="date" className="ml-2 rounded border p-1" value={d} onChange={(e) => setD(e.target.value)} /></label><p role="status" className="mt-2 text-sm">{d ? `Selected: ${d}` : "No date selected"}</p></div>);
}
const DEMOS: Record<string, () => React.JSX.Element> = { "scroll-snap": Snap, sticky: Sticky, "scroll-progress": Progress, "scroll-reveal": Reveal, "scroll-driven": Driven, overscroll: Overscroll, spring: Spring, "feedback-states": Feedback, "optimistic-ui": Optimistic, dialog: Dialog, accordion: Accordion, skeleton: Skeleton, parallax: Parallax, "smooth-scroll": Smooth, tabs: Tabs, popover: Pop, toast: Toast, drag: Drag, "command-palette": Palette, carousel: Carousel, stagger: Stagger, "view-transition": ViewT, "hover-elevation": Elev, tooltip: Tip, "hover-card": HoverCard, "infinite-scroll": Infinite, "pull-to-refresh": Pull, "swipe-to-dismiss": Swipe, "bottom-sheet": Sheet, "date-picker": DatePicker };
export function Demo({ k }: { k: string }) { const C = DEMOS[k]; return C ? <C /> : null; }

const LEVELS: LS[] = ["known", "learning", "review", "mastered", "confused"];
function useStatus() {
  const [s, setS] = useState<Record<string, LS>>({});
  useEffect(() => { try { setS(JSON.parse(localStorage.getItem("atlas") || "{}")); } catch {} }, []);
  const set = (k: string, v: LS) => { const n = { ...s, [k]: v }; setS(n); try { localStorage.setItem("atlas", JSON.stringify(n)); } catch {} };
  return [s, set] as const;
}
export function Status({ slug }: { slug: string }) {
  const [s, set] = useStatus();
  return (<label className="mt-6 block">My status: <select className="rounded border p-1" value={s[slug] ?? ""} onChange={(e) => set(slug, e.target.value as LS)}><option value="">unmarked</option>{LEVELS.map((l) => <option key={l}>{l}</option>)}</select></label>);
}
export function NextUp() {
  const [s] = useStatus(); const c = learnNext(concepts, s);
  return (<p className="mt-4 rounded-lg bg-indigo-50 p-3">{c ? <>Learn next: <a className="underline" href={`/concepts/${c.slug}`}>{c.term}</a></> : "Everything mastered."}</p>);
}
