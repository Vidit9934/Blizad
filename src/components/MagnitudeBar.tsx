import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { MQ } from '../motion/MotionProvider'
import './magnitude-bar.css'

interface MagnitudeBarProps {
  /** A real proportion, 0–1 (e.g. `figure.weight / 3`) — never a fabricated trend. */
  value: number
  size?: number
  className?: string
}

/**
 * An honest relative-magnitude chart, not a time-series line. Proof's figures
 * are cumulative totals, not a history — `Sparkline.tsx`'s own comment already
 * refuses to be used here for exactly that reason (it would imply a false
 * past). This visualizes a real proportion (how this figure's weight compares
 * to the page's largest) as an ascending column chart, replacing the plain
 * `RadialProgress` ring with something that reads as a real embedded chart
 * without inventing any data.
 */
export function MagnitudeBar({ value, size = 56, className = '' }: MagnitudeBarProps) {
  const root = useRef<HTMLDivElement>(null)
  const columns = 5
  const filled = Math.round(Math.max(0, Math.min(1, value)) * columns)

  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      const bars = gsap.utils.toArray<HTMLElement>('.magnitude-bar__col', el)
      gsap.set(bars, { scaleY: 0, transformOrigin: '50% 100%' })
      const mm = gsap.matchMedia()
      mm.add(MQ.full, () => {
        gsap.to(bars, {
          scaleY: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.07,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })
      mm.add(MQ.reduced, () => gsap.set(bars, { scaleY: 1 }))
    },
    { scope: root },
  )

  return (
    <div ref={root} className={`magnitude-bar ${className}`} style={{ height: size }} aria-hidden="true">
      {Array.from({ length: columns }, (_, i) => (
        <span key={i} className="magnitude-bar__col" data-filled={i < filled} style={{ height: `${((i + 1) / columns) * 100}%` }} />
      ))}
    </div>
  )
}
