import './placeholder-tag.css'

/** Visible marker for anything not yet confirmed by the owners. Renders nothing when confirmed. */
export function PlaceholderTag({ confirmed = false, label = 'Placeholder' }: { confirmed?: boolean; label?: string }) {
  if (confirmed) return null
  return (
    <span className="placeholder-tag" title="Awaiting owner confirmation before launch">
      {label}
    </span>
  )
}
