import { cn } from '@/lib/cn'

/** I-6 letter-roll label. Put `group/roll` on the clickable parent. Static text is in the DOM for SSR/no-JS. */
export function RollText({ children, className }: { children: string; className?: string }) {
  const chars = [...children]
  const row = (hidden: boolean) => (
    <span aria-hidden className={cn('flex', hidden && 'absolute left-0 top-full')}>
      {chars.map((ch, i) => (
        <span
          key={i}
          className="inline-block transition-transform duration-500 ease-out-expo group-hover/roll:-translate-y-full group-focus-visible/roll:-translate-y-full"
          style={{ transitionDelay: `${i * 14}ms` }}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
  return (
    <span className={cn('relative inline-flex overflow-hidden', className)} aria-label={children}>
      {row(false)}
      {row(true)}
    </span>
  )
}
