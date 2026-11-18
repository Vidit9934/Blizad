import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { MQ } from '../motion/MotionProvider'
import './current-path.css'

export interface CurrentPathNode {
  id: string
}

interface CurrentPathProps {
  nodes: CurrentPathNode[]
  /** `branch` fans the line out to N endpoints (Doors); `linear` lays it
   * straight with stations along the way (Path). One component, two layouts —
   * not two bespoke diagrams for the same idea. */
  mode: 'branch' | 'linear'
  className?: string
}

/**
 * The 2D sibling of the 3D "current" signature object (`Scene3DCanvas.tsx`)
 * — the same momentum/current idea, drawn at a different scale. Purely
 * decorative (`aria-hidden`); the real, accessible content (names, links) is
 * real DOM text rendered by the caller alongside this, not inside the SVG.
 */
export function CurrentPath({ nodes, mode, className = '' }: CurrentPathProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  const width = 1200
  const height = mode === 'branch' ? 260 : 120
  const n = Math.max(nodes.length, 1)

  const points = nodes.map((_, i) => {
    if (mode === 'linear') {
      return { x: n > 1 ? (width / (n - 1)) * i : width / 2, y: height / 2 }
    }
    const t = n > 1 ? i / (n - 1) : 0.5
    const curve = Math.sin(t * Math.PI) // 0 at the ends, 1 in the middle
    return { x: width * (0.08 + t * 0.84), y: height * (0.82 - curve * 0.6) }
  })

  const trunk = mode === 'branch' ? { x: 0, y: height * 0.95 } : points[0]
  const d = points.length
    ? `M ${trunk.x} ${trunk.y} ` + points.map((p) => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
    : ''

  useGSAP(
    () => {
      const path = pathRef.current
      const svg = svgRef.current
      if (!path || !svg) return
      const length = path.getTotalLength()
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
      gsap.set('.current-path__node', { opacity: 0, scale: 0.3, transformOrigin: '50% 50%' })
      const mm = gsap.matchMedia()
      mm.add(MQ.full, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: svg, start: 'top 82%', once: true } })
        tl.to(path, { strokeDashoffset: 0, duration: 1.3, ease: 'power2.out' }, 0).to(
          '.current-path__node',
          { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2.2)', stagger: 0.1 },
          0.3,
        )
      })
      mm.add(MQ.reduced, () => {
        gsap.set(path, { strokeDashoffset: 0 })
        gsap.set('.current-path__node', { opacity: 1, scale: 1 })
      })
    },
    { scope: svgRef, dependencies: [d] },
  )

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={`current-path current-path--${mode} ${className}`}
      aria-hidden="true"
    >
      <path ref={pathRef} d={d} className="current-path__line" fill="none" />
      {points.map((p, i) => (
        <circle key={nodes[i]?.id ?? i} className="current-path__node" cx={p.x} cy={p.y} r={mode === 'branch' ? 9 : 7} />
      ))}
    </svg>
  )
}
