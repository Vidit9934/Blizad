import { BOLT_FRAME, BOLT_STRIKE } from './BoltMark'
import './preloader.css'

/**
 * One-time arrival: the bolt draws, the wordmark resolves, the curtain lifts.
 * Pure CSS so it can never block a visitor without JS. An inline script in
 * index.html marks repeat visits in the session (`data-seen`) and CSS skips it;
 * reduced motion skips it too. The page underneath is already rendered.
 */
export function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader__mark">
        <svg viewBox="0 0 120 120">
          <path d={BOLT_FRAME} pathLength={1} />
          <path d={BOLT_STRIKE} pathLength={1} />
        </svg>
        <span className="preloader__word">Blizad</span>
      </div>
    </div>
  )
}
