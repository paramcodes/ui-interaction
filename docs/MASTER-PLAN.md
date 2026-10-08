# UI Interaction Atlas — Codex Master Plan

## Purpose

Build a **visual UI/interaction learning website** for someone who knows how to build software but does not yet have strong UI vocabulary.

The site should teach both:

1. **What a UI pattern is**
2. **How to ask Codex/AI to build it precisely**

The first release should feel like an interactive cookbook/playground rather than a documentation page.

---

# 1. Product principle

Avoid this:

```text
Term
Definition
Paragraph
```

Build this:

```text
TERM
 │
 ├── What is it?
 ├── Why does it exist?
 ├── When should I use it?
 ├── What value does it add?
 │
 ├── LIVE EXAMPLE
 │      ↓
 │   interact with it
 │
 ├── HOW IT WORKS
 │      ↓
 │   diagram / timeline / state machine
 │
 ├── TRADE-OFFS
 │
 ├── ACCESSIBILITY
 │
 ├── PERFORMANCE
 │
 ├── CODE
 │
 └── PROMPT VOCABULARY
        ↓
   "How do I ask Codex for this?"
```

---

# 2. Recommended stack

## Core

```text
Next.js 16
React 19.x
TypeScript
Tailwind CSS
```

## Components / behavior

```text
shadcn/ui
Base UI
Radix UI
React Aria
```

For a new shadcn/ui project, **Base UI is now the default**, while Radix and React Aria are supported alternatives. Existing projects do not need to migrate just because the default changed. Choose one base and stay consistent.  
Source: https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default  
Source: https://ui.shadcn.com/docs/changelog/2026-07-react-aria

Recommended default:

```text
shadcn/ui
    +
Base UI
```

Use Radix or React Aria where their primitives provide a stronger fit.

shadcn/ui is especially suitable for this project because its model is **open code + composition**, so Codex can inspect and modify the actual component source rather than treating the UI as an opaque package.  
Source: https://ui.shadcn.com/docs

## Motion

```text
Motion for React
```

Use for:

- layout transitions
- enter/exit animation
- shared-element transitions
- gestures
- springs
- scroll-linked effects
- staged explanations

Source: https://motion.dev/docs/react

## Graph

```text
React Flow
ELK.js
```

Use React Flow for the concept/relationship graph.

Use ELK.js for hierarchical layout rather than manually positioning graph nodes.

## Data visualization

```text
D3
```

Use D3 for simulations and quantitative visualization, not the primary application graph.

Examples:

```text
scroll progress
timelines
latency
motion curves
request waterfalls
memory growth
```

## Future large graph

```text
Sigma.js
```

Only introduce WebGL graph rendering after measurement proves it is needed.

## Testing

```text
Vitest
Playwright
```

---

# 3. Visualization technology rules

| Need | Use |
|---|---|
| Interactive knowledge graph | React Flow |
| Hierarchical graph layout | ELK.js |
| Simple explanatory diagram | SVG + React |
| Data-driven chart | D3 |
| UI motion | Motion |
| Component primitives | shadcn/ui + Base UI |
| Accessibility-heavy custom primitive | React Aria / Radix where appropriate |
| Sequence diagram | Mermaid or SVG |
| Very large graph | Sigma.js |
| 3D | React Three Fiber only when spatial reasoning genuinely benefits |

Do not introduce every library in Phase 1.

Start with:

```text
Next.js
React
Tailwind
shadcn/ui
Motion
SVG
```

Then introduce other technologies only when their use case appears.

---

# 4. Main website structure

```text
/
├── Home
│
├── Vocabulary
│   ├── Motion
│   ├── Scroll
│   ├── Components
│   ├── Layout
│   ├── Interaction
│   ├── Loading
│   ├── Navigation
│   ├── Accessibility
│   └── Performance
│
├── Playground
│
├── Patterns
│
├── Concepts
│
└── Prompt Lab
```

The site should eventually feel like:

```text
UI vocabulary
       ↓
live examples
       ↓
interactive playground
       ↓
concept relationships
       ↓
prompt generation
```

---

# 5. Concept page contract

Every concept should follow the same teaching structure.

