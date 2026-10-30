import { forwardRef } from 'react'

/**
 * The Blizad bolt, redrawn from the brand board as two centre-line paths:
 * an open rounded frame and the lightning bolt cutting through it.
 * Replace with the official vector once supplied (tracked in check-claims).
 */
export const BOLT_FRAME = 'M80 20 H40 Q20 20 20 40 V80 Q20 100 40 100 H80 Q100 100 100 80 V68'
export const BOLT_STRIKE = 'M104 12 L56 64 H80 L62 98 L108 44 H84 Z'

/**
 * Paths drawn inline, not via `<use href="#bolt-symbol">` referencing a shared
 * `<symbol>` — that sprite pattern is known to silently fail to render on some
 * mobile WebKit builds (the icon disappearing, no console error), and this mark
 * is small/cheap enough that the earlier de-duplication wasn't worth that risk.
 */
export function BoltIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      <path d={BOLT_FRAME} fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
      <path d={BOLT_STRIKE} fill="currentColor" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * Hero version: a cyan wire layer (always visible) over a solid "charge" layer
 * whose opacity GSAP drives as the hero scrolls. Without JS the charge shows at rest.
 */
export const HeroBolt = forwardRef<SVGSVGElement>(function HeroBolt(_, ref) {
  return (
    <svg ref={ref} viewBox="0 0 120 120" className="hero-bolt" role="img" aria-label="Blizad bolt mark">
      <defs>
        <linearGradient id="bolt-charge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00bfef" />
          <stop offset="0.55" stopColor="#087cfa" />
          <stop offset="1" stopColor="#0a5fd0" />
        </linearGradient>
      </defs>
      <g className="hero-bolt__charge">
        <path d={BOLT_FRAME} fill="none" stroke="url(#bolt-charge)" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
        <path d={BOLT_STRIKE} fill="url(#bolt-charge)" stroke="url(#bolt-charge)" strokeWidth="4" strokeLinejoin="round" />
      </g>
      <g className="hero-bolt__wire" fill="none" stroke="#00bfef" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
        <path d={BOLT_FRAME} pathLength={1} />
        <path d={BOLT_STRIKE} pathLength={1} />
      </g>
    </svg>
  )
})
