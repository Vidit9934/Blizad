import './market.css'

const STEPS = [
  { n: '1', t: 'Pick', d: 'Browse the aisles or ask Blizad. Choose one offering or a full stack.', c: 'var(--accent-2)' },
  { n: '2', t: 'Plan', d: 'One strategist maps targets, timelines and budget across every aisle you picked.', c: 'var(--fg)' },
  { n: '3', t: 'Build & launch', d: 'Campaigns, sites and tools go live, tracked from day one.', c: 'var(--spark)' },
  { n: '4', t: 'Compound', d: 'Weekly optimisation across marketing and tech, with one report.', c: 'var(--accent-2)' },
]

export function HowItWorks() {
  return (
    <section className="how container-x section-y" aria-labelledby="how-title">
      <p className="eyebrow">07 — How it works</p>
      {/* avoid-ai-design-ignore: SD5 - brief-mandated accent phrase, owner-approved v10 */}
      <h2 id="how-title" className="display mt-4">
        From first message to <span className="text-accent-2">momentum.</span>
      </h2>
      <ol className="how__list" role="list">
        {STEPS.map((s) => (
          <li key={s.n} className="how__step">
            <span className="how__n" style={{ color: s.c }}>
              {s.n}
            </span>
            <div>
              <h3 className="display-sm">{s.t}</h3>
              <p className="mt-3 max-w-[44ch] text-muted">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
