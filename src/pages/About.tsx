import { Icon } from '../components/Icon'
import { Seo, breadcrumbLd } from '../components/Seo'
import { PlaceholderTag } from '../components/PlaceholderTag'
import { credentials } from '../content/credentials'
import { founders } from '../content/founders'
import { site } from '../content/site'
import { Founders } from '../scenes/home/Founders'
import '../scenes/home/home.css'
import { PageCta, PageHero, PageSection } from './PageHero'

const values = [
  { title: 'Strategy before spend', text: 'We agree the goal and the measure before a rupee goes into ads or a line of code is written.' },
  { title: 'Proof over hype', text: 'We report what happened, including what didn’t work, and never promise rankings or ROAS.' },
  { title: 'One team, one plan', text: 'Campaigns, search and the site they land on are planned together, so nothing is lost between vendors.' },
  { title: 'Built to last', text: 'Code, accounts and data are yours, documented and maintainable long after launch.' },
]

export function Component() {
  return (
    <>
      <Seo
        title="About Blizad: the founders and how we work"
        description="Blizad is led by Sourav Yadav (Krantiveer), Founder & CEO, and Vidit Vaibhav, Co-founder & CTO. Marketing strategy and production engineering under one roof in Raipur."
        path="/about"
        jsonLd={[breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])]}
      />
      <PageHero title="The thinking behind the momentum." line="A marketer and an engineer, building one growth system for ambitious businesses." />

      <PageSection labelledBy="story-title">
        <div className="shell shell--wide ruled">
          <h2 id="story-title" className="ruled__label">
            Why Blizad exists
          </h2>
          <div className="prose">
            <p>
              Most businesses hire one agency for ads, another for the website and a freelancer for SEO. Each does its part;
              nobody owns the result. Blizad brings strategy, creative, search and engineering together so the campaign, the
              page it lands on and the way it is found are planned as one.
            </p>
            <p>
              {founders[0].name} has spent seven years running paid acquisition and brand strategy for more than fifty brands.{' '}
              {founders[1].name} engineers production platforms and has worked on products for Google and Thomson Reuters as
              clients. Based in {site.city}, we work with businesses across India.
            </p>
            <p className="t-note">
              {site.legalName.value} is a {site.parentCompany.value} company.
              <PlaceholderTag confirmed={site.legalName.confirmed && site.parentCompany.confirmed} label="To verify" />
            </p>
          </div>
        </div>
      </PageSection>

      <Founders />

      <PageSection className="scene--ice" labelledBy="credentials-title">
        <div className="shell shell--wide ruled">
          <h2 id="credentials-title" className="ruled__label">
            Engineering credentials
          </h2>
          <ul role="list" className="ruled__list">
            {credentials.map((credential) => (
              <li key={credential.name} className="ruled__list-item--icon">
                <Icon name={credential.icon} size={20} />
                <span>
                  <strong>{credential.name}.</strong> {credential.detail}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </PageSection>

      <PageSection labelledBy="values-title">
        <div className="shell shell--wide">
          <h2 id="values-title" className="t-display" style={{ marginBottom: 'var(--s6)', maxWidth: '12ch' }}>
            How we work with you.
          </h2>
          <div className="values">
            {values.map((value) => (
              <div key={value.title} data-reveal="rise">
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </PageSection>
      <PageCta />
    </>
  )
}
