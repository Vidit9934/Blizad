import { proofFigures, proofAttribution } from '@/content/proof'
import { PlaceholderTag } from '@/components/PlaceholderTag'
import './market.css'

/** Static figures only — an animated count-up on a non-repeating total is theatre (DESIGN.md refusal M5). */
export function ProofNumbers() {
  return (
    <section className="proof2 container-x section-y" aria-label="Track record">
      <p className="eyebrow">01 — Track record</p>
      <dl className="proof2__grid">
        {proofFigures.map((f) => {
          const m = /^(.*?)(Cr\+|\+)$/.exec(f.value)
          return (
            <div key={f.label} className="proof2__cell">
              <dd className="proof2__value">
                {m ? m[1] : f.value}
                {m && <span className="text-accent-2">{m[2]}</span>}
              </dd>
              <dt className="proof2__label">
                {f.label} <PlaceholderTag confirmed={f.confirmed} />
              </dt>
            </div>
          )
        })}
      </dl>
      <p className="mt-6 max-w-[70ch] text-xs text-subtle">{proofAttribution}</p>
    </section>
  )
}
