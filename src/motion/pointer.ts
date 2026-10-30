import type { RefObject } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { MQ } from './MotionProvider'

/** Magnetic pull toward the pointer (0.25 of the offset, clamped), spring back on leave. */
export function useMagnetic(ref: RefObject<HTMLElement | null>, strength = 0.25, max = 18) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.pointer, () => {
        const el = ref.current
        if (!el) return
        const toX = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' })
        const toY = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' })
        const clamp = gsap.utils.clamp(-max, max)
        const move = (event: PointerEvent) => {
          const rect = el.getBoundingClientRect()
          toX(clamp((event.clientX - (rect.left + rect.width / 2)) * strength))
          toY(clamp((event.clientY - (rect.top + rect.height / 2)) * strength))
        }
        const leave = () => {
          toX(0)
          toY(0)
        }
        el.addEventListener('pointermove', move)
        el.addEventListener('pointerleave', leave)
        return () => {
          el.removeEventListener('pointermove', move)
          el.removeEventListener('pointerleave', leave)
        }
      })
    },
    { dependencies: [] },
  )
}

/**
 * Pointer tilt up to `maxDeg`, measured against `area` (defaults to the element).
 * Also writes --sheen-x / --sheen-y (0–100%) so a CSS sheen can follow the light.
 */
export function useTilt(
  ref: RefObject<HTMLElement | SVGElement | null>,
  { maxDeg = 8, area }: { maxDeg?: number; area?: RefObject<HTMLElement | null> } = {},
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.pointer, () => {
        const el = ref.current
        const zone = area?.current ?? (el as HTMLElement | null)
        if (!el || !zone) return
        gsap.set(el, { transformPerspective: 900, transformOrigin: '50% 50%' })
        const rx = gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power3.out' })
        const ry = gsap.quickTo(el, 'rotationY', { duration: 0.8, ease: 'power3.out' })
        const move = (event: PointerEvent) => {
          const rect = zone.getBoundingClientRect()
          const px = (event.clientX - rect.left) / rect.width
          const py = (event.clientY - rect.top) / rect.height
          ry((px - 0.5) * 2 * maxDeg)
          rx(-(py - 0.5) * 2 * maxDeg)
          el.style.setProperty('--sheen-x', `${Math.round(px * 100)}%`)
          el.style.setProperty('--sheen-y', `${Math.round(py * 100)}%`)
        }
        const leave = () => {
          rx(0)
          ry(0)
        }
        zone.addEventListener('pointermove', move)
        zone.addEventListener('pointerleave', leave)
        return () => {
          zone.removeEventListener('pointermove', move)
          zone.removeEventListener('pointerleave', leave)
        }
      })
    },
    { dependencies: [] },
  )
}

/**
 * Writes --spot-x / --spot-y (0–100%) from the pointer's position inside `ref`'s
 * own bounding rect — event-driven, no continuous rAF loop. Pair with a child
 * element using `radial-gradient(... at var(--spot-x) var(--spot-y) ...)`,
 * revealed on `:hover`/`:focus-within` (see `.hero__spotlight` in home.css for
 * the original pattern this hook was extracted from).
 */
export function useSpotlight(ref: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.pointer, () => {
        const el = ref.current
        if (!el) return
        const move = (event: PointerEvent) => {
          const rect = el.getBoundingClientRect()
          el.style.setProperty('--spot-x', `${((event.clientX - rect.left) / rect.width) * 100}%`)
          el.style.setProperty('--spot-y', `${((event.clientY - rect.top) / rect.height) * 100}%`)
        }
        el.addEventListener('pointermove', move)
        return () => el.removeEventListener('pointermove', move)
      })
    },
    { dependencies: [] },
  )
}
