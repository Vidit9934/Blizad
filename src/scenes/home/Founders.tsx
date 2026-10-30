import { useRef } from 'react'
import { Icon, type IconName } from '../../components/Icon'
import { PlaceholderTag } from '../../components/PlaceholderTag'
import { founders, type Founder } from '../../content/founders'
import { useTilt } from '../../motion/pointer'
import { useSceneReveals } from '../../motion/useSceneReveals'

const roleIcon: Record<Founder['id'], IconName> = { sourav: 'grow', vidit: 'build' }

/** Scene 11 — Trust. Two tall portraits; the bio opens on hover or focus (always open on touch). */
export function Founders() {
  const scope = useRef<HTMLElement>(null)
  useSceneReveals(scope)
  return (
    <section ref={scope} className="scene founders" aria-labelledby="founders-title" data-beat="4">
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
        <PlaceholderTag confirmed={Boolean(founder.portrait)} label="Portrait coming" />
      </div>
      <div className="founder__text">
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
