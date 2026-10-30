import { Link } from 'react-router-dom'
import { site } from '../content/site'
import { serviceGroups } from '../content/services'
import { PlaceholderTag } from './PlaceholderTag'
import './footer.css'

/** Built from what the site actually has: a giant wordmark, two link columns, real details. */
export function Footer() {
  return (
    <footer className="footer">
      <div className="shell shell--wide">
        <div className="footer__top">
          <div className="footer__contact">
            <p className="footer__line">One team for the ads, the search and the code.</p>
            <p>
              <a href={`mailto:${site.email.value}`} className="text-link">
                {site.email.value}
              </a>
              <PlaceholderTag confirmed={site.email.confirmed} />
            </p>
            <p>
              <a href={`tel:+${site.whatsapp.value}`} className="text-link">
                {site.phoneDisplay.value}
              </a>
              <PlaceholderTag confirmed={site.phoneDisplay.confirmed} />
            </p>
            <p className="t-small">
              {site.city}, {site.region}, {site.country}
            </p>
          </div>
          <nav className="footer__cols" aria-label="Footer">
            <ul role="list">
              {serviceGroups.map((group) => (
                <li key={group.id}>
                  <Link to={`/services#${group.id}`}>{group.name}</Link>
                </li>
              ))}
            </ul>
            <ul role="list">
              <li>
                <Link to="/work">Work</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy</Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="footer__wordmark" aria-hidden="true">
          {site.name}
        </p>

        <div className="footer__legal">
          <p>
            © {new Date().getFullYear()} {site.legalName.value}, a {site.parentCompany.value} company.
            <PlaceholderTag confirmed={site.legalName.confirmed && site.parentCompany.confirmed} label="To verify" />
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
