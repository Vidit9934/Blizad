import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../../components/Icon'
import { Faq } from '../../components/Faq'
import { homeFaqs } from '../../content/faq'
import { primaryCta, site } from '../../content/site'
import { whatsappUrl } from '../../lib/lead'
import { track } from '../../lib/track'
import { useMagnetic } from '../../motion/pointer'
import { useSceneReveals } from '../../motion/useSceneReveals'

/** Scene 12 — Doubt answered. Objections in a native disclosure list (exempt from the word budget). */
export function HomeFaq() {
  const scope = useRef<HTMLElement>(null)
  useSceneReveals(scope)
  return (
    <section ref={scope} className="scene home-faq" aria-labelledby="faq-title" data-beat="7">
      <div className="shell home-faq__grid">
        <h2 id="faq-title" className="t-statement home-faq__title">
          What founders ask us first.
        </h2>
        <Faq items={homeFaqs} />
      </div>
    </section>
  )
}

/** Scene 13 — Act. One large magnetic button. */
export function Close() {
  const scope = useRef<HTMLElement>(null)
  const button = useRef<HTMLAnchorElement>(null)
  useSceneReveals(scope)
  useMagnetic(button, 0.3, 28)
  return (
    <section ref={scope} className="scene close" aria-labelledby="close-title" data-beat="7">
      <div className="shell shell--wide close__grid">
        <h2 id="close-title" className="t-display close__title">
          Your next stage of growth starts here.
        </h2>
        <div className="close__actions">
          <Link ref={button} to={primaryCta.to} className="close__button" data-cursor="Begin">
            {primaryCta.label}
          </Link>
          <a
            href={whatsappUrl(`Hi ${site.name}, I'd like to talk about a project.`)}
            className="text-link close__whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('whatsapp_click', { cta_position: 'close' })}
          >
            <Icon name="whatsapp" size={18} />
            Or message us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
