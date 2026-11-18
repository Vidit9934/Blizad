import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { matchOfferings, AISLES } from '@/content/offerings'
import { cn } from '@/lib/cn'
import { useMarketplace } from './store'

/** ⌘K / Ctrl+K command palette. Renders nothing while closed, so prerender is unaffected. */
export function AskPalette() {
  const { paletteOpen, setPaletteOpen, ask } = useMarketplace()
  const [q, setQ] = useState('')
  const returnTo = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen(!paletteOpen)
      }
      if (e.key === 'Escape' && paletteOpen) setPaletteOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [paletteOpen, setPaletteOpen])

  useEffect(() => {
    if (paletteOpen) returnTo.current = document.activeElement as HTMLElement | null
    else returnTo.current?.focus?.()
  }, [paletteOpen])

  const results = q.trim().length > 2 ? matchOfferings(q).slice(0, 5) : []
  return (
    <AnimatePresence>
      {paletteOpen && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-start bg-bg/85 px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setPaletteOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Ask Blizad"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 20, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-2xl overflow-hidden rounded-card border border-line-strong bg-elev"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (q.trim()) ask(q)
              }}
            >
              <label htmlFor="ask-palette" className="sr-only">
                What do you need?
              </label>
              <input
                id="ask-palette"
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="What do you need? e.g. more leads from Instagram"
                className="h-16 w-full border-b border-line bg-transparent px-6 font-mono text-fg outline-none placeholder:text-subtle"
              />
            </form>
            <ul className="max-h-[50vh] overflow-y-auto p-2" role="list">
              {results.map((o) => (
                <li key={o.id}>
                  <a
                    href={o.href}
                    onClick={() => setPaletteOpen(false)}
                    className="flex items-center gap-4 rounded-md px-4 py-3 hover:bg-fg/5 focus-visible:bg-fg/5"
                  >
                    <span className={cn('size-2 shrink-0 rounded-full', AISLES[o.aisle].stripe)} />
                    <span className="flex-1">
                      <span className="block font-medium">{o.name}</span>
                      <span className="block text-sm text-muted">{o.outcome}</span>
                    </span>
                    <span className={cn('font-mono text-xs uppercase tracking-widest', AISLES[o.aisle].text)}>
                      {AISLES[o.aisle].label}
                    </span>
                  </a>
                </li>
              ))}
              {q.trim().length > 2 && results.length === 0 && (
                <li className="px-4 py-6 text-center text-muted">
                  Nothing matched.{' '}
                  <button className="underline" onClick={() => ask(q)}>
                    Send it to our team
                  </button>{' '}
                  and we will tell you what fits.
                </li>
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
