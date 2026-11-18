import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Icon, type IconName } from '../../components/Icon'
import { PlaceholderTag } from '../../components/PlaceholderTag'
import { founders, type Founder } from '../../content/founders'
import { MQ } from '../../motion/MotionProvider'
import { useTilt } from '../../motion/pointer'
import { useSceneReveals } from '../../motion/useSceneReveals'

const roleIcon: Record<Founder['id'], IconName> = { sourav: 'grow', vidit: 'build' }

/**
 * Scene 11 — Trust. Two tall portraits; the bio opens on hover or focus (always
 * open on touch). v9: the one genuinely new entrance primitive this redesign
 * adds — a one-shot curtain split revealing each portrait on first scroll in.
 */
export function Founders() {
  const scope = useRef<HTMLElement>(null)
  useSceneReveals(scope)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.full, () => {
        // CSS default is scaleX(0) (uncovered) so no-JS/no-motion readers always
        // see the real portrait; only here, with motion confirmed on, do we cover
        // it first so there's something to draw back open.
        gsap.set(['.founder__curtain--a', '.founder__curtain--b'], { scaleX: 1 })
        const tl = gsap.timeline({ scrollTrigger: { trigger: '.founders__grid', start: 'top 75%', once: true } })
        tl.to('.founder__curtain--a', { scaleX: 0, duration: 0.9, ease: 'power3.inOut', stagger: 0.18 }, 0)
        tl.to('.founder__curtain--b', { scaleX: 0, duration: 0.9, ease: 'power3.inOut', stagger: 0.18 }, 0)
      })
    },
    { scope },
  )

  return (
    <section ref={scope} className="scene founders" aria-labelledby="founders-title" data-beat="7">
      <div className="shell shell--wide">
        <h2 id="founders-title" className="t-display founders__title">
          Two founders. One growth system.
        </h2>
        <div className="founders__grid">
          {founders.map((founder) => (
            <FounderCard key={founder.id} founder={founder} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FounderCard({ founder }: { founder: Founder }) {
  const portrait = useRef<HTMLDivElement>(null)
  useTilt(portrait, { maxDeg: 4 })
  return (
    <article className={`founder founder--${founder.id}`} tabIndex={0} data-cursor="Read">
      <div ref={portrait} className="founder__portrait">
        {founder.portrait ? (
          <img src={founder.portrait} alt={`Portrait of ${founder.name}`} loading="lazy" />
        ) : (
          <span className="founder__monogram" aria-hidden="true">
            {founder.initials}
          </span>
        )}
        <span className="founder__curtain founder__curtain--a" aria-hidden="true" />
        <span className="founder__curtain founder__curtain--b" aria-hidden="true" />
        <PlaceholderTag confirmed={Boolean(founder.portrait)} label="Portrait coming" />
      </div>
      <div className="founder__text founder__panel panel">
        <h3 className="founder__name">
          {founder.name}
          {founder.alsoKnownAs && <span className="founder__aka"> ({founder.alsoKnownAs})</span>}
        </h3>
        <p className="founder__role">
          <Icon name={roleIcon[founder.id]} size={16} />
          {founder.role}
        </p>
        <p className="t-small founder__focus">{founder.focus}</p>
        <p className="founder__bio">{founder.bio}</p>
      </div>
    </article>
  )
}
