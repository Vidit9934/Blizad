import { Children, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import './ui.css'

/** CSS-only looping band (transform animation, compositor-friendly). Reduced motion stops it via ui.css. */
export function LoopBand({
  children,
  seconds = 50,
  reverse = false,
  className,
}: {
  children: ReactNode
  seconds?: number
  reverse?: boolean
  className?: string
}) {
  const items = Children.toArray(children)
  return (
    <div className={cn('marquee', className)} style={{ ['--marquee-s' as string]: `${seconds}s` }}>
      <div className={cn('marquee__track', reverse && 'marquee__track--rev')}>
        <div className="marquee__set">{items}</div>
        <div className="marquee__set" aria-hidden>
          {items}
        </div>
      </div>
    </div>
  )
}
