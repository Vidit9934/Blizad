import { useParams } from 'react-router-dom'
import { Faq } from '../components/Faq'
import { LeadForm } from '../components/LeadForm'
import { Seo, absoluteUrl, breadcrumbLd, faqLd, organizationLd } from '../components/Seo'
import { serviceBySlug, serviceGroups } from '../content/services'
import { PageHero, PageSection } from './PageHero'
import { Component as NotFound } from './NotFound'

/** One template for every service: problem, inclusions, process, answers, form. */
export function Component() {
  const { slug = '' } = useParams()
  const service = serviceBySlug(slug)
  if (!service) return <NotFound />

  const group = serviceGroups.find((g) => g.id === service.group)
  const path = `/services/${service.slug}`
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.name, path },
  ]

  return (
    <>
      <Seo
        title={service.title}
        description={service.metaDescription}
        path={path}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.title,
            serviceType: service.name,
            description: service.metaDescription,
            url: absoluteUrl(path),
            areaServed: 'IN',
            provider: { '@id': organizationLd['@id'] },
          },
          breadcrumbLd(trail),
          faqLd(service.faqs),
        ]}
      />
      <PageHero title={service.title} line={service.line} crumbs={trail} />

      <PageSection labelledBy="solves-title">
        <div className="shell shell--wide">
          <h2 id="solves-title" className="t-title" style={{ marginBottom: 'var(--s5)' }}>
            What does {service.name} fix?
          </h2>
          <ul role="list" className="solves">
            {service.solves.map((problem) => (
              <li key={problem}>
                {problem}
              </li>
            ))}
          </ul>
        </div>
      </PageSection>

      <PageSection className="scene--ice" labelledBy="included-title">
        <div className="shell shell--wide ruled">
          <h2 id="included-title" className="ruled__label">
            What’s included?
          </h2>
          <ul role="list" className="fact-grid">
            {service.included.map((item) => (
              <li key={item} className="fact-grid__cell">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </PageSection>

      <PageSection labelledBy="how-title">
        <div className="shell shell--wide ruled">
          <h2 id="how-title" className="ruled__label">
            How do we work?
          </h2>
          <ol role="list" className="ruled__list ruled__list--steps">
            {service.howWeWork.map((step, index) => (
              <li key={step.step}>
                <span className="ruled__num">{index + 1}</span>
                <div>
                  <p className="ruled__step-name">{step.step}</p>
                  <p className="ruled__step-detail">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </PageSection>

      <PageSection labelledBy="faq-title">
        <div className="shell shell--wide ruled">
          <h2 id="faq-title" className="ruled__label">
            Questions about {service.name}
          </h2>
          <Faq items={service.faqs} />
        </div>
      </PageSection>

      <PageSection labelledBy="start-title">
        <div className="shell shell--wide form-panel">
          <div className="form-panel__intro">
            <h2 id="start-title" className="t-display">
              Discuss this service.
            </h2>
            <p className="t-small">
              Part of our {group?.name} work. Tell us where you are; we reply within one working day.
            </p>
          </div>
          <LeadForm defaultService={service.name} />
        </div>
      </PageSection>
    </>
  )
}
