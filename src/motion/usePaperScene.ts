import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { MQ, useMotion } from './MotionProvider'

/**
 * Opens an "ice" (light) scene like a sleeve instead of the hard CSS cut
 * `.scene--ice` used to be: the section's own box clips inward on arrival (a
 * rounded inset card, with the dark room visible at the margin through the
 * persistent Atmosphere layer behind it) and un-clips to full bleed as it
 * scrolls into place. `clip-path` only — no `filter`, no blend mode (the
 * exact combination `CLAUDE.md` already measured cutting scroll fps once).
 *
 * `.scene--ice`'s own `--ps-inset`/`--ps-radius` default to `0px`, so with
 * motion disabled (or this hook simply not mounted) a scene renders at its
 * settled, full-bleed state with zero extra cost — no separate reduced-motion
 * branch needed here, same as every other `prefers-reduced-motion` fallback
 * in this codebase being "the resting state, not a special case."
 */
export function usePaperScene(scope: React.RefObject<HTMLElement | null>) {
  const { enabled } = useMotion()

  useGSAP(
    () => {
      if (!enabled) return
      const mm = gsap.matchMedia()
      mm.add(MQ.full, () => {
        const el = scope.current
        if (!el) return
        // `clip-path` repaints the clipped element's whole subtree on every
        // change — unlike transform/opacity, it is not compositor-only. For a
        // full-viewport-width scene with real content (icons, SVG progress
        // rings) that cost is per-frame, not one-shot, with four instances of
        // this hook live on the page. Quantizing to 16 steps (instead of
        // writing on every scroll micro-delta) cuts the repaint count by
        // roughly an order of magnitude across the transition while staying
        // visually smooth — measured against qa-scroll.mjs's frame-time gate,
        // which a continuous-write version pushed to a consistent ~66ms
        // median at 1440px (two separate runs, not noise).
        let lastStep = -1
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: 'top 92%',
          end: 'top 42%',
          scrub: 0.6,
          onUpdate: (self) => {
            const step = Math.round(self.progress * 16)
            if (step === lastStep) return
            lastStep = step
            const t = step / 16
            el.style.setProperty('--ps-inset', `${(1 - t) * 48}px`)
            el.style.setProperty('--ps-radius', `${(1 - t) * 28}px`)
          },
        })
        return () => trigger.kill()
      })
    },
    { scope, dependencies: [enabled] },
  )
}
