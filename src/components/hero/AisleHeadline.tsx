import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/cn'
import { AISLES, AISLE_ORDER, OFFERINGS, type Aisle } from '@/content/offerings'
import { useMarketplace } from '@/components/marketplace/store'
import { story } from '@/components/immersive/story'

const EASE = [0.22, 1, 0.36, 1] as const

function Fan({ aisle }: { aisle: Aisle }) {
  const items = OFFERINGS.filter((o) => o.aisle === aisle).slice(0, 3)
  return (
    <div aria-hidden className="pointer-events-none absolute left-[calc(100%+2.5rem)] top-1/2 hidden h-0 w-[300px] lg:block">
      {items.map((o, i) => (
        <motion.div
          key={o.id}
          initial={{ opacity: 0, x: -30, rotate: 0, y: 0 }}
          animate={{ opacity: 1, x: i * 46, rotate: (i - 1) * 8, y: (i - 1) * 14 }}
          exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
          transition={{ duration: 0.55, ease: EASE, delay: i * 0.06 }}
          className="absolute left-0 top-0 w-[240px] origin-bottom-left -translate-y-1/2 rounded-card border border-line-strong bg-elev p-5 font-sans normal-case tracking-normal"
          style={{ zIndex: 3 - i }}
        >
          <span className={cn('absolute inset-x-5 top-0 h-px', AISLES[aisle].stripe)} />
          <p className={cn('font-mono text-xs uppercase tracking-widest', AISLES[aisle].text)}>{AISLES[aisle].label}</p>
          <p className="mt-3 font-display text-xl font-semibold leading-tight tracking-tight">{o.name}</p>
          <p className="mt-2 text-sm text-muted">{o.outcome}</p>
        </motion.div>
      ))}
    </div>
  )
}

/**
 * MARKETING. / TECH. / TOOLS. — the h1. Text is in the server HTML at its final position;
 * the rise-from-mask entrance only runs on the client once `ready`.
 */
export function AisleHeadline({ ready = true }: { ready?: boolean }) {
  // Server HTML (and no-JS / reduced motion) shows the final state; the mask entrance arms only after hydration.
  const [armed, setArmed] = useState(false)
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setArmed(true)
  }, [])
  const shown = !armed || ready
  const [hover, setHoverState] = useState<Aisle | null>(null)
  const setHover = (a: Aisle | null) => {
    setHoverState(a)
    story.hoverAisle = a // also tints the 3D bolt
  }
  const { goToAisle } = useMarketplace()
  return (
    <h1
      className="relative font-display font-bold uppercase leading-[0.84] tracking-[-0.045em]"
      aria-label="Marketing, tech and tools. Built for momentum."
    >
      {AISLE_ORDER.map((aisle, i) => (
        <span key={aisle} className="relative block w-fit" aria-hidden>
          <a
            href="/#marketplace"
            onClick={(e) => {
              e.preventDefault()
              goToAisle(aisle)
            }}
            onMouseEnter={() => setHover(aisle)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(aisle)}
            onBlur={() => setHover(null)}
            data-cursor="Explore"
            className={cn(
              'electric block overflow-hidden pb-[0.06em] text-[clamp(2.5rem,13.2vw,8rem)] outline-none transition-opacity duration-500 lg:text-[clamp(5rem,min(13.5vw,19vh),15rem)]',
              hover && hover !== aisle && 'opacity-20',
            )}
          >
            <motion.span
              className="inline-block"
              initial={false}
              animate={{ y: shown ? '0%' : '105%' }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.1 + i * 0.12 }}
            >
              {AISLES[aisle].label}
              <motion.span
                className={AISLES[aisle].text}
                initial={false}
                animate={armed && ready ? { opacity: [0, 1, 0.2, 1] } : { opacity: 1 }}
                transition={{ delay: 1.1 + i * 0.12, duration: 0.4, times: [0, 0.3, 0.6, 1] }}
              >
                .
              </motion.span>
            </motion.span>
          </a>
          <AnimatePresence>{hover === aisle && <Fan aisle={aisle} />}</AnimatePresence>
        </span>
      ))}
    </h1>
  )
}
