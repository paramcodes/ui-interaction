export type Choice = { component: string; behaviors: string[]; motion: string[]; a11y: string[]; visual: string[] };
const block = (h: string, a: string[]) => (a.length ? ["", `${h}:`, ...a.map((x) => `- ${x}`)] : []);
export function buildPrompt(c: Choice): string {
  return [
    `Build an accessible ${c.component} with these requirements.`,
    ...block("Behavior", c.behaviors), ...block("Motion", c.motion),
    ...block("Accessibility", [...c.a11y, "respect prefers-reduced-motion"]), ...block("Visual", c.visual),
    "", "Prefer native browser behavior before JavaScript. Keep every interaction state explicit. Include tests.",
  ].join("\n");
}
