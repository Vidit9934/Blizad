import { useEffect, useState } from 'react'
import { AisleHeadline } from '@/components/hero/AisleHeadline'
import { AskBar } from '@/components/marketplace/AskBar'
import { RotatingBadge } from '@/components/ui/RotatingBadge'
import { BoltFallback } from '@/components/immersive/BoltFallback'
import { site } from '@/content/site'
import './hero.css'

/**
 * Aisle hero. Transparent section (`data-3d="hero"`) so the persistent 3D bolt shows through.
 * All text is in the static HTML from first paint; motion only arms on the client.
 */
export function Hero() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    // first visit: wait for the preloader curtain (~2.3s); repeat visits skip it
    const delay = document.documentElement.dataset.seen ? 150 : 1900
    const id = window.setTimeout(() => setReady(true), delay)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <section data-3d="hero" data-beat="0" className="hero2 relative min-h-[100svh] pt-32" aria-label="Blizad">
      <BoltFallback className="hero2__bolt" />
      <div className="hero2__inner">
        <div className="hero2__top font-mono text-xs uppercase tracking-widest text-muted">
          <span>Blizad — the growth marketplace</span>
          {site.statusLine.confirmed && (
            <span className="inline-flex items-center gap-2">
              <span className="hero2__dot" aria-hidden />
              {site.statusLine.value}
            </span>
          )}
        </div>

        <AisleHeadline ready={ready} />

        <p className="hero2__line font-display text-[clamp(1.5rem,3vw,2.75rem)] font-semibold text-muted">{site.tagline}</p>

        <div className="hero2__bottom">
          <p className="hero2__sub text-[clamp(1rem,1.2vw,1.125rem)] text-muted">
            One marketplace for everything your business needs to grow online. Hire our team for ads and search,
            commission a website or app, or use our tools yourself.
          </p>
          <div className="hero2__ask">
            <AskBar id="ask-hero" />
            <a href="/contact" className="hero2__alt mt-4 inline-block text-sm text-muted underline underline-offset-4 hover:text-fg">
              Or start a project
            </a>
          </div>
          <div className="hero2__badge">
            <RotatingBadge text="Start a project" href="/contact" />
          </div>
        </div>
      </div>
    </section>
  )
}
