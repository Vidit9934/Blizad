import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { Seo, breadcrumbLd } from '../components/Seo'
import { builds, techIcon } from '../content/builds'
import { serviceGroups } from '../content/services'
import { track } from '../lib/track'
import { PageCta, PageHero, PageSection } from './PageHero'

export function Component() {
  return (
    <>
      <Seo
        title="Work: platforms we've engineered"
        description="TuneFry, My Life Choices and SCDM Accelerator: music distribution, a personalised wellness marketplace and a hackathon platform, engineered by Blizad co-founder Vidit Vaibhav."
        path="/work"
        jsonLd={[breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Work', path: '/work' }])]}
      />
      <PageHero title="The work behind the momentum." line="Live products with real users, engineered end to end." />

      {builds.map((build, index) => (
        <PageSection key={build.id} labelledBy={`case-${build.id}`}>
          <article className="shell shell--wide case">
            {build.screenshot && (
              <a
                href={build.url}
                className="case__shot"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Visit"
                onClick={() => track('case_study_view', { service_name: build.id })}
              >
                <img src={build.screenshot} alt={`${build.name} home page`} width={1440} height={900} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
              </a>
            )}
            <div className="case__body">
              <p className="case__category">{build.category}</p>
              <h2 id={`case-${build.id}`} className="case__name">
                {build.name}
              </h2>
              <p className="t-lead">{build.line}</p>
              <ul role="list" className="case__built">
                {build.built.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <ul role="list" className="case__stack" data-product-screen>
                {build.stack.map((tech) => (
                  <li key={tech}>
                    <Icon name={techIcon(tech)} size={15} />
                    {tech}
                  </li>
                ))}
              </ul>
              <a href={build.url} className="text-link" target="_blank" rel="noopener noreferrer">
                Visit {build.name}
                <Icon name="external" size={18} />
              </a>
            </div>
          </article>
        </PageSection>
      ))}

      <PageSection className="scene--ice" labelledBy="capabilities-title">
        <div className="shell shell--wide ruled">
          <h2 id="capabilities-title" className="ruled__label">
            Marketing capabilities
          </h2>
          <div>
            <ul role="list" className="ruled__list">
              {serviceGroups.map((group) => (
                <li key={group.id}>
                  <Link to={`/services#${group.id}`}>
                    <strong>{group.name}.</strong>
                  </Link>{' '}
                  {group.line}
                </li>
              ))}
            </ul>
            <p className="t-note" style={{ marginTop: 'var(--s3)' }}>
              Verified marketing case studies with results and timeframes will be published here once clients approve them.
            </p>
          </div>
        </div>
      </PageSection>
      <PageCta title="Want yours on this page next?" />
    </>
  )
}
