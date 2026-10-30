import type { IconName } from '../components/Icon'

/**
 * Products built by Vidit Vaibhav. Screenshots are captured by
 * `npm run capture:builds` into public/builds/ and committed — never fetched at runtime.
 */
export interface Build {
  id: string
  name: string
  url: string
  category: string
  /** One line for the gallery panel. */
  line: string
  /** What was engineered — shown on hover and on /work. */
  built: string[]
  stack: string[]
  screenshot: string | null
}

export const builds: Build[] = [
  {
    id: 'tunefry',
    name: 'TuneFry',
    url: 'https://www.tunefry.com/home',
    category: 'Music distribution platform',
    line: 'Independent artists release to 100+ streaming platforms and keep their royalties.',
    built: [
      'Release pipeline: audio, artwork and metadata to 100+ stores',
      'Artist dashboard with streams and revenue analytics',
      'Subscription plans, payments and royalty withdrawals',
      'Artist services, referrals and editorial content',
    ],
    stack: ['React', 'Vite', 'FastAPI', 'Supabase', 'Cloudflare R2', 'Razorpay', 'Resend'],
    screenshot: '/builds/tunefry.jpg',
  },
  {
    id: 'my-lifechoices',
    name: 'My Life Choices',
    url: 'https://www.my-lifechoices.com/',
    category: 'Personalised wellness marketplace',
    line: 'Numerology, breathwork and chakra sessions, retreats and books — booked and bought in one place.',
    built: [
      'Personalised numerology experience from a birthdate',
      'Session booking for consultations and retreats',
      'Books store with cart and accounts',
      'Content-rich service pages and client stories',
    ],
    stack: ['React', 'E-commerce', 'Bookings', 'Accounts'],
    screenshot: '/builds/my-lifechoices.jpg',
  },
  {
    id: 'scdm-accelerator',
    name: 'SCDM Accelerator',
    url: 'https://scdm-accelerator.org/',
    category: 'Hackathon platform for professionals',
    line: 'Industry and academia submit, evaluate and pitch ideas for clinical data innovation.',
    built: [
      'Idea submission with accounts and deadlines',
      'Multi-stage journey: evaluation, pitch day, proof of concept, awards',
      'Innovation themes and FAQ for a global professional audience',
      'Live countdowns and programme timeline',
    ],
    stack: ['React', 'Accounts', 'Submissions', 'Evaluation workflow'],
    screenshot: '/builds/scdm-accelerator.jpg',
  },
]

/**
 * Maps a stack string to a generic category icon — never a real product logo
 * (same spirit as the credentials' no-unauthorized-logos rule). Falls back to
 * a generic engineering icon for anything unmapped, so new stack entries never
 * render without one.
 */
const techIconMap: Record<string, IconName> = {
  react: 'frontend',
  vite: 'frontend',
  fastapi: 'api',
  supabase: 'database',
  'cloudflare r2': 'storage',
  razorpay: 'payment',
  resend: 'mail',
  'e-commerce': 'cart',
  bookings: 'booking',
  accounts: 'auth',
  submissions: 'workflow',
  'evaluation workflow': 'workflow',
}

export function techIcon(tech: string): IconName {
  return techIconMap[tech.toLowerCase()] ?? 'build'
}
