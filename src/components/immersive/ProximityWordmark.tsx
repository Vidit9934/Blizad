import { useEffect, useRef } from 'react'

/** I-10: footer letters lift, tilt and flash spark as the cursor nears them. Fine pointers, motion-ok only. */
export function ProximityWordmark({ text }: { text: string }) {
  const letters = useRef<(HTMLSpanElement | null)[]>([])
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        for (const el of letters.current) {
          if (!el) continue
          const r = el.getBoundingClientRect()
          const cx = r.left + r.width / 2
          const cy = r.top + r.height / 2
          const k = Math.max(0, 1 - Math.hypot(e.clientX - cx, e.clientY - cy) / 420)
          el.style.transform = `translateY(${-k * 16}%) rotate(${(e.clientX < cx ? -1 : 1) * k * 5}deg)`
          el.style.color = k > 0.6 ? 'var(--spark)' : ''
        }
      })
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <p aria-label={text} className="proxmark">
      {[...text].map((ch, i) => (
        <span
          key={i}
          aria-hidden
          ref={(el) => {
            letters.current[i] = el
          }}
        >
          {ch}
        </span>
      ))}
    </p>
  )
}
