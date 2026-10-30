import { useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { MQ, useMotion } from './MotionProvider'

export type SceneTier = 'full' | 'light' | 'static'

/** Probed once per page load (module-level cache), never during Node prerendering — only read inside useGSAP/effects. */
let cachedWebGL2: boolean | null = null
function probeWebGL2(): boolean {
  if (cachedWebGL2 !== null) return cachedWebGL2
  try {
    const gl = document.createElement('canvas').getContext('webgl2')
    cachedWebGL2 = Boolean(gl)
  } catch {
    cachedWebGL2 = false
  }
  return cachedWebGL2
}

function lowEnd(): boolean {
  const cores = navigator.hardwareConcurrency ?? 4
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4
  return cores < 4 || mem < 4
}

/**
 * `full` | `light` | `static` | `null` (not yet probed, client not ready — treated as `static` by consumers).
 * `prefers-reduced-motion` always wins (`static`, no exceptions) — this is the existing `useMotion()` authority,
 * not a second motion toggle. Otherwise: no WebGL2 gives `static`; narrow or low-end gives `light`; wide and capable gives `full`.
 *
 * The camera poses in `poses.ts` are tuned for a wide, landscape-biased composition
 * (DESIGN.md: "the bolt sits right of the hero headline") — on a narrow phone
 * viewport the same pose can swing the object dramatically across the frame as it
 * interpolates, reading as the object sliding in from off-screen rather than a
 * deliberate camera move. Below the static icon's own existing mobile breakpoint
 * (760px, see signature.css), skip the 3D layer entirely in favour of the stable,
 * centered static icon — matching the "asymmetric, wide-only" visual language
 * the poses were actually designed for, rather than hand-tuning a second mobile
 * pose set.
 */
export function useSceneTier(): SceneTier | null {
  const { enabled } = useMotion()
  const [tier, setTier] = useState<SceneTier | null>(null)

  useGSAP(
    () => {
      if (!enabled) {
        setTier('static')
        return
      }
      if (!probeWebGL2()) {
        setTier('static')
        return
      }
      const mm = gsap.matchMedia()
      mm.add('(max-width: 760px)', () => {
        setTier('static')
      })
      mm.add('(min-width: 761px) and (max-width: 899px)', () => {
        setTier('light')
      })
      mm.add(MQ.cinematic, () => {
        setTier(lowEnd() ? 'light' : 'full')
      })
    },
    { dependencies: [enabled] },
  )

  return tier
}
