import type { ServiceFaq } from './services'

/** Home-page objections, grouped into named columns (Faq.tsx renders two columns when category is set). */
export const homeFaqs: ServiceFaq[] = [
  {
    category: 'Cost and timeline',
    q: 'What does it cost to work with Blizad?',
    a: 'It depends on scope. After a short call we send a written proposal with fixed fees for build work and a monthly fee for ongoing marketing, search or hosting. No surprise invoices.',
  },
  {
    category: 'Cost and timeline',
    q: 'How fast can you start?',
    a: 'Usually within one to two weeks of agreeing scope. Campaign tracking and first launches typically go live in about two weeks; websites follow the timeline in the proposal.',
  },
  {
    category: 'Ownership and proof',
    q: 'Who owns the code, the ad accounts and the data?',
    a: 'You do. Repositories, domains, ad accounts and analytics are registered to your business. If we part ways, everything stays with you.',
  },
  {
    category: 'Ownership and proof',
    q: 'Do you guarantee rankings, AI mentions or ROAS?',
    a: 'No — anyone who does is guessing. We commit to clear goals, honest measurement, weekly improvement and reporting you can check yourself.',
  },
  {
    category: 'How we work',
    q: 'Can one team really do marketing and engineering?',
    a: 'That is the point of Blizad. Sourav leads strategy and paid acquisition; Vidit leads engineering, search and hosting. Campaigns and the site they land on are planned together.',
  },
  {
    category: 'How we work',
    q: 'You use AI. Is the work still careful?',
    a: 'Yes. AI makes us faster; every change still passes an architecture review, security and performance checks and measured QA gates before it ships.',
  },
]
