import { useEffect, useId, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { subscribeBeat } from '../three/beatRig'
import './chapter-edge-label.css'

/** Chapter names, index-matched to `data-beat` (see `poses.ts` and `DESIGN.md`'s "3D signature layer"). */
const chapters = [
  'Ignition',
  'The Promise, Proven',
  'Pick Your Door',
  'Proof of Craft',
  'Who You’re Trusting',
  'The Pipeline',
  'Build Your Stack',
  'No More Reasons to Wait',
]

const routeNames: Record<string, string> = {
  '/': 'Home',
  '/services': 'Services',
  '/work': 'Work',
  '/about': 'About',
  '/contact': 'Contact',
  '/privacy': 'Privacy',
}

function routeLabel(pathname: string) {
  if (routeNames[pathname]) return routeNames[pathname]
  if (pathname.startsWith('/services/')) return 'Services'
  return 'Blizad'
}

/**
 * Ungrammary-inspired page-identity device: a small, always-opaque label in the
 * side gutter (never over content) naming the current chapter on home, or the
 * current route elsewhere — driven by the same `data-beat` signal the 3D rig
 * reads, no new scroll listener. Opens a solid (not glass — the glass budget's
 * one reserved slot stays reserved) index of every chapter plus every route, so
 * it's an honest extra way to reach every destination, never a hidden one.
 */
export function ChapterEdgeLabel() {
  const location = useLocation()
  const [beat, setBeat] = useState(0)
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const isHome = location.pathname === '/'

  useEffect(() => {
    if (!isHome) return
    return subscribeBeat((_pose, beatValue) => setBeat(Math.round(beatValue)))
  }, [isHome])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const label = isHome ? chapters[beat] : routeLabel(location.pathname)

  const jumpTo = (index: number) => {
    setOpen(false)
    document.querySelector(`[data-beat="${index}"]`)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <button
        type="button"
        className="edge-label"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="edge-label__text">{label}</span>
      </button>
      <div id={panelId} className="chapter-index" hidden={!open}>
        <div className="chapter-index__inner">
          {isHome && (
            <>
              <p className="chapter-index__title">Chapters</p>
              <ol role="list" className="chapter-index__list">
                {chapters.map((name, index) => (
                  <li key={name}>
                    <button type="button" onClick={() => jumpTo(index)} data-cursor="Open">
                      {name}
                    </button>
                  </li>
                ))}
              </ol>
            </>
          )}
          <p className="chapter-index__title">Pages</p>
          <ul role="list" className="chapter-index__list">
            <li>
              <Link to="/services" onClick={() => setOpen(false)}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/work" onClick={() => setOpen(false)}>
                Work
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
