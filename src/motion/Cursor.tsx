import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { MQ } from './MotionProvider'
import './cursor.css'

/**
 * One fixed element following the pointer. Grows and shows a label over any
 * element (or ancestor) with `data-cursor="Label"`. Fine pointers only.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MQ.pointer, () => {
      const el = ref.current
      if (!el) return
      document.documentElement.classList.add('has-cursor')
      const toX = gsap.quickTo(el, 'x', { duration: 0.25, ease: 'power3.out' })
      const toY = gsap.quickTo(el, 'y', { duration: 0.25, ease: 'power3.out' })
      let current = ''

      const move = (event: PointerEvent) => {
        toX(event.clientX)
        toY(event.clientY)
        el.dataset.visible = 'true'
      }
      const over = (event: PointerEvent) => {
        const target = event.target as Element | null
        const labelled = target?.closest<HTMLElement>('[data-cursor]')
        const interactive = target?.closest('a, button, summary, label, select, input, textarea')
        const next = labelled?.dataset.cursor ?? ''
        el.dataset.state = next ? 'label' : interactive ? 'link' : 'idle'
        if (next !== current) {
          current = next
          setLabel(next)
        }
      }
      const hide = () => {
        el.dataset.visible = 'false'
      }

      window.addEventListener('pointermove', move, { passive: true })
      window.addEventListener('pointerover', over, { passive: true })
      document.addEventListener('pointerleave', hide)
      return () => {
        document.documentElement.classList.remove('has-cursor')
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerover', over)
        document.removeEventListener('pointerleave', hide)
      }
    })
  })

  return (
    <div ref={ref} className="cursor" data-state="idle" data-visible="false" aria-hidden="true">
      <span className="cursor__ring" />
      <span className="cursor__label">{label}</span>
    </div>
  )
}
