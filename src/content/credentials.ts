import type { IconName } from '../components/Icon'

/**
 * Engineering credentials shown in the pedigree scene and on /about.
 * Add new entries here. Organisation names appear as text only — never logos
 * (logos need the organisation's permission).
 */
export interface Credential {
  name: string
  /** Exact public wording. Keep "as clients" phrasing for client work. */
  detail: string
  kind: 'client' | 'certification'
  confirmed: boolean
  icon: IconName
  /**
   * A real, owner-supplied verification URL. Only render a "Verify" link when
   * this is set — never fabricate a badge with nothing real behind it (L4).
   * None of the credentials below have one yet.
   */
  url?: string
}

export const credentials: Credential[] = [
  {
    name: 'Google',
    detail: 'Engineering on Google products, as a client.',
    kind: 'client',
    confirmed: true,
    icon: 'build',
  },
  {
    name: 'Thomson Reuters',
    detail: 'Engineering on Thomson Reuters products, as a client.',
    kind: 'client',
    confirmed: true,
    icon: 'api',
  },
  {
    name: 'Certified Claude practitioner',
    detail: 'AI-assisted engineering with production guardrails.',
    kind: 'certification',
    confirmed: true,
    icon: 'certificate',
  },
]
