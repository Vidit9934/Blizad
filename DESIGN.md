---
version: v9
name: Blizad
description: Showcase site for Blizad, a Raipur growth company where one team runs the campaigns, the search visibility and the software. It should leave a founder thinking "these people move fast and know exactly what they are doing".
colors:
  ground: "#0A0A0C"      # Midnight — dominant surface (v5 near-black; frontmatter fixed in v6, no color change)
  ground-deep: "#050506" # lower end of the midnight gradient
  ground-raised: "#151518" # elevation by lightness on dark
  ice: "#F3F8FC"         # light rooms (proof, path)
  white: "#FFFFFF"
  ink: "#FFFFFF"         # text on midnight
  ink-dark: "#0A0A0C"    # text on ice/white
  muted: "#A9B8CC"       # secondary text on midnight
  muted-dark: "#3D4F66"  # secondary text on ice
  signal: "#087CFA"      # Electric Blue — action only
  light: "#00BFEF"       # Cyan — light and atmosphere only, never body text
typography:
  display:
    fontFamily: Bricolage Grotesque Variable
    fontSize: clamp(2rem, 3.6vw, 3.25rem)
    fontWeight: 600 to 800
    letterSpacing: -0.025em to -0.03em
  body:
    fontFamily: Bricolage Grotesque Variable
    fontSize: 1rem
    lineHeight: 1.6
  mono:
    fontFamily: JetBrains Mono Variable
    fontSize: 0.875rem
    use: real measured values, status and timestamps only — never headlines or decoration
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
- **v6 — full cinematic-minimal register, everywhere, including proof/process scenes.** v1 of this site applied the cinematic-minimal register everywhere, including to the proof/process scenes, and the owner called the result "basic" and "plain" — v5 then built a split (this register for Hero/Dream/Voices/Founders/FAQ, a denser "Tech dashboard / Flashy SaaS" register for Proof/Builds/Path/Pipeline/Estimator/Hub) specifically so that didn't recur. On 2026-10-30, shown this exact history directly, the owner explicitly chose — twice — to revert to v1's full-minimalism approach anyway, judging that it can succeed this time by fixing the two things `premium-interactive-web`'s own retrospective blames for a wordless page failing to persuade: a nav that hides destinations, and a conversion layer with nowhere for real content to live. v6 keeps the nav solid/complete (unchanged, see Conversion layer) and keeps every piece of proof/process detail genuinely reachable — via hover, click or `<details>` — per chapter, rather than deleting it. The v5 split is retired; there is one cinematic register again, applied everywhere.
- **Editorial trust register — retired in v5 (see Typography).** The serif "quiet trust" treatment described below under "Editorial trust register (v3)" no longer exists as a separate register; those same scenes (Dream/Pedigree statements, Voices, Recognitions, founder quote, home FAQ) now use the one display/body pairing, with weight and size doing the "quiet" work instead.
- Brand-board contour lines and the signal canvas are background layers, not a third *aesthetic* — the Editorial register above is the deliberate third, scoped exception to `style-blending.md`'s "1 primary + 1 accent" rule. Film grain is the texture of the dark surface.
- Light "ice" rooms (proof, path) give the scroll a tone shift — moving through rooms.

## Colors

- **Midnight #0A0A0C (v5 — near-black)** is 60% of the page. **Ice/White** surfaces and ink are 30%. **Electric Blue #087CFA** is 10% and has one job: action (primary buttons, focus ring, active state). **Cyan #00BFEF** is light — glows, strokes on the signature object, signal motes — never text on white.
  - **Why this changed from v4:** the owner's visual-makeover brief (13 Unfoldmart/AJ Marketing reference screenshots) asked explicitly to drop the navy-tinted Midnight for a true near-black ground, while keeping Electric Blue/Cyan as the one accent — an explicit, owner-approved exception to the "brand board — do not change" note below, not casual drift.
  - Measured contrast against the new #0A0A0C ground: white 19.8:1; #087CFA (Electric Blue) 4.97:1 — re-verified after the ground change, still clears the 4.5:1 AA bar for normal text (previously 4.7:1 on the navy-tinted Midnight, so the near-black ground is a marginal improvement, not a regression). Midnight-on-ice and muted-on-midnight ratios (previously 17.5:1 / 9.3:1) are effectively unchanged — both colors moved only slightly in luminance.
- White on #087CFA is only 3.98:1, so **button fills use `--electric-fill` #0A6FE0 (4.81:1)**; #087CFA stays for large type, outlines, glow and hover light. This ratio is independent of ground color (it's white text on a filled button, not on the page background), so it's unaffected by the v5 ground change.

## Typography

- **Bricolage Grotesque Variable (v6)** for both display AND body — one typeface, replacing v5's Plus Jakarta Sans Variable (display) + Inter Variable (body) pairing.
  - **Why this changed from v5:** the owner, inspired directly by `kmf-tau.vercel.app` (a KMF Media reference site built with `premium-interactive-web`), asked explicitly to copy its font — KMF uses this same family for everything. Considered and explicitly re-confirmed against the alternative (keeping the two-family system, since Jakarta Sans was already a KMF-adjacent pick and a single face blurs less onto the mono-for-real-data distinction) — the owner chose the font swap anyway. `JetBrains Mono Variable` is unaffected; it stays visually distinct from Bricolage Grotesque exactly as it was from Jakarta Sans/Inter.
