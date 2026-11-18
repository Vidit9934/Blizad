import './preloader.css'

const BOLT = 'M58 4 L14 86 H46 L36 156 L86 66 H54 Z'

/**
 * One-time arrival: a spark-yellow bolt stroke draws as a mono counter runs 000 to 100,
 * a 120ms spark flash, then the curtain wipes up. Pure CSS so it can never block a visitor
 * without JS. index.html marks repeat visits (`data-seen`) and CSS skips it; reduced motion skips it too.
 */
export function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <svg viewBox="0 0 100 160" className="preloader__bolt">
        <path d={BOLT} pathLength={1} />
      </svg>
      <p className="preloader__tag">Built for momentum</p>
      <p className="preloader__count" />
      <div className="preloader__flash" />
    </div>
  )
}
