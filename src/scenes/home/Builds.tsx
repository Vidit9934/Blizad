import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Icon } from '../../components/Icon'
import { builds, techIcon, type Build } from '../../content/builds'
import { primaryCta } from '../../content/site'
import { MQ } from '../../motion/MotionProvider'
import { useTilt } from '../../motion/pointer'
import { useSceneReveals } from '../../motion/useSceneReveals'
import { track } from '../../lib/track'

/**
 * Scene 6 — Proof of craft. Pinned on wide screens: vertical scroll travels the
 * track sideways. Narrow, touch or reduced motion: a native swipe row with snap.
 */
export function Builds() {
  const scope = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLOListElement>(null)
  useSceneReveals(scope)

  const totalPanels = builds.length + 1 // + the "your product, next" closer

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.cinematic, () => {
        const list = trackRef.current
        if (!list || !scope.current) return
        scope.current.classList.add('builds--pinned')
        const distance = () => list.scrollWidth - window.innerWidth
        gsap.to(list, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            // Netbramha-inspired: a dash/dot readout of the same pinned-scroll
            // progress this ScrollTrigger already computes — no new listener.
            onUpdate: (self) => scope.current?.style.setProperty('--builds-progress', self.progress.toFixed(4)),
          },
        })
        return () => scope.current?.classList.remove('builds--pinned')
      })
    },
    { scope },
  )

  return (
    <section ref={scope} id="builds" className="builds" aria-labelledby="builds-title" data-product-screen data-beat="3">
      <div className="builds__head shell shell--wide">
        <h2 id="builds-title" className="t-display">
          Products we’ve engineered.
        </h2>
        <p className="t-small">Live platforms with real users, engineered by Vidit Vaibhav.</p>
      </div>
      <div className="builds__dots shell shell--wide" style={{ ['--builds-count' as string]: totalPanels }} aria-hidden="true">
        {Array.from({ length: totalPanels }, (_, index) => (
          <span key={index} className="builds__dot" />
        ))}
        <span className="builds__dot-active" />
      </div>
      <ol ref={trackRef} className="builds__track" role="list">
        {builds.map((build, index) => (
          <BuildPanel key={build.id} build={build} index={index} />
        ))}
        <li className="build build--next">
          <p className="t-title">Your product, next.</p>
          <p className="t-small">From idea to launch, with marketing ready on day one.</p>
          <Link to={primaryCta.to} className="btn btn--primary btn--large">
            {primaryCta.label}
          </Link>
        </li>
      </ol>
    </section>
  )
}

function BuildPanel({ build, index }: { build: Build; index: number }) {
  const frame = useRef<HTMLDivElement>(null)
  useTilt(frame, { maxDeg: 5 })
  return (
    <li className="build">
      <div ref={frame} className="build__frame">
        <span className="build__category-chip">{build.category}</span>
        {build.screenshot ? (
          <img
            src={build.screenshot}
            alt={`${build.name} home page`}
            width={1440}
            height={900}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            // Lazy images can finish loading after the pin's distance was first measured,
            // desyncing the pinned-scroll mapping — re-measure once each one settles.
            onLoad={() => ScrollTrigger.refresh()}
          />
        ) : (
          <div className="build__fallback" aria-hidden="true">
            {build.name}
          </div>
        )}
        <div className="build__built">
          <p className="build__built-title">What we built</p>
          <ul role="list">
            {build.built.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="build__meta">
        <h3 className="build__name">{build.name}</h3>
        <a
          href={build.url}
          className="btn btn--quiet build__visit"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="Visit"
          onClick={() => track('case_study_view', { service_name: build.id })}
        >
          Visit site
          <Icon name="external" size={18} />
        </a>
      </div>
      <p className="build__line">{build.line}</p>
      <ul role="list" className="build__stack">
        {build.stack.map((tech) => (
          <li key={tech}>
            <Icon name={techIcon(tech)} size={15} />
            {tech}
          </li>
        ))}
      </ul>
    </li>
  )
}
