---
version: v3
name: Blizad
description: Showcase site for Blizad, a Raipur growth company where one team runs the campaigns, the search visibility and the software. It should leave a founder thinking "these people move fast and know exactly what they are doing".
colors:
  ground: "#071321"      # Midnight — dominant surface (brand board)
  ground-deep: "#040b14" # lower end of the midnight gradient
  ground-raised: "#0c1d31" # elevation by lightness on dark
  ice: "#F3F8FC"         # light rooms (proof, path)
  white: "#FFFFFF"
  ink: "#FFFFFF"         # text on midnight
  ink-dark: "#071321"    # text on ice/white
  muted: "#A9B8CC"       # secondary text on midnight (8.9:1)
  muted-dark: "#3D4F66"  # secondary text on ice (8.0:1)
  signal: "#087CFA"      # Electric Blue — action only
  light: "#00BFEF"       # Cyan — light and atmosphere only, never body text
typography:
  display:
    fontFamily: Manrope Variable
    fontSize: clamp(2.25rem, 4.2vw, 3.75rem)
    fontWeight: 600 to 650
    letterSpacing: -0.025em to -0.03em
  body:
    fontFamily: Inter Variable
    fontSize: 1.0625rem
    lineHeight: 1.6
  mono:
    fontFamily: JetBrains Mono Variable
    fontSize: 0.875rem
    use: real measured values, status and timestamps only — never headlines or decoration
  editorial:
    fontFamily: Newsreader Variable
    fontSize: clamp(2rem, 4.6vw, 4.25rem)
    fontWeight: 450 (italic)
    use: human-trust scenes only — Dream/Pedigree statements, Voices, FAQ, founder quote. Never on Hero/Proof/Pipeline/Services/Doors/Estimator/Builds.
rounded:
  sm: 6px      # inputs, small controls
  md: 14px     # panels, screenshots
  pill: 999px  # buttons only
spacing:
  base: 8px
  section: clamp(72px, 12vw, 160px)
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: 14px 26px
---

## Overview

Blizad is a Raipur-based growth company: Sourav Yadav (Krantiveer), Founder & CEO, runs marketing and paid acquisition; Vidit Vaibhav, Co-founder & CTO, builds the software, the search layer and the hosting. Visitors are founders and marketing leads deciding who to trust with growth.

The look comes from Blizad's own world — momentum and signal: a campaign firing, a query resolving, a deploy shipping — and from the brand board: the bolt mark, Electric Blue energy on Midnight, fine contour lines.

## Style

- **Primary:** Dark OLED / cinematic. Midnight ground, elevation by lightness (not shadows), one light source from the top of the hero.
- **Accent:** Kinetic typography, confined to display type (line masks, scrubbed words).
- **Secondary register (proof, process, services, stack):** Tech dashboard / Flashy SaaS (see the shared `avoid-ai-design` design-styles entry of that name). Not a second aesthetic bolted on — the same Midnight/Electric/Cyan system read through a technical, credible lens instead of a purely cinematic one, used specifically where the content *is* proof, data or process: a real icon per stat, honest weight/progress indicators, CI/CD-style connector diagrams. v1 of this site applied the cinematic-minimal register everywhere, including to the proof/process scenes, and the owner called the result "basic" and "plain" — this split exists so that doesn't recur.
- **Third register, Editorial trust — retired in v5 (see Typography).** The serif "quiet trust" treatment described below under "Editorial trust register (v3)" no longer exists as a separate register; those same scenes (Dream/Pedigree statements, Voices, Recognitions, founder quote, home FAQ) now use the one display/body pairing, with weight and size doing the "quiet" work instead.
- Brand-board contour lines and the signal canvas are background layers, not a third *aesthetic* — the Editorial register above is the deliberate third, scoped exception to `style-blending.md`'s "1 primary + 1 accent" rule. Film grain is the texture of the dark surface.
- Light "ice" rooms (proof, path) give the scroll a tone shift — moving through rooms.

## Colors

