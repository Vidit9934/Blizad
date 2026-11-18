import { useId } from 'react'
import { cn } from '@/lib/cn'
import './ui.css'

/** Rotating circular text badge (pure CSS rotation, one element). */
export function RotatingBadge({ text, href, className }: { text: string; href: string; className?: string }) {
  const id = 'rb' + useId().replace(/[^a-zA-Z0-9]/g, '')
  const label = `${text} • `.repeat(2)
  return (
    <a href={href} aria-label={text} data-cursor="Go" className={cn('rbadge group/roll', className)}>
      <svg viewBox="0 0 120 120" className="rbadge__ring" aria-hidden>
        <defs>
          <path id={id} d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text className="rbadge__text">
          <textPath href={`#${id}`} textLength="285">
            {label.toUpperCase()}
          </textPath>
        </text>
      </svg>
      <span className="rbadge__bolt" aria-hidden>
        <svg viewBox="0 0 100 160" width="22" height="34">
          <path d="M58 4 L14 86 H46 L36 156 L86 66 H54 Z" fill="currentColor" />
        </svg>
      </span>
    </a>
  )
}
