import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { PageHero } from './PageHero'

export function Component() {
  return (
    <>
      <Seo title="Page not found" description="This page doesn’t exist. Head back to Blizad’s home page or services." path="/404" noindex />
      <PageHero title="Lost momentum." line="This page doesn’t exist, or it moved.">
        <div className="btn-row" style={{ marginTop: 'var(--s5)' }}>
          <Link to="/" className="btn btn--primary btn--large">
            Back to home
          </Link>
          <Link to="/services" className="btn btn--large">
            See services
          </Link>
        </div>
      </PageHero>
    </>
  )
}
