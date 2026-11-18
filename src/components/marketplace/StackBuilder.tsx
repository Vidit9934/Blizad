import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import { AISLES, OFFERINGS, type Offering } from '@/content/offerings'
import { cn } from '@/lib/cn'

type Scene = { goal: string; picks: { id: string; why: string }[] }
const SCENES: Scene[] = [
  {
    goal: "I'm opening a café in Raipur and need regulars",
    picks: [
      { id: 'website-builder', why: 'A site with your menu, live in minutes' },
      { id: 'seo-geo-aeo', why: "Show up for 'cafés near me' and in AI answers" },
      { id: 'meta-ads', why: 'Reels that bring your first visitors' },
      { id: 'hosting', why: 'Fast and always up on launch weekend' },
    ],
  },
  {
    goal: "We're a B2B SaaS and need qualified demos",
    picks: [
      { id: 'linkedin-ads', why: 'Reach heads of ops at target accounts' },
      { id: 'google-ads', why: "Capture high-intent 'software for…' searches" },
      { id: 'website-care', why: 'Faster pages, better demo conversion' },
      { id: 'blizad-hub', why: 'Every lead replied to quickly' },
    ],
  },
  {
    goal: 'I have a marketplace idea and need an MVP',
    picks: [
      { id: 'web-apps', why: 'Production MVP with payments and admin' },
      { id: 'hosting', why: 'Room to grow as your users do' },
      { id: 'growth-audit', why: 'Launch checklist before you go live' },
      { id: 'meta-ads', why: 'First buyers and sellers from day one' },
    ],
  },
]
const byId = (id: string) => OFFERINGS.find((o) => o.id === id) as Offering

/** Scripted loop: a goal is typed, Blizad assembles a cross-aisle stack. Runs only while in view. */
export function StackBuilder() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-15% 0px' })
  const reduce = useReducedMotion()
  const [s, setS] = useState(0)
  const [typed, setTyped] = useState('')
  const [count, setCount] = useState(0)
  const [reading, setReading] = useState(false)
  const scene = SCENES[s]

  useEffect(() => {
    if (reduce) {
      setTyped(scene.goal)
      setCount(scene.picks.length)
      return
    }
    if (!inView) return
    const timers: number[] = []
    const at = (ms: number, f: () => void) => timers.push(window.setTimeout(f, ms))
    setTyped('')
    setCount(0)
    setReading(false)
    const per = 30
    for (let k = 1; k <= scene.goal.length; k++) at(k * per, () => setTyped(scene.goal.slice(0, k)))
    const t0 = scene.goal.length * per + 200
    at(t0, () => setReading(true))
    scene.picks.forEach((_, i) =>
      at(t0 + 900 + i * 550, () => {
        setReading(false)
        setCount(i + 1)
      }),
    )
    at(t0 + 900 + scene.picks.length * 550 + 3200, () => setS((n) => (n + 1) % SCENES.length))
    return () => timers.forEach(clearTimeout)
  }, [s, inView, reduce, scene])

  const shown = scene.picks.slice(0, count).map((p) => ({ ...p, o: byId(p.id) }))
  const aisles = new Set(shown.map((x) => x.o.aisle)).size

  return (
    <div ref={ref} data-product-screen className="grid gap-6 lg:grid-cols-12">
      <div className="rounded-card border border-line bg-elev p-6 lg:col-span-5">
        <p className="eyebrow">Your goal</p>
        <p className="mt-4 min-h-[4.5rem] font-mono text-lg text-fg" aria-live="off">
          <span className="text-accent-2">›</span> {typed}
          <span className="stack-caret" aria-hidden />
        </p>
        <AnimatePresence>
          {reading && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-4 font-mono text-sm text-muted">
              Reading your goal…
            </motion.p>
          )}
        </AnimatePresence>
        <div className="mt-8 flex gap-2" aria-hidden>
          {SCENES.map((_, i) => (
            <span key={i} className={cn('h-1 rounded-full transition-all duration-500', i === s ? 'w-10 bg-spark' : 'w-5 bg-line-strong')} />
          ))}
        </div>
      </div>
      <div className="rounded-card border border-line-strong bg-elev p-2 lg:col-span-7">
        <ul className="min-h-[320px]" role="list">
          <AnimatePresence initial={false}>
            {shown.map(({ o, why }) => (
              <motion.li
                key={s + o.id}
                layout
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4 border-b border-line px-4 py-4 last:border-0"
              >
                <span className={cn('size-2.5 shrink-0 rounded-full', AISLES[o.aisle].stripe)} />
                <div className="flex-1">
                  <p className="font-medium">{o.name}</p>
                  <p className="text-sm text-muted">{why}</p>
                </div>
                <span className={cn('hidden font-mono text-xs uppercase tracking-widest sm:block', AISLES[o.aisle].text)}>
                  {AISLES[o.aisle].label}
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <div className="flex items-center justify-between rounded-md bg-fg/5 px-4 py-3 font-mono text-sm">
          <span>
            {count} offering{count === 1 ? '' : 's'} · {aisles} aisle{aisles === 1 ? '' : 's'} · one team
          </span>
          <span className={cn('size-2 rounded-full', count === scene.picks.length ? 'bg-spark' : 'bg-line-strong')} />
        </div>
      </div>
    </div>
  )
}
