# Blizad site — working notes

Growth-marketplace site for Blizad (Raipur; Marketing, Tech, Tools): Sourav Yadav (Krantiveer), Founder & CEO, and Vidit Vaibhav, Co-founder & CTO.
**Read `DESIGN.md` before touching any UI** — it is the design contract (palette, type, motion, word budget, refusals).

## Commands
- `npm run dev` — dev server with SSR (vite-react-ssg)
- `npm run build` — `tsc` + pre-render every route to `dist/**/index.html` + `sitemap.xml` + claims report
- `npm run preview` — serve `dist` on :4173
- `npm run qa` — measured gates (needs preview running): words per scene, overflow, clipped text, fonts, nav opacity, CTA visibility, frame time, pin leaks, console errors at 1440/1024/390. `npm run qa -- --reduced` for reduced motion. Screenshots in `qa-output/`.
- `npm run scan` — avoid-ai-design scanner (must stay at 0 findings; deliberate choices use `avoid-ai-design-ignore: <ID>` on or above the line)
- `npm run capture:builds` — re-capture the three build screenshots into `public/builds/` (one-off, commit the results)

## Structure (one reason to change per folder)
- `src/content/` — **all copy and facts**. Pages render data; never hard-code claims in components.
  - Anything not verified carries `confirmed: false` → renders a visible Placeholder tag and is listed by `scripts/check-claims.mjs` on every build (`--strict` fails the build; use before launch).
  - `credentials.ts`: add new credentials here. Client work must keep the "as a client" wording; names only, never third-party logos.
- `src/motion/` — `MotionProvider` owns the single Lenis instance and the GSAP ticker. Everything else creates triggers inside `useGSAP` scopes. Media queries live in `MQ`.
- `src/components/` — shared chrome (Nav, Footer, Atmosphere, Seo, LeadForm, Faq, BoltMark…).
- `src/components/{marketplace,hero,immersive,ui}/` — Ask system (`store`, `AskBar`, `AskPalette`), `AisleHeadline`, 3D state/fallback/world tint/proximity wordmark, small UI primitives (`LoopBand`, `RollText`, `RotatingBadge`, `Glyphs`).
- `src/content/offerings.ts` — the marketplace data model (aisles, goals, offerings, `matchOfferings`); status/price/eta are `Claim`s.
- `src/scenes/home/` — one file per home scene; `market.css` (v10 scenes), `hero.css`, legacy `home.css` (Builds/Close leftovers; contains dead rules from deleted v9 scenes, prune when convenient). `src/pages/` — route shells.

## Contracts and gotchas
- **Tailwind v4 has no preflight here** (`src/styles/tailwind.css`; `base.css` is wrapped in `@layer base`). Unlayered component CSS beats utilities; do not re-add preflight. TypeScript 7 has no `baseUrl`: the `@` alias is `paths` with `./src/*`.
- **framer-motion vs GSAP**: GSAP/Lenis own pins and ScrollTrigger; framer owns component layout/presence and `useScroll`. Never animate one element with both. The 3D layer is `src/three/ImmersiveCanvas.tsx`, loaded only via the effect-gated dynamic import in `Scene3DBoundary.tsx` (never `React.lazy`).
- **Never test a hash-only navigation after a rebuild** — the tab keeps the old bundle and shows phantom hydration errors (#418/#425). Hard-load another URL first.
- **SSG paths have no leading slash** during pre-render (`contact`, not `/contact`). Anything that renders differently per path must normalise it (see `Nav.tsx`), or React hydration fails (#418) and the server HTML is thrown away.
- **Never touch `window`/`document` during render** — only in effects/`useGSAP`. Pages are pre-rendered in Node.
- **Hosting must serve `/x` from `/x/index.html`** (Netlify, Vercel, Cloudflare Pages do by default). Plain SPA fallback serves the home page for every URL, which breaks SEO and hydration. `vite.config.ts` mirrors the correct behaviour for local preview only.
- Query-string prefill on `/contact` (`?type=audit&website=&service=`) is read in an effect after hydration; `service` is only accepted if it matches a known service name.
- Lead handoff has **no backend**: validate → prefilled `wa.me` / `mailto` / copy. Nothing is stored. `track()` never receives personal data.
- Content is visible in the static HTML; motion only hides/animates on the client when the visitor accepts motion. Keep it that way (no-JS and reduced-motion readers get everything).
- Performance traps found by measurement: `filter: blur()` on the moving light layers and `mix-blend-mode` on the grain each cut scrolling to 20–30 fps. Keep atmosphere layers transform/opacity only, no blend modes.
- SplitText line masks get class `split-line-mask`; `base.css` extends the clip box so descenders aren't cut.
- Global list reset uses `:where()` (zero specificity) so component classes can set list padding.
- **Vite's bundled CSS order does not follow source import order** — component stylesheets (e.g. `nav.css`) can land *before* `base.css` in the final bundle regardless of import position. A single-class override of a shared primitive (`.btn`'s `display`, etc.) can silently lose the cascade tie depending on build output, not source order. Give the override a compound selector (e.g. `.nav__actions .nav__whatsapp`) so it wins on specificity instead of depending on bundler order. Confirmed by `node -e` byte-offset check against the built `dist/assets/app-*.css`, not assumption.

## Before launch
Replace placeholders in `src/content/site.ts` (email, WhatsApp, phone, domain), founder portraits in `founders.ts`, verify proof figures in `proof.ts` and legal entity details, swap the redrawn bolt for the official vector (and regenerate `public/og.png`), then run `node scripts/check-claims.mjs --strict`.
