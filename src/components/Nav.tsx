import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { credentials } from '../content/credentials'
import { proofFigures } from '../content/proof'
import { primaryCta, site } from '../content/site'
import { serviceGroups, servicesInGroup } from '../content/services'
import { whatsappUrl } from '../lib/lead'
import { track } from '../lib/track'
import { BoltIcon } from './BoltMark'
import { Icon } from './Icon'
import { PlaceholderTag } from './PlaceholderTag'
import './nav.css'

/** Unfoldmart-inspired: the mega-menu carries a small "why us" stat strip beside the links — real, already-honoured figures, not new copy. */
const brandsFigure = proofFigures.find((figure) => figure.label === 'Brands worked with')
const clientCredentials = credentials.filter((credential) => credential.kind === 'client')

const links = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

/**
 * Solid, always-visible bar. Every route is reachable: Services opens a
 * mega-menu (hover, click or keyboard); on small screens a sheet opens under the bar.
 */
export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  // The pre-renderer reports paths without the leading slash ("contact");
  // normalise so server and client agree on the active link (avoids a hydration mismatch).
  const pathname = `/${useLocation().pathname.replace(/^\/+|\/+$/g, '')}`
  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`)
  const menuId = useId()
  const sheetId = useId()
  const servicesRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<number>(undefined)

  useEffect(() => {
    setMenuOpen(false)
    setSheetOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen && !sheetOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setSheetOpen(false)
      }
    }
    const onClick = (event: MouseEvent) => {
      if (menuOpen && !servicesRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [menuOpen, sheetOpen])

  useEffect(() => {
    const lenis = window.__lenis
    if (sheetOpen) lenis?.stop()
    else lenis?.start()
    document.documentElement.classList.toggle('sheet-open', sheetOpen)
  }, [sheetOpen])

  // Bugfix: the mega-menu previously had no scroll-close handler — if a visitor
  // opened it and then scrolled without moving the pointer away, the glass
  // panel stayed rendered under the bar, reading as a second stacked bar over
  // scrolled content. Close it the moment scroll starts, same as Escape/outside-click.
  useEffect(() => {
    if (!menuOpen) return
    const close = () => setMenuOpen(false)
    const lenis = window.__lenis
    if (lenis) {
      lenis.on('scroll', close)
      return () => lenis.off('scroll', close)
    }
    window.addEventListener('scroll', close, { passive: true })
    return () => window.removeEventListener('scroll', close)
  }, [menuOpen])

  const openSoon = () => {
    window.clearTimeout(closeTimer.current)
    setMenuOpen(true)
  }
  const closeSoon = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setMenuOpen(false), 180)
  }

  const whatsapp = whatsappUrl(`Hi ${site.name}, I'd like to talk about a project.`)

  return (
    <header className="nav" data-menu={menuOpen ? 'open' : 'closed'}>
      <div className="nav__bar shell shell--wide">
        <Link to="/" className="nav__brand" aria-label={`${site.name} home`}>
          <BoltIcon className="nav__mark" />
          <span className="nav__word">{site.name}</span>
        </Link>

        <nav className="nav__primary" aria-label="Primary">
          <div className="nav__services" ref={servicesRef} onPointerEnter={openSoon} onPointerLeave={closeSoon}>
            <button
              type="button"
              className="nav__link nav__trigger"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              onClick={(event) => {
                // Hover already opened it for a mouse, so a mouse click must not toggle it shut.
                // Keyboard (detail 0) and touch still toggle.
                const mouseWithHover = event.detail > 0 && window.matchMedia('(hover: hover)').matches
                window.clearTimeout(closeTimer.current) // a pending hover-close must not undo this
                setMenuOpen((open) => (mouseWithHover ? true : !open))
              }}
              data-active={isActive('/services') || undefined}
            >
              Services
              <Icon name="chevron" size={16} className="nav__chevron" />
            </button>
            <div id={menuId} className="mega" hidden={!menuOpen}>
              <div className="mega__inner shell shell--wide">
                {serviceGroups.map((group) => (
                  <div key={group.id} className="mega__group">
                    <p className="mega__title">{group.name}</p>
                    <ul role="list">
                      {servicesInGroup(group.id).map((service) => (
                        <li key={service.slug}>
                          <Link to={`/services/${service.slug}`} className="mega__link">
                            {service.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="mega__last">
                  <Link to="/services" className="mega__all text-link">
                    All services
                  </Link>
                  <div className="mega__aside">
                    <p className="mega__aside-title">Why Blizad</p>
                    {brandsFigure && (
                      <p className="mega__stat">
                        <span className="mega__stat-value">{brandsFigure.value}</span>
                        <span className="mega__stat-label">{brandsFigure.label}</span>
                        <PlaceholderTag confirmed={brandsFigure.confirmed} />
                      </p>
                    )}
                    <p className="mega__stat">
                      <span className="mega__stat-value">{clientCredentials.length}</span>
                      <span className="mega__stat-label">
                        Engineering credentials, as a client ({clientCredentials.map((c) => c.name).join(', ')})
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="nav__link" aria-current={isActive(link.to) ? 'page' : undefined}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav__actions">
          <a
            href={whatsapp}
            className="btn btn--quiet nav__whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('whatsapp_click', { cta_position: 'nav' })}
          >
            <Icon name="whatsapp" size={18} />
            <span>WhatsApp</span>
          </a>
          <Link to={primaryCta.to} className="btn btn--primary nav__cta">
            {primaryCta.label}
          </Link>
          <button
            type="button"
            className="nav__burger"
            aria-expanded={sheetOpen}
            aria-controls={sheetId}
            aria-label={sheetOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setSheetOpen((open) => !open)}
          >
            <Icon name={sheetOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      <div id={sheetId} className="sheet" hidden={!sheetOpen}>
        <div className="sheet__inner shell">
          <nav aria-label="Mobile">
            {serviceGroups.map((group) => (
              <details key={group.id} className="sheet__group">
                <summary>
                  {group.name}
                  <Icon name="plus" size={18} />
                </summary>
                <ul role="list">
                  {servicesInGroup(group.id).map((service) => (
                    <li key={service.slug}>
                      <Link to={`/services/${service.slug}`}>{service.name}</Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
            <Link to="/services" className="sheet__link">
              All services
            </Link>
            {links.map((link) => (
              <Link key={link.to} to={link.to} className="sheet__link">
                {link.label}
              </Link>
            ))}
          </nav>
          <a href={whatsapp} className="btn btn--large sheet__whatsapp" target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={18} />
            Message us on WhatsApp
          </a>
        </div>
      </div>
    </header>
  )
}
