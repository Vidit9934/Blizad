import { useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { BoltIcon } from '../../components/BoltMark'
import { Icon } from '../../components/Icon'
import { primaryCta } from '../../content/site'
import { proofFigures } from '../../content/proof'
import { MQ } from '../../motion/MotionProvider'
import { useMagnetic, useSpotlight } from '../../motion/pointer'
import { useSceneReveals } from '../../motion/useSceneReveals'
import { track } from '../../lib/track'

/** The two figures shown as floating stat chips — pulled from the real Proof data, not invented for the hero. */
const heroStats = proofFigures.filter((figure) => figure.weight >= 2).slice(0, 2)

/**
 * Chapter 1 — Ignition. The bolt itself now lives in the persistent 3D signature
 * layer (`src/three/`), framed here by this chapter's pose (`poses.ts`, beat 0) —
 * this scene only supplies the decorative stage chrome (rings/cone/arc) the 3D
 * object shows through, plus the stat chips and copy.
 */
export function Hero() {
  const scope = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const cta = useRef<HTMLAnchorElement>(null)
  const [website, setWebsite] = useState('')
  const navigate = useNavigate()

  useSceneReveals(scope)
  useMagnetic(cta)
  useSpotlight(stage)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      // Arrival: the stage chrome draws in after the preloader (or straight away on repeat visits).
      mm.add(MQ.full, () => {
        const delay = document.documentElement.dataset.seen ? 0.2 : 1.45
        const tl = gsap.timeline({ delay })
        tl.fromTo('.hero__arc', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: 'expo.out' }, 0)
          .from('.hero__ring', { opacity: 0, scale: 0.8, duration: 1.2, ease: 'power3.out', stagger: 0.1 }, 0.2)
          .from('.hero__stat', { opacity: 0, y: 14, scale: 0.92, duration: 0.8, ease: 'power3.out', stagger: 0.12 }, 0.9)
        gsap.from('.hero__aside', { opacity: 0, y: 24, duration: 1.2, ease: 'expo.out', delay: delay + 0.5 })
      })
      // Scroll: pinned, the stage recedes as the 3D bolt takes over the frame and the words step back.
      mm.add(MQ.cinematic, () => {
        gsap
          .timeline({
            scrollTrigger: { trigger: scope.current, start: 'top top', end: '+=110%', pin: true, scrub: 0.8 },
          })
          .to('.hero__stage', { scale: 1.14, xPercent: -8, ease: 'none' }, 0)
          .to('.hero__ring', { scale: 1.9, opacity: 0, stagger: 0.12, ease: 'none' }, 0)
          .to('.hero__stat', { opacity: 0, ease: 'none' }, 0)
          .to('.hero__copy', { yPercent: -14, opacity: 0.12, ease: 'none' }, 0.1)
      })
    },
    { scope },
  )

  const requestAudit = (event: FormEvent) => {
    event.preventDefault()
    track('service_cta_click', { cta_position: 'hero_audit' })
    const query = new URLSearchParams({ type: 'audit' })
    if (website.trim()) query.set('website', website.trim().slice(0, 200))
    navigate(`/contact?${query}`)
  }

  return (
    <section ref={scope} className="hero" aria-labelledby="hero-title" data-beat="0">
      <div className="hero__inner shell shell--wide">
        <div className="hero__copy">
          <h1 id="hero-title" className="t-hero" data-reveal="lines" data-reveal-delay="arrival">
            Built for <BoltIcon className="hero__title-mark" /> momentum.
          </h1>
          <p className="hero__line t-lead" data-reveal="lines" data-reveal-delay="arrival+0.2">
            We run the campaigns, the search and the software behind your growth.
          </p>

          <div className="hero__aside">
            <form className="hero__audit" onSubmit={requestAudit} aria-label="Request a growth audit">
              <label htmlFor="hero-website" className="visually-hidden">
                Your website
              </label>
              <input
                id="hero-website"
                inputMode="url"
                placeholder="Your website"
                maxLength={200}
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />
              <button type="submit" className="btn">
                Get a growth audit
              </button>
            </form>
            <div className="btn-row">
              <Link ref={cta} to={primaryCta.to} className="btn btn--primary btn--large">
                {primaryCta.label}
              </Link>
              <a href="#builds" className="text-link hero__see">
                See what we’ve built
              </a>
            </div>
          </div>
        </div>

        <div ref={stage} className="hero__stage" aria-hidden="false">
          {/* Kept after the rings so it doesn't shift their :nth-of-type(div) stacking. */}
          <div className="hero__cone" aria-hidden="true" />
          <div className="hero__ring" aria-hidden="true" />
          <div className="hero__ring" aria-hidden="true" />
          <div className="hero__ring" aria-hidden="true" />
          <div className="hero__spotlight" aria-hidden="true" />
          <svg className="hero__arc" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="56" pathLength={1} fill="none" stroke="#00bfef" strokeWidth="0.6" strokeDasharray="0.38 1" strokeLinecap="round" />
          </svg>
          {/* The bolt itself is the persistent 3D signature layer showing through this transparent stage. */}
          {heroStats.map((stat) => (
            <div key={stat.label} className={`hero__stat hero__stat--${stat.icon}`}>
              <Icon name={stat.icon} size={18} />
              <span className="hero__stat-value">{stat.value}</span>
              <span className="hero__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="visually-hidden">
        Blizad is a Raipur growth company: one team for performance marketing, SEO, GEO and AEO, full-stack development
        and hosting.
      </p>
    </section>
  )
}
