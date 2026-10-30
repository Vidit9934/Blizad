import { useRef } from 'react'
import { Icon } from '../../components/Icon'
import { PlaceholderTag } from '../../components/PlaceholderTag'
import { RadialProgress } from '../../components/RadialProgress'
import { proofAttribution, proofFigures, type ProofFigure } from '../../content/proof'
import { useSpotlight, useTilt } from '../../motion/pointer'
import { useSceneReveals } from '../../motion/useSceneReveals'

/**
 * Scene 3 — Believe. Tech dashboard register (DESIGN.md): each figure gets a
 * real icon and an honest relative-weight ring, never a fabricated trend —
 * these are cumulative totals, not a time series. Numbers are shown, never
 * counted up (M5).
 */
export function Proof() {
  const scope = useRef<HTMLElement>(null)
  useSceneReveals(scope)
  const allConfirmed = proofFigures.every((figure) => figure.confirmed)
  return (
    <section ref={scope} className="scene scene--ice proof" aria-labelledby="proof-title" data-product-screen data-beat="1">
      <div className="shell shell--wide">
        <div className="proof__head">
          <h2 id="proof-title" className="t-display">
            Experience behind every strategy.
          </h2>
          <p className="proof__badge">Seven years in digital marketing</p>
        </div>

        <div className="proof__method">
          <Icon name="shield-check" size={22} />
          <p>
            {proofAttribution}
            <PlaceholderTag confirmed={allConfirmed} label="Figures to verify" />
          </p>
        </div>

        <dl className="proof__grid">
          {proofFigures.map((figure) => (
            <ProofTile key={figure.label} figure={figure} />
          ))}
        </dl>
      </div>
    </section>
  )
}

function ProofTile({ figure }: { figure: ProofFigure }) {
  const tile = useRef<HTMLDivElement>(null)
  useTilt(tile, { maxDeg: 3 })
  useSpotlight(tile)
  return (
    <div ref={tile} tabIndex={0} className={`proof__figure proof__figure--w${figure.weight}`}>
      {/* The hero stat (w3) gets an extra large, faint icon behind the number — a watermark, not a uniform chip. */}
      {figure.weight === 3 && <Icon name={figure.icon} className="proof__watermark" size={64} />}
      <span className="proof__spotlight" aria-hidden="true" />
      <div className="proof__visual" aria-hidden="true">
        <Icon name={figure.icon} className="proof__icon icon-bounce" size={22} />
        <RadialProgress value={figure.trend ?? figure.weight / 3} size={figure.weight === 3 ? 56 : 44} />
      </div>
      {/* dt before dd for correct <dl> semantics; CSS `order` (not DOM order) puts the value visually first. */}
      <dt className="proof__label">{figure.label}</dt>
      <dd className="proof__value">{figure.value}</dd>
    </div>
  )
}
