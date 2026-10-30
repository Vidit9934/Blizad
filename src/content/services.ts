export type ServiceGroupId = 'grow' | 'found' | 'build' | 'run'

export interface ServiceGroup {
  id: ServiceGroupId
  /** The giant door word on the home page. */
  door: string
  name: string
  line: string
}

export interface ServiceFaq {
  q: string
  a: string
  /** Groups home-page FAQs into named columns (Faq.tsx). Unused on service-page FAQs, which stay a flat list. */
  category?: string
}

export interface Service {
  slug: string
  group: ServiceGroupId
  name: string
  /** Page H1. */
  title: string
  /** One line under the title, at most 14 words. */
  line: string
  metaDescription: string
  solves: string[]
  included: string[]
  howWeWork: { step: string; detail: string }[]
  faqs: ServiceFaq[]
}

export const serviceGroups: ServiceGroup[] = [
  { id: 'grow', door: 'Grow', name: 'Marketing', line: 'Paid, social and creator campaigns that bring in buyers, not just clicks.' },
  { id: 'found', door: 'Be found', name: 'Search', line: 'SEO, GEO and AEO, so Google, AI assistants and voice all name you.' },
  { id: 'build', door: 'Build', name: 'Development', line: 'Websites, web apps and marketplaces engineered to production standard.' },
  { id: 'run', door: 'Run', name: 'Hosting & care', line: 'Fast hosting, monitoring and upkeep, so nothing you launch goes stale.' },
]

const standardProcess = (build: string) => [
  { step: 'Discover', detail: 'We learn the customer, the offer, the competition and what is already working.' },
  { step: 'Plan', detail: 'A channel and measurement plan with the numbers we will judge ourselves by.' },
  { step: build, detail: 'We set up, create and launch, with tracking checked before money is spent.' },
  { step: 'Optimise', detail: 'Weekly reviews, clear reports, and changes made from data rather than taste.' },
]

