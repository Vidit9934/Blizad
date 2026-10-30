import { useEffect, useState, type ComponentType } from 'react'
import { useMotion } from '../motion/MotionProvider'
import { useSceneTier } from '../motion/useSceneTier'
import { SignatureStatic } from '../components/SignatureStatic'
import './signature.css'

type SceneModule = { Scene3DCanvas: ComponentType }

/**
 * The only file in `Layout.tsx`'s import graph that may ever lead to `three`/
 * `@react-three/*`. This file itself must NEVER statically import them.
 *
 * Why this is safe under `vite-react-ssg`'s real Node prerendering (not just
 * "structurally similar" to a client-only app): the dynamic `import('./Scene3DCanvas')`
 * call sits inside a `useEffect` body, which React/Node never executes outside a
 * committed DOM. A `React.lazy` + `Suspense` version would NOT be safe here —
 * `vite-react-ssg`'s prerender still invokes a lazy factory's `import()` during
 * the server render pass even inside `Suspense`, which is exactly where a
 * three.js module-eval side effect could surface. A plain effect-gated function
 * call has no such edge: nothing three-related is reachable from any module
 * graph the prerenderer walks.
 */
export function Scene3DBoundary() {
  const { enabled } = useMotion() // false in Node, false until motion is accepted on the client
  const tier = useSceneTier() // 'full' | 'light' | 'static' | null
  const [mod, setMod] = useState<SceneModule | null>(null)

  useEffect(() => {
    if (tier !== 'full' && tier !== 'light') return
    let cancelled = false
    import('./Scene3DCanvas').then((m) => {
      if (!cancelled) setMod(m)
    })
    return () => {
      cancelled = true
    }
  }, [tier])

  if (!enabled || tier === 'static' || tier === null || !mod) return <SignatureStatic />
  return <mod.Scene3DCanvas />
}
