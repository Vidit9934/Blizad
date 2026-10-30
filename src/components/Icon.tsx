/**
 * Small line icons drawn for this site (1.6px stroke, 20px grid), sharing the
 * bolt mark's rounded-join geometry. Used functionally — pipeline nodes, inline
 * data markers, bento-tile identity, tech-tag rows — never as a uniform chip
 * repeated across 3+ cards. See DESIGN.md "Icon system".
 */
const paths = {
  // Chrome
  external: 'M7 13 L14 6 M8.5 6 H14 V11.5',
  go: 'M4 10 H15 M10.5 5.5 L15 10 L10.5 14.5',
  plus: 'M10 4 V16 M4 10 H16',
  menu: 'M3 6.5 H17 M3 13.5 H17',
  close: 'M5 5 L15 15 M15 5 L5 15',
  chevron: 'M6 8 L10 12 L14 8',
  copy: 'M7 7 H15 V15 H7 Z M5 13 H4.5 V4.5 H13 V5',
  mail: 'M3.5 5.5 H16.5 V14.5 H3.5 Z M3.5 6 L10 11 L16.5 6',
  check: 'M4 10.5 L8 14.5 L16 5',

  // Proof / Hero stats
  spend: 'M3 16 H17 M5 16 V12 M9 16 V9 M13 16 V6 M17 16 V4',
  brands: 'M4 16 V7 H9 V16 M9 16 V10 H16 V16 M4 16 H16',
  'trend-up': 'M3 14 L7.5 9.5 L10.5 12 L17 5 M12.5 5 H17 V9.5',
  'shield-check': 'M10 3 L16 5.5 V10 L10 17 L4 10 V5.5 Z M7.3 10 L9.3 12.3 L13 7.5',

  // Search scene (SEO / GEO)
  rank: 'M3 8 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0 M12 12 L17 17',
  'ai-node':
    'M8.6 4 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0 M3.6 15 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0 M13.6 15 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0 M9.3 6.3 L6.3 13.3 M10.7 6.3 L13.7 13.3 M6.4 15 H13.6',

  // Services bento
  grow: 'M4 15 L13 6 M9 6 H13 V10',
  found: 'M4.5 10 a5.5 5.5 0 1 0 11 0 a5.5 5.5 0 1 0 -11 0 M10 3 V5.5 M10 14.5 V17 M3 10 H5.5 M14.5 10 H17',
  build: 'M6.5 5 L2.5 10 L6.5 15 M13.5 5 L17.5 10 L13.5 15 M12 4 L8 16',
  run: 'M4 5 H16 V9 H4 Z M4 11 H16 V15 H4 Z M5.7 7 a0.6 0.6 0 1 0 1.2 0 a0.6 0.6 0 1 0 -1.2 0 M5.7 13 a0.6 0.6 0 1 0 1.2 0 a0.6 0.6 0 1 0 -1.2 0',

  // Builds / tech-tag row (generic categories, never real product logos)
  frontend:
    'M3 5 H17 V15 H3 Z M3 8 H17 M5.7 6.5 a0.6 0.6 0 1 0 1.2 0 a0.6 0.6 0 1 0 -1.2 0 M8.2 6.5 a0.6 0.6 0 1 0 1.2 0 a0.6 0.6 0 1 0 -1.2 0',
  api: 'M7 6 H13 V14 H7 Z M3 10 H7 M13 10 H17',
  database: 'M4 5.5 a6 2 0 1 0 12 0 a6 2 0 1 0 -12 0 M4 5.5 V14.5 a6 2 0 0 0 12 0 V5.5 M4 10 a6 2 0 0 0 12 0',
  storage: 'M3 7 L5 4 H15 L17 7 M3 7 H17 V16 H3 Z M7 11 H13',
  payment: 'M3 6 H17 V15 H3 Z M3 9 H17 M6 12.5 H9.5',
  auth: 'M10 3 L16 5.5 V10 L10 17 L4 10 V5.5 Z M8.7 8.3 a1.3 1.3 0 1 0 2.6 0 a1.3 1.3 0 1 0 -2.6 0 M10 9.6 V12',
  booking: 'M4 5 H16 V17 H4 Z M4 8 H16 M7 3 V6.5 M13 3 V6.5 M7 11.5 H9 M7 14 H11',
  workflow: 'M3.5 5.5 H8 V9 H3.5 Z M12 11 H16.5 V14.5 H12 Z M8 7.5 H10 V12.5 H12',

  // Pipeline gates
  plan: 'M5.5 4 H14.5 V17 H5.5 Z M8 4 V2.5 H12 V4 M7.5 8 H12.5 M7.5 11 H12.5 M7.5 14 H10.5',
  score: 'M3.5 14 a6.5 6.5 0 1 1 13 0 M10 14 L13 9',
  ship: 'M10 2.5 C12.8 5 13.5 9 12.5 13 H7.5 C6.5 9 7.2 5 10 2.5 Z M7.8 13 L6.5 16.8 L10 15 L13.5 16.8 L12.2 13',

  // Pedigree
  client: 'M3.5 8 H16.5 V16 H3.5 Z M7 8 V5.5 C7 4.1 8.1 3 9.5 3 H10.5 C11.9 3 13 4.1 13 5.5 V8',
  certificate: 'M5.5 3 H14.5 V12 H5.5 Z M7.5 12 L6.5 17 L10 15 L13.5 17 L12.5 12',

  // Estimator option pills
  cart: 'M3 4 H5 L7.2 13 H15.5 L17 6.5 H6.5 M7.8 16 a1 1 0 1 0 2 0 a1 1 0 1 0 -2 0 M13.3 16 a1 1 0 1 0 2 0 a1 1 0 1 0 -2 0',
  sliders: 'M3 6.5 H17 M6.5 6.5 a1.5 1.5 0 1 0 3 0 a1.5 1.5 0 1 0 -3 0 M3 13.5 H17 M12.5 13.5 a1.5 1.5 0 1 0 3 0 a1.5 1.5 0 1 0 -3 0',
  pin: 'M10 3 C12.8 3 15 5.2 15 8 C15 11.8 10 17 10 17 C10 17 5 11.8 5 8 C5 5.2 7.2 3 10 3 Z M8.6 8 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0',
  map: 'M4 5 L8 3.5 L12 5 L16 3.5 V15 L12 16.5 L8 15 L4 16.5 Z M8 3.5 V15 M12 5 V16.5',
} as const