```text
# Concept

## What is it?

## Problem without it

## Why does that problem exist?

## Why do we need this?

## When should we use it?

## When should we NOT use it?

## How does it work?

## Live example

## Before / After

## Interaction diagram

## Accessibility considerations

## Performance considerations

## Trade-offs

## Alternatives

## Real-world examples

## Code

## Prompt vocabulary

## Related concepts

## Practice challenge
```

This structure is more important than any particular visual style.

---

# 6. UI vocabulary catalogue

## A. Motion

```text
Animation
Transition
Easing
Ease-in
Ease-out
Ease-in-out
Cubic Bezier
Spring
Stiffness
Damping
Mass
Duration
Velocity
Stagger
Sequence
Enter animation
Exit animation
Layout animation
Shared-element transition
Morphing
Microinteraction
Gesture animation
Reduced motion
```

### Example progression

```text
No motion
    ↓
basic transition
    ↓
easing
    ↓
spring
    ↓
stagger
    ↓
shared-element transition
```

---

# 7. Scroll vocabulary

This should be one of the best sections in the site.

```text
Native scrolling
Smooth scrolling
Inertial scrolling
Momentum scrolling
Scroll position
Scroll restoration
Scroll chaining
Overscroll
Scroll snap
Scroll margin
Scroll padding
Sticky positioning
Pinning
Scroll progress
Scroll spy
Scroll reveal
Scroll-triggered animation
Scroll-driven animation
Scroll-linked animation
Scrub
Parallax
Infinite scrolling
Virtual scrolling
Pull-to-refresh
Horizontal scrolling
Nested scrolling
```

Important conceptual distinction:

```text
Scroll-triggered

scroll
  ↓
trigger
  ↓
normal animation
```

versus:

```text
Scroll-driven

scroll position
      ↓
animation progress
```

MDN explicitly distinguishes these models.  
Sources:
https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animation_triggers/Using_scroll-triggered_animations
https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations

Scroll Snap provides controlled snap positions for scrolling.  
Source:
https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap

Overscroll behavior controls what happens when a nested scroll container reaches its boundary and prevents or permits scroll chaining.  
Source:
https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Overscroll_behavior

---

# 8. Scroll playground

The website should provide actual interactive examples:

```text
[ Smooth Scroll ]

[ Scroll Snap ]

[ Sticky Header ]

[ Scroll Spy ]

[ Scroll Progress ]

[ Scroll Reveal ]

[ Scroll-Driven Animation ]

[ Parallax ]

[ Nested Scroll + Overscroll ]

[ Horizontal Gallery ]

[ Infinite Scroll ]

[ Virtualized List ]
```

Every demo gets:

```text
LIVE
CSS / API
What is happening?
Why use it?
Trade-offs
```

---

# 9. Component vocabulary

## Feedback

```text
Toast
Snackbar
Banner
Alert
Inline feedback
Success state
Error state
Pending state
Loading state
```

## Focused workflows

```text
Modal
Dialog
Drawer
Sheet
Bottom Sheet
Popover
Tooltip
Hover Card
```

## Navigation

```text
Tabs
Segmented Control
Breadcrumbs
Sidebar
Command Palette
Context Menu
Dropdown Menu
Pagination
Carousel
```

## Disclosure

```text
Accordion
Collapsible
Disclosure
Expandable Card
Details / Summary
```

## Data / forms

```text
Combobox
Autocomplete
Select
Multi-select
Date Picker
Slider
Switch
Checkbox
Radio Group
Input
Textarea
Form
Validation
```

## Loading

```text
Skeleton
Spinner
Progress Bar
Determinate Progress
Indeterminate Progress
Streaming UI
Optimistic UI
```

---

# 10. Component playground

Create a page showing all components as live examples.

For every component show:

```text
Default
Hover
Focus
Pressed
Disabled
Loading
Error
Success
Keyboard behavior
Mobile behavior
```

Example:

```text
BUTTON

normal
hover
pressed
focus
disabled
loading
success
error
```

This teaches **component states**, not only component names.

---

# 11. Interaction vocabulary