export const services: Service[] = [
  {
    slug: 'performance-marketing',
    group: 'grow',
    name: 'Performance marketing',
    title: 'Performance marketing',
    line: 'Google, Meta and LinkedIn campaigns run as one budget, judged by qualified leads.',
    metaDescription: 'Performance marketing from Blizad, Raipur: Google, Meta and LinkedIn campaigns planned as one budget and measured by qualified leads and revenue.',
    solves: [
      'Ad spend that produces clicks and form fills but few customers.',
      'Channels run by different people with no shared view of what works.',
      'No reliable tracking, so nobody can say which rupee earned which sale.',
    ],
    included: [
      'Account and funnel audit',
      'Channel plan across Google, Meta and LinkedIn',
      'Conversion tracking with GA4 and platform pixels',
      'Creative and landing-page testing',
      'Budget pacing and bid strategy',
      'Monthly reporting on cost per qualified lead',
    ],
    howWeWork: standardProcess('Launch'),
    faqs: [
      { q: 'What budget do I need to start?', a: 'It depends on your market and goal. We recommend a test budget after the audit and only scale what proves itself.' },
      { q: 'Who owns the ad accounts?', a: 'You do. We work inside accounts registered to your business, so the data and history stay yours.' },
      { q: 'Do you guarantee ROAS?', a: 'No. Nobody honest can. We commit to a measurement plan, weekly optimisation and transparent reporting.' },
      { q: 'How soon will I see results?', a: 'Tracking and first campaigns go live in about two weeks; meaningful optimisation needs four to eight weeks of data.' },
    ],
  },
  {
    slug: 'meta-ads-lead-generation',
    group: 'grow',
    name: 'Meta Ads & lead generation',
    title: 'Meta Ads and lead generation',
    line: 'Instagram and Facebook campaigns built for lead quality, not lead count.',
    metaDescription: 'Meta Ads lead generation by Blizad: Instagram and Facebook campaigns with instant forms or landing pages, CRM routing and lead-quality tracking.',
    solves: [
      'Cheap leads that never pick up the phone.',
      'Instant-form leads stuck in a spreadsheet nobody checks.',
      'Creative that worked once and has fatigued since.',
    ],
    included: [
      'Audience and offer strategy',
      'Instant forms or landing-page funnels',
      'Qualifying questions and lead routing to your CRM or WhatsApp',
      'Creative production and testing cadence',
      'Conversions API and event tracking',
      'Cost-per-quality-lead reporting',
    ],
    howWeWork: standardProcess('Launch'),
    faqs: [
      { q: 'Instant forms or landing pages?', a: 'Instant forms are cheaper per lead; landing pages usually give better quality. We often test both and keep the winner.' },
      { q: 'Can leads come straight to WhatsApp?', a: 'Yes. We can route new leads to your sales team’s WhatsApp or CRM within minutes.' },
      { q: 'Do you make the creatives?', a: 'Yes — static, carousel and short video, refreshed on a schedule so performance does not decay.' },
      { q: 'Is this suitable for real estate or healthcare?', a: 'Yes, with care: those categories have special ad policies and we review targeting and copy against them.' },
    ],
  },
  {
    slug: 'google-ads',
    group: 'grow',
    name: 'Google Ads',
    title: 'Google Ads management',
    line: 'Search, Performance Max and YouTube campaigns mapped to real buying intent.',
    metaDescription: 'Google Ads management by Blizad: intent-mapped search campaigns, Performance Max and YouTube, with GA4 conversions and weekly query reviews.',
    solves: [
      'Budget spent on searches that will never buy.',
      'Broad campaigns with no negative keywords or query reviews.',
      'Conversions counted wrongly, so the algorithm optimises for the wrong thing.',
    ],
    included: [
      'Search intent mapping and account structure',
      'Search, Performance Max and YouTube campaigns',
      'GA4 and enhanced conversions setup',
      'Negative keywords and weekly query reviews',
      'Ad copy, assets and extensions',
      'Landing-page alignment',
    ],
    howWeWork: standardProcess('Launch'),
    faqs: [
      { q: 'Is Google better than Meta for my business?', a: 'Google captures people already searching; Meta creates demand. Most businesses need one first and the other later — we will recommend which.' },
      { q: 'What experience do you have?', a: 'Our founder has managed more than ₹13 crore of Google Ads spend across projects over seven years.' },
      { q: 'Do you charge a percentage of spend?', a: 'Fees depend on scope and spend; we agree them up front after the audit.' },
      { q: 'Will I see the search terms?', a: 'Yes. You have full access to the account and we share what we added and excluded each week.' },
    ],
  },
  {
    slug: 'linkedin-ads',
    group: 'grow',
    name: 'LinkedIn advertising',
    title: 'LinkedIn advertising',
    line: 'Reach decision makers by company, role and seniority, then follow up properly.',
    metaDescription: 'LinkedIn Ads for B2B by Blizad: audience by company and title, lead-gen forms, offer testing, Insight Tag tracking and CRM follow-up.',
    solves: [
      'High-value B2B deals that search and social ads cannot reach.',
      'Expensive LinkedIn clicks with no follow-up process.',
      'Messaging that speaks to everyone and convinces no one.',
    ],
    included: [
      'Persona and account-list strategy',
      'Company, title and seniority targeting',
      'Lead-gen forms and offer testing',
      'Insight Tag and conversion tracking',
      'Sequenced creative for long sales cycles',
      'CRM handoff and follow-up workflow',
    ],
    howWeWork: standardProcess('Launch'),
    faqs: [
      { q: 'Is LinkedIn worth the higher cost?', a: 'For deals worth lakhs, usually yes — one qualified meeting can pay for a month of spend. For low-ticket offers, usually no.' },
      { q: 'Can you target a list of companies?', a: 'Yes, through matched audiences built from your target-account list.' },
      { q: 'What offers work on LinkedIn?', a: 'Useful ones: audits, benchmarks, guides and short consultations perform better than “book a demo” on a cold audience.' },
      { q: 'Do you run organic LinkedIn too?', a: 'Founder-led organic content can be added through our social media service.' },
    ],
  },
  {
    slug: 'social-media-marketing',
    group: 'grow',
    name: 'Social media marketing',
    title: 'Social media marketing',
    line: 'A consistent, recognisable presence, planned monthly and measured by what it drives.',
    metaDescription: 'Social media management by Blizad: strategy, content calendars, creative, publishing, community workflows and reporting across Instagram, LinkedIn and more.',
    solves: [
      'Posting when someone remembers, with no plan behind it.',
      'A feed that looks different every week.',
      'Organic and paid teams that never talk to each other.',
    ],
    included: [
      'Platform strategy and content pillars',
      'Monthly content calendar',
      'Design, reels and short-form video',
      'Publishing and community workflows',
      'Organic and paid coordination',
      'Monthly reporting',
    ],
    howWeWork: standardProcess('Create'),
    faqs: [
      { q: 'Will you grow my followers?', a: 'We do not promise follower counts. We focus on reach, engagement and the enquiries social actually drives.' },
      { q: 'Which platforms do you manage?', a: 'Instagram, Facebook, LinkedIn and YouTube most often — we pick the ones your customers use.' },
      { q: 'Do I approve posts?', a: 'Yes. You see and approve the calendar before anything goes live.' },
      { q: 'Can you shoot content?', a: 'We plan and produce creative; on-site shoots are scoped separately.' },
    ],
  },
  {
    slug: 'influencer-marketing',
    group: 'grow',
    name: 'Influencer marketing',
    title: 'Influencer marketing',
    line: 'Creators chosen for audience fit, briefed clearly and held to delivery.',
    metaDescription: 'Influencer marketing by Blizad: creator discovery and vetting, briefs, negotiation, approvals, usage rights, delivery tracking and disclosure compliance.',
    solves: [
      'Creators picked by follower count, not by audience fit.',
      'Vague briefs, missed deadlines and unclear usage rights.',
      'No way to tell which creator actually sold anything.',
    ],
    included: [
      'Creator discovery and vetting',
      'Briefs and outreach',
      'Negotiation and contracts',
      'Content approvals and UGC rights',
      'Delivery and performance tracking',
      'Disclosure compliance',
    ],
    howWeWork: standardProcess('Activate'),
    faqs: [
      { q: 'Micro or macro creators?', a: 'Usually several micro creators with the right audience beat one big name. We decide by fit and budget.' },
      { q: 'Can we reuse creator content in ads?', a: 'Yes, when usage rights are agreed in the contract — we negotiate them up front.' },
      { q: 'How do you measure results?', a: 'Unique links, codes and platform data per creator, compared against cost.' },
      { q: 'Do you handle disclosures?', a: 'Yes. Every paid post carries the disclosures platform rules require.' },
    ],
  },
  {
    slug: 'google-business-profile',
    group: 'grow',
    name: 'Google Business Profile',
    title: 'Google Business Profile optimisation',
    line: 'Show up in the map pack when people nearby search for what you do.',
    metaDescription: 'Google Business Profile optimisation by Blizad: categories, services, photos, posts, reviews process and insights for local businesses in Raipur and beyond.',
    solves: [
      'Competitors appear on the map and you do not.',
      'Wrong hours, old photos and unanswered reviews.',
      'No idea how many calls and visits the profile drives.',
    ],
    included: [
      'Profile audit and accuracy fixes',
      'Categories, services and attributes',
      'Photos and regular posts',
      'Review request and response process',
      'Insights reporting',
      'Local landing-page coordination',
    ],
    howWeWork: standardProcess('Optimise'),
    faqs: [
      { q: 'Can you get us to number one on Maps?', a: 'No one can promise a position. We fix what Google uses — relevance, distance signals and prominence — and track the results.' },
      { q: 'Do you buy reviews?', a: 'Never. We set up an honest process to ask real customers.' },
      { q: 'We have several branches.', a: 'Each eligible location gets its own verified profile and consistent details.' },
      { q: 'How long does it take?', a: 'Fixes go live in days; ranking changes usually show over four to twelve weeks.' },
    ],
  },
  {
    slug: 'seo-geo-aeo',
    group: 'found',
    name: 'SEO, GEO & AEO',
    title: 'SEO, GEO and AEO',
    line: 'Be the result on Google, the source AI assistants cite, and the spoken answer.',
    metaDescription: 'SEO, GEO and AEO services by Blizad: technical SEO, content, schema and local search, plus generative and answer engine optimisation for AI and voice search.',
    solves: [
      'Your site does not rank for the searches your buyers make.',
      'ChatGPT, Gemini and Google AI Overviews describe your competitors, not you.',
      'Voice assistants and featured snippets answer with someone else’s page.',
    ],
    included: [
      'Technical SEO: crawlability, speed, Core Web Vitals, indexing',
      'Keyword and question research by buyer intent',
      'Content strategy and briefs written for people first',
      'Schema markup: Organization, Service, FAQ, Article',
      'GEO: clear facts, entity signals and citable pages for AI answers',
      'AEO: question-led sections and concise answers for snippets and voice',
      'Local search and internal linking',
      'Search Console and AI-visibility reporting',
    ],
    howWeWork: standardProcess('Build'),
    faqs: [
      { q: 'What is the difference between SEO, GEO and AEO?', a: 'SEO earns rankings in search results. GEO (generative engine optimisation) makes your pages easy for AI assistants to understand and cite. AEO (answer engine optimisation) shapes content into direct answers for featured snippets and voice.' },
      { q: 'Can you guarantee we appear in AI answers?', a: 'No. Nobody controls AI answers. We make your content accurate, structured and citable, which is what those systems draw on.' },
      { q: 'How long does SEO take?', a: 'Technical fixes help within weeks; content and authority usually take three to six months to compound.' },
      { q: 'Does this site practise what you sell?', a: 'Yes. It is pre-rendered HTML with structured data, an llms.txt file and question-led service pages.' },
    ],
  },
  {
    slug: 'web-development',
    group: 'build',
    name: 'Full-stack development',
    title: 'Full-stack web development',
    line: 'From marketing sites to marketplaces and platforms, engineered to production standard.',
    metaDescription: 'Full-stack web development by Blizad: fast marketing sites, web apps, e-commerce marketplaces and platforms with payments, auth and AI features.',
    solves: [
      'A slow, template site that looks like everyone else’s.',
      'A product idea that needs real engineering: accounts, payments, dashboards.',
      'An agency that disappears after launch and leaves code nobody can maintain.',
    ],
    included: [
      'Product scoping and architecture',
      'Design systems and premium front-ends (React, Next.js, Vite)',
      'Back-ends and APIs (Python, Node), databases and auth',
      'Payments, subscriptions and webhooks',
      'E-commerce and multi-vendor marketplaces',
      'AI features and automation built with Claude',
      'Analytics, SEO and performance built in from day one',
      'Documentation and handover',
    ],
    howWeWork: [
      { step: 'Scope', detail: 'We agree what success looks like, the must-haves and what can wait.' },
      { step: 'Design', detail: 'Clickable direction first, so you react to something real early.' },
      { step: 'Build', detail: 'Short cycles with a staging link you can open at any time.' },
      { step: 'Launch', detail: 'Measured quality gates — speed, accessibility, errors — before go-live.' },
    ],
    faqs: [
      { q: 'What have you built?', a: 'TuneFry (music distribution with royalties and payments), My Life Choices (a personalised e-commerce marketplace) and SCDM Accelerator (a hackathon platform for professionals).' },
      { q: 'Do I own the code?', a: 'Yes. The repository and accounts are yours on final payment.' },
      { q: 'How do you use AI?', a: 'We build with Claude to move faster, and every change still passes architecture review and measured QA gates before it ships.' },
      { q: 'Can you take over an existing project?', a: 'Yes. We start with a code and infrastructure review, then a plan.' },
    ],
  },
  {
    slug: 'website-management',
    group: 'build',
    name: 'Website management & optimisation',
    title: 'Website management and optimisation',
    line: 'Keep your site fast, accurate and converting, month after month.',
    metaDescription: 'Website management and optimisation by Blizad: speed, accessibility, UX and conversion improvements, content updates, landing pages and analytics QA.',
    solves: [
      'A site that was fast at launch and slow now.',
      'Content updates that wait weeks for a developer.',
      'Visitors arrive and leave without enquiring.',
    ],
    included: [
      'Speed and Core Web Vitals work',
      'Accessibility fixes',
      'UX and conversion-rate improvements',
      'Content and landing-page updates',
      'Technical health and analytics QA',
      'Ongoing maintenance',
    ],
    howWeWork: standardProcess('Improve'),
    faqs: [
      { q: 'Do you redesign the site too?', a: 'Redesigns are scoped separately; this service keeps an existing site healthy and converting.' },
      { q: 'Which platforms?', a: 'Custom React and Next.js sites, WordPress and most headless setups.' },
      { q: 'How fast are updates?', a: 'Turnaround is agreed in the plan; small changes are typically done within a couple of working days.' },
      { q: 'How do you measure improvement?', a: 'Speed scores, conversion rate and form completion, before and after each change.' },
    ],
  },
  {
    slug: 'hosting',
    group: 'run',
    name: 'Hosting & care',
    title: 'Managed hosting and care',
    line: 'Fast, secure hosting with monitoring and backups, run by the people who built it.',
    metaDescription: 'Managed hosting by Blizad: global CDN, SSL, domains, uptime monitoring, backups, security updates and deployments for websites and web apps.',
    solves: [
      'Cheap shared hosting that slows down when traffic arrives.',
      'Expired domains and SSL certificates discovered by customers.',
      'No backups, no monitoring and no one to call.',
    ],
    included: [
      'Hosting on a global CDN',
      'Domains, DNS and SSL',
      'Uptime and error monitoring',
      'Automated backups',
      'Security and dependency updates',
      'Deployments, staging and rollbacks',
    ],
    howWeWork: [
      { step: 'Audit', detail: 'We review your current hosting, domains and risks.' },
      { step: 'Migrate', detail: 'Planned move with staging and zero-downtime cut-over where possible.' },
      { step: 'Monitor', detail: 'Uptime, errors and certificates watched around the clock.' },
      { step: 'Maintain', detail: 'Updates, backups and a monthly health note.' },
    ],
    faqs: [
      { q: 'Can you host a site you did not build?', a: 'Usually, yes, after a short technical review.' },
      { q: 'Where is it hosted?', a: 'On established cloud and CDN providers chosen for your stack and audience.' },
      { q: 'What happens if the site goes down?', a: 'Monitoring alerts us immediately and we act; response times are set out in the hosting plan.' },
      { q: 'Do I keep control of my domain?', a: 'Yes. Domains stay registered to your business.' },
    ],
  },
]

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug)
export const servicesInGroup = (group: ServiceGroupId) => services.filter((s) => s.group === group)
