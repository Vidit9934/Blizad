import type { IconName } from '../components/Icon'

/**
 * "Build your growth stack" — a deterministic rule set that turns three answers
 * into a recommended starting stack. Labelled as an estimate everywhere it shows.
 */
export type Goal = 'leads' | 'sales' | 'visibility' | 'launch'
export type Stage = 'none' | 'basic' | 'solid'
export type Audience = 'local' | 'india' | 'b2b'

export interface EstimatorAnswers {
  goal: Goal
  website: Stage
  audience: Audience
}

export interface StackRecommendation {
  slugs: string[]
  firstResultsWeeks: [number, number]
  note: string
}

export const goalOptions: { id: Goal; label: string; icon: IconName }[] = [
  { id: 'leads', label: 'More enquiries', icon: 'mail' },
  { id: 'sales', label: 'More online sales', icon: 'cart' },
  { id: 'visibility', label: 'Be found in search and AI', icon: 'found' },
  { id: 'launch', label: 'Launch a new product', icon: 'ship' },
]

export const websiteOptions: { id: Stage; label: string; icon: IconName }[] = [
  { id: 'none', label: 'No website yet', icon: 'plus' },
  { id: 'basic', label: 'It exists, but it’s slow or dated', icon: 'sliders' },
  { id: 'solid', label: 'It’s fast and converting', icon: 'check' },
]

export const audienceOptions: { id: Audience; label: string; icon: IconName }[] = [
  { id: 'local', label: 'Customers in my city', icon: 'pin' },
  { id: 'india', label: 'Customers across India', icon: 'map' },
  { id: 'b2b', label: 'Other businesses', icon: 'client' },
]

const channelFor: Record<Audience, string> = {
  local: 'google-business-profile',
  india: 'meta-ads-lead-generation',
  b2b: 'linkedin-ads',
}

export function recommendStack({ goal, website, audience }: EstimatorAnswers): StackRecommendation {
  const slugs: string[] = []

  if (website === 'none' || goal === 'launch') slugs.push('web-development')
  else if (website === 'basic') slugs.push('website-management')

  if (goal === 'visibility') slugs.push('seo-geo-aeo')
  if (goal === 'leads' || goal === 'sales') slugs.push(goal === 'sales' ? 'performance-marketing' : channelFor[audience])
  if (goal === 'launch') slugs.push('social-media-marketing')
  if (goal === 'visibility' && audience === 'local') slugs.push('google-business-profile')

  if (slugs.includes('web-development')) slugs.push('hosting')

  const buildsFirst = slugs.includes('web-development')
  const firstResultsWeeks: [number, number] = goal === 'visibility' ? [8, 16] : buildsFirst ? [6, 10] : [2, 4]
  const note = buildsFirst
    ? 'We build the site first, then switch on acquisition so every rupee lands somewhere that converts.'
    : goal === 'visibility'
      ? 'Search compounds: technical fixes land in weeks, content and citations build over months.'
      : 'Your site can carry traffic now, so we start with acquisition and tracking.'

  return { slugs: [...new Set(slugs)], firstResultsWeeks, note }
}
