# Handoff (single autopilot run)
## Completed
Phase 0 docs; Phase 1 (10 live demos: scroll vertical slice + motion/feedback/overlay); Phase 2 data model; Phase 3 lesson pages; Phase 6 DevTools evidence field; Phase 7 Prompt Lab; Phase 8 `deeper` links; Phase 9 learning status + prerequisites.
## Not built
See docs/future.md (graph, simulation engine, AI tutor, hardening).
## Validation
See Update 7.
## Commands
npm install; npm run dev; npm test; npm run build
## Update 2
Added: Phase 4 graph (@xyflow/react + elkjs, new deps justified by the plan), Phase 5 simulations (waterfall, virtualization), Phase 10 tutor, Phase 11 basics (error/loading/sitemap), demos: accordion, skeleton, parallax. Still unvalidated: run npm install, npm test, npm run build.
## Update 3
Added demos (smooth scroll, tabs, popover, toast = 17 total), simulations (layout thrashing, optimistic vs spinner), Playwright + axe e2e (`npm run e2e`), not-found page, vitest scoped to lib/. Still unvalidated: npm install, npm test, npm run build, npm run e2e (axe may flag contrast; fix what it reports).
## Update 4
Added 6 demos (drag/pointer capture, command palette, carousel, stagger, view transition, hover elevation = 23 total, meets the Phase 1 target), Lighthouse CI (`npm run lighthouse` after build), client error + web-vitals reporting (/api/log), two more e2e tests. Still unvalidated: install, test, build, e2e, lighthouse.
## Update 5
Added 7 demos (tooltip, hover card, infinite scroll, pull-to-refresh, swipe-to-dismiss, bottom sheet, date picker = 30 total), command palette arrow-key navigation, tutor rate limit (10/min per IP, in-memory), infinite-scroll e2e test. Still unvalidated: install, test, build, e2e, lighthouse.
## Update 6
Esc dismissal for tooltip/hover card, draggable bottom sheet, pull-to-refresh via a touch-safe handle bar, Phase 0 docs completed, per-phase handoffs in docs/handoffs/PHASE-XX.md. Still unvalidated.
## Update 7 - Validation
- `npm install`: ok. `npm test`: 15/15 (unit + jsdom component tests rendering all 30 demos and exercising tabs, feedback machine, drag keys, palette).
- `npm run build`: initially failed on missing @types/react-dom; fixed; now passes (Next 16.4.0, Turbopack, 40 static pages).
- Server smoke test: all routes 200, unknown concept 404, tutor validates input and returns 429 on the 11th call/min.
- NOT run: `npm run e2e` (Playwright) and `npm run lighthouse` - Chromium download was blocked in the build sandbox. Run them locally; axe may report contrast issues.
