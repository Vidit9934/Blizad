import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Aisle } from '@/content/offerings'

interface Ctx {
  aisle: Aisle | 'all'
  query: string
  setAisle: (a: Aisle | 'all') => void
  setQuery: (q: string) => void
  goToAisle: (a: Aisle) => void
  ask: (q: string) => void
  paletteOpen: boolean
  setPaletteOpen: (v: boolean) => void
}

const MarketplaceCtx = createContext<Ctx | null>(null)

/** Shared by hero, nav palette and the shelf. DOM is only touched inside callbacks, never during render. */
export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [aisle, setAisle] = useState<Aisle | 'all'>('all')
  const [query, setQuery] = useState('')
  const [paletteOpen, setPaletteOpen] = useState(false)

  const scrollToShelf = () => {
    const el = document.getElementById('marketplace')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else window.location.assign('/#marketplace')
  }
  const goToAisle = useCallback((a: Aisle) => {
    setQuery('')
    setAisle(a)
    scrollToShelf()
  }, [])
  const ask = useCallback((q: string) => {
    setAisle('all')
    setQuery(q.trim())
    setPaletteOpen(false)
    scrollToShelf()
  }, [])

  const value = useMemo(
    () => ({ aisle, query, setAisle, setQuery, goToAisle, ask, paletteOpen, setPaletteOpen }),
    [aisle, query, goToAisle, ask, paletteOpen],
  )
  return <MarketplaceCtx.Provider value={value}>{children}</MarketplaceCtx.Provider>
}

export function useMarketplace() {
  const v = useContext(MarketplaceCtx)
  if (!v) throw new Error('useMarketplace must be used inside <MarketplaceProvider>')
  return v
}
