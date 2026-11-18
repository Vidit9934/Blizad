import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { subscribeBeat } from './beatRig'
import { poses, type Pose } from './poses'

/**
 * Only ever reached via a runtime `import('./Scene3DCanvas')` call inside a
 * `useEffect` (see `Scene3DBoundary.tsx`) — never a static import, never
 * `React.lazy`. Safe to import `three`/`@react-three/fiber` at top level here.
 */

const CYAN = new THREE.Color('#00bfef')
const ELECTRIC = new THREE.Color('#087cfa')
const ICE = new THREE.Color('#f3f8fc')

/**
 * v9: "the current" replaces the bolt-shaped object entirely (owner's explicit
 * call — the literal logo-as-3D-hero concept, and its continuous idle spin,
 * both read as "irritating"). The Blizad bolt *mark* is untouched everywhere
 * it actually functions as a logo (Nav, favicon, BoltMark.tsx) — this file no
 * longer tries to be it. Instead: one abstract flowing light-strand, holding a
 * distinct *shape* per beat (via `Pose.coil`) rather than rotating on its own.
 * The same idea ("momentum visualized as a current") repeats in 2D on the
 * Doors/Path diagrams — one concept, three scales, per DESIGN.md's v9 entry.
 */
function buildCurvePoints(coil: number): THREE.Vector3[] {
  const turns = 0.4 + coil * 1.8
  const radius = 1.15 - coil * 0.65
  const stretch = 1.3 - coil * 0.7
  const N = 48
  const pts: THREE.Vector3[] = []
  for (let i = 0; i <= N; i++) {
    const t = i / N
    const angle = t * Math.PI * 2 * turns
    const taper = 0.55 + 0.45 * Math.sin(t * Math.PI)
    pts.push(new THREE.Vector3(Math.cos(angle) * radius * taper, Math.sin(angle) * radius * 0.55, (t - 0.5) * 2.2 * stretch))
  }
  return pts
}

const PULSE_COUNT: Record<'full' | 'light', number> = { full: 24, light: 10 }
// Quantized to 20 steps — rebuilding a TubeGeometry every frame (instead of
// only when the shape meaningfully changes) is exactly the kind of per-frame
// cost `usePaperScene.ts` already measured and fixed once this session for
// clip-path; the same discipline applies here before it ships, not after.
const COIL_STEPS = 10

