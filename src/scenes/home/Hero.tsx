import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { BoltIcon } from '../../components/BoltMark'
import { Icon } from '../../components/Icon'
import { builds } from '../../content/builds'
import { primaryCta } from '../../content/site'
import { proofFigures } from '../../content/proof'
import { MQ } from '../../motion/MotionProvider'
import { useMagnetic, useSpotlight } from '../../motion/pointer'
import { useSceneReveals } from '../../motion/useSceneReveals'
import { setIgnition, subscribeBeat } from '../../three/beatRig'
import { track } from '../../lib/track'

/** The two figures shown as floating stat chips — pulled from the real Proof data, not invented for the hero. */
const heroStats = proofFigures.filter((figure) => figure.weight >= 2).slice(0, 2)

const CYAN_RGB = [0, 191, 239]
const ELECTRIC_RGB = [8, 124, 250]
/** Lerps the arc's stroke between the same Cyan/Electric Blue pair the 3D bolt's own material uses, keyed to the live pose `fill` — so the arrival arc agrees with wherever the signature object's own fill lerp currently sits, instead of a hardcoded hex. */
function fillToRgb(fill: number) {
  const [cr, cg, cb] = CYAN_RGB
  const [er, eg, eb] = ELECTRIC_RGB
  const r = Math.round(cr + (er - cr) * fill)
  const g = Math.round(cg + (eg - cg) * fill)
  const b = Math.round(cb + (eb - cb) * fill)
  return `rgb(${r}, ${g}, ${b})`
}

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

  // Keys the arrival arc's stroke to the 3D bolt's own live fill lerp, instead of
  // a hardcoded hex disconnected from the signature object's actual state.
  useEffect(() => subscribeBeat((pose) => scope.current?.style.setProperty('--arc-color', fillToRgb(pose.fill))), [])

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
      // setIgnition rides this same scrub's progress to dolly beat 0's camera in
      // (beatRig.ts) in lockstep with the CSS stage scale below — previously two
      // unrelated animations layered on top of each other.
      mm.add(MQ.cinematic, () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: scope.current,
              start: 'top top',
              end: '+=110%',
              pin: true,
              scrub: 0.8,
              onUpdate: (self) => setIgnition(self.progress),
              onLeaveBack: () => setIgnition(0),
            },
          })
          .to('.hero__stage', { scale: 1.14, xPercent: -8, ease: 'none' }, 0)
          // Outer rings read as "left behind" by the push-in: larger scale target
          // and a touch later start, instead of every ring fading identically.
          .to('.hero__ring', { scale: (i) => 1.6 + i * 0.45, opacity: 0, stagger: 0.16, ease: 'none' }, 0)
          .to('.hero__stat', { opacity: 0, ease: 'none' }, 0)
          .to('.hero__copy', { yPercent: -14, opacity: 0.12, ease: 'none' }, 0.1)
          // As the headline steps back, the real work rises to fill the space it
          // vacates — a curved 3D fan (same rotateY/translateZ/perspective math as
          // Builds' gallery, reused rather than reinvented), index-keyed so the
          // centre card reads forward and the outer two lean away.
          .fromTo(
            '.hero__fan-card',
            { opacity: 0, y: 36, scale: 0.72, rotateY: 0, z: 0, x: 0 },
            {
              opacity: 1,
              y: (i: number) => Math.abs(i - 1.5) * 20,
              scale: 1,
              rotateY: (i: number) => (i - 1.5) * -15,
              z: (i: number) => (1 - Math.abs(i - 1.5) / 1.5) * 60,
              x: (i: number) => (i - 1.5) * 140,
              ease: 'none',
              stagger: 0.04,
            },
            0.08,
          )
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
            We run your campaigns, search and software.
          </p>

          <div className="hero__aside panel">
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
                Get an audit
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
          {/* The persistent .atmosphere__cone (Atmosphere.tsx) now covers every beat,
              including this one, keyed to the 3D object's own screen position — this
              scene no longer needs its own hero-only cone layer. */}
          <div className="hero__ring" aria-hidden="true" />
          <div className="hero__ring" aria-hidden="true" />
          <div className="hero__ring" aria-hidden="true" />
          <div className="hero__spotlight" aria-hidden="true" />
          <svg className="hero__arc" viewBox="0 0 120 120" aria-hidden="true">
            <circle
              cx="60"
              cy="60"
              r="56"
              pathLength={1}
              fill="none"
              stroke="var(--arc-color, #00bfef)"
              strokeWidth="0.6"
              strokeDasharray="0.38 1"
              strokeLinecap="round"
            />
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

        {/* Rises into a curved fan as the headline steps back (the pinned scrub
            above) — the first real proof the visitor sees, not just a logo
            spinning. Real builds, same data Builds.tsx renders down-page. */}
        <div className="hero__fan" aria-hidden="true">
          {builds.map((build) => (
            <div key={build.id} className="hero__fan-card">
              {build.screenshot && <img src={build.screenshot} alt="" width={320} height={200} loading="eager" decoding="async" />}
              <span className="hero__fan-name">{build.name}</span>
            </div>
          ))}
          <div className="hero__fan-card hero__fan-card--next">
            <span className="hero__fan-name">Your product, next</span>
          </div>
        </div>
      </div>
      <p className="visually-hidden">
        Blizad is a Raipur growth company: one team for performance marketing, SEO, GEO and AEO, full-stack development
        and hosting.
      </p>
    </section>
  )
}
