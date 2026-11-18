/**
 * The marketplace data model. Every status, price and ETA is a Claim: unconfirmed
 * status renders no badge, unconfirmed price renders "Custom quote", unconfirmed ETA is hidden.
 */
import type { Claim } from './site'

export type Aisle = 'marketing' | 'tech' | 'tools'
export type Goal = 'leads' | 'sales' | 'found' | 'launch' | 'speed'

export interface Offering {
  id: string
  aisle: Aisle
  name: string
  outcome: string
  includes: [string, string, string]
  goals: Goal[]
  keywords: string[]
  status: Claim<'live' | 'beta' | 'soon'>
  price?: Claim<string>
  eta?: Claim<string>
  href: string
}

export const AISLES: Record<Aisle, { label: string; text: string; stripe: string; blurb: string; hex: string }> = {
  marketing: { label: 'Marketing', text: 'text-accent-2', stripe: 'bg-accent', hex: '#3d5bff', blurb: 'Ads, social and search that bring buyers, not just clicks.' },
  tech: { label: 'Tech', text: 'text-fg', stripe: 'bg-fg', hex: '#ffffff', blurb: 'Websites, apps and hosting engineered to production standard.' },
  tools: { label: 'Tools', text: 'text-spark', stripe: 'bg-spark', hex: '#e8ff47', blurb: 'Self-serve products you can use today.' },
}

export const AISLE_ORDER: Aisle[] = ['marketing', 'tech', 'tools']

export const GOALS: Record<Goal, string> = {
  leads: 'More leads',
  sales: 'More sales',
  found: 'Be found (Google + AI)',
  launch: 'Launch something',
  speed: 'Speed & reliability',
}

const live = (confirmed = false): Offering['status'] => ({ value: 'live', confirmed })

export const OFFERINGS: Offering[] = [
  { id: 'meta-ads', aisle: 'marketing', name: 'Meta Ads & lead generation', outcome: 'Instagram and Facebook campaigns that bring buyers, not just clicks.',
    includes: ['Funnel + creative strategy', 'Pixel & CAPI tracking', 'Weekly optimisation'], goals: ['leads', 'sales'],
    keywords: ['meta', 'instagram', 'facebook', 'leads', 'ads', 'social', 'reels'], status: live(), href: '/marketing#meta-ads' },
  { id: 'google-ads', aisle: 'marketing', name: 'Google Ads', outcome: 'Show up the moment someone searches for what you sell.',
    includes: ['Search, PMax & YouTube', 'Conversion tracking', 'Budget pacing'], goals: ['leads', 'sales'],
    keywords: ['google', 'search', 'ads', 'ppc', 'youtube', 'leads', 'sales'], status: live(), href: '/marketing#google-ads' },
  { id: 'linkedin-ads', aisle: 'marketing', name: 'LinkedIn advertising', outcome: 'Reach decision-makers by company, role and seniority.',
    includes: ['Account-based targeting', 'Lead-gen forms', 'B2B reporting'], goals: ['leads'],
    keywords: ['linkedin', 'b2b', 'saas', 'decision', 'leads', 'enterprise'], status: live(), href: '/marketing#linkedin-ads' },
  { id: 'social', aisle: 'marketing', name: 'Social media marketing', outcome: 'A feed people actually stop scrolling for.',
    includes: ['Content calendar', 'Creator collaborations', 'Community management'], goals: ['leads', 'found'],
    keywords: ['social', 'instagram', 'content', 'creator', 'influencer', 'brand'], status: live(), href: '/marketing#social' },
  { id: 'seo-geo-aeo', aisle: 'marketing', name: 'SEO, GEO & AEO', outcome: 'Get named by Google, AI assistants and voice search.',
    includes: ['Technical + local SEO', 'AI-answer optimisation', 'Content that ranks'], goals: ['found', 'leads'],
    keywords: ['seo', 'google', 'rank', 'chatgpt', 'ai', 'geo', 'aeo', 'search', 'found', 'voice', 'local'], status: live(), href: '/marketing#seo-geo-aeo' },

  { id: 'websites', aisle: 'tech', name: 'Website development', outcome: 'Fast, beautiful sites built to convert, not just to exist.',
    includes: ['Design + copy', 'Full-stack build', 'Analytics & SEO setup'], goals: ['launch', 'leads', 'sales'],
    keywords: ['website', 'site', 'landing', 'redesign', 'clinic', 'restaurant', 'shop', 'ecommerce'], status: live(), href: '/tech#websites' },
  { id: 'web-apps', aisle: 'tech', name: 'Web apps & marketplaces', outcome: 'From idea to a production app with payments and admin.',
    includes: ['Product scoping', 'React + FastAPI + Supabase', 'Payments & dashboards'], goals: ['launch'],
    keywords: ['app', 'mvp', 'marketplace', 'saas', 'platform', 'dashboard', 'startup', 'product'], status: live(), href: '/tech#web-apps' },
  { id: 'website-care', aisle: 'tech', name: 'Website management & optimisation', outcome: 'Your site stays fast, fresh and converting.',
    includes: ['Speed optimisation', 'Monthly updates', 'Conversion fixes'], goals: ['speed', 'sales'],
    keywords: ['slow', 'speed', 'update', 'maintain', 'optimise', 'conversion', 'fix'], status: live(), href: '/tech#website-care' },
  { id: 'hosting', aisle: 'tech', name: 'Hosting & monitoring', outcome: 'Fast hosting and upkeep, so nothing you launch goes stale.',
    includes: ['Managed hosting + SSL', 'Uptime monitoring', 'Backups & security'], goals: ['speed'],
    keywords: ['hosting', 'server', 'down', 'uptime', 'fast', 'secure', 'ssl', 'domain'], status: live(), href: '/tech#hosting' },

  { id: 'website-builder', aisle: 'tools', name: 'Blizad Website Builder', outcome: 'Describe your business; get a studio-grade site in minutes.',
    includes: ['8 design styles', 'AI-written copy', 'Edit by chatting'], goals: ['launch', 'found'],
    keywords: ['website', 'builder', 'site', 'quick', 'diy', 'cheap', 'ai', 'launch'], status: { value: 'beta', confirmed: false }, href: '/tools#website-builder' },
  { id: 'growth-audit', aisle: 'tools', name: 'Growth Audit', outcome: "Paste your URL. See what's costing you customers.",
    includes: ['Speed + SEO check', 'Tracking check', 'Prioritised fixes'], goals: ['found', 'speed', 'leads'],
    keywords: ['audit', 'check', 'review', 'why', 'traffic', 'slow', 'seo'], status: live(), href: '/tools#growth-audit' },
  { id: 'blizad-hub', aisle: 'tools', name: 'Blizad Hub (CRM)', outcome: 'Every lead, reply and follow-up in one place.',
    includes: ['Lead inbox', 'Auto-replies', 'Pipeline view'], goals: ['leads', 'sales'],
    keywords: ['crm', 'leads', 'follow', 'pipeline', 'whatsapp', 'reply', 'manage'], status: { value: 'soon', confirmed: false }, href: '/tools#blizad-hub' },
]

/** Deterministic keyword match for Ask Blizad (no AI call). */
export function matchOfferings(query: string, list: Offering[] = OFFERINGS): Offering[] {
  const words = query.toLowerCase().split(/[^a-z0-9&]+/).filter((w) => w.length > 2)
  return list
    .map((o) => ({ o, score: o.keywords.reduce((s, k) => s + (words.some((w) => k.startsWith(w) || w.startsWith(k)) ? 1 : 0), 0) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.o)
}
