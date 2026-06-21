# Thoughtful Design System

Thoughtful is a boundary-first essay practice product. The design system should feel academic, trustworthy, and active without looking like a generic AI landing page.

## Reference Research

- [Khanmigo](https://www.khanmigo.ai/) emphasizes guided AI tutoring, safety, and learning by questions rather than direct answers. The useful pattern for Thoughtful is explicit guidance and visible ethical framing.
- [NoRedInk](https://www.noredink.com/) focuses on writing cycles, scaffolding, classroom reporting, and AI feedback that reduces grading load. The useful pattern is writing-specific structure instead of a generic chat interface.
- [Grammarly for Students](https://www.grammarly.com/students) uses a focused writing surface, clear student positioning, and trust language around writing support.
- [Brilliant](https://brilliant.org/) frames learning as visual, interactive, and step-by-step. The useful pattern is making practice feel active rather than instructional copy-heavy.

## Product Principles

1. Guide, do not complete. The UI should frame questions, checks, and next moves instead of promising finished essays.
2. Keep sources visible. Source-bound practice is a trust signal, so uploads, rubrics, and archive status need visual weight.
3. Show boundaries early. Competition compliance, originality, and blocked prompts should appear in the product surface, not only in legal copy.
4. Make progress tactile. Interactions should feel like manipulating a workbook: flipping, marking, checking, and moving through steps.

## Tokens

The canonical token file is [design-tokens.json](./design-tokens.json).

### Color

| Token | Value | Use |
| --- | --- | --- |
| `ink` | `#18181B` | Primary text, dark CTA band |
| `canvas` | `#F4F6F0` | Page background |
| `surface` | `#FFFFFF` | Form and panel surfaces |
| `paper` | `#FFFDF8` | Notebook/document surfaces |
| `line` | `#D9E1DC` | Borders and dividers |
| `muted` | `#626F6B` | Secondary text |
| `sage` | `#4D6D5A` | Primary actions and learning states |
| `copper` | `#B96F3E` | Warm attention and status |
| `lake` | `#315F82` | Source/information accent |
| `amber` | `#F0CF87` | Highlight on dark surfaces |

The palette intentionally mixes botanical green, copper, and deep blue so the landing avoids a one-note beige or AI-purple look.

### Typography

- Display and body: `Space Grotesk`
- Numeric/status UI: `JetBrains Mono`
- Hero: `clamp(3rem, 7vw, 5.5rem)` with tight line height
- Body: 16-18px with `1.65` line height
- Labels: uppercase, 12px, positive tracking

### Shape, Depth, Motion

- Radius: 4px, 6px, 8px. Use 8px only for panels and repeated cards.
- Shadows: soft diffusion shadows only. Avoid glow effects.
- Motion: transform and opacity only. The workbook flip is the one expressive interaction and respects reduced motion.

## Components

### Navigation

Compact brand, status pill, and waitlist action. Hide secondary actions on narrow mobile widths.

### Waitlist Form

Single email input with clear inline validation and a disabled `Coming soon` button. The form is intentionally local-only for viability testing.

### Workbook Surface

The primary visual asset. The landing hero centers the headline and places the flippable workbook directly underneath it. On desktop, two function cards sit on the left and right sides of the book; on mobile, the book comes first and the cards stack below it.

### Signal Cards

Three repeated cards for the core product promises: guided practice, source-bound work, and visible integrity.

### Workflow Cards

Four-step writing model: claim, sources, revision, boundary. This gives the landing enough substance beyond a hero without creating a full product app.

## Accessibility Requirements

- Minimum touch target: 44px.
- Focus rings: sage outline with offset.
- Text contrast: `ink` on `canvas`, `muted` only on light backgrounds.
- Validation copy must be live-announced with `aria-live`.
- Reduced motion compresses workbook animation to a 1ms transition.

## Implementation Map

- Tokens in Tailwind: [tailwind.config.ts](./tailwind.config.ts)
- CSS variables and workbook animation: [app/globals.css](./app/globals.css)
- Landing implementation: [components/hero-page.tsx](./components/hero-page.tsx)
- Static visual reference: [design-preview.html](./design-preview.html)
