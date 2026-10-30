import type { MouseEvent as ReactMouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { Seo, breadcrumbLd } from '../components/Seo'
import { serviceGroups, servicesInGroup } from '../content/services'
import { PageCta, PageHero, PageSection } from './PageHero'

/** Positions the hover-preview card at the pointer via CSS custom properties — a style-only
 * event handler, never a render-time DOM read, so it stays safe under Node prerendering. */
function trackPointer(event: ReactMouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--px', `${event.clientX - rect.left}px`)
  event.currentTarget.style.setProperty('--py', `${event.clientY - rect.top}px`)
}

export function Component() {
  let ordinal = 0
  return (
    <>
      <Seo
        title="Services: marketing, SEO, GEO, AEO, development and hosting"
        description="Every Blizad service in one place: performance marketing, Meta, Google and LinkedIn ads, social, influencer, SEO, GEO and AEO, full-stack development and managed hosting."
        path="/services"
        jsonLd={[breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }])]}
      />
      <PageHero title="Expertise that works together." line="Marketing, search, software and hosting, planned as one system by one team." />
      {serviceGroups.map((group) => (
        <PageSection key={group.id} id={group.id} className="group-block" labelledBy={`group-${group.id}`}>
          <div className="shell shell--wide">
            <div className="group-block__head">
              <h2 id={`group-${group.id}`} className="group-block__word">
                {group.door}
              </h2>
              <p className="t-lead">
                <strong>{group.name}.</strong> {group.line}
              </p>
            </div>
            <ul role="list" className="service-rows">
              {servicesInGroup(group.id).map((service) => {
                ordinal += 1
                return (
                  <li key={service.slug} className="service-row" onMouseMove={trackPointer}>
                    <Link to={`/services/${service.slug}`} data-cursor="Open">
                      <span className="service-row__num">{String(ordinal).padStart(2, '0')}</span>
                      <span className="service-row__name">{service.name}</span>
                      <span className="service-row__line">{service.line}</span>
                      <Icon name="go" size={22} />
                    </Link>
                    <div className="service-row__preview" aria-hidden="true">
                      <Icon name={group.id} size={26} />
                      <span>{service.line}</span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </PageSection>
      ))}
      <PageCta title="Not sure where to start? Tell us the goal." />
    </>
  )
}
