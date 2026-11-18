import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface Theme {
  prompt: string
  name: string
  cta: string
  headline: string
  bg: string
  fg: string
  accent: string
  font: string
}
const THEMES: Theme[] = [
  { prompt: 'A neighbourhood café with a wood-fired oven', name: 'Ember & Oat', cta: 'Reserve a table', headline: 'Slow mornings, warm bread.', bg: '#f4ead8', fg: '#2a1c12', accent: '#c4572a', font: 'Georgia, serif' },
  { prompt: 'A modern dental clinic for families', name: 'Brightside Dental', cta: 'Book a visit', headline: 'Smiles that feel easy.', bg: '#eaf6fb', fg: '#0b2a3a', accent: '#0e86c7', font: 'system-ui, sans-serif' },
  { prompt: 'A B2B analytics tool for ops teams', name: 'Gridline', cta: 'Request a demo', headline: 'See the whole operation.', bg: '#0d0f1a', fg: '#eef0ff', accent: '#7b93ff', font: 'ui-monospace, monospace' },
]

/** The Website Builder's build loop: a sentence is typed, a tiny site morphs to match. Illustrative demo of the tool, not a client site. */
export function BuildStage() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-15% 0px' })
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [typed, setTyped] = useState('')
  const [built, setBuilt] = useState(false)
  const t = THEMES[i]

  useEffect(() => {
    if (reduce) {
      setTyped(t.prompt)
      setBuilt(true)
      return
    }
    if (!inView) return
    const timers: number[] = []
    const at = (ms: number, f: () => void) => timers.push(window.setTimeout(f, ms))
    setTyped('')
    setBuilt(false)
    for (let k = 1; k <= t.prompt.length; k++) at(k * 32, () => setTyped(t.prompt.slice(0, k)))
    const t0 = t.prompt.length * 32 + 300
    at(t0, () => setBuilt(true))
    at(t0 + 3800, () => setI((n) => (n + 1) % THEMES.length))
    return () => timers.forEach(clearTimeout)
  }, [i, inView, reduce, t])

  return (
    <div ref={ref} className="buildstage" role="img" aria-label="Demo: a sentence describing a business becomes a designed website">
      <p className="buildstage__prompt">
        <span className="text-accent-2">›</span> {typed}
        <span className="stack-caret" aria-hidden />
      </p>
      <div
        className="buildstage__site"
        data-built={built}
        style={{ ['--s-bg' as string]: t.bg, ['--s-fg' as string]: t.fg, ['--s-ac' as string]: t.accent, fontFamily: t.font }}
      >
        <div className="buildstage__bar">
          <strong>{t.name}</strong>
          <span>Menu · About · Contact</span>
        </div>
        <h3>{t.headline}</h3>
        <span className="buildstage__btn">{t.cta}</span>
        <div className="buildstage__tiles" aria-hidden>
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  )
}
