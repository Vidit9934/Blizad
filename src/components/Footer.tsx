import { Link } from 'react-router-dom'
import { site, primaryCta } from '../content/site'
import { AISLES, AISLE_ORDER, OFFERINGS } from '../content/offerings'
import { ProximityWordmark } from './immersive/ProximityWordmark'
import { PlaceholderTag } from './PlaceholderTag'
import './footer.css'
import '../scenes/home/market.css'

const company = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy', label: 'Privacy' },
]

export function Footer() {
  return (
    <footer className="footer2" data-3d="footer">
      <div className="footer2__inner">
        <div className="footer2__lead">
          <p className="footer2__tag">{site.tagline}</p>
          <Link to={primaryCta.to} className="footer2__cta" data-cursor="Begin">
            {primaryCta.label}
          </Link>
        </div>

        <nav className="footer2__cols" aria-label="Footer">
          {AISLE_ORDER.map((a) => (
            <div key={a}>
              <p className="footer2__head">{AISLES[a].label}</p>
              <ul role="list">
                {OFFERINGS.filter((o) => o.aisle === a).map((o) => (
                  <li key={o.id}>
                    <Link to={o.href}>{o.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="footer2__head">Company</p>
            <ul role="list">
              {company.map((c) => (
                <li key={c.to}>
                  <Link to={c.to}>{c.label}</Link>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email.value}`}>{site.email.value}</a>
                <PlaceholderTag confirmed={site.email.confirmed} />
              </li>
            </ul>
          </div>
        </nav>

        <ProximityWordmark text="BLIZAD" />

        <div className="footer2__legal">
          <p>
            © {new Date().getFullYear()} {site.legalName.value} · {site.city}, {site.country}
            <PlaceholderTag confirmed={site.legalName.confirmed} label="To verify" />
          </p>
        </div>
      </div>
    </footer>
  )
}
