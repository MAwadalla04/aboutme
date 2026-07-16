# 001 — Simplify the project cards into a quiet editorial system

- **Status**: TODO
- **Commit**: b1d15b6
- **Severity**: HIGH
- **Category**: Cohesion & tokens; purpose & frequency
- **Estimated scope**: 2 files, about 55 changed lines

## Problem

The project rail sits on a warm neutral portfolio, but each card uses a different saturated blue, purple, teal, or charcoal gradient. Every card also shifts that gradient continuously, so the cards look unrelated and visually compete with the project names.

```js
// src/components/Projects.js:7 — current
gradient:
  'linear-gradient(135deg, #0a1628 0%, #1a2744 60%, #0a1628 100%)',
```

```css
/* src/index.css:1791 — current */
transition: transform 100ms ease-out, box-shadow 0.3s ease;
background-size: 200% 200%;
animation: gradientFlow 12s ease-in-out infinite;
animation-delay: var(--anim-delay, 0s);
```

This is a high-frequency surface: the cards are visible whenever the Projects section is reached. The continuous animation is decorative rather than communicating state.

## Target

All project cards use the same warm-charcoal canvas, `#3a2818`, matching the existing `--text-primary` color. Each project has a single restrained accent color expressed only as a 3px top rule; there are no animated gradients. Hover feedback is a short lift and shadow, available only to devices that actually hover.

Add this shared motion token at the end of the existing `:root` block in `src/index.css`:

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
```

The final card styling must use these exact values:

```css
.acc-card {
  background: #3a2818;
  border: 1px solid rgba(244, 237, 229, 0.18);
  border-top: 3px solid var(--card-accent);
  box-shadow: var(--shadow-md);
  transition: transform 160ms var(--ease-out), box-shadow 160ms ease;
}

@media (hover: hover) and (pointer: fine) {
  .acc-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg), 0 12px 32px color-mix(in srgb, var(--card-accent) 20%, transparent);
  }
}

.acc-card:active {
  transform: translateY(-2px) scale(0.98);
}
```

Use one `accent` field per project, and pass it to the card as `--card-accent`. Use these values in the current project order:

```js
{ title: 'LegalDocuMan — Document Processing & Classification Suite', accent: '#a27b5c' }
{ title: 'Custom Autograd Engine & Character-Level Language Model', accent: '#8d9b6f' }
{ title: 'KnicksIQ', accent: '#bf8a53' }
{ title: 'DLS Website Sanitized', accent: '#c39a73' }
```

## Repo conventions to follow

- Theme variables are centralized in `src/index.css:1` inside `:root`; place `--ease-out` there rather than adding a component-local curve.
- Project presentation data lives in `src/components/Projects.js:5`; preserve the current title, category, links, descriptions, tech, and featured-stat data.
- The carousel is shared through `src/components/AppleCardsCarousel.js`; its marquee timing and modal behavior are out of scope for this plan.

## Steps

1. In `src/index.css`, add `--ease-out: cubic-bezier(0.23, 1, 0.32, 1);` to `:root`.
2. In `src/components/Projects.js`, replace each project's `gradient` property with the exact `accent` value listed in the Target section. Do not alter other project data.
3. In `src/components/AppleCardsCarousel.js:339`, replace the inline `background`, `backgroundSize`, and `--anim-delay` properties with only `"--card-accent": card.accent`. Do not change modal markup, click handling, or carousel duplication.
4. In `src/index.css`, update `.acc-card` to the exact Target declarations. Remove `background-size`, `animation`, and `animation-delay` from that rule.
5. Delete the `@keyframes gradientFlow` block at `src/index.css:1811` and the carousel-specific reduced-motion override that only disables `.acc-card` animation at `src/index.css:1816`, because the card no longer has automatic motion.
6. Put the `.acc-card:hover` lift and accent-tinted shadow inside the exact `@media (hover: hover) and (pointer: fine)` query in Target. Keep `.acc-card:active` outside the query so touch users retain press feedback.
7. Do not change the marquee behavior, card dimensions, card copy alignment, modal styling, or global color tokens other than adding `--ease-out`.

## Boundaries

- Do NOT change `mode="marquee"`, `marqueeDuration`, card order, or the card/modal interaction model.
- Do NOT add images, a new dependency, or a new component.
- Do NOT replace the site's existing warm palette; this change affects only the project-card canvas and accent rule.
- Do NOT use `transition: all` or animate `background-position`, dimensions, layout, or filters.

## Verification

- **Mechanical**: Run `npm run build`; it must complete with `Compiled successfully.`
- **Visual**: Open the Projects section on desktop. All four cards should read as one coherent warm-charcoal family, with only a small top-rule color difference; no card should continuously change color.
- **Interaction**: Hover each card with a mouse. It should lift 4px responsively, without color cycling. Press and release a card; it should compress to `scale(0.98)` and open its existing modal.
- **Accessibility**: Emulate a touch-only device. The hover lift must not become stuck after tapping. Enable reduced motion; there must be no autonomous card movement, while the press feedback remains.
- **Done when**: The card colors no longer compete with the site palette and every project card shares the same surface treatment.
