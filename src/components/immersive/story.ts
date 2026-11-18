/** Mutable, frame-friendly story state read inside useFrame (no re-renders). */
import type { Aisle } from '@/content/offerings'

export type Stage = 'hero' | 'split' | 'manifesto' | 'footer'

export const story = {
  stage: 'hero' as Stage,
  split: 0, // 0..1 progress through the split scene
  pointer: { x: 0, y: 0 }, // -1..1
  hoverAisle: null as Aisle | null,
}
