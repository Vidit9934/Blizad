import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { MQ } from './MotionProvider'

type Listener = (value: number) => void

const listeners = new Set<Listener>()
let normalized = 0
let ticking = false

/** One shared gsap.ticker callback for every subscriber — mounting more consumers never stacks callbacks. */
function tick() {
  const lenis = window.__lenis
  const raw = lenis ? Math.abs(lenis.velocity) : 0
  const target = gsap.utils.clamp(0, 1, raw / 40)
  normalized += (target - normalized) * 0.15
  listeners.forEach((listener) => listener(normalized))
}

function subscribe(listener: Listener) {
  if (!ticking) {
    ticking = true
    gsap.ticker.add(tick)
  }
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0 && ticking) {
      ticking = false
      gsap.ticker.remove(tick)
    }
  }
}

/**
 * A single, damped 0–1 scroll-velocity signal derived from the existing Lenis
 * instance (Lenis already computes `.velocity` every frame — no new scroll
 * listener). `onChange` is called while motion is enabled; under
 * `prefers-reduced-motion` it is never called, so consumers should style their
 * reduced-motion/idle state as the default and only move things in `onChange`.
 */
export function useScrollVelocity(onChange: Listener) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.full, () => subscribe(onChange))
    },
    { dependencies: [] },
  )
}