```text
Hover
Focus
Press
Active
Drag
Drop
Swipe
Long press
Double click
Pinch
Zoom
Pan
Keyboard shortcut
Pointer capture
Direct manipulation
Drag-to-dismiss
Swipe-to-dismiss
Pull-to-refresh
```

Pointer Events and pointer capture should be demonstrated with an interactive drag example.

---

# 12. Feedback vocabulary

Teach that every action has a state lifecycle.

Example:

```text
Idle
 ↓
Interaction
 ↓
Pending
 ↓
Success
```

or:

```text
Idle
 ↓
Interaction
 ↓
Pending
 ↓
Failure
 ↓
Recovery
```

Examples:

```text
Save button
Upload
Delete
Copy
Search
Login
Drag
```

This is one of the most important UI abstractions.

---

# 13. Disclosure vocabulary

```text
Progressive disclosure
Accordion
Collapsible
Popover
Modal
Drawer
Tooltip
Details / Summary
Step-by-step reveal
```

Main principle:

```text
Don't show everything at once.

Show the information required for the current decision.
```

---

# 14. Layout vocabulary

```text
Visual hierarchy
Whitespace
Negative space
Density
Alignment
Proximity
Grouping
Grid
Subgrid
Container
Container query
Breakpoint
Responsive layout
Fluid layout
Fluid typography
Aspect ratio
Intrinsic sizing
Max-width
Content column
Full bleed
Edge-to-edge
```

Important examples:

### Container query

```text
Viewport
   ↓
traditional responsive design

Container
   ↓
component-aware responsive design
```

### Fluid typography

Use bounded scaling such as `clamp()` where appropriate rather than many arbitrary breakpoints.

---

# 15. Spatial vocabulary

```text
Elevation
Depth
Layer
Stacking context
Z-index
Overlay
Backdrop
Focal point
Visual anchor
Card hierarchy
Surface
Border hierarchy
Shadow hierarchy
```

Teach that a shadow is not just decoration:

```text
foreground
    ↑
higher visual priority
```

---

# 16. Navigation vocabulary

```text
Command palette
Breadcrumbs
Tabs
Sticky navigation
Scroll spy
Anchor navigation
Deep link
Route transition
View transition
Shared element
Page transition
```

View Transitions should have a dedicated live example.

Source:
https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API

---

# 17. Loading vocabulary

Show the differences:

```text
Spinner

Skeleton

Progress

Optimistic UI

Streaming

Placeholder

Stale content + background refresh
```

Example:

```text
Slow API

spinner
     vs
skeleton
     vs
stale content + refresh
     vs
optimistic UI
```

Explain the UX trade-off for each.

---

# 18. State vocabulary

Teach:

```text
Client state
Server state
UI state
URL state
Derived state
Persistent state
Ephemeral state
Pending state
Optimistic state
Error state
```

Important model:

```text
                    STATE
                      │
          ┌───────────┴───────────┐
          ↓                       ↓
      Client state            Server state
          │                       │
       modal open             API data
       selected tab            cache
       theme                    freshness
```

This should connect to the separate frontend engineering atlas.

---

# 19. Accessibility vocabulary

Every interaction component should teach:

```text
Focus management
Focus trap
Focus restoration
Keyboard navigation
Accessible name
Accessible description
ARIA
Roving tabindex
Escape-to-dismiss
Live region
Touch target
Reduced motion
Screen-reader behavior
```

Every component example should have:

```text
Visual behavior
+
Keyboard behavior
+
Screen-reader considerations
```

Do not treat accessibility as a final phase-only concern. It belongs in every component primitive.

---

# 20. Performance vocabulary

```text
Main thread
Long task
INP
LCP
CLS
Layout thrashing
Reflow
Repaint
Compositing
Rasterization
Virtualization
Overscan
Lazy loading
Code splitting
Bundle size
Image decoding
Network waterfall
Request waterfall
Critical path
```

Visualize:

```text
Input
  ↓
JS
  ↓
Style
  ↓
Layout
  ↓
Paint
  ↓
Composite
  ↓
Next paint
```

Then show where latency is introduced.

---

# 21. Memory vocabulary

