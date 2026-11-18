import { StackBuilder } from '@/components/marketplace/StackBuilder'
import { useMarketplace } from '@/components/marketplace/store'
import './market.css'

export function StackScene() {
  const { setPaletteOpen } = useMarketplace()
  return (
    <section className="stack-scene container-x section-y" aria-labelledby="stack-title">
      <p className="eyebrow">03 — Ask Blizad</p>
      <h2 id="stack-title" className="display mt-4">
        Tell us the goal. <span className="text-accent-2">We assemble the stack.</span>
      </h2>
      <div className="mt-12">
        <StackBuilder />
      </div>
      <button
        onClick={() => setPaletteOpen(true)}
        data-cursor="Ask"
        className="mt-10 inline-flex h-14 items-center rounded-btn bg-accent px-8 font-medium text-accent-fg transition hover:brightness-110"
      >
        Build my stack
      </button>
    </section>
  )
}
