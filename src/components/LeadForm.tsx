import { useId, useRef, useState, type FormEvent } from 'react'
import { services } from '../content/services'
import { site } from '../content/site'
import {
  emptyLead,
  fieldLimits,
  leadSummary,
  mailtoUrl,
  validateLead,
  whatsappUrl,
  type Lead,
  type LeadErrors,
} from '../lib/lead'
import { track } from '../lib/track'
import { Icon } from './Icon'
import './lead-form.css'

export type LeadType = 'project' | 'audit'

interface LeadFormProps {
  leadType?: LeadType
  defaultService?: string
  defaultWebsite?: string
  /** Shorter form for inline placements: hides budget and goal. */
  compact?: boolean
}

const budgets = ['Under ₹50,000 / month', '₹50,000 – ₹2 lakh / month', '₹2 – 10 lakh / month', 'Over ₹10 lakh / month', 'Project budget, not monthly']

/**
 * Validated enquiry form. On success it hands off to WhatsApp, email or the
 * clipboard — nothing is stored or sent to analytics.
 */
export function LeadForm({ leadType = 'project', defaultService = '', defaultWebsite = '', compact }: LeadFormProps) {
  const [lead, setLead] = useState<Lead>({
    ...emptyLead,
    service: defaultService || (leadType === 'audit' ? 'Digital growth audit' : ''),
    website: defaultWebsite,
  })
  const [errors, setErrors] = useState<LeadErrors>({})
  const [done, setDone] = useState(false)
  const [copied, setCopied] = useState(false)
  const started = useRef(false)
  const errorSummary = useRef<HTMLDivElement>(null)
  const uid = useId()

  const update = <K extends keyof Lead>(key: K, value: Lead[K]) => {
    if (!started.current) {
      started.current = true
      track('form_start', { lead_type: leadType })
    }
    setLead((current) => ({ ...current, [key]: value }))
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const found = validateLead(lead)
    setErrors(found)
    if (Object.keys(found).length) {
      track('form_error', { lead_type: leadType })
      requestAnimationFrame(() => errorSummary.current?.focus())
      return
    }
    track(leadType === 'audit' ? 'request_growth_audit' : 'generate_lead', { lead_type: leadType, service_name: lead.service })
    setDone(true)
  }

  if (done) {
    const summary = leadSummary(lead)
    const subject = leadType === 'audit' ? `Growth audit request — ${lead.business}` : `Project enquiry — ${lead.business}`
    const copy = async () => {
      try {
        await navigator.clipboard.writeText(summary)
        setCopied(true)
      } catch {
        setCopied(false)
      }
    }
    return (
      <div className="lead-done" role="status" aria-live="polite">
        <h3 className="t-title">Ready to send, {lead.name.split(' ')[0]}.</h3>
        <p className="t-small">
          Choose how you’d like to send your details. We reply within one working day. Nothing has been stored on this site.
        </p>
        <div className="btn-row">
          <a
            className="btn btn--primary btn--large"
            href={whatsappUrl(summary)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('whatsapp_click', { cta_position: 'lead_form', lead_type: leadType })}
          >
            <Icon name="whatsapp" size={18} />
            Send on WhatsApp
          </a>
          <a className="btn btn--large" href={mailtoUrl(subject, summary)}>
            <Icon name="mail" size={18} />
            Send by email
          </a>
          <button type="button" className="btn btn--quiet" onClick={copy}>
            <Icon name="copy" size={18} />
            {copied ? 'Copied' : 'Copy summary'}
          </button>
        </div>
        <pre className="lead-done__summary">{summary}</pre>
        <button type="button" className="text-link lead-done__edit" onClick={() => setDone(false)}>
          Edit details
        </button>
      </div>
    )
  }

  const errorCount = Object.values(errors).filter(Boolean).length
  const field = (key: keyof Lead) => ({
    id: `${uid}-${key}`,
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${uid}-${key}-error` : undefined,
  })
  const errorText = (key: keyof Lead) =>
    errors[key] ? (
      <p className="field-error" id={`${uid}-${key}-error`}>
        {errors[key]}
      </p>
    ) : null

  return (
    <form className="lead-form" onSubmit={submit} noValidate>
      <div ref={errorSummary} tabIndex={-1} className="lead-form__summary" aria-live="assertive">
        {errorCount > 0 && <p>Please check {errorCount === 1 ? 'one field' : `${errorCount} fields`} below.</p>}
      </div>

      <div className="lead-form__grid">
        <div className="field">
          <label htmlFor={`${uid}-name`}>Full name</label>
          <input {...field('name')} autoComplete="name" maxLength={fieldLimits.name} value={lead.name} onChange={(e) => update('name', e.target.value)} />
          {errorText('name')}
        </div>
        <div className="field">
          <label htmlFor={`${uid}-business`}>Business or company</label>
          <input {...field('business')} autoComplete="organization" maxLength={fieldLimits.business} value={lead.business} onChange={(e) => update('business', e.target.value)} />
          {errorText('business')}
        </div>
        <div className="field">
          <label htmlFor={`${uid}-email`}>Work email</label>
          <input {...field('email')} type="email" autoComplete="email" maxLength={fieldLimits.email} value={lead.email} onChange={(e) => update('email', e.target.value)} />
          {errorText('email')}
        </div>
        <div className="field">
          <label htmlFor={`${uid}-phone`}>Phone or WhatsApp</label>
          <input {...field('phone')} type="tel" autoComplete="tel" placeholder="+91" maxLength={fieldLimits.phone} value={lead.phone} onChange={(e) => update('phone', e.target.value)} />
          {errorText('phone')}
        </div>
        <div className="field">
          <label htmlFor={`${uid}-service`}>What do you need?</label>
          <select {...field('service')} value={lead.service} onChange={(e) => update('service', e.target.value)}>
            <option value="">Choose a service</option>
            <option>Digital growth audit</option>
            {services.map((service) => (
              <option key={service.slug}>{service.name}</option>
            ))}
            <option>Not sure yet</option>
          </select>
          {errorText('service')}
        </div>
        <div className="field">
          <label htmlFor={`${uid}-website`}>
            Website <span className="optional">(optional)</span>
          </label>
          <input {...field('website')} inputMode="url" placeholder="yourbusiness.com" maxLength={fieldLimits.website} value={lead.website} onChange={(e) => update('website', e.target.value)} />
          {errorText('website')}
        </div>
        {!compact && (
          <>
            <div className="field">
              <label htmlFor={`${uid}-budget`}>
                Marketing budget <span className="optional">(optional)</span>
              </label>
              <select {...field('budget')} value={lead.budget} onChange={(e) => update('budget', e.target.value)}>
                <option value="">Prefer not to say</option>
                {budgets.map((budget) => (
                  <option key={budget}>{budget}</option>
                ))}
              </select>
            </div>
            <div className="field lead-form__wide">
              <label htmlFor={`${uid}-goal`}>
                Your growth goal <span className="optional">(optional)</span>
              </label>
              <textarea {...field('goal')} maxLength={fieldLimits.goal} value={lead.goal} onChange={(e) => update('goal', e.target.value)} />
            </div>
          </>
        )}
      </div>

      <div className="field lead-form__consent">
        <label className="checkbox">
          <input type="checkbox" {...field('consent')} checked={lead.consent} onChange={(e) => update('consent', e.target.checked)} />
          <span>
            I agree that {site.name} may contact me about this enquiry. See the <a href="/privacy">privacy notice</a>.
          </span>
        </label>
        {errorText('consent')}
      </div>

      <button type="submit" className="btn btn--primary btn--large lead-form__submit">
        {leadType === 'audit' ? 'Request my growth audit' : 'Start my project'}
      </button>
      <p className="t-note">Takes about a minute. You choose how to send it on the next step.</p>
    </form>
  )
}
