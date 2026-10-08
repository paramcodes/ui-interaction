"use client";
import "@xyflow/react/dist/style.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ReactFlow, type Edge, type Node } from "@xyflow/react";
import ELK from "elkjs/lib/elk.bundled.js";
import { concepts } from "@/lib/domain";
import { toGraph } from "@/lib/graph";
const W = 170, H = 40;
export default function Graph() {
  const router = useRouter();
  const [g, setG] = useState<{ nodes: Node[]; edges: Edge[] }>({ nodes: [], edges: [] });
  useEffect(() => {
    const { nodes, edges } = toGraph(concepts);
    new ELK().layout({ id: "root", layoutOptions: { "elk.algorithm": "layered", "elk.direction": "RIGHT" }, children: nodes.map((n) => ({ id: n.id, width: W, height: H })), edges: edges.map((e) => ({ id: e.id, sources: [e.source], targets: [e.target] })) })
      .then((l) => setG({
        nodes: nodes.map((n) => { const p = l.children?.find((c) => c.id === n.id); return { id: n.id, data: { label: n.label }, position: { x: p?.x ?? 0, y: p?.y ?? 0 }, style: { width: W, background: n.kind === "concept" ? "#eef2ff" : "#fde68a" } }; }),
        edges: edges.map((e) => ({ id: e.id, source: e.source, target: e.target, animated: e.dashed, style: e.dashed ? { strokeDasharray: "4" } : undefined })),
      }));
  }, []);
  return (<main><h1 className="text-3xl font-bold">Concept graph</h1>
    <p className="mb-2 text-slate-600">Solid: grouping. Dashed: prerequisite. Click a concept to open its lesson.</p>
    <div className="h-[70vh] rounded border"><ReactFlow nodes={g.nodes} edges={g.edges} fitView nodesDraggable={false} onNodeClick={(_, n) => { if (concepts.some((c) => c.slug === n.id)) router.push(`/concepts/${n.id}`); }} /></div></main>);
}
