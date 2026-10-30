import type { IconName } from '../components/Icon'

export interface ProofFigure {
  value: string
  label: string
  /** Relative visual weight, so the strip is uneven by meaning (largest = biggest number). */
  weight: 1 | 2 | 3
  confirmed: boolean
  /** One real icon per figure — never a uniform chip. Required (Tech dashboard register, DESIGN.md). */
  icon: IconName
  /**
   * 0–1, an honest *relative weight* shown as a ring — not a fabricated trend.
   * These are cumulative totals with no real history, so this is not a time
   * series (see Sparkline.tsx's own note). Defaults to weight/3 when omitted.
   */
  trend?: number
}

export const proofFigures: ProofFigure[] = [
  { value: '₹13 Cr+', label: 'Google Ads spend managed', weight: 3, confirmed: false, icon: 'spend' },
  { value: '₹5 Cr+', label: 'Meta Ads spend managed', weight: 2, confirmed: false, icon: 'trend-up' },
  { value: '50+', label: 'Brands worked with', weight: 2, confirmed: false, icon: 'brands' },
  { value: '₹1 Cr+', label: 'LinkedIn Ads spend managed', weight: 1, confirmed: false, icon: 'client' },
]

export const proofAttribution =
  'Figures reflect the founder’s cumulative experience across projects and engagements over seven years, not spend managed by Blizad Digital Private Limited alone.'
