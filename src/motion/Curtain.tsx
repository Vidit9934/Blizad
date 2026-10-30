import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { BoltIcon } from '../components/BoltMark'
import { useMotion } from './MotionProvider'
import './curtain.css'

/** Hard ceiling so a click that never actually navigates (prevented, external redirect, etc.) can't leave the cover stuck up. */
const MAX_COVER_MS = 1400

/**
 * Route transition: an AJ Marketing-inspired "expand in place" wipe — a circular
 * reveal that grows from wherever the visitor clicked, rather than a flat cover.
 * Plays on every internal navigation now (not only slow ones >220ms), since the
 * brief asks for the transition to be the actual bridge, not just a loading
 * safety net. Skipped under reduced motion. Doesn't loosen the nav rule ("opaque,
 * never hides") — that governs the persistent bar staying readable while
 * scrolling, not a transient full-viewport cover between two reachable pages.
 */
export function Curtain() {
  const ref = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const { enabled } = useMotion()
  const shown = useRef(false)
  const origin = useRef({ x: '50%', y: '50%' })
  const maxCoverTimer = useRef<number | undefined>(undefined)

  const reveal = () => {
    const el = ref.current
    if (!el || !shown.current) return
    shown.current = false
    window.clearTimeout(maxCoverTimer.current)
    gsap.to(el, {
      '--curtain-r': '0px',
      duration: 0.7,
      ease: 'power3.inOut',
      delay: 0.1,
      onComplete: () => gsap.set(el, { autoAlpha: 0 }),
    })
  }

  useEffect(() => {
    if (!enabled) return
    // Trigger on the click itself (not on router loading state) — an already-cached
    // route's lazy chunk can resolve too fast for a 'loading' state to ever be
    // observed, and the brief asks for this to play on every internal navigation.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = (event.target as HTMLElement)?.closest('a')
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return
      const href = link.getAttribute('href') ?? ''
      if (!href.startsWith('/') || href.startsWith('//')) return // internal, same-document routes only
      origin.current = { x: `${event.clientX}px`, y: `${event.clientY}px` }
      const el = ref.current
      if (!el || shown.current) return
      shown.current = true
      el.style.setProperty('--curtain-x', origin.current.x)
      el.style.setProperty('--curtain-y', origin.current.y)
      gsap.set(el, { autoAlpha: 1 })
      gsap.fromTo(el, { '--curtain-r': '0px' }, { '--curtain-r': '150vmax', duration: 0.7, ease: 'power3.inOut' })
      // Safety ceiling: if this click never actually lands a navigation (prevented,
      // an external redirect, etc.), the cover must not get stuck over the page.
      window.clearTimeout(maxCoverTimer.current)
      maxCoverTimer.current = window.setTimeout(reveal, MAX_COVER_MS)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [enabled])

  // The location actually changing is the one signal guaranteed to fire on every
  // real navigation, fast or slow — unlike router loading state, which a cached
  // route can skip entirely.
  useEffect(() => {
    reveal()
  }, [location.pathname, location.search])

  return (
    <div ref={ref} className="curtain" aria-hidden="true">
      <BoltIcon className="curtain__mark" />
    </div>
  )
}