- **Midnight #0A0A0C (v5 — near-black)** is 60% of the page. **Ice/White** surfaces and ink are 30%. **Electric Blue #087CFA** is 10% and has one job: action (primary buttons, focus ring, active state). **Cyan #00BFEF** is light — glows, strokes on the signature object, signal motes — never text on white.
  - **Why this changed from v4:** the owner's visual-makeover brief (13 Unfoldmart/AJ Marketing reference screenshots) asked explicitly to drop the navy-tinted Midnight for a true near-black ground, while keeping Electric Blue/Cyan as the one accent — an explicit, owner-approved exception to the "brand board — do not change" note below, not casual drift.
  - Measured contrast against the new #0A0A0C ground: white 19.8:1; #087CFA (Electric Blue) 4.97:1 — re-verified after the ground change, still clears the 4.5:1 AA bar for normal text (previously 4.7:1 on the navy-tinted Midnight, so the near-black ground is a marginal improvement, not a regression). Midnight-on-ice and muted-on-midnight ratios (previously 17.5:1 / 9.3:1) are effectively unchanged — both colors moved only slightly in luminance.
- White on #087CFA is only 3.98:1, so **button fills use `--electric-fill` #0A6FE0 (4.81:1)**; #087CFA stays for large type, outlines, glow and hover light. This ratio is independent of ground color (it's white text on a filled button, not on the page background), so it's unaffected by the v5 ground change.

## Typography

- **Plus Jakarta Sans Variable (v5)** for display: huge, tight, sentence case, light (400) for statements and bold/extrabold (700–800) for short promises. **Inter Variable** for body 16–18px, unchanged.
  - **Why this changed from v4:** the owner's visual-makeover brief explicitly asked to "change font" to match the Unfoldmart/AJ Marketing references' tighter, heavier geometric display type — Manrope stayed too close to the v1–v4 look to read as the "complete makeover" asked for. Plus Jakarta Sans is the closest Fontsource-available match: geometric, rounded-terminal, ExtraBold(800)-capable.
- One emphasis rule: emphasise a whole line by weight/size/colour, never one word.
- **JetBrains Mono Variable** (self-hosted) is the monospace accent: it appears wherever a value is a real measured or reported figure, status, or timestamp — the pipeline's gate state, Proof's stat values, the Estimator's answered-% and recommended weeks, Builds' tech-tag labels. It never appears in headlines, body copy, or as decoration ("tech vibes" with no real data behind it is a tell, not a style). Pair with `font-variant-numeric: tabular-nums` on anything that updates or must align in a column. Unaffected by the v5 display-font swap — this register's whole point is that it's visually distinct from the display face.
- Scale: the display scale was cut back in v3 (`--step-hero` 48–132px → 36–60px, `--step-display` 40–100px → 28–44px) after the owner judged the original scale "really big... somehow they seem more trustable than us" versus a lighter competitor site. Letter-spacing eased from -0.045/-0.05em to -0.025/-0.03em and line-height opened (0.94–0.98 → 1.07–1.1) so the smaller sizes read calm, not cramped. v5 keeps these same `--step-*` values — only the typeface changed, not the scale.

## Editorial trust register — retired in v5

A third register used to exist here (Newsreader Variable serif on `--step-editorial`), scoped to Dream/Pedigree statements, Voices, Recognitions, the founder pull-quote, and the home FAQ headers. **It's retired as of v5**: neither Unfoldmart nor AJ Marketing (the owner's visual-makeover references) use a serif anywhere, and the makeover brief asked for a look matching those references. Those same scenes now use `--font-display`/`--font-body` like everywhere else — weight (400, not the heavier 700–800 used for promises) and the large `--step-editorial` size do the "quiet, premium" work the serif used to do, not a different typeface.

