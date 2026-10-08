import type { Concept, Status } from "./domain";
export const MODES = ["explain", "compare", "quiz", "describe-ui", "generate-prompt", "critique-ui", "research"] as const;
export type Mode = (typeof MODES)[number];
export function neighborhood(all: Concept[], c: Concept): Concept[] {
  const ids = new Set([...c.related, ...c.needs, ...all.filter((x) => x.related.includes(c.slug) || x.needs.includes(c.slug)).map((x) => x.slug)]);
  return all.filter((x) => ids.has(x.slug));
}
export function buildTutorPrompt(all: Concept[], c: Concept, mode: Mode, status?: Status, question = ""): string {
  const n = neighborhood(all, c).map((x) => x.term).join(", ") || "none";
  return [
    `You are a UI vocabulary tutor. Mode: ${mode}.`,
    `Concept: ${c.term} - ${c.what}`, `How it works: ${c.how}`, `Trade-offs: ${c.tradeoffs.join("; ")}`,
    `Accessibility: ${c.a11y.join("; ")}`, `DevTools evidence: ${c.evidence}`, `Neighboring concepts: ${n}`,
    `Learner status: ${status ?? "unmarked"}`, question ? `Learner question: ${question}` : "",
    "Rules: you are read-only. Never claim to change the curriculum data; label any correction as a suggestion for a human to review.",
  ].filter(Boolean).join("\n");
}