- One emphasis rule: emphasise a whole line by weight/size/colour, never one word.
- **JetBrains Mono Variable** (self-hosted) is the monospace accent: it appears wherever a value is a real measured or reported figure, status, or timestamp — the pipeline's gate state, Proof's stat values, the Estimator's answered-% and recommended weeks, Builds' tech-tag labels. It never appears in headlines, body copy, or as decoration ("tech vibes" with no real data behind it is a tell, not a style). Pair with `font-variant-numeric: tabular-nums` on anything that updates or must align in a column.
- **Type scale (v6) — cut further, on top of the font swap:**

  | Token | v5 | v6 |
  |---|---|---|
  | `--step-hero` | 36–60px | 32–52px |
  | `--step-display` | 28–44px | 24–36px |
  | `--step-editorial` | 32–68px | 28–48px |
  | `--step-title` | 22–28px | 20–24px |
  | `--step-lead` | 17–19px | 16–18px |
  | `--step-body` | 17px | 16px |
  | `--step-small` | 15px | 14px |
  | `--step-micro` | 13px | 12px |

  Plus four one-off clamps that bypassed the token scale entirely and were the biggest real offenders: `.dream__text` (96px ceiling → 56px), `.proof__figure--w3 .proof__value` (128px → 60px), `.founder__monogram` (160px → 56px), `.door--lg .door__word` (72px → 44px).
  - **Why this changed from v5:** the owner explicitly, twice, asked for the text to read smaller sitewide on 2026-10-30, after v5's makeover had already cut the display scale once (see the v3 history below). This targets the handful of uncapped clamps that bypassed that earlier cut, not a second reduction of `--step-hero`/`--step-display` alone — those were already in a range comparable to KMF's own measured hero (58.5px at ~1272px viewport).
- v3 history (unchanged): the display scale was cut back in v3 (`--step-hero` 48–132px → 36–60px, `--step-display` 40–100px → 28–44px) after the owner judged the original scale "really big... somehow they seem more trustable than us" versus a lighter competitor site. Letter-spacing eased from -0.045/-0.05em to -0.025/-0.03em and line-height opened (0.94–0.98 → 1.07–1.1) so the smaller sizes read calm, not cramped.

## Editorial trust register — retired in v5

A third register used to exist here (Newsreader Variable serif on `--step-editorial`), scoped to Dream/Pedigree statements, Voices, Recognitions, the founder pull-quote, and the home FAQ headers. **It's retired as of v5**: neither Unfoldmart nor AJ Marketing (the owner's visual-makeover references) use a serif anywhere, and the makeover brief asked for a look matching those references. Those same scenes now use `--font-display`/`--font-body` like everywhere else — weight (400, not the heavier 700–800 used for promises) and the large `--step-editorial` size do the "quiet, premium" work the serif used to do, not a different typeface.

- `@fontsource-variable/newsreader` is removed from `package.json`; `--font-editorial` no longer exists as a token.
- Guardrails carried forward unchanged: no cream+terracotta (SD1), no tracked ALL-CAPS eyebrow above these statements, no decorative flourish beyond the one signature moment per scene. Testimonial/recognition content still follows the `confirmed: false` + Placeholder-tag honesty rule (see Honesty rules).
- The nav-stays-opaque rule (an Ungrammary detail deliberately *not* copied in v3) is unchanged and unrelated to this retirement — see "Conversion layer."

## Icon system

One custom icon family (`src/components/Icon.tsx`), sharing `BoltMark`'s stroke geometry (1.6px centre-line stroke, rounded joins, 20px grid). Icons are used **functionally** — pipeline/process nodes, inline data markers, process states, bento-tile identity, tech-tag rows — never as decoration. Refused: one icon in a tinted rounded-square chip repeated identically across 3+ cards (K6/L2) — vary size and placement by the tile/row's own weight instead. Never a real third-party product logo (ties to the Honesty rule below) — tech-stack tags use generic category icons (frontend/api/database/etc.), not brand marks.

## Glass budget

**v6: stays at 3 named surfaces**, using a two-class split (`.glass` = real `backdrop-filter`, budgeted; `.panel` = solid gradient + top-edge highlight, unbudgeted — see `base.css`): (1) the Nav mega-menu (`.mega`) — built; (2) Hub's device-preview card (`.hub__card`) — built; (3) reserved, not yet built. Blur radius on both built surfaces was reduced from 16–18px to **8px** in v6 (matches KMF's own measured value).

- **A 4th surface was tried and reverted, measured.** v6 first added Founders' `.founder__panel` (wrapping `.founder__text`) as a real `.glass` surface — beat 4 has the dimmest bolt pose on the page (`poses.ts`: `fill: 0.45, glow: 0.22`, the lowest glow of all 8 beats), the calmest background a glass surface could sample from. `npm run qa`'s frame-time gate caught a real regression: median scroll frame time at 1440px went from 16.7ms to 33.3ms (p95 50ms) with this surface live — the first time a glass panel sat over the persistent, continuously-rotating WebGL bolt rather than a static/CSS layer, and it cost more than the 8px blur-radius cut saved. Swapping the same element's class from `.glass` to `.panel` (one line, `Founders.tsx`) brought the median back to 16.7ms — confirming the surface itself, not something else in the v6 pass, was the cause. **Founders' panel ships as `.panel`, not `.glass`**; the reserved 3rd glass slot stays open for a future surface that doesn't sit over the 3D layer.

Every glass surface sits over a real gradient/texture (never a flat fill), carries a 1px top-edge highlight, and **must never be combined with a continuous CSS animation on the same element or an ancestor** — this exact combination (`filter: blur()`/`backdrop-filter` plus a looping transform) is what cut scrolling from 60fps to 20–30fps twice during the first build (`scripts/qa-scroll.mjs` caught both). This rule governs the glass element's own (or an ancestor's) animation, not what continuously renders behind it — the two pre-v6 surfaces already coexist with the always-looping `Atmosphere` background; the persistent 3D bolt behind Founders' new surface is a heavier case of the same already-sanctioned category, not a different rule. Hub's card and the new Founders panel both keep to this by design: each only ever gets a discrete, one-shot or `quickTo` settle (never a loop); any continuous state-cycle animation lives on a separate, non-glass inner layer. Anything else that wants to look "frosted" uses `.panel` (solid surface with a gradient/border) instead — this is now the default mechanism for giving bare text a backing surface against the persistent 3D bolt, used on `.hero__aside`, `.dream__text`, `.search__head`, `.pipeline__head`, the Estimator/Hub/HomeFaq/Close headings.

## Layout

