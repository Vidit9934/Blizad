import type { RefObject } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { MQ } from './MotionProvider'

/** Seconds the preloader occupies on a first visit (see preloader.css). */
const PRELOADER_SECONDS = 1.3

/**
 * `data-reveal-delay="0.2"` → 0.2s. `"arrival"` or `"arrival+0.2"` waits for the
 * preloader on a first visit and starts almost at once on repeat visits.
 */
function parseDelay(value: string | undefined) {
  if (!value) return 0
  if (!value.startsWith('arrival')) return Number(value) || 0
  const extra = Number(value.slice('arrival'.length)) || 0
  return (document.documentElement.dataset.seen ? 0.1 : PRELOADER_SECONDS) + extra
}

/**
 * Declarative reveals for everything inside `scope`:
 *  - `data-reveal="lines"`  line-mask reveal (yPercent 110 → 0), staggered in reading order
 *  - `data-reveal="scrub"`  words scrub from 18% to 100% opacity with scroll
 *  - `data-reveal="rise"`   a quiet block entrance for non-text pieces (used sparingly)
 * Content is fully visible in the server HTML; motion only starts on the client
 * and only when the visitor accepts motion.
 */
export function useSceneReveals(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.full, () => {
        const root = scope.current
        if (!root) return

        root.querySelectorAll<HTMLElement>('[data-reveal="lines"]').forEach((el) => {
          const delay = parseDelay(el.dataset.revealDelay)
          SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            linesClass: 'split-line',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 1.1,
                ease: 'power3.out',
                stagger: 0.09,
                delay: 0.1 + delay,
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
              }),
          })
        })

        root.querySelectorAll<HTMLElement>('[data-reveal="scrub"]').forEach((el) => {
          const split = SplitText.create(el, { type: 'words' })
          gsap.fromTo(
            split.words,
            { opacity: 0.18 },
            {
              opacity: 1,
              ease: 'none',
              stagger: 0.08,
              scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 45%', scrub: 0.8 },
            },
          )

          // Opt-in only (`data-reveal-pointer="weight"`, used by Dream alone — the
          // "spend boldness in one place" rule): words gain weight as the cursor
          // nears them, scoped to this element's own rect, never `document`.
          if (el.dataset.revealPointer === 'weight') {
            const words = split.words as HTMLElement[]
            const mmPointer = gsap.matchMedia()
            mmPointer.add(MQ.pointer, () => {
              const setters = words.map((word) => gsap.quickTo(word, 'fontWeight', { duration: 0.5, ease: 'power3.out' }))
              const move = (event: PointerEvent) => {
                words.forEach((word, index) => {
                  const rect = word.getBoundingClientRect()
                  const distance = Math.hypot(event.clientX - (rect.left + rect.width / 2), event.clientY - (rect.top + rect.height / 2))
                  const t = gsap.utils.clamp(0, 1, 1 - distance / 220)
                  setters[index](450 + t * 200)
                })
              }
              const leave = () => words.forEach((_, index) => setters[index](450))
              el.addEventListener('pointermove', move)
              el.addEventListener('pointerleave', leave)
              return () => {
                el.removeEventListener('pointermove', move)
                el.removeEventListener('pointerleave', leave)
              }
            })
          }
        })

        root.querySelectorAll<HTMLElement>('[data-reveal="rise"]').forEach((el, index) => {
          gsap.from(el, {
            y: 36,
            opacity: 0,
            duration: 1.2,
            ease: 'expo.out',
            delay: (index % 4) * 0.08,
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          })
        })
      })
    },
    { scope },
  )
}
