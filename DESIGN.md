---
name: Mohamed Awadalla Portfolio
description: An editorial engineering portfolio with an optional Knicks theme.
colors:
  text-primary: "#000000"
  text-secondary: "#333333"
  text-muted: "#666666"
  bg-primary: "#fafafa"
  bg-secondary: "#f0f0f0"
  project-index-paper: "#f4f4f0"
  project-index-panel: "#fbfbf8"
  project-index-line: "#cfd1cb"
  knicks-blue: "#006bb6"
  knicks-orange: "#f58426"
  knicks-navy: "#111d2f"
  knicks-canvas: "#ffffff"
typography:
  display:
    fontFamily: "Harmond, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Harmond, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.8rem, 4vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "EB Garamond, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.55rem, 3.2vw, 2.9rem)"
    lineHeight: 1
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    lineHeight: 1.7
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.7rem"
    fontWeight: 500
    letterSpacing: "0.08em"
rounded:
  sm: "8px"
  md: "12px"
  full: "9999px"
spacing:
  page-gutter: "24px"
components:
  close-button:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 0.65rem"
  close-button-hover:
    backgroundColor: "{colors.bg-secondary}"
    textColor: "{colors.text-primary}"
  surprise-button:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.full}"
    padding: "0.4rem 0.9rem"
  surprise-button-hover:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
  project-panel:
    backgroundColor: "{colors.project-index-panel}"
    padding: "2rem"
    width: "min(46rem, 100%)"
---

# Design System: Mohamed Awadalla Portfolio

## Overview

This records the implemented portfolio, rather than a new brand proposal. Broad serif headings, readable sans-serif copy, small monospaced labels, generous vertical spacing, and fine rules create an editorial rhythm. Product imagery supplies concrete evidence of the work. The optional Knicks theme applies a stronger sports identity to the same structure.

The existing animated introduction and hero graph are user-preserved signature elements. Extend the surrounding system without replacing them. No product interview or named creative North Star has been established; the descriptions here are observations of the code and reviewed surfaces.

**Key Characteristics:**

- Expanded serif headings with restrained monospaced metadata.
- Mostly flat, ruled sections with large product imagery.
- A monochrome default and an optional blue, orange, and navy theme.

Source authority: `src/index.css`, `src/components/FeaturedProject.css`, and the live index and panel rules in `src/components/ProjectCardPlayground.css`. The latter also contains experimental layouts; those are not defaults for the live portfolio. Local page placement belongs in `.impeccable/surfaces/src-app-js.md`.

## Colors

### Primary

Black ink carries headings, links, rules, and primary emphasis in the default theme. Secondary gray carries copy, and muted gray carries supporting information. The frontmatter records base values; runtime CSS variables carry theme overrides.

### Secondary

Knicks blue, orange, navy, and white are the existing optional theme palette. Blue becomes the page canvas, navy anchors panels and the header, and orange marks accents and selected states. The real KnicksIQ screenshot retains its own product colors in either theme.

### Neutral

The default canvas is near white. The project index uses slightly warmer paper and panel surfaces, with a pale gray dividing line. Preserve the difference between the overall canvas and project paper.

## Typography

Harmond ExtraBold Expanded supplies major headings. EB Garamond supplies project index titles and supporting editorial passages. Inter supplies ordinary body text and numeric evidence; JetBrains Mono supplies section numbers, categories, and compact metadata. The frontmatter display and headline sizes are global defaults; the existing hero and featured heading have their own responsive scales.

**The Numeric Readability Rule.** Use the numeric Inter role for metrics: the bundled Harmond font has an empty `9` glyph. Do not move numerical evidence into Harmond merely to match nearby headings.

Featured copy has a readable measure (52ch); project descriptions use a similar bounded measure (58ch). Keep titles visually distinct from metadata and body copy.

## Layout

The main container has a content width (1152px) plus the page gutter on both sides. The header uses a three-part desktop grid, then a compact mobile arrangement at the existing breakpoint (768px). On phones the social dock participates in the introduction's document flow so it clears reading content.

The homepage layout flows directly from the hero and socials dock into the personal narrative and contact sections. The featured project index panel on `/projects` stacks at (900px). Images preserve their intrinsic proportions. The case-study screenshot parent is uncapped; the image itself is contained with a maximum height (20rem), keeping subsequent tabs in normal flow. These values describe the shipped compositions, not a universal column count for future pages.

## Elevation & Depth

The editorial sections, project rows, and main calls to action are predominantly flat. Rules, surface tones, and type establish hierarchy. The translucent fixed header uses blur and gains a soft shadow when scrolled. Dialogs use a dimmed backdrop and a stronger shadow; the case-study panel has its own deeper shadow. Exact shadow, focus, and motion values are in the sidecar because they are outside the frontmatter schema.

## Shapes

Project imagery and editorial rows are rectangular. Main project and download actions have square corners. Small utility controls use the established small radius, the video dialog uses the medium radius, and the surprise navigation button is a dashed pill. Rounded utility controls do not imply rounding every content surface.

## Components

The sidecar includes representative styles for the surprise button, dialog close control, featured link, navigation, technology tag, and project index row. These are static style specimens; application behavior remains in React.

- **Navigation:** understated text links with a thin underline for hover, focus, and the active route. Keyboard focus has a visible outline. Mobile menu controls keep their explicit button shape.
- **Featured product:** The homepage overview section was removed per user direction, allowing the hero to lead directly into the personal narrative. The component implementation and its styles remain available, and KnicksIQ continues as the first, default-expanded project in the Projects index (`/projects`). Current KnicksIQ copy comes from `src/data/projects.js`. Image provenance is recorded in `public/images/projects/ATTRIBUTIONS.md` and the screenshot's adjacent JSON file.
- **Project index:** ruled expandable rows combine monospaced number/category, a supporting serif title, and an open/close mark. Expanded content contains the description, technology tags, links, and project preview. The current first, expanded KnicksIQ placement is a surface decision recorded in the direction contract.
- **Case-study panel:** a scrolling rectangular panel with an explicit close control, contained screenshot, and three tabs. Keep screenshots clear of the tab row at narrow widths.
- **Surprise link:** At the user's request, `/useless` opens the official YouTube watch page in a new tab with `noopener noreferrer`, leaving the portfolio in place. Embedded playback is deferred after YouTube returned error 150. The dialog implementation and its tests remain available for future investigation, but it is not imported or mounted by the live header.
- **Motion:** preserve the existing intro and hero graph. The implementation disables the intro overlay and nonessential movement for reduced-motion users. Close-button hover is restricted to fine pointers; its pressed scale is enabled only without a reduced-motion preference.

## Do's and Don'ts

### Do:

- Do preserve the user's existing hero graph and introductory animation, including reduced-motion behavior.
- Do use Inter for numeric evidence and retain the established serif and mono roles.
- Do show real project captures at their natural proportions and keep their provenance alongside the assets.
- Do preserve visible keyboard focus, dialog cleanup, and readable content at narrow widths.
- Do retain the three intentional Knicks jersey side accents; their detector exception is limited to the named rule and stylesheet in `.impeccable/config.json`.

### Don't:

- Don't treat experimental project playground layouts as the live portfolio's default system.
- Don't invent a product interview, brand commitment, or named visual direction from this documentation scan.
- Don't describe third-party video playback as working until it has been verified.
- Don't let a fixed screenshot container overlap the case-study tabs.
