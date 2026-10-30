import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { subscribeBeat } from './beatRig'
import { poses, type Pose } from './poses'

/**
 * Only ever reached via a runtime `import('./Scene3DCanvas')` call inside a
 * `useEffect` (see `Scene3DBoundary.tsx`) — never a static import, never
 * `React.lazy`. Safe to import `three`/`@react-three/fiber` at top level here.
 */

const CYAN = new THREE.Color('#00bfef')
const ELECTRIC = new THREE.Color('#087cfa')

// BOLT_STRIKE's exact point list from BoltMark.tsx, SVG coords (y-down, 120x120 viewBox),
// re-centred and flipped for a 3D up-axis.
const STRIKE_POINTS_SVG: [number, number][] = [
  [104, 12],
  [56, 64],
  [80, 64],
  [62, 98],
  [108, 44],
  [84, 44],
]

function toShape(points: [number, number][]) {
  const shape = new THREE.Shape()
  points.forEach(([x, y], i) => {
    const px = (x - 60) / 60
    const py = -(y - 60) / 60
    if (i === 0) shape.moveTo(px, py)
    else shape.lineTo(px, py)
  })
  shape.closePath()
  return shape
}

// An open, rounded rectangle bracket approximating BOLT_FRAME, sampled as 3D points for a tube.
function frameCurve() {
  const r = 0.35
  const pts: THREE.Vector3[] = []
  const corner = (cx: number, cy: number, a0: number, a1: number, steps = 6) => {
    for (let i = 0; i <= steps; i++) {
      const a = a0 + ((a1 - a0) * i) / steps
      pts.push(new THREE.Vector3(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 0))
    }
  }
  pts.push(new THREE.Vector3(0.35, 1.0, 0))
  pts.push(new THREE.Vector3(-0.65, 1.0, 0))
  corner(-0.65, 0.65, Math.PI / 2, Math.PI)
  pts.push(new THREE.Vector3(-1.0, -0.65, 0))
  corner(-0.65, -0.65, Math.PI, Math.PI * 1.5)
  pts.push(new THREE.Vector3(0.65, -1.0, 0))
  corner(0.65, -0.65, -Math.PI / 2, 0)
  pts.push(new THREE.Vector3(1.0, 0.45, 0))
  return new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.2)
}

function Bolt() {
  const group = useRef<THREE.Group>(null)
  const strikeMat = useRef<THREE.MeshStandardMaterial>(null)
  const frameMat = useRef<THREE.MeshBasicMaterial>(null)
  const poseRef = useRef<Pose>(poses[0])
  const fractureRef = useRef(0)
  const idle = useRef(0)
  const pointer = useRef({ x: 0, y: 0 })

  const strikeGeometry = useMemo(
    () => new THREE.ExtrudeGeometry(toShape(STRIKE_POINTS_SVG), { depth: 0.22, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03 }),
    [],
  )
  const frameGeometry = useMemo(() => new THREE.TubeGeometry(frameCurve(), 64, 0.05, 8, false), [])

  useEffect(() => {
    const unsubscribe = subscribeBeat((pose) => {
      poseRef.current = pose
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    const move = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  useFrame((state, delta) => {
    const pose = poseRef.current
    idle.current += delta * 0.14 // ~1 slow revolution every ~45s, always-on per the "never fully settles" brief
    if (group.current) {
      const targetY = idle.current + pointer.current.x * 0.25
      const targetX = pointer.current.y * -0.18
      group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(1, delta * 3)
      group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(1, delta * 3)
      // Fracture (Pipeline's compare toggle): spreads frame+strike apart along X.
      const spread = fractureRef.current * 0.9
      group.current.children[0]?.position.set(-spread, 0, 0)
      group.current.children[1]?.position.set(spread * 0.4, 0, 0)
    }
    state.camera.position.set(...pose.cam)
    state.camera.lookAt(...pose.look)
    if (strikeMat.current) {
      strikeMat.current.color.copy(CYAN).lerp(ELECTRIC, pose.fill)
      strikeMat.current.emissive.copy(CYAN).lerp(ELECTRIC, pose.fill)
      strikeMat.current.emissiveIntensity = 0.3 + pose.glow * 1.2
      strikeMat.current.opacity = 0.25 + pose.fill * 0.75
    }
    if (frameMat.current) {
      frameMat.current.color.copy(CYAN)
      frameMat.current.opacity = 0.5 + pose.glow * 0.5
    }
  })

  return (
    <group ref={group} scale={0.55}>
      <mesh geometry={frameGeometry}>
        <meshBasicMaterial ref={frameMat} color={CYAN} transparent />
      </mesh>
      <mesh geometry={strikeGeometry}>
        <meshStandardMaterial ref={strikeMat} color={CYAN} emissive={CYAN} transparent roughness={0.35} metalness={0.2} />
      </mesh>
    </group>
  )
}

/**
 * Pauses R3F's own render loop when the tab is hidden or the page content is
 * scrolled out of view (mirrors `Atmosphere.tsx`'s existing pause pattern) —
 * using `invalidate`/`setFrameloop` rather than a hand-driven manual `advance()`
 * ticker, which proved fragile to get rendering reliably at all. Still never a
 * *second* competing render strategy: R3F's own rAF loop is the one and only
 * loop for this canvas, just gated on/off.
 */
function Driver() {
  const setFrameloop = useThree((s) => s.set)

  useEffect(() => {
    const apply = () => {
      const visible = !document.hidden
      setFrameloop({ frameloop: visible ? 'always' : 'never' })
    }
    apply()
    document.addEventListener('visibilitychange', apply)
    const io = new IntersectionObserver(([entry]) => {
      setFrameloop({ frameloop: entry.isIntersecting && !document.hidden ? 'always' : 'never' })
    })
    const main = document.getElementById('main')
    if (main) io.observe(main)
    return () => {
      document.removeEventListener('visibilitychange', apply)
      io.disconnect()
    }
  }, [setFrameloop])

  return null
}

export function Scene3DCanvas() {
  const dpr = useMemo(() => Math.min(window.devicePixelRatio || 1, 1.75), [])
  return (
    <Canvas
      className="signature-canvas"
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: poses[0].cam, fov: 38 }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (event) => event.preventDefault())
      }}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[2, 3, 4]} intensity={1.4} color="#00bfef" />
      <Bolt />
      <Driver />
    </Canvas>
  )
}
