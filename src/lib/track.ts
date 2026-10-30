/**
 * Analytics events from the brief's tracking plan. Pushes to `window.dataLayer`
 * only when a tag manager has created it; otherwise does nothing.
 * Never pass personal data (names, emails, phone numbers) as parameters.
 */
export type TrackedEvent =
  | 'form_start'
  | 'form_error'
  | 'generate_lead'
  | 'request_growth_audit'
  | 'whatsapp_click'
  | 'service_cta_click'
  | 'case_study_view'

type Params = Partial<Record<'service_name' | 'lead_type' | 'cta_position' | 'page_path', string>>

declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}

export function track(event: TrackedEvent, params: Params = {}) {
  if (typeof window === 'undefined' || !Array.isArray(window.dataLayer)) return
  window.dataLayer.push({ event, page_path: window.location.pathname, ...params })
}
