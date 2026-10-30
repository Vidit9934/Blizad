import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Icon } from '../../components/Icon'
import { MQ } from '../../motion/MotionProvider'
import { useSpotlight, useTilt } from '../../motion/pointer'

/**
 * Illustrative only — Hub has no ship date and no real screens yet (see the
 * "In development" kicker). These three states show the shape of the product,
 * not a captured UI.
 */
const cycle = [
  { label: 'Lead comes in', note: 'Audit form submitted' },
  { label: 'Auto-reply sent', note: 'Reply in under a minute' },
  { label: 'Deal moved to Won', note: 'One board, no spreadsheet' },
]

/**
 * Scene 12 — a forward-looking product tease, not a trust moment. Manrope/cinematic
 * register, kept honest: no ship date. The preview card is this plan's one new
 * glass surface (#2 of 3, see DESIGN.md) — its tilt is a discrete settle, never a
 * loop, so the inner state-cycle (a separate, non-glass layer, gated to fine
 * pointer + motion-ok) can't reintroduce the backdrop-filter/loop regression.
 */
export function Hub() {
  const card = useRef<HTMLDivElement>(null)
  useTilt(card, { maxDeg: 4 })
  useSpotlight(card)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      // Fine pointer + motion-ok only: touch and reduced-motion keep the static first state.
      mm.add(MQ.pointer, () => {
        const steps = gsap.utils.toArray<HTMLElement>('.hub__state')
        if (steps.length < 2) return
        gsap.set(steps, { autoAlpha: 0 })
        gsap.set(steps[0], { autoAlpha: 1 })
        const tl = gsap.timeline({ repeat: -1 })
        steps.forEach((step, index) => {
          const next = steps[(index + 1) % steps.length]
          tl.to(step, { autoAlpha: 0, duration: 0.5, ease: 'power2.out', delay: 2.2 }).to(next, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' }, '<')
        })
        const onVisibility = () => (document.hidden ? tl.pause() : tl.play())
        document.addEventListener('visibilitychange', onVisibility)
        return () => {
          document.removeEventListener('visibilitychange', onVisibility)
          tl.kill()
        }
      })
    },
    { scope: card },
  )

  return (
    <section className="scene hub" aria-labelledby="hub-title" data-beat="6">
      <div className="shell shell--wide hub__inner">
        <span className="hub__kicker">
          <Icon name="build" size={16} className="icon-bounce" />
          In development
        </span>
        <h2 id="hub-title" className="t-title hub__title">
          Blizad Hub: a CRM built for how we already work with you.
        </h2>
        <div ref={card} className="hub__card">
          <span className="hub__spotlight" aria-hidden="true" />
          <div className="hub__device">
            {cycle.map((step) => (
              <div key={step.label} className="hub__state">
                <p className="hub__state-label">{step.label}</p>
                <p className="hub__state-note">{step.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
