import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

/** Media queries shared by every motion effect — one source of truth. */
export const MQ = {
  full: '(prefers-reduced-motion: no-preference)',
  reduced: '(prefers-reduced-motion: reduce)',
  /** Fine pointer: custom cursor, magnetic and tilt. */
  pointer: '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
  /** Wide, motion-ok screens: pinned and horizontal scenes. */
  cinematic: '(min-width: 900px) and (prefers-reduced-motion: no-preference)',
} as const

interface MotionState {
  /** True once on the client and the visitor accepts motion. */
  enabled: boolean
}

const MotionContext = createContext<MotionState>({ enabled: false })
export const useMotion = () => useContext(MotionContext)

/**
 * Owns the single Lenis instance and the GSAP ticker hookup. Everything else
 * creates ScrollTriggers inside `useGSAP` scopes, so they revert on unmount.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const media = window.matchMedia(MQ.reduced)
    const sync = () => setEnabled(!media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 3), smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    window.__lenis = lenis
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      delete window.__lenis
    }
  }, [enabled])

  // New route: scroll to the hash target if there is one (React Router doesn't do this
  // itself on client-side navigation, unlike a real page load), otherwise to the top —
  // then re-measure once the new page has painted.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const target = hash ? document.querySelector(hash) : null
      if (target) {
        const navBottom = document.querySelector('.nav')?.getBoundingClientRect().bottom ?? 0
        const top = target.getBoundingClientRect().top + window.scrollY - navBottom - 24
        window.__lenis ? window.__lenis.scrollTo(top, { immediate: true, force: true }) : window.scrollTo(0, top)
      } else {
        window.__lenis ? window.__lenis.scrollTo(0, { immediate: true, force: true }) : window.scrollTo(0, 0)
      }
      ScrollTrigger.refresh()
    })
    return () => cancelAnimationFrame(id)
  }, [pathname, hash])

  return <MotionContext.Provider value={{ enabled }}>{children}</MotionContext.Provider>
}

declare global {
  interface Window {
    __lenis?: Lenis
  }
}