- `@fontsource-variable/newsreader` is removed from `package.json`; `--font-editorial` no longer exists as a token.
- Guardrails carried forward unchanged: no cream+terracotta (SD1), no tracked ALL-CAPS eyebrow above these statements, no decorative flourish beyond the one signature moment per scene. Testimonial/recognition content still follows the `confirmed: false` + Placeholder-tag honesty rule (see Honesty rules).
- The nav-stays-opaque rule (an Ungrammary detail deliberately *not* copied in v3) is unchanged and unrelated to this retirement — see "Conversion layer."

## Icon system

One custom icon family (`src/components/Icon.tsx`), sharing `BoltMark`'s stroke geometry (1.6px centre-line stroke, rounded joins, 20px grid). Icons are used **functionally** — pipeline/process nodes, inline data markers, process states, bento-tile identity, tech-tag rows — never as decoration. Refused: one icon in a tinted rounded-square chip repeated identically across 3+ cards (K6/L2) — vary size and placement by the tile/row's own weight instead. Never a real third-party product logo (ties to the Honesty rule below) — tech-stack tags use generic category icons (frontend/api/database/etc.), not brand marks.

## Glass budget

No more than **3 glass surfaces** (`backdrop-filter`) exist on any page, and each is named here: (1) the Nav mega-menu (`.mega`) — built; (2) Hub's device-preview card (`.hub__card`) — built; (3) reserved, not yet built. (The Estimator result panel and Builds' hover caption panel were never actually built as glass — both are solid gradients — so that reserved budget moved to Hub's card instead of sitting unused.) Every glass surface sits over a real gradient/texture (never a flat fill), carries a 1px top-edge highlight, and **must never be combined with a continuous CSS animation on the same element or an ancestor** — this exact combination (`filter: blur()`/`backdrop-filter` plus a looping transform) is what cut scrolling from 60fps to 20–30fps twice during the first build (`scripts/qa-scroll.mjs` caught both). Hub's card keeps to this rule by design: the card itself only ever gets a discrete `quickTo` tilt-settle (never a loop); the state-cycle animation lives on a separate, non-glass inner layer. Anything else that wants to look "frosted" uses a solid surface with a gradient/border instead.

## Layout

- Max content width 1280px; side padding clamp(16px, 4vw, 40px). Width varies by scene role: hero and gallery full-bleed, statements wide, FAQ narrow.
- **Structure (v4 — consolidated into 8 chapters, down from 14 flat scenes).** The home page is one continuous scroll film, each chapter tagged with a shared `data-beat="N"` attribute (0-7) on its constituent `<section>`s — see "3D signature layer" below for what reads that tag. Chapter list: **0 Ignition** (Hero) · **1 The Promise, Proven** (Dream + Proof) · **2 Pick Your Door** (Doors + SearchEverywhere) · **3 Proof of Craft** (Builds + Pedigree) · **4 Who You're Trusting** (Voices + Founders) · **5 The Pipeline** (Path + Pipeline) · **6 Build Your Stack** (Estimator + Hub) · **7 No More Reasons to Wait** (HomeFaq + Close). Content/data sources in `src/content/*` are unchanged — chapters restage existing honest copy, they never introduce new claims.
  - **Why this changed from v3:** the owner rejected a hover-polish-only pass on the old 14-scene structure as insufficiently ambitious, explicitly asking for a scene-level rebuild with real 3D and bigger per-chapter moments, inspired by reference sites with heavy scroll-driven motion.
  - **Load-bearing QA detail:** `scripts/qa-scroll.mjs` measures words per direct sibling `<section>` of `<main>`. Chapters group their constituent scenes via the shared `data-beat` attribute, **never** by wrapping them in one new outer `<section>` — that would silently double a merged chapter's word count against one `≤45` ceiling the tool wasn't written to expect.
- Left-aligned, asymmetric compositions; the bolt sits right of the hero headline.

## Signature object

