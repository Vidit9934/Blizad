import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../../components/Icon'
import { Faq } from '../../components/Faq'
import { AskBar } from '../../components/marketplace/AskBar'
import { homeFaqs } from '../../content/faq'
import { primaryCta, site } from '../../content/site'
import { whatsappUrl } from '../../lib/lead'
import { track } from '../../lib/track'
import { useMagnetic } from '../../motion/pointer'
import './market.css'

export function HomeFaq() {
  return (
    <section className="faq2 container-x section-y" aria-labelledby="faq-title">
      {/* avoid-ai-design-ignore: SD5 - brief-mandated accent phrase, owner-approved v10 */}
      <h2 id="faq-title" className="display">
        Questions, <span className="text-accent-2">answered.</span>
      </h2>
      <div className="faq2__list">
        <Faq items={homeFaqs} />
      </div>
    </section>
  )
}

/** Final CTA: mega type, the Ask bar again, two buttons. */
export function Close() {
  const button = useRef<HTMLAnchorElement>(null)
  useMagnetic(button, 0.3, 28)
  return (
    <section className="close2" aria-labelledby="close-title">
      <div className="container-x close2__inner">
        {/* avoid-ai-design-ignore: SD5 - brief-mandated accent phrase, owner-approved v10 */}
        <h2 id="close-title" className="close2__title">
          Let’s build <span className="text-spark">momentum.</span>
        </h2>
        <AskBar id="ask-close" className="close2__ask" />
        <div className="close2__actions">
          <Link ref={button} to={primaryCta.to} data-cursor="Begin" className="close2__primary">
            {primaryCta.label}
          </Link>
          <a
            href={whatsappUrl(`Hi ${site.name}, I'd like to talk about a project.`)}
            className="close2__secondary"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('whatsapp_click', { cta_position: 'close' })}
          >
            <Icon name="whatsapp" size={18} />
            Message on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
