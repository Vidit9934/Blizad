import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { MQ } from '../motion/MotionProvider'

interface SparklineProps {
  /** A real time series. Do not pass synthetic/placeholder points — see DESIGN.md Honesty rules. */
  points: number[]
  width?: number
  height?: number
  strokeWidth?: number
  className?: string
}

/**
 * Honest trend line for genuine time-series data. Not used by Proof today
 * (those figures are cumulative totals; a sparkline there would imply a false
 * history) — kept available for the day real period-over-period numbers exist.
 */
export function Sparkline({ points, width = 96, height = 28, strokeWidth = 1.6, className }: SparklineProps) {
  const line = useRef<SVGPolylineElement>(null)
  const valid = points.length >= 2

  // Hooks run unconditionally (rules of hooks) regardless of `valid`; the draw-in is a no-op when there's no line.
  useGSAP(
    () => {
      const el = line.current
      if (!el || !valid) return
      const length = el.getTotalLength()
      gsap.set(el, { strokeDasharray: length, strokeDashoffset: length })
      const mm = gsap.matchMedia()
      mm.add(MQ.full, () => {
        gsap.to(el, { strokeDashoffset: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
      })
      mm.add(MQ.reduced, () => gsap.set(el, { strokeDashoffset: 0 }))
    },
    { dependencies: [valid], scope: line },
  )

  if (!valid) return null

  const min = Math.min(...points)
  const max = Math.max(...points)
  const span = max - min || 1
  const step = width / (points.length - 1)
  const coords = points.map((value, index) => `${index * step},${height - ((value - min) / span) * height}`).join(' ')

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className} aria-hidden="true">
      <polyline ref={line} points={coords} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
