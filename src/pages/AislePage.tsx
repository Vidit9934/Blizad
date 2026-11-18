import { Link } from 'react-router-dom'
import { Seo, breadcrumbLd } from '../components/Seo'
import { AISLES, OFFERINGS, type Aisle } from '../content/offerings'
import { PageCta, PageHero, PageSection } from './PageHero'
import './aisle.css'

/** Where each offering's long-form write-up already lives (kept so existing /services URLs stay useful). */
const DEEP_DIVE: Record<string, string> = {
  'meta-ads': '/services/meta-ads-lead-generation',
  'google-ads': '/services/google-ads',
  'linkedin-ads': '/services/linkedin-ads',
  social: '/services/social-media-marketing',
  'seo-geo-aeo': '/services/seo-geo-aeo',
  websites: '/services/web-development',
  'web-apps': '/services/web-development',
  'website-care': '/services/website-management',
  hosting: '/services/hosting',
}

const COPY: Record<Aisle, { title: string; line: string; description: string }> = {
  marketing: {
    title: 'Marketing that brings buyers.',
    line: 'Ads, social and search, run by one team that also builds your site.',
    description: 'Meta, Google and LinkedIn ads, social media, SEO, GEO and AEO from Blizad, a Raipur growth marketplace.',
  },
  tech: {
    title: 'Tech built to production standard.',
    line: 'Websites, web apps, marketplaces and hosting from the engineers behind TuneFry.',
    description: 'Website development, web apps and marketplaces, website care and hosting from Blizad in Raipur.',
  },
  tools: {
    title: 'Tools you can use today.',
    line: 'Self-serve products from the same team, for when you would rather do it yourself.',
    description: 'The Blizad Website Builder, Growth Audit and Blizad Hub CRM: self-serve tools for growing online.',
  },
}

export function AislePage({ aisle }: { aisle: Aisle }) {
  const copy = COPY[aisle]
  const path = `/${aisle}`
  const items = OFFERINGS.filter((o) => o.aisle === aisle)
  return (
    <>
      <Seo
        title={`${AISLES[aisle].label}: ${copy.title}`}
        description={copy.description}
        path={path}
        jsonLd={[breadcrumbLd([{ name: 'Home', path: '/' }, { name: AISLES[aisle].label, path }])]}
      />
      <PageHero title={copy.title} line={copy.line} />
      <PageSection className="aisle-list">
        <div className="shell shell--wide">
          <ul role="list" className="aisle-rows">
            {items.map((o) => (
              <li key={o.id} id={o.id} className="aisle-row">
                <div>
                  <h2 className="aisle-row__name">{o.name}</h2>
                  <p className="aisle-row__outcome">{o.outcome}</p>
                </div>
                <ul role="list" className="aisle-row__incl">
                  {o.includes.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <div className="aisle-row__go">
                  {DEEP_DIVE[o.id] && (
                    <Link to={DEEP_DIVE[o.id]} className="text-link">
                      Read the detail
                    </Link>
                  )}
                  <Link to={`/contact?service=${encodeURIComponent(o.name)}`} className="text-link">
                    Start with this
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </PageSection>
      <PageCta />
    </>
  )
}
