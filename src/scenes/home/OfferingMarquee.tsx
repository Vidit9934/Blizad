import { LoopBand } from '@/components/ui/LoopBand'
import { BoltGlyph } from '@/components/ui/Glyphs'
import type { Aisle } from '@/content/offerings'
import './market.css'

const ROW_1: [string, Aisle][] = [
  ['Meta Ads', 'marketing'],
  ['Google Ads', 'marketing'],
  ['SEO', 'marketing'],
  ['GEO & AEO', 'marketing'],
  ['LinkedIn Ads', 'marketing'],
  ['Social', 'marketing'],
]
const ROW_2: [string, Aisle][] = [
  ['Websites', 'tech'],
  ['Web apps', 'tech'],
  ['Marketplaces', 'tech'],
  ['Hosting', 'tech'],
  ['Website Builder', 'tools'],
  ['Growth Audit', 'tools'],
]

function Row({ items, reverse, seconds }: { items: [string, Aisle][]; reverse?: boolean; seconds: number }) {
  return (
    <LoopBand reverse={reverse} seconds={seconds} className="offer-row">
      {items.map(([label, aisle]) => (
        <span key={label} className="offer-item">
          <span className="offer-word">{label}</span>
          <BoltGlyph className={`offer-bolt offer-bolt--${aisle}`} />
        </span>
      ))}
    </LoopBand>
  )
}

/** Giant outlined offering names. Duplicate track is aria-hidden inside Marquee; this band is decorative breadth. */
export function OfferingMarquee() {
  return (
    <section className="offer-band" aria-label="Everything on offer">
      <Row items={ROW_1} seconds={50} />
      <Row items={ROW_2} seconds={60} reverse />
    </section>
  )
}
