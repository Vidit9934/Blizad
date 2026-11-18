import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { AISLES, AISLE_ORDER, OFFERINGS } from '@/content/offerings'
import { useMarketplace } from '@/components/marketplace/store'
import { story } from '@/components/immersive/story'
import { cn } from '@/lib/cn'
import './market.css'

/**
 * Pinned (CSS sticky, no ScrollTrigger pin) 260vh scene on >=768px: the 3D bolt splits into
 * three shards that land above these three columns. On mobile it is three stacked aisle cards.
 */
export function SplitScene() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    story.split = v
  })
  const title = useTransform(scrollYProgress, [0, 0.12, 0.85, 1], [0, 1, 1, 0])
  const cols = useTransform(scrollYProgress, [0.38, 0.62], [0, 1])
  const colsY = useTransform(scrollYProgress, [0.38, 0.62], [40, 0])
  const { goToAisle } = useMarketplace()

  return (
    <>
      <section ref={ref} data-3d="split" className="split-scene" aria-label="One counter, three aisles">
        <div className="split-scene__stick">
          <motion.div style={{ opacity: title }} className="container-x text-center">
            <p className="eyebrow">One counter</p>
            {/* avoid-ai-design-ignore: SD5 - brief-mandated accent phrase, owner-approved v10 */}
            <h2 className="display mt-4">
              Every growth move. <span className="text-accent-2">Three aisles.</span>
            </h2>
          </motion.div>
          <motion.div style={{ opacity: cols, y: colsY }} className="container-x grid grid-cols-3 gap-8">
            {AISLE_ORDER.map((a) => (
              <div key={a} className="text-center">
                <p className={cn('display-sm', AISLES[a].text)}>{AISLES[a].label}</p>
                <p className="mx-auto mt-3 max-w-[30ch] text-muted">{AISLES[a].blurb}</p>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-subtle">
                  {OFFERINGS.filter((o) => o.aisle === a)
                    .slice(0, 3)
                    .map((o) => o.name)
                    .join(' · ')}
                </p>
                <button
                  onClick={() => goToAisle(a)}
                  data-cursor="Explore"
                  className="mt-6 text-sm underline underline-offset-4 hover:text-fg"
                >
                  Explore {AISLES[a].label.toLowerCase()}
                </button>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="split-mobile container-x" aria-label="One counter, three aisles">
        {/* avoid-ai-design-ignore: SD5 - brief-mandated accent phrase, owner-approved v10 */}
        <h2 className="display">
          Every growth move. <span className="text-accent-2">Three aisles.</span>
        </h2>
        {AISLE_ORDER.map((a) => (
          <button key={a} onClick={() => goToAisle(a)} className="split-mobile__card">
            <p className={cn('display-sm', AISLES[a].text)}>{AISLES[a].label}</p>
            <p className="mt-2 text-muted">{AISLES[a].blurb}</p>
          </button>
        ))}
      </section>
    </>
  )
}
