import { useMemo, useRef } from 'react'
import { Icon } from '../../components/Icon'
import { PlaceholderTag } from '../../components/PlaceholderTag'
import { testimonials, type Testimonial } from '../../content/testimonials'
import { recognitions } from '../../content/recognitions'
import { proofFigures } from '../../content/proof'
import { useMotion } from '../../motion/MotionProvider'
import { useScrollVelocity } from '../../motion/useScrollVelocity'
import { useSceneReveals } from '../../motion/useSceneReveals'

type VoiceCard =
  | { kind: 'quote'; key: string; testimonial: Testimonial }
  | { kind: 'stat'; key: string; value: string; label: string; confirmed: boolean }

/** Alternates quote cards with real proof-figure stat cards for masonry rhythm — no invented brand cards (L4). */
function buildCards(): VoiceCard[] {
  const cards: VoiceCard[] = []
  testimonials.forEach((testimonial, index) => {
    cards.push({ kind: 'quote', key: `quote-${index}`, testimonial })
    const figure = proofFigures[index % proofFigures.length]
    if (index % 2 === 1) cards.push({ kind: 'stat', key: `stat-${index}`, value: figure.value, label: figure.label, confirmed: figure.confirmed })
  })
  return cards
}

function splitColumns<T>(items: T[], columns: number): T[][] {
  const cols: T[][] = Array.from({ length: columns }, () => [])
  items.forEach((item, index) => cols[index % columns].push(item))
  return cols
}

const DURATIONS = ['46s', '58s', '40s']
const DIRECTIONS = ['up', 'down', 'up'] as const

/**
 * Scene 8 — Voices (Editorial trust register). Three columns, continuously auto-scrolling
 * (no pause-on-hover — the rail spans the full section width, so pausing on any hover made
 * the drift start/stop erratically as a visitor's cursor merely crossed it); a static grid
 * without motion. Speed already eases toward a slow base pace via useScrollVelocity when the
 * visitor isn't actively scrolling, which is what makes a card readable mid-drift.
 */
export function Voices() {
  const scope = useRef<HTMLElement>(null)
  useSceneReveals(scope)
  const { enabled } = useMotion()
  const columns = useMemo(() => splitColumns(buildCards(), 3), [])
  // Same shared scroll-velocity signal as Pipeline's connector flow — one physics
  // signal, more than one expression of it. Written on the scope so --voices-speed
  // cascades to every .voices__track without extra listeners.
  useScrollVelocity((velocity) => {
    scope.current?.style.setProperty('--voices-speed', (1 + velocity * 1.2).toFixed(2))
  })

  return (
    <section ref={scope} className="scene scene--ice voices" aria-labelledby="voices-title" data-beat="4">
      <div className="shell shell--wide voices__head">
        <h2 id="voices-title" className="t-statement">
          Words from the people we’ve built for.
        </h2>
        <p className="t-small voices__note">Illustrative examples for now — real reviews replace these as projects wrap and clients agree to be quoted.</p>
      </div>

      <div className={`voices__rail${enabled ? ' voices__rail--motion' : ''}`} role="list">
        {columns.map((column, index) => (
          <div
            key={index}
            className={`voices__column voices__column--${DIRECTIONS[index % DIRECTIONS.length]}`}
            style={{ ['--voices-duration' as string]: DURATIONS[index % DURATIONS.length] }}
          >
            <div className="voices__track">
              {(enabled ? [...column, ...column] : column).map((card, cardIndex) => (
                <VoiceCardView key={`${card.key}-${cardIndex}`} card={card} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="shell shell--wide voices__recognitions">
        <p className="t-kicker">Recognition</p>
        <ul role="list" className="voices__recognition-list">
          {recognitions.map((item, index) => (
            <li key={index} className="voices__recognition-item">
              <Icon name="certificate" size={16} />
              <span>{item.name}</span>
              <PlaceholderTag confirmed={item.confirmed} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function VoiceCardView({ card }: { card: VoiceCard }) {
  if (card.kind === 'stat') {
    return (
      <article className="voices__card voices__card--stat" role="listitem" data-product-screen>
        <p className="voices__stat-value">{card.value}</p>
        <p className="t-small">{card.label}</p>
        <PlaceholderTag confirmed={card.confirmed} />
      </article>
    )
  }
  const { testimonial } = card
  return (
    <article className="voices__card voices__card--quote" role="listitem">
      {testimonial.confirmed && testimonial.rating ? (
        <div className="voices__stars" aria-label={`${testimonial.rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Icon key={i} name="star" size={14} className={i < testimonial.rating! ? 'is-filled' : 'is-empty'} />
          ))}
        </div>
      ) : (
        <PlaceholderTag confirmed={false} label="Illustrative example" />
      )}
      <blockquote className="voices__quote">{testimonial.quote}</blockquote>
      <p className="voices__name">{testimonial.name}</p>
      <p className="t-small">{testimonial.role}</p>
    </article>
  )
}
