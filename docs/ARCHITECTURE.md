# Architecture (how it was built, and why)
- `lib/domain.ts` - Concept model + data + `learnNext`. Pure TypeScript, no React. Why: content grows 10 -> 500 concepts without touching UI.
- `lib/tokens.ts` - motion tokens (duration, ease, spring). Why: pages say "snappy", never invent numbers.
- `lib/machine.ts` - tiny transition-table state machine. Why: UI states become data you can test and later visualise.
- `lib/prompt.ts` - pure function: selected vocabulary -> Codex prompt (Prompt Lab).
- `components/Demos.tsx` - one registry keyed by concept slug; each demo composes a native browser feature (snap, sticky, dialog, overscroll) or one Motion primitive. Why: concept <-> demo is one key.
- `app/page.tsx` playground, `app/concepts/[slug]` lesson contract rendered from data, `app/prompt-lab` generator.
Flow: data -> lesson page + demo + prompt. Learning status lives in localStorage and feeds "Learn next" via prerequisites (`needs`).
- `lib/graph.ts` -> `app/graph` : data -> nodes/edges (pure), ELK computes layered positions, React Flow renders; click opens the lesson.
- `lib/sim.ts` -> `app/simulations` : Simulation = lanes of timed events; `waterfall`, `active`, `visibleRange` are pure so the UI only scrubs time.
- `lib/tutor.ts` + `app/api/tutor` : builds context (concept, neighbors, evidence, learner status). Read-only by design; without ANTHROPIC_API_KEY it returns the prompt instead.
- Hardening: error.tsx, loading.tsx, sitemap.ts.
