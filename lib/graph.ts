import type { Concept } from "./domain";
export type GNode = { id: string; label: string; kind: "root" | "cat" | "concept" };
export type GEdge = { id: string; source: string; target: string; dashed?: boolean };
export function toGraph(all: Concept[]) {
  const cats = [...new Set(all.map((c) => c.cat))];
  const nodes: GNode[] = [{ id: "ui", label: "UI", kind: "root" }, ...cats.map((c) => ({ id: `cat:${c}`, label: c, kind: "cat" as const })), ...all.map((c) => ({ id: c.slug, label: c.term, kind: "concept" as const }))];
  const edges: GEdge[] = [
    ...cats.map((c) => ({ id: `ui>${c}`, source: "ui", target: `cat:${c}` })),
    ...all.map((c) => ({ id: `cat>${c.slug}`, source: `cat:${c.cat}`, target: c.slug })),
    ...all.flatMap((c) => c.needs.map((n) => ({ id: `${n}>${c.slug}`, source: n, target: c.slug, dashed: true }))),
  ];
  return { nodes, edges };
}
