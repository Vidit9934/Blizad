import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { CurrentPath } from '../../components/CurrentPath'
import { MQ } from '../../motion/MotionProvider'
import { useScrollVelocity } from '../../motion/useScrollVelocity'
import { usePaperScene } from '../../motion/usePaperScene'
import { useSceneReveals } from '../../motion/useSceneReveals'

const steps = [
  { name: 'Discover', line: 'Your customer, offer, competitors and numbers.' },
  { name: 'Strategise', line: 'One plan across channels, with targets.' },
  { name: 'Build', line: 'Site, tracking and creative, done properly.' },
  { name: 'Launch', line: 'Campaigns live, measured from day one.' },
  { name: 'Optimise', line: 'Weekly changes made from data.' },
]

/**
 * Scene 8 — Path. v9: the same CurrentPath device Doors uses, laid out
 * linear instead of branching — one idea, two scales. The current's flow
 * speed (a CSS custom property driving the dash animation) follows scroll
 * velocity, the same shared signal Voices/Pipeline already read.
 */
export function Path() {
  const scope = useRef<HTMLElement>(null)
  useSceneReveals(scope)
  usePaperScene(scope)

  useScrollVelocity((velocity) => {
    scope.current?.style.setProperty('--path-speed', (1 + velocity * 1.4).toFixed(2))
  })

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.full, () => {
        gsap.utils.toArray<HTMLElement>('.path__step').forEach((step, index) => {
          gsap.from(step, {
            opacity: 0.25,
            ease: 'none',
            scrollTrigger: { trigger: '.path__steps', start: `top+=${index * 40} 78%`, end: `top+=${index * 40 + 120} 60%`, scrub: 0.6 },
          })
        })
      })
    },
    { scope },
  )

  return (
    <section ref={scope} className="scene scene--ice path" aria-labelledby="path-title" data-beat="5">
      <div className="shell shell--wide">
        <h2 id="path-title" className="t-display path__title" data-reveal="lines">
          Growth isn’t accidental. It’s engineered.
        </h2>
        <div className="path__steps">
          <CurrentPath nodes={steps.map((s) => ({ id: s.name }))} mode="linear" className="path__current" />
          <span className="path__flow" aria-hidden="true" />
          <ol role="list">
            {steps.map((step, index) => (
              <li key={step.name} className="path__step" tabIndex={0}>
                <span className="path__num icon-bounce">{index + 1}</span>
                <h3 className="path__name">{step.name}</h3>
                {/* Visible at rest too (content is never hover-only) — hover/focus just adds the reveal motion. */}
                <p className="t-small path__detail">{step.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
