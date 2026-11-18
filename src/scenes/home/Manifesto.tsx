import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import './market.css'

const TEXT: { w: string; em?: boolean }[] = (
  "Most businesses juggle an ad agency, a dev shop, a hosting company and five tools that don't talk to each other. Every handover leaks money. Blizad puts *marketing*, *tech* and *tools* behind one counter: one plan, one team, one bill, so every move compounds into *momentum*."
)
  .split(' ')
  .map((raw) => {
    const em = /\*/.test(raw)
    return { w: raw.replace(/\*/g, ''), em }
  })

function Word({ w, em, p, range }: { w: string; em?: boolean; p: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(p, range, [0.18, 1])
  return (
    <motion.span style={{ opacity }} className={em ? 'text-spark' : undefined}>
      {w}{' '}
    </motion.span>
  )
}

/** Full-bleed Blitz Blue "drop". WorldTint recolours the page; the bolt reassembles in the empty right column. */
export function Manifesto() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.6'] })
  return (
    <section ref={ref} data-surface="accent" data-tint="#2B4BFF" data-3d="manifesto" className="manifesto container-x" aria-labelledby="manifesto-title">
      <div className="manifesto__text">
        <p className="eyebrow manifesto__eyebrow">05 — Why one counter</p>
        <h2 id="manifesto-title" className="sr-only">
          Why one counter
        </h2>
        <p className="manifesto__body">
          {TEXT.map((t, i) => (
            <Word key={i} w={t.w} em={t.em} p={scrollYProgress} range={[i / TEXT.length, Math.min(1, (i + 4) / TEXT.length)]} />
          ))}
        </p>
      </div>
    </section>
  )
}