- Max content width 1280px; side padding clamp(16px, 4vw, 40px). Width varies by scene role: hero and gallery full-bleed, statements wide, FAQ narrow.
- **Structure (v4 — consolidated into 8 chapters, down from 14 flat scenes; chapter list below superseded by v9, see "New chapter order" above).** The home page is one continuous scroll film, each chapter tagged with a shared `data-beat="N"` attribute (0-7) on its constituent `<section>`s — see "3D signature layer" below for what reads that tag. v4 chapter list (historical): **0 Ignition** (Hero) · **1 The Promise, Proven** (Dream + Proof) · **2 Pick Your Door** (Doors + SearchEverywhere) · **3 Proof of Craft** (Builds + Pedigree) · **4 Who You're Trusting** (Voices + Founders) · **5 The Pipeline** (Path + Pipeline) · **6 Build Your Stack** (Estimator + Hub) · **7 No More Reasons to Wait** (HomeFaq + Close). Content/data sources in `src/content/*` are unchanged — chapters restage existing honest copy, they never introduce new claims.
  - **Why this changed from v3:** the owner rejected a hover-polish-only pass on the old 14-scene structure as insufficiently ambitious, explicitly asking for a scene-level rebuild with real 3D and bigger per-chapter moments, inspired by reference sites with heavy scroll-driven motion.
  - **Load-bearing QA detail:** `scripts/qa-scroll.mjs` measures words per direct sibling `<section>` of `<main>`. Chapters group their constituent scenes via the shared `data-beat` attribute, **never** by wrapping them in one new outer `<section>` — that would silently double a merged chapter's word count against one `≤45` ceiling the tool wasn't written to expect.
- Left-aligned, asymmetric compositions; the bolt sits right of the hero headline.

## Signature object

