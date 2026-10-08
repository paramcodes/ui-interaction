# Domain
- **Concept** (lib/domain.ts): slug, term, category, what/problem/when/whenNot/how, tradeoffs, accessibility rules, performance notes, prompt recipe, DevTools evidence, deeper (Frontend Atlas link), related, needs (prerequisites).
- Edges: `related` (association) and `needs` (prerequisite) feed the graph and "Learn next".
- **Demo**: a component in components/Demos.tsx keyed by concept slug.
- **Simulation** (lib/sim.ts): lanes of timed events. **State machine** (lib/machine.ts): transition table.
- **Status**: known | learning | review | mastered | confused (browser localStorage only).
- Plan entities not yet separate types: Pattern, Example, Interaction, Motion, AccessibilityRule, PerformanceNote, PromptRecipe (currently fields on Concept).
