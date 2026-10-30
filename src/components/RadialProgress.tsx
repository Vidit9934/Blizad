import { useId, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { MQ } from '../motion/MotionProvider'

interface RadialProgressProps {
  /** 0–1. An honest relative weight/completion indicator — never a fabricated trend. */
  value: number
  size?: number
  strokeWidth?: number
  /** Centre label, set in --font-mono by the caller. */
  label?: string
  className?: string
  /** When true, the ring reacts instantly to `value` changes (e.g. a live form). Default: draws in once on scroll. */
  live?: boolean
}

/**
 * Ring primitive shared by Proof (one honest weight indicator per stat) and the
 * Estimator (the live "answered" meter). Stroke-dasharray/offset only — no
 * canvas, no chart dependency. See DESIGN.md's Tech dashboard register.
 */
export function RadialProgress({ value, size = 56, strokeWidth = 4, label, className, live = false }: RadialProgressProps) {
  const id = useId()
  const ring = useRef<SVGCircleElement>(null)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.max(0, Math.min(1, value))

  useGSAP(
    () => {
      const el = ring.current
      if (!el) return
      if (live) {
        gsap.to(el, { strokeDashoffset: circumference * (1 - clamped), duration: 0.6, ease: 'power2.out' })
        return
      }
      const mm = gsap.matchMedia()
      mm.add(MQ.full, () => {
        gsap.fromTo(
          el,
          { strokeDashoffset: circumference },
          {
            strokeDashoffset: circumference * (1 - clamped),
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          },
        )
      })
      mm.add(MQ.reduced, () => {
        gsap.set(el, { strokeDashoffset: circumference * (1 - clamped) })
      })
    },
    { dependencies: [clamped, live], scope: ring },
  )

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-grad`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00bfef" />
          <stop offset="1" stopColor="#087cfa" />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth={strokeWidth} />
      <circle
        ref={ring}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={`url(#${id}-grad)`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={live ? circumference * (1 - clamped) : circumference}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      {label && (
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-mono)" fontSize={size * 0.22} fill="currentColor">
          {label}
        </text>
      )}
    </svg>
  )
}
