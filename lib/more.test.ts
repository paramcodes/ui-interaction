import { describe, expect, it } from "vitest";
import { concepts } from "./domain";
import { toGraph } from "./graph";
import { active, total, visibleRange, waterfall } from "./sim";
import { buildTutorPrompt, neighborhood } from "./tutor";
describe("phases 4-10", () => {
  it("graph has one node per concept and dashed prerequisite edges", () => {
    const g = toGraph(concepts); expect(g.nodes.filter((n) => n.kind === "concept")).toHaveLength(concepts.length); expect(g.edges.some((e) => e.dashed)).toBe(true);
  });
  it("chained requests are slower than parallel", () => {
    const a = waterfall("a", "a", [{ name: "x", ms: 100 }, { name: "y", ms: 100, after: "x" }]); const b = waterfall("b", "b", [{ name: "x", ms: 100 }, { name: "y", ms: 100 }]);
    expect(total(a)).toBe(200); expect(total(b)).toBe(100); expect(active(a, 150)[0].lane).toBe("y");
  });
  it("virtualizes", () => { const r = visibleRange(0, 32, 192, 10000); expect(r.end - r.start).toBeLessThan(15); });
  it("tutor prompt includes neighborhood and read-only rule", () => {
    const c = concepts.find((x) => x.slug === "spring")!; expect(neighborhood(concepts, c).length).toBeGreaterThan(0);
    expect(buildTutorPrompt(concepts, c, "quiz", "learning")).toContain("read-only");
  });
});