function Current({ tier }: { tier: 'full' | 'light' }) {
  const strandGroups = [useRef<THREE.Group>(null), useRef<THREE.Group>(null), useRef<THREE.Group>(null)]
  const strandMats = [
    useRef<THREE.MeshStandardMaterial>(null),
    useRef<THREE.MeshStandardMaterial>(null),
    useRef<THREE.MeshStandardMaterial>(null),
  ]
  const glowGroup = useRef<THREE.Group>(null)
  const glowMat = useRef<THREE.MeshBasicMaterial>(null)
  const pulseMesh = useRef<THREE.InstancedMesh>(null)
  const keyLight = useRef<THREE.PointLight>(null)
  const rimLight = useRef<THREE.DirectionalLight>(null)
  const fillLight = useRef<THREE.DirectionalLight>(null)

  const poseRef = useRef<Pose>(poses[0])
  const fractureRef = useRef(0)
  const chargeRef = useRef(0)
  const pointer = useRef({ x: 0, y: 0 })
  const sweep = useRef({ value: 0 })
  const sweptBeats = useRef<Set<number>>(new Set())
  const screenPos = useRef(new THREE.Vector3())

  const lastStep = useRef(-1)
  const geometryRef = useRef<THREE.TubeGeometry | null>(null)
  const glowGeometryRef = useRef<THREE.TubeGeometry | null>(null)
  const samplesRef = useRef<THREE.Vector3[]>(buildCurvePoints(poses[0].coil))

  const pulseGeometry = useMemo(() => new THREE.IcosahedronGeometry(0.035, 0), [])
  const pulseDummy = useMemo(() => new THREE.Object3D(), [])
  const pulseCount = PULSE_COUNT[tier]
  const pulseBase = useMemo(() => Array.from({ length: pulseCount }, () => Math.random()), [pulseCount])

  // Cached once: the two Atmosphere DOM nodes the cone/echo rings read
  // --cone-x/--cone-y from — writing on these two small elements, not
  // `documentElement`, keeps the per-frame style recalculation scoped (see the
  // v7 frame-time regression this was rewritten to fix).
  const coneTargets = useMemo(
    () => Array.from(document.querySelectorAll<HTMLElement>('.atmosphere__cone, .atmosphere__echo')),
    [],
  )

  // Build (or rebuild, on a quantized coil change) the strand's tube geometry
  // and its sample-point table. Disposes the previous geometry — this runs at
  // most ~10 times across a full scroll, never per frame.
  const rebuildGeometry = (coil: number) => {
    const points = buildCurvePoints(coil)
    const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5)
    geometryRef.current?.dispose()
    glowGeometryRef.current?.dispose()
    geometryRef.current = new THREE.TubeGeometry(curve, 32, 0.045, 6, false)
    glowGeometryRef.current = new THREE.TubeGeometry(curve, 32, 0.07, 6, false)
    samplesRef.current = curve.getSpacedPoints(128)
    for (const group of strandGroups) {
      const mesh = group.current?.children[0] as THREE.Mesh | undefined
      if (mesh) mesh.geometry = geometryRef.current
    }
    const glowMesh = glowGroup.current?.children[0] as THREE.Mesh | undefined
    if (glowMesh) glowMesh.geometry = glowGeometryRef.current
  }

  // Mount-only: builds the initial geometry once. `rebuildGeometry` itself is
  // a plain function (not memoized) — intentional, it's only ever invoked
  // here (mount) and once per frame inside useFrame below, never re-created
  // as a dependency anywhere.
  useEffect(() => {
    rebuildGeometry(poses[0].coil)
    return () => {
      geometryRef.current?.dispose()
      glowGeometryRef.current?.dispose()
    }
  }, [])

  useEffect(() => {
    const unsubscribe = subscribeBeat((pose, beat, fracture, charge) => {
      poseRef.current = pose
      fractureRef.current = fracture
      chargeRef.current = charge
      // One-shot key-light sweep on arrival at beat 3 (Proof of Craft) and
      // beat 7 (Close) — fires once per crossing, not every scrub tick.
      const rounded = Math.round(beat)
      if ((rounded === 3 || rounded === 7) && Math.abs(beat - rounded) < 0.08 && !sweptBeats.current.has(rounded)) {
        sweptBeats.current.add(rounded)
        sweep.current.value = 0
        gsap.to(sweep.current, { value: 1, duration: rounded === 7 ? 2.4 : 1.6, ease: 'sine.inOut' })
      }
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
    const dampFast = Math.min(1, delta * 4)

    const step = Math.round(pose.coil * COIL_STEPS)
    if (step !== lastStep.current) {
      lastStep.current = step
      rebuildGeometry(step / COIL_STEPS)
    }

    // The current itself never rotates on its own — only a gentle, damped tilt
    // toward the pointer (the one piece of "alive" motion that isn't a spin),
    // and the fracture-driven spread for Pipeline's compare toggle.
    const tiltY = pointer.current.x * 0.18
    const tiltX = pointer.current.y * -0.12
    const spread = fractureRef.current * 0.85
    const offsets = [-spread, 0, spread]
    strandGroups.forEach((group, i) => {
      const g = group.current
      if (!g) return
      g.rotation.y += (tiltY - g.rotation.y) * dampFast
      g.rotation.x += (tiltX - g.rotation.x) * dampFast
      g.position.x += (offsets[i] - g.position.x) * dampFast
    })
    if (glowGroup.current) {
      glowGroup.current.rotation.y += (tiltY - glowGroup.current.rotation.y) * dampFast
      glowGroup.current.rotation.x += (tiltX - glowGroup.current.rotation.x) * dampFast
    }

    state.camera.position.set(...pose.cam)
    state.camera.lookAt(...pose.look)
    const cam = state.camera as THREE.PerspectiveCamera
    if (cam.fov !== undefined && cam.fov !== pose.fov) {
      cam.fov = pose.fov
      cam.updateProjectionMatrix()
    }

    strandMats.forEach((matRef, i) => {
      const mat = matRef.current
      if (!mat) return
      // Side strands (when fractured) read as "interrupted" currents — dimmer,
      // cooler — the centre strand stays the main, brightest one.
      const dim = i === 1 ? 1 : 1 - fractureRef.current * 0.5
      mat.color.copy(CYAN).lerp(ELECTRIC, pose.fill)
      mat.emissive.copy(CYAN).lerp(ELECTRIC, pose.fill)
      mat.emissiveIntensity = (0.22 + pose.glow * 0.9) * dim
    })
    if (glowMat.current) {
      glowMat.current.color.copy(CYAN).lerp(ELECTRIC, pose.fill)
      glowMat.current.opacity = (0.14 + pose.fill * 0.4) * (1 - fractureRef.current * 0.3)
    }
    if (keyLight.current) keyLight.current.intensity = 0.9 + pose.glow * 1.3
    if (fillLight.current) fillLight.current.intensity = 0.35 + pose.fill * 0.3
    if (rimLight.current) {
      const angle = state.clock.elapsedTime * 0.08 + sweep.current.value * Math.PI * 1.4
      rimLight.current.position.set(Math.cos(angle) * 3, 1.4, Math.sin(angle) * 3)
    }

    // Charge pulse: particles travel the current, reading a precomputed point
    // table (no per-instance curve evaluation). `pose.flow` sets the resting
    // speed per beat; the Estimator's charge speeds it up further — "charging
    // the current" — and fracture dims every third instance ("interrupted").
    if (pulseMesh.current) {
      const samples = samplesRef.current
      const speed = pose.flow * (0.12 + chargeRef.current * 0.6)
      for (let i = 0; i < pulseCount; i++) {
        let t = (pulseBase[i] + state.clock.elapsedTime * (speed + i * 0.0015)) % 1
        if (t < 0) t += 1
        const point = samples[Math.floor(t * (samples.length - 1))]
        const dimmed = i % 3 === 0 ? 1 - fractureRef.current : 1
        pulseDummy.position.copy(point)
        pulseDummy.scale.setScalar(Math.max(0.001, dimmed))
        pulseDummy.updateMatrix()
        pulseMesh.current.setMatrixAt(i, pulseDummy.matrix)
      }
      pulseMesh.current.instanceMatrix.needsUpdate = true
    }

    // Project the strand's screen position (world origin — only the camera
    // moves) so the persistent background cone/echo rings always sit behind
    // it, across every beat. Written directly on the two small target
    // elements, never `documentElement` (see the v7 frame-time regression).
    screenPos.current.set(0, 0, 0).project(state.camera)
    const cx = `${((screenPos.current.x + 1) / 2) * 100}%`
    const cy = `${((1 - screenPos.current.y) / 2) * 100}%`
    for (const el of coneTargets) {
      el.style.setProperty('--cone-x', cx)
      el.style.setProperty('--cone-y', cy)
    }
  })

  return (
    <group scale={0.6}>
      {strandGroups.map((group, i) => (
        <group key={i} ref={group}>
          <mesh>
            <meshStandardMaterial ref={strandMats[i]} color={CYAN} emissive={CYAN} roughness={0.25} metalness={0.7} />
          </mesh>
        </group>
      ))}
      <group ref={glowGroup}>
        <mesh>
          <meshBasicMaterial ref={glowMat} color={CYAN} transparent blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>
      <instancedMesh ref={pulseMesh} args={[pulseGeometry, undefined, pulseCount]}>
        <meshBasicMaterial color={CYAN} transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
      </instancedMesh>
      <pointLight ref={keyLight} position={[2, 3, 4]} intensity={1.4} color="#ffffff" />
      <directionalLight ref={rimLight} position={[-3, 1.4, 0]} intensity={0.6} color={CYAN} />
      <directionalLight ref={fillLight} position={[0, -2, -3]} intensity={0.35} color={ICE} />
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

export function Scene3DCanvas({ tier }: { tier: 'full' | 'light' }) {
  // DPR cap trimmed from v6's 1.75 to 1.5 (full) and antialias dropped — the
  // canvas is a persistent full-viewport layer regardless of the object's small
  // on-screen size, so total pixel count dominates raster cost far more than
  // geometry complexity; see DESIGN.md for the measured before/after.
  const dpr = useMemo(() => Math.min(window.devicePixelRatio || 1, tier === 'full' ? 1.5 : 1), [tier])
  return (
    <Canvas
      className="signature-canvas"
      dpr={dpr}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: poses[0].cam, fov: poses[0].fov }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.outputColorSpace = THREE.SRGBColorSpace
        gl.domElement.addEventListener('webglcontextlost', (event) => event.preventDefault())
      }}
    >
      <ambientLight intensity={0.22} />
      <Current tier={tier} />
      <Driver />
    </Canvas>
  )
}
