export interface Testimonial {
  quote: string
  name: string
  role: string
  /** 1–5. Keep at 5 only once a real review backs it — placeholders ship unrated. */
  rating?: number
  confirmed: boolean
  videoUrl?: string
}

/**
 * Illustrative examples, not real client words (L4: never dress up invented quotes as
 * real ones). `confirmed` stays false on every entry here by design — the Placeholder
 * tag (relabelled "Illustrative example" in Voices.tsx) and the section subhead both
 * disclose this on the rendered page itself, not just in this comment. Each uses a
 * generic, unnamed role/industry — never a specific real company, and never one of
 * Blizad's actual named clients from builds.ts/credentials.ts. Real quotes replace
 * these the day a client agrees to be quoted.
 */
export const testimonials: Testimonial[] = [
  {
    quote: 'Our cost per qualified lead dropped within the first month once Meta and Google were planned as one budget instead of two agencies pulling in different directions.',
    name: 'Founder',
    role: 'D2C skincare brand',
    confirmed: false,
  },
  {
    quote: 'What stood out was the weekly reporting. We could see exactly which campaign earned which sale, not just a pile of clicks and impressions.',
    name: 'Marketing lead',
    role: 'B2B SaaS company',
    confirmed: false,
  },
  {
    quote: 'Our Google Business Profile started showing up for searches we never ranked for before, and the phone started ringing from areas we had not actively advertised in.',
    name: 'Owner',
    role: 'Multi-location restaurant group',
    confirmed: false,
  },
  {
    quote: 'We went from a rough idea to a production app with real payments and a working admin panel, and nothing broke on launch day.',
    name: 'Founder',
    role: 'Early-stage marketplace startup',
    confirmed: false,
  },
  {
    quote: 'The site used to go down every time traffic spiked. Since the move to managed hosting we have not had a single outage, and page speed is noticeably better.',
    name: 'Operations lead',
    role: 'Wellness booking platform',
    confirmed: false,
  },
  {
    quote: 'They treated our codebase like it had to last, not just ship. Clear documentation, sensible architecture, and someone always available when something needed fixing.',
    name: 'Co-founder',
    role: 'Early-stage fintech startup',
    confirmed: false,
  },
]
