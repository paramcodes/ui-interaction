import { describe, expect, it } from "vitest";
import { buildPrompt } from "./prompt";
import { next } from "./machine";
import { concepts, learnNext } from "./domain";
describe("atlas", () => {
  it("builds prompts with reduced-motion fallback", () => {
    const p = buildPrompt({ component: "dialog", behaviors: ["focus trap"], motion: [], a11y: [], visual: [] });
    expect(p).toContain("- focus trap"); expect(p).toContain("prefers-reduced-motion");
  });
  it("runs the feedback machine", () => { expect(next("idle", "press")).toBe("loading"); expect(next("idle", "ok")).toBe("idle"); });
  it("suggests the first concept with mastered prerequisites", () => {
    expect(learnNext(concepts, {})?.slug).toBe("scroll-snap");
    expect(learnNext(concepts, { "scroll-snap": "mastered", sticky: "mastered", overscroll: "mastered", spring: "mastered", dialog: "mastered" })?.slug).toBe("scroll-progress");
  });
  it("has valid references", () => { const s = new Set(concepts.map((c) => c.slug)); concepts.forEach((c) => [...c.related, ...c.needs].forEach((r) => expect(s.has(r)).toBe(true))); });
});
