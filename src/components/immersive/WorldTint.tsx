import { useEffect } from 'react'

/** I-4: sections with data-tint recolour the whole page smoothly (no hard colour blocks). Client-only. */
export function WorldTint() {
  useEffect(() => {
    const body = document.body
    const base = body.style.backgroundColor
    body.style.transition = 'background-color 900ms cubic-bezier(.22,1,.36,1)'
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const tint = (e.target as HTMLElement).dataset.tint
          if (!tint) continue
          body.style.backgroundColor = e.isIntersecting ? tint : base
          document.documentElement.dataset.tint = e.isIntersecting ? 'on' : ''
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    const watch = () => document.querySelectorAll<HTMLElement>('[data-tint]').forEach((el) => io.observe(el))
    watch()
    const retry = window.setTimeout(watch, 600)
    return () => {
      io.disconnect()
      window.clearTimeout(retry)
      body.style.backgroundColor = base
      body.style.transition = ''
      document.documentElement.dataset.tint = ''
    }
  }, [])
  return null
}
