export type SimEvent = { lane: string; start: number; dur: number };
export type Simulation = { id: string; title: string; events: SimEvent[] };
export type Req = { name: string; ms: number; after?: string };
export function waterfall(id: string, title: string, reqs: Req[]): Simulation {
  const end: Record<string, number> = {};
  const events = reqs.map((r) => { const start = r.after ? end[r.after] ?? 0 : 0; end[r.name] = start + r.ms; return { lane: r.name, start, dur: r.ms }; });
  return { id, title, events };
}
export const total = (s: Simulation) => Math.max(0, ...s.events.map((e) => e.start + e.dur));
export const active = (s: Simulation, t: number) => s.events.filter((e) => t >= e.start && t < e.start + e.dur);
export function visibleRange(top: number, itemH: number, viewH: number, count: number, overscan = 3) {
  return { start: Math.max(0, Math.floor(top / itemH) - overscan), end: Math.min(count, Math.ceil((top + viewH) / itemH) + overscan) };
}
export function layoutThrash(n: number, batched: boolean): Simulation {
  const events: SimEvent[] = []; let t = 0;
  for (let i = 0; i < (batched ? 1 : n); i++) { events.push({ lane: "read (forces layout)", start: t, dur: 8 }); t += 8; events.push({ lane: "write", start: t, dur: 1 }); t += 1; }
  return { id: batched ? "batched" : "thrash", title: batched ? "Batched reads, then writes" : "Interleaved read/write (layout thrashing)", events };
}
export const optimistic: Simulation = { id: "optimistic", title: "Optimistic UI", events: [{ lane: "UI shows result", start: 0, dur: 20 }, { lane: "server request", start: 0, dur: 600 }, { lane: "reconcile", start: 600, dur: 40 }] };
export const pessimistic: Simulation = { id: "pessimistic", title: "Wait for server (spinner)", events: [{ lane: "spinner", start: 0, dur: 600 }, { lane: "UI shows result", start: 600, dur: 20 }] };