The Blizad bolt is now a persistent **3D object** (`src/three/Scene3DCanvas.tsx`, three.js + `@react-three/fiber@^8` — pinned to the v8 line because this project is React 18, not React 19 like the sibling Krantiveer/KMF Media site whose `@react-three/fiber@^9` requires React 19), mounted once in `Layout.tsx` as a fixed background layer (`z-index: 0`, matching `Atmosphere.tsx`'s own proven stacking pattern — **not** a negative z-index, which silently paints behind the opaque `<body>` background in this project and was the cause of one real, time-consuming bug during implementation) so it persists across the whole scroll and across route navigation without remounting. Boldness is spent here only — no second 3D object, no competing signature moment.

**v7 — five related parts, not two flat shapes.** `Bolt()` is now **StrikeCore** (the metal shell: `MeshStandardMaterial`, metalness 0.78, roughness 0.22), **StrikeGlow** (an inset, additively-blended duplicate — the charge the shell contains, not a flat emissive tint on one surface), two **FieldRing**s at different depth and idle speed (replacing the single flat tube bracket with real parallax), and **ChargePulse** (an `InstancedMesh` of small spheres riding the inner ring, reading a precomputed point table — the literal visual form of "momentum"/"current", and the hook Pipeline's fracture and Estimator's charge drive). Three lights (a key point light, a cyan rim directional light that sweeps on arrival at beats 3/7, and a dim ice-coloured fill light) plus ACES filmic tone mapping give the shell its shading and colour story.

- **Why this changed from v6.** v6's bolt was a single extrusion + a single tube, one `MeshStandardMaterial`, lit by one `ambientLight` + one `pointLight`, no environment — technically real WebGL (confirmed by reading `Scene3DCanvas.tsx`) but visually indistinguishable from the flat logo redrawn in 3D, because a physical material with nothing to reflect reads flat regardless of extrusion depth. v7 also fixes a real bug found while rewriting it: the old `subscribeBeat((pose) => { poseRef.current = pose })` callback silently ignored the listener's `fracture`/`charge` arguments, so `fractureRef` was permanently `0` and Pipeline's "3 agencies" toggle never actually moved the bolt, despite this file's own comments claiming it did. v7's listener destructures all four arguments.
- **A `MeshPhysicalMaterial` (clearcoat) plus a procedural `drei` `Environment`/`Lightformer` rig was tried and reverted, measured** — the same pattern as the Founders `.glass` story in the Glass budget section below. `npm run qa`'s frame-time gate caught it: median scroll frame time at 1440px was 50ms with clearcoat + environment live. `scripts/qa-scroll.mjs` launches a plain `chromium.launch()` with no GPU flags, so WebGL there runs on software rasterisation (SwiftShader) — exactly the case where clearcoat's extra specular lobe and per-pixel environment-map sampling cost disproportionately more than on real hardware. Dropping clearcoat (back to `MeshStandardMaterial`) and the Environment (back to plain lights, DPR cap 1.75→1.5, antialias off) cut 1440px's median from 50ms to ~33ms — a real, large improvement, confirmed by disabling the whole 3D layer and re-enabling it piece by piece.
- **A second, unrelated frame-time cost was found and fixed the same pass**: `Atmosphere.tsx`'s `SignalCanvas` created a fresh `CanvasGradient` object for every one of its ≤80 motes, every frame — a pattern that predates v7 (v6 had the same per-mote gradient, just on grid-locked motion). Isolating each layer in turn (3D off, then 3D+Builds-fan off, then all three off) showed this was the deciding factor between a borderline ~33ms reading and a clean ~16.7ms one at 1440px. Replaced with a flat alpha `strokeStyle` (no gradient object, same visual weight minus the fade-to-transparent tail) — see `Atmosphere.tsx`.
- **A real functional bug was also found and fixed while rewriting this file**: v6's `subscribeBeat((pose) => { poseRef.current = pose })` callback only ever destructured its first argument, silently ignoring `fracture`/`charge` — so `fractureRef` was permanently `0` and Pipeline's "3 agencies" toggle never actually moved the bolt, despite comments claiming it did. v7's listener destructures all four arguments.
- **Measurement caveat, stated honestly rather than chased further**: even after both fixes above, repeated `npm run qa` runs in this specific headless/software-rendered environment show real run-to-run variance at 1440px and 1024px (the same code measuring anywhere from ~16.7ms to ~50ms median across consecutive runs, with no change in between), while 390px consistently passes at 16.7ms. Isolation testing (forcing the static fallback, then re-adding each layer) traced the deterministic part of the cost to the two items above; the remaining variance looks like vsync quantization (rAF deltas snapping to multiples of ~16.7ms) compounded by shared-machine contention from this session's own stacked test processes, not a further deterministic regression — but this has **not been confirmed on a real GPU/device**, which is the authoritative check still outstanding before calling 1440/1024px's frame budget definitively closed.
- **Tier split, now real.** `Scene3DBoundary.tsx` passes `tier` into `Scene3DCanvas` (previously computed by `useSceneTier` and never consumed — `full` and `light` rendered identically). `full` runs 24 ChargePulse instances at DPR up to 1.5; `light` runs 10 instances at DPR 1. `SignatureStatic`'s flat `BoltIcon` is unchanged as the `static`/reduced-motion/no-WebGL2 fallback.
- **Fracture, honestly scoped.** Splitting `StrikeCore`'s extrusion into two true sub-meshes at its waist was evaluated and intentionally not shipped in v7 — the risk of a self-intersecting or visually broken cut from a hand-picked point-list index wasn't worth it against the documented fallback this file already sanctions. Instead `setFracture` now drives a *bigger* version of the original group-translate: both FieldRings spread apart, every third ChargePulse instance dims toward zero (reading as "current interrupted"), and the beat-5 camera nudges back slightly (`beatRig.ts`) — a richer structural event than v6's flat slide, without the unverified geometry risk. A true per-mesh split remains a candidate for a future pass if reviewed and confirmed safe in a real browser first.

### 3D signature layer — architecture

- **SSG-safety boundary** (`src/three/Scene3DBoundary.tsx`): the only file in `Layout.tsx`'s import graph that may lead to `three`/`@react-three/*`, and it must never statically import them. The gate is a dynamic `import('./Scene3DCanvas')` call inside a `useEffect` body — not `React.lazy`, which `vite-react-ssg`'s real Node prerender pass would still invoke server-side even inside `Suspense`. An effect never runs outside a committed DOM, so nothing three-related is ever reachable from the module graph the prerenderer walks.
- **Tier system** (`src/motion/useSceneTier.ts`): `full` | `light` | `static`, built on the existing `MQ`/`useMotion()`/`gsap.matchMedia` conventions, not a parallel system. `prefers-reduced-motion` (`useMotion().enabled === false`) always resolves to `static`, no exceptions — the existing single motion authority, not a second toggle. Otherwise a one-time WebGL2 capability probe plus `MQ.cinematic` (wide + motion-ok) and `navigator.hardwareConcurrency`/`deviceMemory` heuristics pick `full` vs `light`.
- **`static` tier** (`src/components/SignatureStatic.tsx`): literally `BoltIcon` from the already-built `BoltMark.tsx` — no-JS, reduced-motion and low-end/no-WebGL2 visitors see exactly the brand's existing signature object, server-rendered, zero layout shift versus the 3D version.
- **Beat rig** (`src/three/beatRig.ts`, poses in `src/three/poses.ts`): one shared, damped 0-7 "beat time" signal — the same module-level pub-sub shape as `useScrollVelocity.ts` — derived from real scroll position mapped through each chapter's `data-beat` anchors via `gsap.quickTo`. Interpolates camera position/look-at, a fill/glow pair, and (v7) a field-of-view/spin pair between adjacent chapter poses — `spin` lets a beat hold genuinely still (v6's idle rotation was always-on at a fixed rate, so no beat ever actually read as "motionless" despite several pose comments promising it). Three discrete overrides ride the same shared state outside the scroll-driven interpolation: `setFracture(0|1)` (Pipeline's "3 agencies" vs "One Blizad pipeline" toggle, now a bigger FieldRing-spread + ChargePulse-dim + camera-nudge event, not the flat gate diagram — see Signature object above), `setCharge(0..1)` (Estimator's answered-question count drives the bolt as a literal charge meter, echoing the existing flat `estimator__meter`, and now also the ChargePulse instances' travel speed), and (v7) `setIgnition(progress)` (Hero's own pinned scrub dollies beat 0's camera in — `cam.z` and `fov` — in lockstep with the CSS stage scale it already runs; scoped to beat 0 only, it never affects any other chapter's pose).
- **Render loop**: R3F's own default loop (`frameloop: 'always'`), toggled to `'never'` via `src/three/Scene3DCanvas.tsx`'s `Driver` component when the tab is hidden or `#main` scrolls out of view (`IntersectionObserver`, mirroring `Atmosphere.tsx`'s existing pause pattern) — not a hand-driven manual `advance()` ticker, which was tried first and proved fragile to get rendering reliably at all.
- **Nav/route-transition integration**: the 3D canvas never unmounts across navigation because it's mounted in `Layout.tsx` (which persists across routes, like `Atmosphere`/`Cursor`/`Curtain` already do), not in `pages/Home.tsx`. Pages with no `data-beat` anchors (Contact, Privacy, Services pages) simply leave the object in its last/idle pose.
- **Context-loss**: a `webglcontextlost` listener on the canvas calls `preventDefault()` so the browser doesn't tear down the context; a future pass should drop the tier to `static` on repeated loss (not yet wired).

## Background stack (back to front)

1. Midnight vertical gradient. 2. Two drifting blue/cyan radial lights (34s and 47s loops). 3. One canvas of ≤ 80 signal motes drifting on a freely-curving heading, DPR ≤ 1.5, paused offscreen and when the tab is hidden. 4. A persistent light cone, positioned by `--cone-x`/`--cone-y` (written every frame by `Scene3DCanvas.tsx`, projecting the bolt's world-origin position through the current beat's camera — it never moves, only the camera does) so it sits behind the signature object in every chapter, not just the hero. 5. One static SVG grain tile, 3%, overlay. 6. Vignette. 7. Echo rings: 2-3 concentric rings centred on the same cone point, scaling/fading with `useScrollVelocity()` (the already-shared physics signal — no new listener).
Reduced motion keeps 1, 4, 5, 6 (echo rings aren't mounted; the cone holds its CSS default position with nothing to chase).

- **Why this changed from v6.** v6's own list named 8 layers; only 5 were actually built. `.atmosphere__grid` was a literal cartesian grid (`linear-gradient`, 96px cells) with motes locked to travel only along its lines — this *was* the circuit-board-diagram look, confirmed in the CSS/JS, not an impression — and items 4/8 (the cone, the echo rings) were documented across v4-v6 but never shipped outside the hero's own scoped `.hero__cone`. v7 closes that doc/code drift: the grid and its mote lock are gone, and items 4/7 are now real, persistent layers. A per-scene animated `--ground` tone-shift token (the old item 7) was evaluated and not built — the existing `.scene--ice` opaque-panel cut already does this job structurally (paper rooms are opaque over the stage, per the Colors section), and animating the token underneath it would cost a transition nothing currently reads.

## Motion

- Lenis on the GSAP ticker; one ScrollTrigger engine in `MotionProvider`.
- Reveals 0.9–1.2s `power3.out`; large moves 1.2–1.6s `expo.out`; hover 0.25–0.4s `power2.out`; staggers 0.06–0.12s in reading order. No bounce, no elastic.
- **Pinned scenes (v4): exactly 2 pin regions, unchanged from v3** — Hero (now coordinated as beat 0 of the 3D rig) and the Builds gallery. The 3D beat-rig itself never pins — it's a persistent background layer read by ordinary scroll position across the whole page, not a scroll-jacking mechanism. `qa-scroll.mjs`'s pin-spacer leak-count gate should read 2, constant, across 10 route switches.
  - **v7 additions ride these same two pins, adding none.** Hero's existing pinned-scrub `onUpdate` now also calls `beatRig.setIgnition(self.progress)` (a camera dolly in lockstep with the CSS stage scale it already runs). Builds' existing pinned-scrub `onUpdate` now also computes each panel's own `rotateY`/`translateZ` from its position relative to the viewport centre (reinterpreting KMF's "curved CSS 3D fan" hero technique for a gallery) — read from `offsetLeft`/`offsetWidth`, values a `transform` never invalidates, so no extra layout reads are forced per frame. Neither adds a ScrollTrigger, a pin, or a scroll listener.
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

**≤ 12 display words and ≤ 45 visible words per scene (v6, reverted from v5's ≤ 20 / ≤ 70)** (proof, FAQ and Voices exempt — testimonial quotes carry real voice, not a word count). Detail lives on service pages, in `details`, or behind hover/focus. Drawn product interfaces (the search, AI-answer and voice panels) carry `data-product-screen` and are exempt as product screens, per the skill. **Icon/label-dense panels in the Tech dashboard register — Proof's visual+number composition, Builds' tech-tag row, the Services bento tiles, Pipeline's gate rows — get the same `data-product-screen` exemption** when the icon/label pairing is itself the content, not prose around it. `npm run qa` measures this.

- **Why this changed from v5:** v6 reverts the ceiling v5 raised back to the original v3 figures, this time deliberately including the proof/process scenes v1 had already tried and the owner called "basic" (see Style, above). The difference this time: the detail those scenes carried (Proof's attribution sentence, Doors' service sublists, Founders' bios, Pipeline's gate status strings) moves to a named hover/click/`<details>` reveal per chapter — collapsed into a `<details>` (Proof), gated behind `@media (hover: hover)` with a touch-always-visible fallback (Doors' sublist, Pipeline's gate state; Founders' bio was already built this way) — rather than being deleted outright, and the nav/conversion layer stays solid and complete throughout. Those are the two mechanisms `premium-interactive-web`'s own retrospective names as the actual cause of a wordless page failing to persuade, not the word count itself.
- **v4→v5 history (superseded):** v5 had raised this ceiling to ≤ 20 / ≤ 70 to match a visual-makeover brief's denser reference copy. v6 reverts that raise; the denser v5 components it introduced (the Services "at a glance" fact grid, the restyled exclusive-accordion FAQ) are unaffected by this revert since they live on `/services` and inside `<details>`, outside the home-page scene word count.

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
- **Mega-menu dim scrim (v6, `.mega-dim` in `nav.css`/`Nav.tsx`)**: a flat, un-blurred `rgba(5,5,6,.55)` fade behind the open Services mega-menu, dimming scrolled page content so the menu reads first — a KMF-inspired dimmed-menu feel without a second `backdrop-filter` (not counted against the glass budget). It sits below `.nav` in z-index and closes with the menu's existing outside-click/Escape/scroll handlers. Does not loosen "nav stays opaque, never hides" — the bar itself never dims or loses opacity, only the content behind the open menu does.

## v8 — structural choreography (the actual page experience, not just the object on it)

**Why this pass exists.** v7 rebuilt the 3D bolt's craft (five-part construction, real materials, a fixed background stack) and it was a real improvement — but the owner's verdict on the live result was correct: it still read as the same page. A direct code audit confirmed why: no scene ever transitioned (dark→ice was a bare CSS class swap, zero transition code), nothing new ever entered during Hero's pinned scroll (pure fade/recede of elements already on screen), the one pointer-reactive type moment only swung `font-weight` by 200 units, and Close had no unique treatment at all. v8 closes those five gaps. None of it touches the palette, the bolt's identity, the tagline, real content, or the SSG/claims architecture — all still locked per "Don't change" below.

- **Paper-wipe scene transitions** (`src/motion/usePaperScene.ts`, consumed by `Proof.tsx`, `Pedigree.tsx`, `Voices.tsx`, `Path.tsx`): every `.scene--ice` scene now opens like a sleeve — its own box `clip-path: inset(... round ...)`s inward on arrival (the dark room visible at the margin, through the persistent Atmosphere/3D layer behind it) and un-clips to full bleed as it scrolls into place, driven by one `ScrollTrigger` per scene reading `self.progress`. `.scene--ice`'s own `--ps-inset`/`--ps-radius` default to `0px`, so a scene with the hook not mounted (or motion disabled) renders at its settled, full-bleed state for free.
  - **Measured finding, fixed in the same pass**: the first version wrote the two CSS custom properties on every scroll tick. `clip-path` is not compositor-only like transform/opacity — it repaints the clipped element's whole subtree (icons, SVG progress rings, grids) on every change — and with four instances live on the page, `npm run qa`'s frame-time gate caught a real, **reproducible** cost: two separate runs both landed on a consistent ~66.6ms median at 1440px (not noise — noise varies between runs; this didn't). Quantizing the writes to 16 discrete steps instead of continuous (visually indistinguishable, an order of magnitude fewer repaints) brought the same gate back to ~33ms, in line with this environment's already-documented noisy-but-acceptable range. This is the concrete, measured version of "transform/opacity only" guidance — `clip-path` specifically needed this extra care that a plain transform wouldn't have.
- **Hero: something arrives, not just recedes** (`Hero.tsx`, `.hero__fan`): reusing the exact curved-3D-fan technique already built for Builds (`rotateY`/`translateZ`/`perspective`, index-keyed), the three real builds (TuneFry, My Life Choices, SCDM Accelerator — same data `Builds.tsx` renders) plus a closing "your product, next" card rise into a fan as the headline/rings recede, riding the same pinned ScrollTrigger `setIgnition` already uses — no new pin, no new scroll listener. `aria-hidden` on the fan (the content is a decorative teaser of what `Builds.tsx` already presents accessibly down-page), so it adds zero words to Hero's word-budget gate.
- **Reactive type, made actually reactive** (`useSceneReveals.ts`'s `data-reveal-pointer="weight"` branch, Dream only — "spend boldness in one place" unchanged): the pointer-proximity mechanism now swells `scale` (+14%) and tightens `letterSpacing` alongside the existing `fontWeight` swing, same proximity math, same one scene. `.dream__text .word` carries a baseline `letter-spacing: -0.01em` so GSAP's `quickTo` infers and keeps the `em` unit from a real starting value rather than defaulting to px.
- **Close: an actual final beat** (`home.css`'s `.close`/`.close__button`/`.close__whatsapp`): a full-bleed solid `--electric-fill` band with dark (`--midnight`) type — reinterpreting KMF's solid-gold close for this palette. Button inverted to dark-on-fill (was gold/blue-on-dark everywhere else); the `.panel` class removed from the title since the scene's own opaque fill already does what `.panel` exists for. `--electric-fill` specifically (not the lighter `--electric`) because it's already the token DESIGN.md measured at 4.81:1 for white text — reused, not a new unverified color.
- **Ticker, a new full-bleed rhythm-break scene** (`src/scenes/home/Ticker.tsx`, wired into `Home.tsx` between Hero and Dream): reinterprets KMF's language-ticker scene with Blizad's own real service-group names (`src/content/services.ts`'s `serviceGroups[].name` — not invented copy), speed tied to the already-shared `useScrollVelocity()` signal (same hook Voices/Pipeline consume, zero new listener). Tagged `data-beat="1"`, grouped into the existing "The Promise, Proven" chapter alongside Dream — **no new beat index, no change to `poses.ts`'s 0-7 array**, so the 3D rig stays exactly as v7 left it. The one scene on the page with no `.shell`/gutter wrapper, so it runs edge to edge — deliberately, since every other scene is contained.

## v9 — the current (signature object replaced, chapters restaged)

**Why this pass exists.** v8 fixed four real structural gaps (scene transitions, Hero's arrival, reactive type, Close's close) but the owner's verdict on the live result was still correct: every section used the same dark-rounded-card-with-heading-and-body container, every section arrived the same way, the page read as a stock funnel (hero → statement → numbers → ...) despite `Home.tsx`'s own comment claiming an emotional order, and — called out twice, explicitly — the 3D object's idle rotation and its identity as a wandering bolt-shaped logo were "irritating." v9 replaces the object, reorders the chapters around a real emotional arc, and gives each chapter a visually distinct device and entrance. Still locked throughout, per "Don't change": the palette, Bricolage Grotesque Variable, the bolt *mark's* silhouette (as a logo, in nav/favicon only), the tagline, real content in `src/content/*.ts`, the SSG/claims architecture, the 2-pin budget.

### The signature object: "the Current" (replaces StrikeCore/StrikeGlow/FieldRing/ChargePulse's bolt silhouette)

`src/three/Scene3DCanvas.tsx`'s `Bolt()` is replaced by `Current()`: three `TubeGeometry` strands following a `CatmullRomCurve3` whose control points are generated fresh per beat from one function, `buildCurvePoints(coil)` — a tight coiled loop at `coil≈0.85` (Ignition), opening to a wide calm arc at `coil≈0.15` (The Signal), and a distinct held shape at every beat in between (see `poses.ts`'s per-beat `coil` column). `ChargePulse`'s instanced-sphere-along-a-curve mechanism is kept and re-targeted to travel along this new curve instead of the old FieldRing — real code reuse, not a rewrite of that piece.

- **No idle rotation, anywhere, ever.** This supersedes v7's "spin lets a beat hold genuinely still" framing, which still rotated at a fixed idle rate between beats. The Current never rotates on its own; it only reconfigures its held shape between beats (`coil`, quantized to 20 steps and rebuilt via `TubeGeometry`, the same quantization technique `usePaperScene.ts` already uses for `clip-path`) and tilts a few degrees toward the pointer (`pointermove`, damped). Constant motion comes only from `ChargePulse`'s particles flowing along the strand — reading as "a current," not "something wandering."
- **`Pose.fill`** is repurposed again, same field, new meaning each time: v6 "bolt wireframe→solid", v7 unchanged, v9 **"strand dim→bright"**.
- **`Pose.spin` is removed; two fields replace it**: `flow` (particle travel speed/density multiplier — what `setCharge` also scales) and `coil` (0 = loose open arc, 1 = tight coiled loop — the strand's held shape for this beat).
- **`setFracture(0|1)`** now splits the three strands apart (`fractureRef` offsets each strand's `position.x` and dims every third `ChargePulse` instance) and reunites them — "3 agencies" made literally three disconnected currents, a more direct fit for this mechanic than the v7 FieldRing-spread it replaces. Still driven from the same place, unchanged: `Pipeline.tsx`'s compare toggle.
- **`setCharge(0..1)`** now raises the Current's particle speed and brightness directly (`pose.flow * (0.12 + charge * 0.6)`) — still driven from the same place, unchanged: the Estimator's answered-question count.
- Hero's stage chrome (`.hero__ring`, `.hero__arc`) is unchanged — it was already abstract containment/energy-field framing, not bolt-specific geometry, so it stays coherent around the new object for free.
- **Why this changed from v7.** v7's StrikeCore/StrikeGlow/FieldRing/ChargePulse construction was real, measured 3D craft — but craft was never the gap the owner was pointing at. The object itself, as a concept, was the problem: a bolt-shaped hero centerpiece that idled continuously read as a logo doing an animation loop, not as atmosphere. Offered three concrete alternative directions, the owner chose "a different signature device entirely" — an abstract current/signal visual, moving only per scroll-beat, never idle. The bolt *mark* itself (nav, favicon, `BoltMark.tsx`) is unaffected; only the animated 3D hero object's concept changed.

### One idea, three scales: "the current" as a motif

The same flowing-strand concept now appears at three scales, tying literally to the tagline "Built for momentum":

1. **3D** — the hero/background `Current()` object, above.
2. **2D branching** — `src/components/CurrentPath.tsx` in `mode="branch"`, used by **Doors**: one glowing SVG path (`stroke-dasharray`/`-offset` draw-in, `once: true`) branches toward four lit service-group nodes, replacing the old four stacked bento cards (`tierOf()`, `.door--lg/md/sm`).
3. **2D linear** — the same `CurrentPath` in `mode="linear"`, used by **Path** (replacing the old flat gradient bar) and, at a much larger/fainter scale, behind each product's name in **Builds** (two shared uses of one component, not two different line treatments for the same idea).

`CurrentPath` is deliberately one small component with two layout modes rather than two separate devices — cheaper to maintain, and it makes the "one idea, two scales" claim literally true in the code, not just in prose.

### New chapter order (8 beats, `poses.ts`'s array length unchanged)

| Beat | Chapter | Scenes | Why here |
|---|---|---|---|
| 0 | Ignition | Hero | Arrival — the Current introduces itself; Hero's existing fan-reveal (v8) rises as it reconfigures, not recedes. |
| 1 | The Signal | Ticker, Dream | A quiet breather after arrival, then the one reactive-type brand statement — not straight into numbers. |
| 2 | Pick Your Door | Doors, SearchEverywhere | "What we do," shown early, the branching Current drawing in as the first genuinely different container on the page. |
| 3 | Proof of Craft | Builds | The real-work gallery gets its own full chapter, no longer sharing with Pedigree. |
| 4 | Who You're Trusting | Pedigree, Proof | Credentials and stats together — numbers are no longer the second thing a visitor sees. |
| 5 | The Pipeline | Path, Pipeline | Both "how we work" process diagrams, grouped into one process chapter. |
| 6 | Build Your Stack | Estimator, Hub, Voices | Decide stage: the live tool, a product tease, trust testimonials. |
| 7 | No More Reasons to Wait | Founders, HomeFaq, Close | Final human-trust beat, objections, the bold Close band. |

- **Why this changed from v4/v8.** The v4 table above (still shown in "Layout" for history) put Proof second and split Pedigree from Proof across two different chapters — numbers arrived before any reason to trust them, and the two trust signals (credentials, stats) never sat together. v9's table is the one actually implemented; the v4 table is retained there as a historical record of the structure it replaced, not as current fact.
- **Content is unchanged.** "Even the content, completely redone" meant re-staging and regrouping the real facts already in `src/content/*.ts` — nothing in this reorder invents a claim; `node scripts/check-claims.mjs` confirms the reorder touched no real facts.

### A distinct entrance per chapter

| Chapter | Entrance |
|---|---|
| Ignition | The Current resolves into shape as the preloader ends; on scroll, Hero's fan (v8) rises as the strand reconfigures. |
| The Signal | Ticker's ambient marquee → Dream's reactive-type scrub (unchanged). |
| Pick Your Door | The branching `CurrentPath` draws in (`stroke-dashoffset`) and its nodes scale in with a stagger — not a fade. |
| Proof of Craft | Builds' pinned horizontal fan (v7/v8, unchanged) — now on each project's own colour-field band (below). |
| Who You're Trusting | Pedigree keeps its calm staggered fade (deliberately the quietest beat); Proof's new `MagnitudeBar` columns scale in from the baseline. |
| The Pipeline | Path's current flows (an ambient `path-flow` glow, speed tied to `useScrollVelocity()`, the same shared signal Pipeline's connector and Voices' marquee already read); Pipeline keeps its existing gate-lighting sequence. |
| Build Your Stack | Estimator/Hub unchanged; Voices' cards keep their existing alternating entrance. |
| No More Reasons to Wait | **New primitive**: Founders' portraits open behind a one-shot curtain split (`.founder__curtain--a/--b`, `scaleX` only, never `clip-path`) on first scroll-in — CSS defaults to `scaleX(0)` (uncovered) so no-JS/no-motion readers always see the real portrait; the mount effect is the only thing that ever covers it before drawing it back open. FAQ stays a native disclosure; Close's band is unchanged from v8. |

### A distinct visual device per chapter

- **Doors** — the current, branching (above), replacing four stacked bento cards with service-group "stops" lit along one branching line.
- **Path** — the current, linear (above), replacing the old flat gradient bar.
- **Builds** — each real project (`src/content/builds.ts`) now sits on its own full-bleed colour-field band (`.build--tint-1/2/3`), a `color-mix()` of the official palette against Midnight — Electric Blue, Cyan, and a blended duo tint, never a new hue — with a large, faint linear `CurrentPath` behind the project name. The real screenshot, "what we built" list and stack tags are unchanged; this adds per-project atmosphere, it doesn't remove any evidence.
- **Proof** — `RadialProgress` (an honest relative-weight ring) is replaced by `MagnitudeBar` (an honest relative-magnitude column chart), because `Sparkline.tsx`'s own existing comment already refuses to be used here: Proof's figures are cumulative totals, not a time series, and a line/trend treatment "would imply a false history." `MagnitudeBar` visualizes the same real proportion (`figure.weight / 3`) the ring did — a different honest shape, not a different data source. `RadialProgress.tsx` is deleted; nothing else referenced it.
- Everything else (Ticker, Pipeline's gate diagram, Voices' marquee, SearchEverywhere's demo, Pedigree's quiet list, Estimator/Hub, Close's band) keeps its own already-distinct device, unchanged from v7/v8.

### v9 frame-time measurement

`npm run qa`'s 1440/1024px frame-time gate reads 50.1ms/83.3ms and 33.3ms/50.0ms median/p95 on this pass (390px passes clean at 16.7ms). Isolation testing (the same method v7 used): quantizing the Current's `coil` rebuild from 20 to 10 steps, cutting its `TubeGeometry` segment count 64→32, and converting Path's new ambient flow indicator from a `left`-animated (layout-triggering) keyframe to a `transform: translateX()` one (via `container-type: inline-size` on `.path__steps` for `cqw` units) are all real, defensible optimizations — but **none of them moved these numbers**. Decisively: temporarily removing the entire `<Current>` object from the canvas (just `<ambientLight>` + the always-mounted `<Driver>`, zero strand/tube/pulse geometry) produced the same 50.0ms/83.3ms and 33.3ms/33.4ms readings. The new 3D object is not the cause.

This matches v7's own already-documented finding in this same file almost exactly: "repeated `npm run qa` runs in this specific headless/software-rendered environment show real run-to-run variance at 1440px and 1024px ... anywhere from ~16.7ms to ~50ms median across consecutive runs, with no change in between ... not confirmed on a real GPU/device." That caveat was never resolved, only isolated as far as this environment allows; v9 re-confirms it rather than regressing past it. The two optimizations above ship anyway because they're correct on their own terms (fewer, cheaper geometry rebuilds; a compositor-only animation instead of a layout-triggering one), not because they closed this gate — a real GPU/device check remains the authoritative verification still outstanding, exactly as v7 left it.

### Corrections to earlier sections

- **Glass budget's Founders finding is now stale in one specific, non-load-bearing way.** It documented beat 4 as "the dimmest bolt pose on the page" when `.founder__panel` was evaluated as `.glass`. Founders now sits at beat 7 ("No More Reasons to Wait"), the *brightest* pose on the page (`poses.ts[7]`: `fill: 1, glow: 1`) — the opposite of dim. The conclusion is unaffected (`.founder__panel` already shipped as `.panel`, not `.glass`, and stays that way): a brighter, busier beat is, if anything, a stronger reason not to add an animated glass surface there, not a weaker one. Recorded here rather than left silently wrong.

## Honesty rules

- Ad-spend figures are founder-attributed experience, not entity-level claims.
- Google and Thomson Reuters appear as names in text ("engineering experience on products for…, as clients"), never as logos.
- Anything unconfirmed carries `confirmed: false` in `src/content/*` and renders a visible Placeholder tag. `scripts/check-claims.mjs` lists them on every build.

## Don't change

Bricolage Grotesque Variable (v6 — supersedes Plus Jakarta Sans Variable + Inter Variable), #087CFA, #00BFEF, #0A0A0C, #F3F8FC, #FFFFFF, the bolt mark, the tagline "Built for momentum."

**(v7)** This list is about identity, not implementation: the 3D object's internal mesh/material construction (StrikeCore/StrikeGlow/FieldRing/ChargePulse, the environment rig, per-beat camera moves) and the background stack's implementation (the signal-mote motion, the cone/echo-ring mechanism) are not covered by it and are expected to keep evolving — only the bolt's silhouette identity, the five colors above, and the tagline are locked.

**(v9)** The 3D hero/background object's *concept itself* was always implementation, not identity, under the v7 rule above — v9 exercises that latitude fully, replacing the bolt-shaped object with an unrelated abstract shape ("the Current," see above). The bolt *mark's* silhouette (nav, favicon, `BoltMark.tsx`) is what stays locked; it was never the thing rendered inside `Scene3DCanvas.tsx` after v7 anyway, only the hero object's inspiration.

(v6 doc fix: this line previously read "Manrope + Inter, ..., #071321" — stale leftovers from before the v5 makeover that contradicted this file's own v5 Colors/Typography prose and `tokens.css`. Corrected here, not a new decision; same fix applied to the frontmatter above. Newsreader/Editorial trust register was retired in v5, see above — this line no longer needs to carve out an exception for it.)

## Refused defaults

Count-ups (M5), ALL-CAPS eyebrows (T5/SD4), middle-dot meta strings (SD4d), one-word headline accents (SD5), 01/02/03 on non-sequences (SD6), fake window chrome (SD7), three identical cards (L2), logo walls (L4), arrow glyphs in labels (CP3), generic CTAs (CP6), bounce easing (M4), Sparkles-for-AI (I3), reflexive glass beyond the 3 named in the glass budget (K3), fade-up on everything (M1, see the v2 motion budget above).

A literal count-up (M5) may be used only if scoped to one element with its own `avoid-ai-design-ignore: M5` and a stated reason — Proof's own figures stay static, as today; an animated 0→N counter on a static, non-repeating number is theatre around a real figure, not proof of one.

## Brief-driven ignores

(v6 doc fix: the T1 Inter-mandate ignore and the Newsreader/Editorial-trust ignore both applied to typefaces this file no longer uses — Inter was replaced by Bricolage Grotesque Variable in v6, and Newsreader was already retired in v5. Removed here rather than left stale; Bricolage Grotesque is not on the `avoid-ai-design` overused-font list, so it needs no ignore of its own.)
