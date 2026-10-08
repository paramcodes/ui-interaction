# AGENTS.md
1. Implement only the requested phase; record future ideas in docs/future.md.
2. Keep domain logic (lib/domain.ts), simulation and visualization data independent from rendering.
3. Accessibility is part of correctness: keyboard, accessible names, live regions, prefers-reduced-motion.
4. Animation communicates, never decorates; use tokens from lib/tokens.ts.
5. Every interaction has explicit states. Prefer native/CSS before JavaScript. Measure before optimizing.
6. No new dependency without justification. Keep the repo buildable, tested (`npm test`), and write a handoff per phase.
Full plan: docs/MASTER-PLAN.md
