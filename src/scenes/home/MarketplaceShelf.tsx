import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
import { TickGlyph } from '@/components/ui/Glyphs'
import { cn } from '@/lib/cn'
import { AISLES, GOALS, OFFERINGS, matchOfferings, type Aisle, type Goal, type Offering } from '@/content/offerings'
import { useMarketplace } from '@/components/marketplace/store'
import './market.css'

const STATUS_LABEL = { live: 'Live', beta: 'Beta', soon: 'Coming soon' } as const

function OfferingCard({ o, suggested, dim }: { o: Offering; suggested: boolean; dim: boolean }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: dim ? 0.35 : 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      data-cursor="Open"
      className={cn(
        'group relative flex flex-col rounded-card border bg-elev p-6 transition-[border-color,translate] duration-300 hover:-translate-y-1',
        suggested ? 'border-accent shadow-[0_0_0_1px_var(--accent)]' : 'border-line hover:border-line-strong',
      )}
    >
      <span className={cn('absolute inset-x-6 top-0 h-px', AISLES[o.aisle].stripe)} />
      <div className="flex items-center justify-between gap-3">
        <span className={cn('font-mono text-xs uppercase tracking-widest', AISLES[o.aisle].text)}>{AISLES[o.aisle].label}</span>
        <span className="flex gap-2">
          {suggested && <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-fg">Suggested</span>}
          {o.status.confirmed && (
            <span
              className={cn(
                'rounded-full border px-2.5 py-1 font-mono text-[11px]',
                o.status.value === 'live' ? 'border-line text-muted' : 'border-spark/40 text-spark',
              )}
            >
              {STATUS_LABEL[o.status.value]}
            </span>
          )}
        </span>
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold leading-tight tracking-tight">{o.name}</h3>
      <p className="mt-2 text-muted">{o.outcome}</p>
      <ul className="mb-6 mt-5 space-y-2 text-sm" role="list">
        {o.includes.map((x) => (
          <li key={x} className="flex gap-2.5">
            <TickGlyph className="mt-0.5 size-4 shrink-0 text-accent-2" />
            {x}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-5">
        <div className="font-mono text-sm">
          <p>{o.price?.confirmed ? o.price.value : 'Custom quote'}</p>
          {o.eta?.confirmed && <p className="text-subtle">{o.eta.value}</p>}
        </div>
        <a
          href={o.href}
          aria-label={`${o.name}: details`}
          className="grid size-11 place-items-center rounded-full border border-line transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg"
        >
          <ArrowUpRight aria-hidden className="size-4" />
        </a>
      </div>
    </motion.article>
  )
}

export function MarketplaceShelf() {
  const { aisle, setAisle, query, setQuery, setPaletteOpen } = useMarketplace()
  const [goal, setGoal] = useState<Goal | 'all'>('all')
  const matched = query ? new Set(matchOfferings(query).map((o) => o.id)) : null
  const list = OFFERINGS.filter((o) => (aisle === 'all' || o.aisle === aisle) && (goal === 'all' || o.goals.includes(goal)))
  const tabs: (Aisle | 'all')[] = ['all', 'marketing', 'tech', 'tools']

  return (
    <section id="marketplace" className="marketplace-scene container-x section-y" aria-labelledby="shelf-title">
      <p className="eyebrow">02 — The marketplace</p>
      <h2 id="shelf-title" className="display mt-4">
        Pick an aisle. <span className="text-accent-2">Or pick a goal.</span>
      </h2>
      <p className="mt-5 max-w-[52ch] text-[clamp(1rem,1.2vw,1.125rem)] text-muted">
        Every offering is a clear product: what you get, how long it takes, and what it costs. Mix aisles freely; it is one team behind all of them.
      </p>

      <LayoutGroup>
        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div role="tablist" aria-label="Aisles" className="isolate flex w-fit flex-wrap gap-1 rounded-full border border-line bg-elev p-1">
            {tabs.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={aisle === t}
                onClick={() => setAisle(t)}
                className={cn(
                  'relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm transition-colors',
                  aisle === t ? 'text-bg' : 'text-muted hover:text-fg',
                )}
              >
                {aisle === t && <motion.span layoutId="aisle-pill" className="absolute inset-0 -z-10 rounded-full bg-fg" />}
                {t !== 'all' && <span className={cn('size-1.5 rounded-full', AISLES[t].stripe)} />}
                {t === 'all' ? 'All' : AISLES[t].label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(GOALS) as Goal[]).map((g) => (
              <button
                key={g}
                onClick={() => setGoal(goal === g ? 'all' : g)}
                aria-pressed={goal === g}
                className={cn(
                  'rounded-full border px-3.5 py-2 text-sm transition-colors',
                  goal === g ? 'border-accent bg-accent text-accent-fg' : 'border-line text-muted hover:text-fg',
                )}
              >
                {GOALS[g]}
              </button>
            ))}
          </div>
        </div>
      </LayoutGroup>

      {query && (
        <div className="mt-6 flex items-center justify-between gap-4 rounded-card border border-accent/50 bg-accent/10 px-5 py-3 text-sm" role="status">
          <span>
            Suggested for <span className="font-medium">“{query}”</span>
          </span>
          <button onClick={() => setQuery('')} aria-label="Clear suggestion" className="grid size-8 place-items-center rounded-full hover:bg-fg/10">
            <X aria-hidden className="size-4" />
          </button>
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((o) => (
            <OfferingCard key={o.id} o={o} suggested={!!matched?.has(o.id)} dim={!!matched && !matched.has(o.id)} />
          ))}
        </AnimatePresence>
      </div>

      <p className="mt-10 text-muted">
        Can’t find it?{' '}
        <button onClick={() => setPaletteOpen(true)} className="underline underline-offset-4 hover:text-fg">
          Tell us what you need
        </button>
      </p>
    </section>
  )
}
