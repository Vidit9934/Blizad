export interface Founder {
  id: 'sourav' | 'vidit'
  name: string
  alsoKnownAs?: string
  role: string
  focus: string
  initials: string
  /** Portrait path once the founder approves one; null renders a Placeholder monogram. */
  portrait: string | null
  bio: string
  knowsAbout: string[]
  /** A real, founder-authored line for the Contact page pull-quote — not marketing copy written for them. */
  quote?: string
}

export const founders: Founder[] = [
  {
    id: 'sourav',
    name: 'Sourav Yadav',
    alsoKnownAs: 'Krantiveer',
    role: 'Founder & CEO',
    focus: 'Strategy, performance marketing and brand',
    initials: 'SY',
    portrait: null,
    bio: 'Seven years connecting business strategy, digital advertising and creative brand building. Sourav has managed Google, Meta and LinkedIn campaigns for 50+ brands and leads how Blizad plans, spends and grows.',
    knowsAbout: ['Performance marketing', 'Google Ads', 'Meta Ads', 'LinkedIn Ads', 'Brand strategy'],
    quote: 'We don’t hand off a brief and disappear until the review call. You get one team — strategy, build and search — moving at the speed the opportunity actually needs.',
  },
  {
    id: 'vidit',
    name: 'Vidit Vaibhav',
    role: 'Co-founder & CTO',
    focus: 'Engineering, search and hosting',
    initials: 'VV',
    portrait: null,
    bio: 'Full-stack engineer with experience on products for Google and Thomson Reuters. Vidit built TuneFry, My Life Choices and SCDM Accelerator, and runs Blizad’s AI-native engineering as a certified Claude practitioner.',
    knowsAbout: [
      'Full-stack web development',
      'Web application architecture',
      'Search engine optimisation',
      'Generative engine optimisation',
      'AI-assisted software engineering',
      'Cloud hosting',
    ],
  },
]
