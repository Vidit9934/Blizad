import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from '../../components/Icon'
import { CurrentPath } from '../../components/CurrentPath'
import { useTilt } from '../../motion/pointer'
import { serviceGroups, servicesInGroup, type ServiceGroup, type ServiceGroupId } from '../../content/services'
import { useSceneReveals } from '../../motion/useSceneReveals'

const groupIcon: Record<ServiceGroupId, IconName> = {
  grow: 'grow',
  found: 'found',
  build: 'build',
  run: 'run',
}

/**
 * Scene 4 — Choose. v9: the four service groups sit as lit stops on one
 * branching current (the 2D sibling of the 3D signature object), not four
 * stacked dark cards — "Built for momentum" made literal, and the first
 * genuinely different container on the page after Hero.
 */
export function Doors() {
  const scope = useRef<HTMLElement>(null)
  useSceneReveals(scope)
  return (
    <section ref={scope} className="scene doors" aria-labelledby="doors-title" data-product-screen data-beat="2">
      <div className="shell shell--wide">
        <h2 id="doors-title" className="doors__title t-kicker">
          Everything digital, connected. Pick where you want to start.
        </h2>
        <div className="doors__diagram">
          <CurrentPath nodes={serviceGroups.map((g) => ({ id: g.id }))} mode="branch" className="doors__path" />
          <ul role="list" className="doors__stops">
            {serviceGroups.map((group) => (
              <DoorStop key={group.id} group={group} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function DoorStop({ group }: { group: ServiceGroup }) {
  const stop = useRef<HTMLLIElement>(null)
  useTilt(stop, { maxDeg: 3 })
  const icon = groupIcon[group.id]
  const services = servicesInGroup(group.id).slice(0, 3)

  return (
    <li ref={stop} className="door-stop">
      <Icon name={icon} size={22} className="door-stop__icon" />
      <h3 className="door-stop__word">
        <Link to={`/services#${group.id}`} data-cursor="Open">
          {group.door}
        </Link>
      </h3>
      <p className="door-stop__line">{group.line}</p>
      <div className="door-stop__reveal">
        <ul role="list">
          {services.map((service) => (
            <li key={service.slug}>
              <Link to={`/services/${service.slug}`}>{service.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}
