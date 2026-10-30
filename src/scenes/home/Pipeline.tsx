import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Icon, type IconName } from '../../components/Icon'
import { MQ } from '../../motion/MotionProvider'
import { useScrollVelocity } from '../../motion/useScrollVelocity'
import { useSceneReveals } from '../../motion/useSceneReveals'
import { setFracture } from '../../three/beatRig'

/**
 * Scene 9 — Mechanism. How Vidit actually ships with AI: the same gates that
 * built this site (a scored plan, measured QA). Styled as a CI/CD pipeline —
 * the dev-tool aesthetic fits an agency that also ships software. Each gate
 * lights as you scroll (unchanged scroll-tied logic); the connector now flows,
 * its speed tied to scroll velocity (one physics signal, one expression of it).
 *
 * `group` is illustrative only, for the "3 agencies" compare toggle below —
 * it groups the same 5 gates into 3 disconnected clusters to show handoffs,
 * not a reference to any named competitor (no quantified claims either).
 */
const gates: { name: string; state: string; icon: IconName; group: 1 | 2 | 3 }[] = [
  { name: 'Plan', state: 'plan.md written', icon: 'plan', group: 1 },
  { name: 'Score', state: 'architecture 87/100, gate 85', icon: 'score', group: 1 },
  { name: 'Build', state: 'Claude drafts, people decide', icon: 'build', group: 2 },
  { name: 'Measure', state: '0 errors, 0 overflow', icon: 'shield-check', group: 3 },
  { name: 'Ship', state: 'live, rollback ready', icon: 'ship', group: 3 },
]

export function Pipeline() {
  const scope = useRef<HTMLElement>(null)
  const flow = useRef<HTMLSpanElement>(null)
  const [view, setView] = useState<'blizad' | 'agencies'>('blizad')
  useSceneReveals(scope)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.full, () => {
        gsap.utils.toArray<HTMLElement>('.gate').forEach((gate) => {
          gsap.fromTo(
            gate,
            { '--lit': 0 },
            { '--lit': 1, ease: 'none', scrollTrigger: { trigger: gate, start: 'top 80%', end: 'top 55%', scrub: 0.6 } },
          )
        })
      })
    },
    { scope },
  )

  useScrollVelocity((velocity) => {
    flow.current?.style.setProperty('--flow-duration', `${(2.6 - velocity * 1.6).toFixed(2)}s`)
  })

  return (
    <section ref={scope} className="scene pipeline" aria-labelledby="pipeline-title" data-product-screen data-beat="5">
      <div className="shell shell--wide pipeline__grid">
        <div className="pipeline__head">
          <h2 id="pipeline-title" className="t-display" data-reveal="lines">
            AI speed. Production discipline.
          </h2>
          <p className="t-small">
            Vidit is a certified Claude practitioner. AI makes us fast; gates keep us careful.
          </p>
        </div>
        <div className="pipeline__body">
          <div className="pipeline__toggle" role="radiogroup" aria-label="Compare working models">
            <button
              type="button"
              className="pipeline__toggle-half pipeline__toggle-half--agencies"
              role="radio"
              aria-checked={view === 'agencies'}
              onClick={() => {
                setView('agencies')
                setFracture(1) // fractures the 3D bolt's own spine into 3 segments, not just the flat diagram
              }}
            >
              3 agencies
            </button>
            <button
              type="button"
              className="pipeline__toggle-half pipeline__toggle-half--blizad"
              role="radio"
              aria-checked={view === 'blizad'}
              onClick={() => {
                setView('blizad')
                setFracture(0)
              }}
            >
              One Blizad pipeline
            </button>
          </div>
          <ol role="list" className="pipeline__gates" data-view={view}>
            <div className="pipeline__connector" aria-hidden="true">
              <svg viewBox="0 0 2 100" preserveAspectRatio="none">
                <line x1="1" y1="0" x2="1" y2="100" />
              </svg>
              <span ref={flow} className="pipeline__connector-flow" />
            </div>
            {gates.map((gate) => (
              <li key={gate.name} className={`gate gate--group${gate.group}`}>
                <span className="gate__agency">Agency {gate.group}</span>
                <span className="gate__dot" aria-hidden="true" />
                <Icon name={gate.icon} className="gate__icon" size={22} />
                <h3 className="gate__name">{gate.name}</h3>
                <code className="gate__state">{gate.state}</code>
              </li>
            ))}
          </ol>
          <p className="t-note">Illustrative diagram — not a comparison with any named agency.</p>
        </div>
      </div>
    </section>
  )
}