```text
Memory leak
Detached DOM
Retained closure
Event listener leak
Subscription leak
Timer leak
Heap
Heap snapshot
Retainer path
Garbage collection
ArrayBuffer
GPU memory
```

Create a simulation:

```text
mount
 ↓
allocate
 ↓
unmount
 ↓
cleanup?
 ├── yes → reclaim
 └── no → retained memory
```

---

# 22. Browser vocabulary

```text
HTTP cache
Query cache
bfcache
Service Worker
Cache API
IndexedDB
Storage quota
Storage eviction
Page lifecycle
freeze
resume
pagehide
pageshow
Background tab throttling
```

Dedicated demo:

```text
HTTP cache
      vs
query cache
      vs
bfcache
      vs
Service Worker cache
```

This is a highly valuable distinction for modern web development.

---

# 23. React / Next.js vocabulary

```text
Fiber
Reconciliation
Render phase
Commit phase
Scheduler
Concurrent rendering
Transitions
Suspense
Hydration
Hydration mismatch
Server Components
Client Components
RSC payload
Streaming SSR
Activity
View Transition
React Compiler
Route prefetching
Router cache
Cache invalidation
```

The website should eventually explain how these interact rather than teaching them as isolated terms.

---

# 24. Visual simulation primitives

Create reusable components:

```text
<BeforeAfter />
<FlowDiagram />
<SequenceDiagram />
<StateMachine />
<Timeline />
<Waterfall />
<ScrollVisualizer />
<MotionVisualizer />
<CacheVisualizer />
<BrowserPipeline />
<NetworkPipeline />
<MemoryVisualizer />
<ComponentStates />
<InteractionRecorder />
<MetricChart />
<ConceptGraph />
```

Every later concept should reuse these.

---

# 25. Motion design system

Do not let Codex invent arbitrary animation values for every page.

Create tokens:

```ts
motion.duration.fast
motion.duration.normal
motion.duration.slow

motion.ease.standard
motion.ease.enter
motion.ease.exit

motion.spring.soft
motion.spring.snappy
motion.spring.bouncy
```

Then concept pages can say:

```text
use "snappy" spring
```

instead of hardcoding random numbers.

Also provide:

```text
prefers-reduced-motion
```

variants.

---

# 26. Interaction state system

Every important component should model explicit states.

Example:

```ts
type InteractionState =
  | "idle"
  | "hover"
  | "focus"
  | "pressed"
  | "loading"
  | "success"
  | "error"
  | "disabled"
```

Then the playground can visualize transitions:

```text
                 ┌── success
                 │
idle → pressed → loading
                 │
                 └── error → recovery
```

This makes the site teach state machines implicitly.

---

# 27. Prompt Lab

This should eventually become one of the site's most useful features.

User selects:

```text
Component:
Dialog

Behavior:
Focus trap
Escape dismiss
Scroll locking

Motion:
Fade + scale
Ease-out

Accessibility:
Keyboard support
Focus restoration

Visual:
Subtle backdrop
Rounded surface
```

The site produces:

```text
Build an accessible dialog with:
- focus trap
- focus restoration
- Escape dismissal
- background scroll locking
- fade + scale enter/exit animation
- ease-out timing
- reduced-motion fallback
...
```

Now the user learns vocabulary by **using it**.

---

# 28. “Describe this UI” mode

Eventually allow the user to select a UI element and answer:

```text
What interaction pattern is this?

What is the motion called?

What component primitive is being used?

What accessibility behavior should exist?

What performance considerations exist?

How would you prompt Codex to recreate it?
```

This turns the site into an **interaction vocabulary trainer**.

---

# 29. Pattern recipes

Create reusable recipes:

```text
Sticky documentation sidebar
Command palette
Animated modal
Expandable card
Card → detail shared transition
Scroll-storytelling section
Interactive carousel
Project grid with hover states
Infinite feed
Optimistic delete
Search with request cancellation
Paginated data with client cache
```

Each recipe should expose:

```text
Pattern
Why
When
Components
Motion
Accessibility
Performance
Prompt
Code
```

---

# 30. Phase structure

## Phase 0 — Repository contract

Create:

