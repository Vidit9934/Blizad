import { useRef } from 'react'
import { serviceGroups } from '../../content/services'
import { useMotion } from '../../motion/MotionProvider'
import { useScrollVelocity } from '../../motion/useScrollVelocity'
import { useSceneReveals } from '../../motion/useSceneReveals'

/** Real service lines, not invented copy — the same four groups Doors/the
 * services pages render. */
const WORDS = serviceGroups.map((group) => group.name)

/**
 * Scene — rhythm break (reinterpreting KMF's "Ticker": a full-bleed line that
 * never stops, speed tied to scroll). Grouped into beat 1 ("The Promise,
 * Proven") alongside Dream — no new beat index, no change to the 3D rig's 0-7
 * pose array. The one scene on the page that ignores the shell/gutter system
 * entirely, which is the point: every other scene is contained, this one runs
 * edge to edge.
 */
export function Ticker() {
  const scope = useRef<HTMLElement>(null)
  useSceneReveals(scope)
  const { enabled } = useMotion()

  // Same shared scroll-velocity signal Voices/Pipeline already consume — one
  // physics signal, another expression of it, no new listener.
  useScrollVelocity((velocity) => {
    scope.current?.style.setProperty('--ticker-speed', (1 + velocity * 1.6).toFixed(2))
  })

  const words = enabled ? [...WORDS, ...WORDS, ...WORDS, ...WORDS] : WORDS

  return (
    <section ref={scope} className="scene ticker" aria-label="What we run" data-beat="1">
      <div className={`ticker__track${enabled ? ' ticker__track--motion' : ''}`} aria-hidden="true">
        {words.map((word, index) => (
          <span key={index} className="ticker__word">
            {word}
            <span className="ticker__dot" aria-hidden="true" />
          </span>
        ))}
      </div>
      <p className="visually-hidden">What we run: {WORDS.join(', ')}.</p>
    </section>
  )
}
