"use client";

import "@xyflow/react/dist/style.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ReactFlow, type Edge, type Node } from "@xyflow/react";
import ELK from "elkjs/lib/elk.bundled.js";
import { concepts } from "@/lib/domain";
import { toGraph } from "@/lib/graph";

const W = 180, H = 46;

export default function Graph() {
  const router = useRouter();
  const [g, setG] = useState<{ nodes: Node[]; edges: Edge[] }>({ nodes: [], edges: [] });

  useEffect(() => {
    const { nodes, edges } = toGraph(concepts);
    new ELK()
      .layout({
        id: "root",
        layoutOptions: {
          "elk.algorithm": "layered",
          "elk.direction": "RIGHT",
          "elk.spacing.nodeNode": "30",
          "elk.layered.spacing.nodeNodeBetweenLayers": "50",
        },
        children: nodes.map((n) => ({ id: n.id, width: W, height: H })),
        edges: edges.map((e) => ({ id: e.id, sources: [e.source], targets: [e.target] })),
      })
      .then((l) =>
        setG({
          nodes: nodes.map((n) => {
            const p = l.children?.find((c) => c.id === n.id);
            const isCategory = n.kind !== "concept";
            return {
              id: n.id,
              data: { label: n.label },
              position: { x: p?.x ?? 0, y: p?.y ?? 0 },
              style: {
                width: W,
                height: H,
                background: isCategory ? "#ffc93c" : "#fffdf7",
                border: "2px solid #4a3428",
                borderRadius: "14px",
                boxShadow: "0 3px 0 #4a3428",
                color: "#4a3428",
                fontWeight: isCategory ? 900 : 800,
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center" as const,
                cursor: isCategory ? "default" : "pointer",
                padding: "4px 8px",
              },
            };
          }),
          edges: edges.map((e) => ({
            id: e.id,
            source: e.source,
            target: e.target,
            animated: e.dashed,
            style: {
              stroke: "#4a3428",
              strokeWidth: 2,
              strokeDasharray: e.dashed ? "5 5" : undefined,
            },
          })),
        })
      );
  }, []);

  return (
    <main className="space-y-6">
      {/* Hero Header */}
      <section className="table-mat p-6 md:p-8">
        <div className="flex items-center justify-between">
          <span className="badge-pill bg-[#ff7d9e] text-xs font-black text-[#4a3428]">
            🕸️ TOPOLOGICAL KNOWLEDGE GRAPH
          </span>
          <span className="text-xs font-extrabold text-[#4a3428]">
            POWERED BY ELK & REACT FLOW
          </span>
        </div>

        <h1 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-[#4a3428]">
          Concept Graph
        </h1>

        <p className="mt-2 text-sm md:text-base font-bold text-[#4a3428] max-w-2xl leading-relaxed">
          Interactive dependency hierarchy. Layered from left to right. Solid connections group
          patterns under functional categories; dashed connections indicate prerequisite learning chains.
        </p>

        {/* Legend */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-xl border-2 border-[#4a3428] bg-[#ffc93c] px-3 py-1 text-xs font-black text-[#4a3428] shadow-[0_2px_0_#4a3428]">
            <span>📁</span> Category Cluster
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl border-2 border-[#4a3428] bg-[#fffdf7] px-3 py-1 text-xs font-black text-[#4a3428] shadow-[0_2px_0_#4a3428]">
            <span>🕹️</span> Concept (Click to open)
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl border-2 border-[#4a3428] bg-[#fdf5e0] px-3 py-1 text-xs font-extrabold text-[#4a3428]">
            <span className="h-0.5 w-4 bg-[#4a3428]" /> Solid: Grouping
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl border-2 border-[#4a3428] bg-[#fdf5e0] px-3 py-1 text-xs font-extrabold text-[#4a3428]">
            <span className="h-0.5 w-4 border-t-2 border-dashed border-[#4a3428]" /> Dashed: Prerequisite
          </div>
        </div>
      </section>

      {/* Graph Canvas Plate */}
      <section className="table-plate overflow-hidden p-3 md:p-4">
        <div className="h-[72vh] w-full rounded-2xl border-2 border-[#4a3428] bg-[#fdf5e0] shadow-inner">
          <ReactFlow
            nodes={g.nodes}
            edges={g.edges}
            fitView
            nodesDraggable={false}
            onNodeClick={(_, n) => {
              if (concepts.some((c) => c.slug === n.id)) {
                router.push(`/concepts/${n.id}`);
              }
            }}
          />
        </div>
      </section>
    </main>
  );
}