```text
AGENTS.md
docs/
  MASTER-PLAN.md
  ARCHITECTURE.md
  DOMAIN.md
  DEVELOPMENT.md
  HANDOFF-TEMPLATE.md
  future.md
  phases/
  handoffs/
```

Do not implement the website.

Commit.

**STOP.**

---

## Phase 1 — Build the UI Interaction Vocabulary website

This is deliberately the **first implementation phase**.

Build the actual website containing:

```text
Motion playground
Scroll playground
Component playground
Interaction playground
Loading playground
Layout playground
Accessibility examples
Performance examples
```

At least 20–30 live examples.

Each example must be:

```text
interactive
visually clear
self-contained
responsive
accessible
```

The user should be able to see the effect rather than reading about it.

Examples:

```text
smooth scroll
scroll snap
sticky header
scroll progress
scroll reveal
scroll-driven animation
parallax
hover elevation
pressed state
spring
stagger
toast
dialog
popover
command palette
accordion
tabs
skeleton
optimistic UI
focus trap
drag interaction
```

Do not build the knowledge graph yet.

### Definition of done

A user can open the site and learn at least 20 UI terms by interacting with them.

Commit.

**STOP.**

---

## Phase 2 — Concept data model

Create:

```text
Concept
Pattern
Example
Interaction
Motion
AccessibilityRule
PerformanceNote
PromptRecipe
RelatedConcept
```

Connect the vocabulary to structured data.

Do not connect to AI yet.

Commit.

**STOP.**

---

## Phase 3 — Concept lesson pages

Turn each term into:

```text
What
Problem
Why
When
How
Live demo
Diagram
Trade-offs
Alternatives
Accessibility
Performance
Prompt
Related concepts
```

Build reusable lesson components.

Commit.

**STOP.**

---

## Phase 4 — Visual graph

Use:

```text
React Flow
+
ELK.js
```

Graph:

```text
UI
 ├── Motion
 ├── Scroll
 ├── Components
 ├── Layout
 └── Accessibility

Scroll
 ├── Sticky
 ├── Snap
 ├── Parallax
 └── Scroll-driven animation
```

Clicking a node should open/focus its lesson.

Commit.

**STOP.**

---

## Phase 5 — Simulation engine

Create reusable:

```text
Simulation
SimulationStep
SimulationEvent
Timeline
StateMachine
```

Build simulations for:

```text
scroll behavior
request waterfall
component state transitions
optimistic UI
virtualization
layout thrashing
```

Commit.

**STOP.**

---

## Phase 6 — Browser / DevTools evidence

For each concept add:

```text
What you can observe
Where to observe it
Expected evidence
Common false positives
```

Examples:

```text
Network panel
Performance panel
Memory panel
React DevTools
Application panel
Console
```

Commit.

**STOP.**

---

## Phase 7 — Prompt Lab

Generate structured Codex prompts from selected vocabulary.

Example:

```text
Dialog
+
focus trap
+
focus restoration
+
spring entrance
+
reduced motion
```

→ prompt.

Commit.

**STOP.**

---

## Phase 8 — Frontend Engineering Atlas integration

Connect UI vocabulary to deeper frontend engineering concepts:

```text
Scroll snap
      ↓
browser scrolling

Query cache
      ↓
server state

Optimistic UI
      ↓
distributed consistency

Virtualization
      ↓
DOM / memory / performance

Hydration
      ↓
React rendering
```

Commit.

**STOP.**

---

## Phase 9 — Learning system

Add:

```text
known
learning
review
mastered
confused
```

Add active recall.

Add prerequisites.

Generate:

```text
What should I learn next?
```

Commit.

**STOP.**

---

## Phase 10 — AI tutor

AI receives:

```text
concept
graph neighborhood
examples
evidence
learning state
```

Capabilities:

```text
Explain
Compare
Quiz
Describe UI
Generate prompt
Critique UI
Research
```

AI must not silently modify canonical data.

Commit.

**STOP.**

---

## Phase 11 — Production hardening

Audit:

```text
performance
accessibility
mobile
SEO
error handling
loading states
bundle size
graph performance
animation performance
testing
observability
```

Only introduce Sigma/WebGL or Web Workers when measurements justify them.

Commit.

