import { cn } from '@/lib/cn'
import '@/components/ui/ui.css'

/**
 * Static bolt for tier "off" and until WebGL reports ready (html[data-webgl="on"] hides it).
 * The glow is a radial gradient, not filter: blur() — blur on a large layer cost 20–30fps (CLAUDE.md).
 */
export function BoltFallback({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('bolt-fallback pointer-events-none', className)}>
      <div className="bolt-fallback__glow" />
      <svg viewBox="0 0 100 160" className="relative h-full w-full">
        <defs>
          <linearGradient id="bf" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="0.35" stopColor="#E8FF47" />
            <stop offset="1" stopColor="#2B4BFF" />
          </linearGradient>
        </defs>
        <path d="M58 4 L14 86 H46 L36 156 L86 66 H54 Z" fill="url(#bf)" opacity="0.92" />
      </svg>
    </div>
  )
}
