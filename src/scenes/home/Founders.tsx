import { founders } from '@/content/founders'
import './market.css'

const BRAIN = { sourav: 'The Marketing brain', vidit: 'The Tech brain' } as const

/** Two founders, one counter. Monogram tiles stand in until approved portraits exist (never a "coming soon" tag). */
export function Founders() {
  return (
    <section className="founders2 container-x section-y" aria-labelledby="founders-title">
      <p className="eyebrow">08 — The team</p>
      {/* avoid-ai-design-ignore: SD5 - brief-mandated accent phrase, owner-approved v10 */}
      <h2 id="founders-title" className="display mt-4">
        Two brains. <span className="text-accent-2">One counter.</span>
      </h2>
      <div className="founders2__grid">
        {founders.map((f, i) => (
          <div key={f.id} className="founders2__item">
            <article className="founders2__card">
              {f.portrait ? (
                <img src={f.portrait} alt={f.name} className="founders2__photo" loading="lazy" />
              ) : (
                <div className={`founders2__mono founders2__mono--${f.id}`} aria-hidden>
                  {f.initials}
                </div>
              )}
              <p className="eyebrow mt-6">{BRAIN[f.id]}</p>
              <h3 className="display-sm mt-2">{f.name}</h3>
              <p className="mt-1 text-muted">
                {f.role}
                {f.alsoKnownAs ? ` · ${f.alsoKnownAs}` : ''}
              </p>
              <p className="mt-4 max-w-[48ch] text-muted">{f.bio}</p>
            </article>
            {i === 0 && (
              <span className="founders2__x" aria-hidden>
                ×
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
