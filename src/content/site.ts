/**
 * Business facts and contact details. Anything not yet verified by the owners
 * carries `confirmed: false` and renders a visible Placeholder tag.
 * `scripts/check-claims.mjs` lists every unconfirmed item on each build.
 */
export interface Claim<T> {
  value: T
  confirmed: boolean
}

export const site = {
  name: 'Blizad',
  legalName: { value: 'Blizad Digital Private Limited', confirmed: false } as Claim<string>,
  parentCompany: { value: 'KMF Media Private Limited', confirmed: false } as Claim<string>,
  tagline: 'Built for momentum.',
  city: 'Raipur',
  region: 'Chhattisgarh',
  country: 'India',
  url: { value: import.meta.env.VITE_SITE_URL ?? 'https://blizad.in', confirmed: false } as Claim<string>,
  email: { value: 'hello@blizad.in', confirmed: false } as Claim<string>,
  /** International format, digits only — used to build wa.me links. */
  whatsapp: { value: '910000000000', confirmed: false } as Claim<string>,
  phoneDisplay: { value: '+91 00000 00000', confirmed: false } as Claim<string>,
  description:
    'Blizad is a Raipur-based growth company. One team runs performance marketing, SEO, GEO and AEO, full-stack development and hosting for ambitious businesses across India.',
} as const

export const primaryCta = { label: 'Start a project', to: '/contact' } as const
