import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Icon } from '../../components/Icon'
import { site } from '../../content/site'
import { MQ } from '../../motion/MotionProvider'
import { useSpotlight, useTilt } from '../../motion/pointer'
import { useSceneReveals } from '../../motion/useSceneReveals'

const QUERY = 'best digital marketing agency in Raipur'
const HOST = site.url.value.replace(/^https?:\/\//, '')

/**
 * Scene 5 — See. One question, answered three ways: a ranked result (SEO),
 * an AI answer that cites the source (GEO), and a spoken answer (AEO).
 * The surfaces are drawn as Blizad's own illustration, not copies of any product.
 */
export function SearchEverywhere() {
  const scope = useRef<HTMLElement>(null)
  const rank = useRef<HTMLElement>(null)
  const ai = useRef<HTMLElement>(null)
  const voice = useRef<HTMLElement>(null)
  useSceneReveals(scope)
  // Once the one-shot arrival plays, these three cards would otherwise sit inert for the rest of the visit.
  useTilt(rank, { maxDeg: 4 })
  useSpotlight(rank)
  useTilt(ai, { maxDeg: 4 })
  useSpotlight(ai)
  useTilt(voice, { maxDeg: 4 })
  useSpotlight(voice)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.full, () => {
        const query = scope.current?.querySelector<HTMLElement>('.search__typed')
        if (!query) return
        const typed = { chars: 0 }
        gsap.set('.surface', { opacity: 0, y: 28 })
        gsap.set('.search__flow-line', { strokeDashoffset: 1 })
        gsap
          .timeline({ scrollTrigger: { trigger: '.search__demo', start: 'top 72%', once: true } })
          .to(typed, {
            chars: QUERY.length,
            duration: 1.4,
            ease: 'none',
            onUpdate: () => {
              query.textContent = QUERY.slice(0, Math.round(typed.chars))
            },
          })
          // One question forks into three real answers — the flow line draws once, in the same arrival as the cards.
          .to('.search__flow-line', { strokeDashoffset: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08 }, '+=0.1')
          .to('.surface', { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.22 }, '<0.1')
          .from('.surface__wave i', { scaleY: 0.15, duration: 0.6, ease: 'power3.out', stagger: 0.03 }, '<0.5')
      })
    },
    { scope },
  )

  return (
    <section ref={scope} className="scene search" aria-labelledby="search-title" data-beat="2">
      <div className="shell shell--wide">
        <div className="search__head">
          <h2 id="search-title" className="t-display">
            Be the answer wherever the question is asked.
          </h2>
          <Link to="/services/seo-geo-aeo" className="text-link search__intro">
            How SEO, GEO and AEO work
          </Link>
        </div>

        <div className="search__demo">
          <div className="search__query" aria-label={`Example search: ${QUERY}`}>
            <span className="search__prompt" aria-hidden="true">
              ?
            </span>
            <span className="search__typed">{QUERY}</span>
            <span className="search__caret" aria-hidden="true" />
          </div>

          {/* One question forks into three real answers — a flow diagram, not an unexplained stagger. */}
          <svg className="search__flow" viewBox="0 0 300 48" preserveAspectRatio="none" aria-hidden="true">
            <path className="search__flow-line" pathLength={1} d="M150 0 C150 22 50 20 50 48" />
            <path className="search__flow-line" pathLength={1} d="M150 0 L150 48" />
            <path className="search__flow-line" pathLength={1} d="M150 0 C150 22 250 20 250 48" />
          </svg>

          <div className="search__surfaces">
            <article ref={rank} className="surface surface--rank">
              <span className="surface__spotlight" aria-hidden="true" />
              <h3 className="surface__kind">
                <Icon name="rank" size={28} />
                SEO
              </h3>
              <p className="surface__job">Rank in results</p>
              <div className="surface__body" data-product-screen>
                <p className="surface__url">{HOST} › services</p>
                <p className="surface__title">Blizad: marketing and web development, Raipur</p>
                <p className="surface__snippet">Ads, search and websites, one team.</p>
              </div>
            </article>

            <article ref={ai} className="surface surface--ai">
              <span className="surface__spotlight" aria-hidden="true" />
              <h3 className="surface__kind">
                <Icon name="ai-node" size={28} />
                GEO
              </h3>
              <p className="surface__job">Cited by AI</p>
              <div className="surface__body" data-product-screen>
                <p>
                  <strong>Blizad</strong> runs ads, search and software as one Raipur team.
                  <span className="surface__cite">1</span>
                </p>
                <p className="surface__source">
                  <span className="surface__cite">1</span> {HOST}
                </p>
              </div>
            </article>

            <article ref={voice} className="surface surface--voice">
              <span className="surface__spotlight" aria-hidden="true" />
              <h3 className="surface__kind">AEO</h3>
              <p className="surface__job">Answered aloud</p>
              <div className="surface__body" data-product-screen>
                <div className="surface__wave" aria-hidden="true">
                  {Array.from({ length: 24 }, (_, index) => (
                    <i key={index} style={{ ['--h' as string]: `${18 + ((index * 37) % 70)}%` }} />
                  ))}
                </div>
                <p>“Try Blizad, in Raipur.”</p>
              </div>
            </article>
          </div>
          <p className="t-note">Illustration. AI placement can’t be guaranteed.</p>
        </div>
      </div>
    </section>
  )
}
