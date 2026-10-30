import { site } from '../content/site'

/**
 * Lead handoff without a backend: validate on the client, then build a
 * prefilled WhatsApp or email message. Nothing is stored or sent anywhere
 * until the visitor sends it themselves.
 */
export interface Lead {
  name: string
  business: string
  email: string
  phone: string
  service: string
  website: string
  budget: string
  goal: string
  consent: boolean
}

export type LeadErrors = Partial<Record<keyof Lead, string>>

export const emptyLead: Lead = {
  name: '',
  business: '',
  email: '',
  phone: '',
  service: '',
  website: '',
  budget: '',
  goal: '',
  consent: false,
}

export const fieldLimits: Record<Exclude<keyof Lead, 'consent'>, number> = {
  name: 80,
  business: 120,
  email: 160,
  phone: 20,
  service: 80,
  website: 200,
  budget: 60,
  goal: 600,
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^\+?[0-9\s-]{8,16}$/

/** Strip control characters so a pasted value can't break the message layout. */
const clean = (value: string) => value.replace(/[\u0000-\u001f\u007f]/g, ' ').trim()

export function normaliseLead(lead: Lead): Lead {
  const out = { ...lead }
  for (const key of Object.keys(fieldLimits) as (keyof typeof fieldLimits)[]) {
    out[key] = clean(lead[key]).slice(0, fieldLimits[key])
  }
  return out
}

export function validateLead(raw: Lead): LeadErrors {
  const lead = normaliseLead(raw)
  const errors: LeadErrors = {}
  if (lead.name.length < 2) errors.name = 'Please enter your full name.'
  if (lead.business.length < 2) errors.business = 'Please enter your business or company.'
  if (!EMAIL.test(lead.email)) errors.email = 'Please enter a valid work email.'
  if (!PHONE.test(lead.phone)) errors.phone = 'Please enter a phone or WhatsApp number with country code.'
  if (!lead.service) errors.service = 'Choose the service you are interested in.'
  if (lead.website && !/^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/\S*)?$/i.test(lead.website))
    errors.website = 'Please enter a website like yourbusiness.com.'
  if (!lead.consent) errors.consent = 'Please agree so we can reply to you.'
  return errors
}

export function leadSummary(raw: Lead): string {
  const lead = normaliseLead(raw)
  const lines = [
    `New project enquiry for ${site.name}`,
    `Name: ${lead.name}`,
    `Business: ${lead.business}`,
    `Email: ${lead.email}`,
    `Phone / WhatsApp: ${lead.phone}`,
    `Service: ${lead.service}`,
    lead.website && `Website: ${lead.website}`,
    lead.budget && `Monthly marketing budget: ${lead.budget}`,
    lead.goal && `Growth goal: ${lead.goal}`,
  ]
  return lines.filter(Boolean).join('\n')
}

export const whatsappUrl = (text: string) =>
  `https://wa.me/${site.whatsapp.value}?text=${encodeURIComponent(text)}`

export const mailtoUrl = (subject: string, body: string) =>
  `mailto:${site.email.value}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