**STOP.**

---

# 31. Codex operating protocol

Every session:

```text
Read AGENTS.md
        ↓
Read current PHASE-XX.md
        ↓
Read previous handoff only if necessary
        ↓
Inspect relevant code
        ↓
Implement only this phase
        ↓
Run tests
        ↓
Fix failures
        ↓
Write handoff
        ↓
Commit
        ↓
STOP
```

Never implement future phases because they seem useful.

Record future ideas in:

```text
docs/future.md
```

---

# 32. Handoff format

Each phase creates:

```text
docs/handoffs/PHASE-XX.md
```

Use:

```md
# Phase X Handoff

## Completed

## Current repository state

## Architecture decisions

## Files changed

## Tests

## Validation results

## Known issues

## Deferred work

## Unexpected discoveries

## Exact next phase

## Commands
```

---

# 33. AGENTS.md rules

Include:

```text
1. Implement only the requested phase.
2. Do not implement future phases.
3. Do not rewrite unrelated files.
4. Do not introduce dependencies without justification.
5. Keep domain logic independent from UI.
6. Keep visualization data independent from rendering implementation.
7. Keep simulation engine independent from concept content.
8. Treat accessibility as part of component correctness.
9. Treat animation as communication, not decoration.
10. Every interaction must have appropriate states.
11. Respect prefers-reduced-motion.
12. Preserve keyboard accessibility.
13. Prefer CSS/native browser behavior before JavaScript.
14. Measure before performance optimization.
15. Every phase must leave the repository buildable.
16. Every phase must include appropriate tests.
17. Every phase must produce a handoff.
18. Stop at the end of each phase.
```

---

# 34. First vertical slice

The first thing to make excellent is:

# Scroll

Build one complete section containing:

```text
Native scrolling
Smooth scrolling
Momentum/inertia
Sticky
Scroll snap
Scroll progress
Scroll spy
Scroll reveal
Scroll-triggered animation
Scroll-driven animation
Parallax
Overscroll / scroll chaining
```

Then teach them through live demos:

```text
             SCROLL
                │
     ┌──────────┼──────────┐
     ↓          ↓          ↓
  behavior    layout     animation
     │          │          │
 momentum     sticky     reveal
 smooth       snap       driven
 overscroll   pinned     parallax
```

This is much better than building 30 unrelated mini-demos first.

Once this vertical slice is good, reuse the architecture for:

```text
Motion
Components
Loading
Navigation
Accessibility
Performance
```

---

# 35. Product philosophy

The site should gradually teach you to go from:

```text
"Make this website look cooler."
```

to:

```text
"Use stronger visual hierarchy, a sticky navigation rail,
subtle hover elevation, an ease-out enter transition,
a scroll-linked progress indicator, a shared-element transition
for card → detail, and a reduced-motion fallback."
```

The vocabulary itself becomes a development skill.

---

# 36. Final architecture

```text
                    UI ATLAS
                       │
          ┌────────────┼────────────┐
          ↓            ↓            ↓
     Vocabulary     Playground    Patterns
          │            │            │
          ↓            ↓            ↓
       Concepts    Simulations   Recipes
          │            │            │
          └────────────┼────────────┘
                       ↓
                  Domain Model
                       │
          ┌────────────┼────────────┐
          ↓            ↓            ↓
        Graph       Evidence      Prompts
          │            │            │
          └────────────┼────────────┘
                       ↓
                   AI Tutor
                       │
          ┌────────────┼────────────┐
          ↓            ↓            ↓
       Explain       Quiz        Critique
                       │
                       ↓
                   Learning
```

---

# 37. The most important implementation principle

Do not build:

```text
100 beautiful examples
```

with 100 independent implementations.

Build:

```text
10–15 reusable interaction primitives
              ↓
        compose them
              ↓
       create many examples
```

For example:

```text
Motion primitive
Scroll primitive
Disclosure primitive
Overlay primitive
Feedback primitive
Navigation primitive
Drag primitive
Loading primitive
State primitive
Simulation primitive
```

The examples become compositions of these primitives.

That is how the website remains maintainable while the vocabulary grows from 30 → 100 → 500 concepts.