export type IconName = keyof typeof paths | 'whatsapp' | 'star'

/** Filled, not stroked — a rating mark reads as a mark, not a line-icon outline. */
const starPath = 'M10 2.3 L12.3 7.7 L18.2 8.3 L13.8 12.2 L15.1 18 L10 14.9 L4.9 18 L6.2 12.2 L1.8 8.3 L7.7 7.7 Z'

export function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  if (name === 'star') {
    return (
      <svg width={size} height={size} viewBox="0 0 20 20" className={className} aria-hidden="true" focusable="false">
        <path d={starPath} fill="currentColor" />
      </svg>
    )
  }
  if (name === 'whatsapp') {
    return (
      <svg width={size} height={size} viewBox="0 0 20 20" className={className} aria-hidden="true" focusable="false">
        <path
          d="M10 2.6a7.3 7.3 0 0 0-6.3 11l-1 3.8 3.9-1a7.3 7.3 0 1 0 3.4-13.8Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M7.4 6.6c.2-.4.4-.4.7-.4h.4c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .4-.1.6l-.4.5c-.1.1-.1.3 0 .5a5 5 0 0 0 2.2 2c.2.1.4.1.5-.1l.5-.6c.2-.2.4-.2.6-.1l1.4.7c.2.1.3.3.3.5 0 .9-.7 1.6-1.6 1.6-2.7-.2-5-2.5-5.4-5.2 0-.7.2-1.3.5-1.8Z"
          fill="currentColor"
        />
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" className={className} aria-hidden="true" focusable="false">
      <path d={paths[name]} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
