import { useEffect, useState } from 'react'
import { Icon } from '../components/Icon'
import { LeadForm, type LeadType } from '../components/LeadForm'
import { PlaceholderTag } from '../components/PlaceholderTag'
import { Seo, breadcrumbLd } from '../components/Seo'
import { site } from '../content/site'
import { services } from '../content/services'
import { founders } from '../content/founders'
import { whatsappUrl } from '../lib/lead'
import { track } from '../lib/track'
import { PageHero, PageSection } from './PageHero'

interface Prefill {
  leadType: LeadType
  service: string
  website: string
}

const knownServices = new Set(['Digital growth audit', ...services.map((service) => service.name)])
const quoteFounder = founders.find((founder) => founder.id === 'sourav')!

/**
 * Query params (?type=audit&website=…&service=…) are read after hydration so the
 * pre-rendered HTML and the first client render match; the form then remounts prefilled.
 * Only known service names are accepted.
 */
function readPrefill(): Prefill {
  const params = new URLSearchParams(window.location.search)
  const service = params.get('service') ?? ''
  return {
    leadType: params.get('type') === 'audit' ? 'audit' : 'project',
    service: knownServices.has(service) ? service : '',
    website: (params.get('website') ?? '').slice(0, 200),
  }
}

export function Component() {
  const [prefill, setPrefill] = useState<Prefill | null>(null)
  useEffect(() => setPrefill(readPrefill()), [])
  const isAudit = prefill?.leadType === 'audit'

  return (
    <>
      <Seo
        title="Contact Blizad: start a project or request a growth audit"
        description="Tell Blizad where you want to grow. Start a project or request a digital growth audit; we reply within one working day. Raipur, India."
        path="/contact"
        jsonLd={[breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])]}
      />
      <PageHero
        title={isAudit ? 'Find what’s holding your growth back.' : 'Let’s build what’s next.'}
        line={
          isAudit
            ? 'A focused first look at your website, search visibility and paid acquisition.'
            : 'Tell us where you want to go. We’ll work out the next step together.'
        }
      />
      <PageSection labelledBy="contact-form-title">
        <div className="shell shell--wide form-panel">
          <aside className="contact-side">
            <figure className="contact-quote">
              <span className="contact-quote__avatar" aria-hidden="true">
                {quoteFounder.initials}
                <PlaceholderTag confirmed={Boolean(quoteFounder.portrait)} label="Portrait coming" />
              </span>
              <blockquote className="contact-quote__text">“{quoteFounder.quote}”</blockquote>
              <figcaption className="t-small">
                {quoteFounder.name}, {quoteFounder.role}
              </figcaption>
            </figure>
            <h2 id="contact-form-title" className="t-title">
              {isAudit ? 'Request your growth audit' : 'Start a project'}
            </h2>
            {isAudit && (
              <p className="t-small">
                The audit is a short written snapshot with three prioritised next steps. It is free for eligible businesses;
                we’ll confirm before starting.
              </p>
            )}
            <dl>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${site.email.value}`} className="text-link">
                    {site.email.value}
                  </a>
                  <PlaceholderTag confirmed={site.email.confirmed} />
                </dd>
              </div>
              <div>
                <dt>Phone and WhatsApp</dt>
                <dd>
                  {site.phoneDisplay.value}
                  <PlaceholderTag confirmed={site.phoneDisplay.confirmed} />
                </dd>
              </div>
              <div>
                <dt>Based in</dt>
                <dd>
                  {site.city}, {site.region}. Working with businesses across India.
                </dd>
              </div>
            </dl>
            <a
              href={whatsappUrl(`Hi ${site.name}, I'd like to talk about a project.`)}
              className="btn btn--large"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('whatsapp_click', { cta_position: 'contact' })}
            >
              <Icon name="whatsapp" size={18} />
              Message us on WhatsApp
            </a>
          </aside>
          <LeadForm
            key={prefill ? `${prefill.leadType}-${prefill.service}-${prefill.website}` : 'initial'}
            leadType={prefill?.leadType}
            defaultService={prefill?.service}
            defaultWebsite={prefill?.website}
          />
        </div>
      </PageSection>
    </>
  )
}
