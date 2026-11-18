/** Small inline glyphs drawn from the brand bolt's geometry (not the stock icon-library set). */
export function BoltGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 160" aria-hidden className={className} fill="currentColor">
      <path d="M58 4 L14 86 H46 L36 156 L86 66 H54 Z" />
    </svg>
  )
}

export function TickGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5 6.5 12 13 4.5" />
    </svg>
  )
}