The Blizad bolt is now a persistent **3D object** (`src/three/Scene3DCanvas.tsx`, three.js + `@react-three/fiber@^8` — pinned to the v8 line because this project is React 18, not React 19 like the sibling Krantiveer/KMF Media site whose `@react-three/fiber@^9` requires React 19), mounted once in `Layout.tsx` as a fixed background layer (`z-index: 0`, matching `Atmosphere.tsx`'s own proven stacking pattern — **not** a negative z-index, which silently paints behind the opaque `<body>` background in this project and was the cause of one real, time-consuming bug during implementation) so it persists across the whole scroll and across route navigation without remounting. Boldness is spent here only — no second 3D object, no competing signature moment.

### 3D signature layer — architecture

- **SSG-safety boundary** (`src/three/Scene3DBoundary.tsx`): the only file in `Layout.tsx`'s import graph that may lead to `three`/`@react-three/*`, and it must never statically import them. The gate is a dynamic `import('./Scene3DCanvas')` call inside a `useEffect` body — not `React.lazy`, which `vite-react-ssg`'s real Node prerender pass would still invoke server-side even inside `Suspense`. An effect never runs outside a committed DOM, so nothing three-related is ever reachable from the module graph the prerenderer walks.
- **Tier system** (`src/motion/useSceneTier.ts`): `full` | `light` | `static`, built on the existing `MQ`/`useMotion()`/`gsap.matchMedia` conventions, not a parallel system. `prefers-reduced-motion` (`useMotion().enabled === false`) always resolves to `static`, no exceptions — the existing single motion authority, not a second toggle. Otherwise a one-time WebGL2 capability probe plus `MQ.cinematic` (wide + motion-ok) and `navigator.hardwareConcurrency`/`deviceMemory` heuristics pick `full` vs `light`.
- **`static` tier** (`src/components/SignatureStatic.tsx`): literally `BoltIcon` from the already-built `BoltMark.tsx` — no-JS, reduced-motion and low-end/no-WebGL2 visitors see exactly the brand's existing signature object, server-rendered, zero layout shift versus the 3D version.
- **Beat rig** (`src/three/beatRig.ts`, poses in `src/three/poses.ts`): one shared, damped 0-7 "beat time" signal — the same module-level pub-sub shape as `useScrollVelocity.ts` — derived from real scroll position mapped through each chapter's `data-beat` anchors via `gsap.quickTo`. Interpolates camera position/look-at and a fill/glow pair between adjacent chapter poses. Two discrete overrides ride the same shared state outside the scroll-driven interpolation: `setFracture(0|1)` (Pipeline's "3 agencies" vs "One Blizad pipeline" toggle fractures/reunites the bolt's own spine, not just the flat gate diagram) and `setCharge(0..1)` (Estimator's answered-question count drives the bolt as a literal charge meter, echoing the existing flat `estimator__meter`).
- **Render loop**: R3F's own default loop (`frameloop: 'always'`), toggled to `'never'` via `src/three/Scene3DCanvas.tsx`'s `Driver` component when the tab is hidden or `#main` scrolls out of view (`IntersectionObserver`, mirroring `Atmosphere.tsx`'s existing pause pattern) — not a hand-driven manual `advance()` ticker, which was tried first and proved fragile to get rendering reliably at all.
- **Nav/route-transition integration**: the 3D canvas never unmounts across navigation because it's mounted in `Layout.tsx` (which persists across routes, like `Atmosphere`/`Cursor`/`Curtain` already do), not in `pages/Home.tsx`. Pages with no `data-beat` anchors (Contact, Privacy, Services pages) simply leave the object in its last/idle pose.
- **Context-loss**: a `webglcontextlost` listener on the canvas calls `preventDefault()` so the browser doesn't tear down the context; a future pass should drop the tier to `static` on repeated loss (not yet wired).

## Background stack (back to front)

1. Midnight vertical gradient. 2. Two drifting blue/cyan radial lights (34s and 47s loops). 3. One canvas of ≤ 80 signal motes travelling along the contour grid, DPR ≤ 1.5, paused offscreen and when the tab is hidden. 4. Light cone behind the bolt. 5. One static SVG grain tile, 3%, overlay. 6. Vignette. 7. `--ground` tone shift per scene. 8. Echo rings of the bolt outline.
Reduced motion keeps 1, 4, 5, 6.

## Motion

- Lenis on the GSAP ticker; one ScrollTrigger engine in `MotionProvider`.
- Reveals 0.9–1.2s `power3.out`; large moves 1.2–1.6s `expo.out`; hover 0.25–0.4s `power2.out`; staggers 0.06–0.12s in reading order. No bounce, no elastic.
- **Pinned scenes (v4): exactly 2 pin regions, unchanged from v3** — Hero (now coordinated as beat 0 of the 3D rig) and the Builds gallery. The 3D beat-rig itself never pins — it's a persistent background layer read by ordinary scroll position across the whole page, not a scroll-jacking mechanism. `qa-scroll.mjs`'s pin-spacer leak-count gate should read 2, constant, across 10 route switches.
- **Scroll-reveal budget: unchanged at exactly 4 `lines` + 1 `scrub` + 3 `rise`, same as v3** (Hero's h1/lead, Pipeline's heading, Path's heading; Dream's scrub; Pedigree's 3 rise items) — see the v3 description above, still accurate as written.
- **Chapters are a `data-beat` grouping layer on top of the existing scene files, not yet a deeper content/DOM fusion.** v4's 8-chapter structure (above) currently means: each chapter's constituent scenes keep their own existing headings, layout and reveal budget exactly as built in v3; what's new is (a) the shared `data-beat` tag driving the 3D rig and the edge-label, and (b) two scenes gained a direct hook into the 3D object (Pipeline's toggle calls `setFracture`, Estimator's answered-count calls `setCharge`). The deeper per-chapter visual fusions described in the original rebuild brief — retiring Path's heading into Pipeline's gate rows, Builds' track extending into Pedigree, Doors/SearchEverywhere becoming one illustration-swap panel, a genuine tone-shift between Voices and Founders — are **not yet built**; they're the next pass, and the scroll-reveal/pin numbers above must be re-derived (expect the `lines` count to drop by one, per the already-documented reasoning) only once that pass actually lands, not before.
  - **Why this changed from v1:** v1 put `data-reveal="lines"` on effectively every heading sitewide (27 of ~30). The owner's reaction: "I dont want the things to animate and appear when website loads looks cheap... maybe few element can but definetely not all of it." The eye-catching layer is now **hover/cursor-driven** (below), not load-driven.
- **Hover-first interaction** is the primary motion language outside the 4 sanctioned scroll beats: spotlight-follow-cursor (now `useSpotlight(ref)` in `src/motion/pointer.ts` — one hook writing `--spot-x`/`--spot-y` from `pointermove`, consumed by a `radial-gradient(circle at var(--spot-x) var(--spot-y), …)` — event-driven, never a continuous `requestAnimationFrame` loop; used by Hero's stage, Proof's tiles, SearchEverywhere's 3 surfaces, Hub's card, and Estimator's choice pills via a lightweight delegated version), magnetic primary buttons (`useMagnetic`, extended to Pedigree's "Verify" link and Estimator's result CTA), tilt-on-hover (`useTilt`, extended to Proof's tiles, SearchEverywhere's surfaces and Estimator's result panel), icon micro-bounce (`.icon-bounce` in `home.css` — built; used on Proof's stat icons, Pedigree's credential icons, Path's step markers, Hub's kicker icon).
- **`useScrollVelocity()`** (`src/motion/useScrollVelocity.ts`) exposes one shared, damped 0–1 signal read from the existing Lenis instance (no new scroll listener — a single module-level `gsap.ticker` subscription shared by every consumer). Drives Pipeline's connector-flow speed and Voices' marquee speed — one physics signal, more than one expression of it.
- Pointer: custom cursor with labels (Open, Drag, Visit, Read), curtain route transition, one-time preloader (≤ 1.4s, over already-rendered HTML).
- A pointer-proximity type layer (per-word `font-variation-settings`-equivalent weight nudge via `font-weight`, built into `useSceneReveals`'s scrub block behind an opt-in `data-reveal-pointer="weight"` attribute) exists **only** on Dream's statement — the one scrub scene — per "spend boldness in one place." Fine-pointer only; scoped to the element's own bounding rect, never `document`.
- Fallbacks: reduced motion → no Lenis, nothing pinned, static layers, no spotlight/tilt/float; touch → no cursor, no spotlight/tilt, native scroll-snap gallery, hover-gated content (service sublists, founder bios) always visible instead; no JS → all content visible.

## Conversion-layer additions

- **Pipeline's compare toggle**: a click/tap switch between "3 agencies" (gates regrouped into 3 disconnected, faded clusters tagged "Agency 1/2/3") and "One Blizad pipeline" (the existing connected, lit gates) — illustrative only, no quantified or competitor-naming claims, with an explicit honesty caption (`.t-note`) underneath. Click-driven, not scroll-tied — costs nothing against the scroll-reveal budget.
- **Nav mega-menu stat strip**: a small "Why Blizad" block inside the existing `.mega` glass surface, reusing real figures already defined in `src/content/proof.ts`/`credentials.ts` (same `PlaceholderTag` rules apply).

## Word budget

**≤ 20 display words and ≤ 70 visible words per scene (v5, up from ≤ 12 / ≤ 45)** (proof, FAQ and Voices exempt — testimonial quotes carry real voice, not a word count). Detail lives on service pages, in `details`, or behind hover/focus. Drawn product interfaces (the search, AI-answer and voice panels) carry `data-product-screen` and are exempt as product screens, per the skill. **Icon/label-dense panels in the Tech dashboard register — Proof's visual+number composition, Builds' tech-tag row, the Services bento tiles, Pipeline's gate rows — get the same `data-product-screen` exemption** when the icon/label pairing is itself the content, not prose around it. `npm run qa` measures this.

- **Why this changed from v4:** the visual-makeover brief asked for richer, denser copy matching the references' fact tables, 2×2 grids and longer FAQ answers. The raised ceilings measure real content already in `src/content/*.ts` rendered through the new, denser v5 components (the Services "at a glance" fact grid, restyled FAQ) — no new copy was written to fill the extra budget, and `scripts/check-claims.mjs` still runs unchanged on every build.

## Conversion layer

- Nav: opaque, never hides. Services mega-menu, Work, About, Contact. Right: WhatsApp (quiet) and **Start a project** (the only filled button). **No login** — showcase site, by owner decision.
  - **v5 shape:** the bar is now a floating pill inset `var(--s2)` from the viewport top (Unfoldmart/AJ Marketing reference), not a full-bleed strip. The pill itself (`.nav`) still carries the opaque solid background directly — never a transparent wrapper around an opaque inner bar — so `scripts/qa-scroll.mjs`'s "nav background opaque" gate (which reads `.nav`'s own computed background) keeps measuring the real thing. Content/sheet offsets use the new `--nav-offset` token (`--nav-h` + the pill's top gap), not raw `--nav-h`, everywhere they mean "clear of the visible nav."
- Inline growth-audit field in the hero; dream, path, proof, estimator, FAQ; "Start a project" closes scenes.
- Lead handoff: validated form → WhatsApp / email / copy summary. Nothing stored.

## v5 visual makeover — component language

Re-skin of existing components onto the new near-black/Jakarta Sans system, inspired (not copied — spread across two sources) by Unfoldmart and AJ Marketing. No new content shapes; every change below restyles an element that already renders real data from `src/content/*.ts`.

- **Buttons** (`.btn`) were already pill-radius (`var(--r-pill)`) before v5 — unchanged, now simply sitewide-consistent with the new pill nav.
- **Services list** (`/services`, `.service-row`): added a muted mono ordinal (`01`, `02`...) and a floating hover-preview card that follows the pointer (fine-pointer only, `@media (hover: hover) and (pointer: fine)`), showing the service's existing `line` + its group icon. Not a numbered-step sequence (`SD6` stays refused) — a quiet line reference, Unfoldmart-inspired.
- **Service detail "included" section** (`ServiceDetail.tsx`): restyled from a plain list into `.fact-grid`, a 2-column bordered-cell grid ("at a glance" pattern). `solves` stays a plain list — it's problem statements, a table would misrepresent them as neutral facts.
- **FAQ** (`Faq.tsx`): already a native `<details>` disclosure with a rotating plus/X icon and a smooth height transition — v5 adds a shared `name` attribute per list so opening one closes its siblings (native exclusive-accordion behaviour), matching the references' "one open at a time" FAQ pattern.
- **Pipeline's compare toggle**: kept its AJ Marketing-inspired two-tone split content unchanged; only the shape changed, from a sharp `--r-sm` block to the sitewide `--r-pill` (Unfoldmart's segmented-pill toggle shape) — the two-tone content stays because it's a deliberate choice already documented above, not a generic tab to flatten.
- **Doors' bento tiles and Proof's stat values** were reviewed against the references and left as-is: Doors' icon treatment already varies by tile weight specifically to avoid the uniform tinted-icon-chip pattern the icon system refuses (`K6`/`L2`); forcing a uniform icon-square grid to match a reference screenshot literally would reintroduce that refused default. Proof's stat values were already oversized (`--step` up to 8rem) in the mono "measured value" register — already a "bold stat tile," and that register stays mono by the existing honesty rule.
- **Chapter edge-label (v4, `src/components/ChapterEdgeLabel.tsx`)**: a small, always-opaque, rotated label in the side gutter naming the current chapter on home (or the current route elsewhere), driven by the same beat-rig signal the 3D layer reads. Opens a **solid** (never glass) slide-out index of every chapter plus every route — an honest extra way to reach every destination, consistent with the nav rule, never a hidden one. Hidden below 1081px, the same breakpoint Nav itself already uses to collapse.
- **Curtain route transition (v4, `src/motion/Curtain.tsx`)**: upgraded from "only appears if a navigation is still loading after 220ms" to a circular `clip-path` reveal that expands from wherever the visitor clicked, playing on every internal navigation. This does not loosen "nav stays opaque, never hides" — that rule governs the persistent bar staying readable while scrolling, not a transient full-viewport cover between two reachable pages.

## Honesty rules

- Ad-spend figures are founder-attributed experience, not entity-level claims.
- Google and Thomson Reuters appear as names in text ("engineering experience on products for…, as clients"), never as logos.
- Anything unconfirmed carries `confirmed: false` in `src/content/*` and renders a visible Placeholder tag. `scripts/check-claims.mjs` lists them on every build.

## Don't change

Manrope + Inter, #087CFA, #00BFEF, #071321, #F3F8FC, #FFFFFF, the bolt mark, the tagline "Built for momentum." Newsreader is additive (v3, Editorial trust register only) — it never replaces Manrope/Inter on any tech/process scene.

## Refused defaults

Count-ups (M5), ALL-CAPS eyebrows (T5/SD4), middle-dot meta strings (SD4d), one-word headline accents (SD5), 01/02/03 on non-sequences (SD6), fake window chrome (SD7), three identical cards (L2), logo walls (L4), arrow glyphs in labels (CP3), generic CTAs (CP6), bounce easing (M4), Sparkles-for-AI (I3), reflexive glass beyond the 3 named in the glass budget (K3), fade-up on everything (M1, see the v2 motion budget above).

A literal count-up (M5) may be used only if scoped to one element with its own `avoid-ai-design-ignore: M5` and a stated reason — Proof's own figures stay static, as today; an animated 0→N counter on a static, non-repeating number is theatre around a real figure, not proof of one.

## Brief-driven ignores

- `avoid-ai-design-ignore: T1` — Inter is mandated by the Blizad brand board for body/UI text, paired with Manrope display.
- Newsreader Variable (Editorial trust register, v3) is not on the `avoid-ai-design` catalog's named overused-font list — brief-driven, scoped to the trust scenes named in Editorial trust register above, documented here per that skill's own rule for any new font choice.
