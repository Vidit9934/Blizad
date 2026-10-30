import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from '../../components/Icon'
import { useTilt } from '../../motion/pointer'
import { serviceGroups, servicesInGroup, type ServiceGroup, type ServiceGroupId } from '../../content/services'
import { useSceneReveals } from '../../motion/useSceneReveals'

const groupIcon: Record<ServiceGroupId, IconName> = {
  grow: 'grow',
  found: 'found',
  build: 'build',
  run: 'run',
}

type Tier = 'lg' | 'md' | 'sm'

/**
 * Tech dashboard register: tile size traces to a real content-weight number
 * (how many services actually live in that group today), not a fixed
 * per-position default — see DESIGN.md / the "Tech dashboard" style entry.
 */
function tierOf(count: number): Tier {
  if (count >= 5) return 'lg'
  if (count >= 2) return 'md'
  return 'sm'
}

/** Scene 4 — Choose. A bento grid of four service groups; icon placement and detail vary by real weight, never a uniform chip. */
export function Doors() {
  const scope = useRef<HTMLElement>(null)
  useSceneReveals(scope)
  return (
    <section ref={scope} className="scene doors" aria-labelledby="doors-title" data-product-screen data-beat="2">
      <div className="shell shell--wide">
        <h2 id="doors-title" className="doors__title t-kicker">
          Everything digital, connected. Pick where you want to start.
        </h2>
        <ul role="list" className="doors__list">
          {serviceGroups.map((group) => (
            <Door key={group.id} group={group} tier={tierOf(servicesInGroup(group.id).length)} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function Door({ group, tier }: { group: ServiceGroup; tier: Tier }) {
  const tile = useRef<HTMLLIElement>(null)
  useTilt(tile, { maxDeg: 3 })
  const icon = groupIcon[group.id]
  const services = servicesInGroup(group.id).slice(0, tier === 'lg' ? 5 : 3)

  return (
    <li ref={tile} className={`door door--${tier}`}>
      {tier === 'lg' && <Icon name={icon} className="door__watermark" />}
      <h3 className="door__word">
        {tier !== 'lg' && <Icon name={icon} size={tier === 'md' ? 26 : 20} className="door__icon" />}
        <Link to={`/services#${group.id}`} data-cursor="Open">
          {group.door}
        </Link>
      </h3>
      {tier === 'sm' ? (
        <p className="door__line">
          {group.line} <Link to={`/services#${group.id}`}>See services</Link>
        </p>
      ) : (
        <div className="door__reveal">
          <p>{group.line}</p>
          <ul role="list">
            {services.map((service) => (
              <li key={service.slug}>
                <Link to={`/services/${service.slug}`}>{service.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  )
}
