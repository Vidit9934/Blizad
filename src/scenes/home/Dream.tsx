import { useRef } from 'react'
import { useSceneReveals } from '../../motion/useSceneReveals'

/** Scene 2 — Aspiration. One sentence, lit word by word as you scroll. */
export function Dream() {
  const scope = useRef<HTMLElement>(null)
  useSceneReveals(scope)
  return (
    <section ref={scope} className="scene dream" aria-labelledby="dream-title" data-beat="1">
      <div className="shell">
        <h2 id="dream-title" className="t-statement dream__text" data-reveal="scrub" data-reveal-pointer="weight">
          The brand people find first, trust fastest and buy from again.
        </h2>
      </div>
    </section>
  )
}
