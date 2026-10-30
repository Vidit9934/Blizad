import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { BoltIcon } from '../../components/BoltMark'
import { Icon, type IconName } from '../../components/Icon'
import {
  audienceOptions,
  goalOptions,
  recommendStack,
  websiteOptions,
  type Audience,
  type Goal,
  type Stage,
} from '../../content/estimator'
import { serviceBySlug } from '../../content/services'
import { useMagnetic, useTilt } from '../../motion/pointer'
import { useSceneReveals } from '../../motion/useSceneReveals'
import { setCharge } from '../../three/beatRig'
import { track } from '../../lib/track'

/** Delegated pointer-sheen for a mapped list of pills — cheaper than one useSpotlight hook per option. */
function sheenChoicePill(event: ReactPointerEvent<HTMLDivElement>) {
  const label = (event.target as HTMLElement).closest('label')
  if (!label) return
  const rect = label.getBoundingClientRect()
  label.style.setProperty('--spot-x', `${((event.clientX - rect.left) / rect.width) * 100}%`)
  label.style.setProperty('--spot-y', `${((event.clientY - rect.top) / rect.height) * 100}%`)
}

interface Choice<T extends string> {
  legend: string
  name: string
  options: { id: T; label: string; icon: IconName }[]
  value: T | null
  onChange: (value: T) => void
}

function ChoiceGroup<T extends string>({ legend, name, options, value, onChange }: Choice<T>) {
  return (
    <fieldset className="choice">
      <legend>{legend}</legend>
      <div className="choice__options" onPointerMove={sheenChoicePill}>
        {options.map((option) => (
          <label key={option.id} className="choice__pill">
            <input type="radio" name={name} value={option.id} checked={value === option.id} onChange={() => onChange(option.id)} />
            <span>
              <Icon name={option.icon} size={16} />
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/** Scene 10 — Decide. Three answers in, a recommended stack out. Always labelled as an estimate. */
export function Estimator() {
  const scope = useRef<HTMLElement>(null)
  const resultPanel = useRef<HTMLElement>(null)
  const cta = useRef<HTMLAnchorElement>(null)
  const [goal, setGoal] = useState<Goal | null>(null)
  const [website, setWebsite] = useState<Stage | null>(null)
  const [audience, setAudience] = useState<Audience | null>(null)
  useSceneReveals(scope)
  useTilt(resultPanel, { maxDeg: 3 })
  useMagnetic(cta, 0.2, 14)

  const answered = [goal, website, audience].filter(Boolean).length
  const result = goal && website && audience ? recommendStack({ goal, website, audience }) : null
  const firstService = result ? serviceBySlug(result.slugs[0]) : undefined

  // The 3D bolt is literally the charge meter here, echoing the existing flat estimator__meter.
  useEffect(() => {
    setCharge(answered / 3)
  }, [answered])

  return (
    <section ref={scope} className="scene estimator" aria-labelledby="estimator-title" data-product-screen data-beat="6">
      <div className="shell shell--wide estimator__grid">
        <div className="estimator__ask">
          <h2 id="estimator-title" className="t-display">
            What do you need first?
          </h2>
          <ChoiceGroup legend="Your main goal" name="goal" options={goalOptions} value={goal} onChange={setGoal} />
          <ChoiceGroup legend="Your website today" name="website" options={websiteOptions} value={website} onChange={setWebsite} />
          <ChoiceGroup legend="Who you sell to" name="audience" options={audienceOptions} value={audience} onChange={setAudience} />
        </div>

        <aside ref={resultPanel} className="estimator__result" aria-live="polite" style={{ ['--charge' as string]: answered / 3 }}>
          <div className="estimator__meter" aria-hidden="true">
            <BoltIcon className="estimator__bolt estimator__bolt--base" />
            <BoltIcon className="estimator__bolt estimator__bolt--fill" />
            <span className="estimator__charge">{Math.round((answered / 3) * 100)}%</span>
          </div>
          {result ? (
            <>
              <p className="t-kicker">Your starting stack (an estimate)</p>
              <ol role="list" className="estimator__stack">
                {result.slugs.map((slug) => {
                  const service = serviceBySlug(slug)
                  return service ? (
                    <li key={slug}>
                      <Link to={`/services/${slug}`}>{service.name}</Link>
                    </li>
                  ) : null
                })}
              </ol>
              <p className="estimator__weeks">
                First results in about {result.firstResultsWeeks[0]}–{result.firstResultsWeeks[1]} weeks
              </p>
              <p className="t-small">{result.note}</p>
              <Link
                ref={cta}
                to={`/contact?service=${encodeURIComponent(firstService?.name ?? '')}`}
                className="btn btn--primary btn--large"
                onClick={() => track('service_cta_click', { cta_position: 'estimator', service_name: firstService?.slug })}
              >
                Start with this plan
              </Link>
              <p className="t-note">An estimate from three answers, not a quote. We confirm scope after a short call.</p>
            </>
          ) : (
            <p className="t-small estimator__empty">
              Answer three questions and we’ll suggest where to start. {answered}/3 answered.
            </p>
          )}
        </aside>
      </div>
    </section>
  )
}
