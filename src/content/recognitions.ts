export interface Recognition {
  name: string
  note: string
  confirmed: boolean
  /** A real, owner-supplied verification URL. Only render a link when this is set (L4). */
  url?: string
}

/**
 * Reserved slots for real awards/certifications, added once the owner supplies them.
 * No invented award names or badge art — an honest empty slot beats a fabricated one (L4).
 */
export const recognitions: Recognition[] = [
  { name: 'Award or certification — to be added', note: 'Reserved for a named recognition once confirmed.', confirmed: false },
  { name: 'Award or certification — to be added', note: 'Reserved for a named recognition once confirmed.', confirmed: false },
  { name: 'Award or certification — to be added', note: 'Reserved for a named recognition once confirmed.', confirmed: false },
]
