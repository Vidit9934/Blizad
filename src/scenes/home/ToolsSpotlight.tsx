import { BuildStage } from '@/components/marketplace/BuildStage'
import { site } from '@/content/site'
import './market.css'

const builderUrl = (import.meta.env.VITE_BUILDER_URL as string | undefined) ?? '/contact'

export function ToolsSpotlight() {
  return (
    <section className="tools-scene container-x section-y" aria-labelledby="tools-title" id="tools">
      <p className="eyebrow">04 — Tools</p>
      {/* avoid-ai-design-ignore: SD5 - brief-mandated accent phrase, owner-approved v10 */}
      <h2 id="tools-title" className="display mt-4">
        Use it yourself. <span className="text-spark">Today.</span>
      </h2>

      <article className="tool-card tool-card--lead mt-12">
        <div>
          <h3 className="display-sm">Blizad Website Builder</h3>
          <p className="mt-4 max-w-[40ch] text-muted">
            Describe your business in one sentence; get a studio-grade website, designed, written and animated.
          </p>
          <a href={builderUrl} data-cursor="Open" className="mt-8 inline-flex h-12 items-center rounded-btn bg-accent px-6 font-medium text-accent-fg hover:brightness-110">
            Try the builder
          </a>
        </div>
        <BuildStage />
      </article>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <article className="tool-card" id="growth-audit">
          <h3 className="display-sm">Growth Audit</h3>
          <p className="mt-3 text-muted">Paste your website. Get a clear list of what is costing you customers.</p>
          <form method="get" action="/contact" className="askbar mt-6">
            <input type="hidden" name="type" value="audit" />
            <label htmlFor="audit-url" className="sr-only">
              Your website
            </label>
            <input
              id="audit-url"
              name="website"
              inputMode="url"
              placeholder="yourbusiness.com"
              className="ml-4 h-12 min-w-0 flex-1 bg-transparent font-mono text-sm text-fg placeholder:text-subtle"
            />
            <button type="submit" className="h-12 shrink-0 rounded-btn bg-accent px-5 text-sm font-medium text-accent-fg hover:brightness-110">
              Run audit
            </button>
          </form>
        </article>

        <article className="tool-card" id="blizad-hub">
          <h3 className="display-sm">Blizad Hub</h3>
          <p className="mt-3 text-muted">Every lead, reply and follow-up in one place, built for how we already work with you.</p>
          <ol className="hub-steps mt-6" role="list">
            <li>Lead comes in</li>
            <li>Auto-reply</li>
            <li>Follow-up on time</li>
          </ol>
          <a
            href={`mailto:${site.email.value}?subject=${encodeURIComponent('Blizad Hub waitlist')}`}
            className="mt-6 inline-block text-sm underline underline-offset-4 hover:text-fg"
          >
            Join the waitlist
          </a>
        </article>
      </div>
    </section>
  )
}
