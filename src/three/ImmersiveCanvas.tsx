import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, MeshTransmissionMaterial, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { story, type Stage } from '@/components/immersive/story'
import { makeBoltGeometry } from '@/components/immersive/bolt'

const AISLE = ['marketing', 'tech', 'tools'] as const
const COL = {
  marketing: new THREE.Color('#3D5BFF'),
  tech: new THREE.Color('#FFFFFF'),
  tools: new THREE.Color('#E8FF47'),
  spark: new THREE.Color('#E8FF47'),
}
type Pose = { x: number; y: number; s: number }
const POSE: Record<Stage, Pose> = {
  hero: { x: 1.9, y: -0.1, s: 1.05 },
  split: { x: 0, y: 0.45, s: 0.8 },
  manifesto: { x: 1.9, y: 0, s: 1.1 },
  footer: { x: 0, y: 0.95, s: 0.45 },
}
const damp = THREE.MathUtils.damp

const VERT = /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`
const FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime; uniform vec2 uMouse; uniform vec3 uBlue; uniform vec3 uSpark; uniform vec2 uGlow; varying vec2 vUv;
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y); }
  float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 4; i++){ v += a*noise(p); p *= 2.02; a *= 0.5; } return v; }
  void main(){
    vec2 uv = vUv*2.0 - 1.0; uv.x *= 1.8;
    float t = uTime * 0.07;
    vec2 q = vec2(fbm(uv*1.3 + t), fbm(uv*1.3 - t + 3.1));
    float f = fbm(uv*2.1 + q*1.9 + uMouse*0.25);
    float bands = abs(sin(f * 16.0));
    float filament = smoothstep(0.16, 0.0, bands) * smoothstep(0.2, 0.75, f);
    float glow = smoothstep(1.25, 0.0, length(uv - uGlow));
    vec3 col = uBlue * (filament * 1.1 + glow * 0.45) + uSpark * pow(filament, 5.0) * 0.6;
    float vig = smoothstep(1.9, 0.2, length(uv));
    gl_FragColor = vec4(col * vig, clamp(max(filament * 0.95, glow * 0.6) * vig, 0.0, 1.0));
  }`

function ElectricField() {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2() },
      uGlow: { value: new THREE.Vector2(0.55, 0) },
      uBlue: { value: new THREE.Color('#2B4BFF') },
      uSpark: { value: new THREE.Color('#E8FF47') },
    }),
    [],
  )
  const target = useMemo(() => new THREE.Vector2(), [])
  const glowTarget = useMemo(() => new THREE.Vector2(), [])
  useFrame((_, dt) => {
    uniforms.uTime.value += dt
    target.set(story.pointer.x, -story.pointer.y)
    uniforms.uMouse.value.lerp(target, 1 - Math.exp(-2.5 * dt))
    const p = POSE[story.stage]
    glowTarget.set(p.x / 3.4, p.y / 2)
    uniforms.uGlow.value.lerp(glowTarget, 1 - Math.exp(-2 * dt))
  })
  return (
    <mesh position={[0, 0, -3]} scale={[18, 10, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial uniforms={uniforms} vertexShader={VERT} fragmentShader={FRAG} transparent depthWrite={false} />
    </mesh>
  )
}

function Shards({ lite }: { lite: boolean }) {
  const geo = useMemo(() => makeBoltGeometry(), [])
  const group = useRef<THREE.Group>(null)
  const s0 = useRef<THREE.Group>(null)
  const s1 = useRef<THREE.Group>(null)
  const s2 = useRef<THREE.Group>(null)
  const shards = [s0, s1, s2]
  const { size } = useThree()

  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    const mobile = size.width < 768
    const pose = POSE[story.stage]
    const sp = story.stage === 'split' && !mobile ? THREE.MathUtils.smoothstep(story.split, 0.05, 0.55) : 0
    const t = state.clock.elapsedTime

    g.position.x = damp(g.position.x, mobile ? 0 : pose.x, 3, dt)
    g.position.y = damp(g.position.y, (mobile && story.stage === 'hero' ? 1.05 : pose.y) + Math.sin(t * 0.9) * 0.06, 3, dt)
    g.scale.setScalar(damp(g.scale.x, mobile ? pose.s * 0.7 : pose.s, 3, dt))
    g.rotation.y = damp(g.rotation.y, story.pointer.x * 0.45 + Math.sin(t * 0.35) * 0.35 * (1 - sp), 4, dt)
    g.rotation.x = damp(g.rotation.x, story.pointer.y * 0.25, 4, dt)

    // shards land above the three DOM columns: column centre in px -> world units -> group-local
    const colPx = Math.min(1320, size.width - 96) / 3
    const off = ((colPx / size.width) * state.viewport.width) / Math.max(g.scale.x, 0.001)
    const k = 1 - Math.exp(-4 * dt)

    shards.forEach((r, i) => {
      const s = r.current
      if (!s) return
      const o = i - 1
      s.position.x = damp(s.position.x, o * off * sp, 5, dt)
      s.position.z = damp(s.position.z, -Math.abs(o) * 0.06, 5, dt)
      s.rotation.z = damp(s.rotation.z, o * 0.16 * sp, 5, dt)
      s.visible = i === 1 || sp > 0.02
      const target = sp > 0.5 ? COL[AISLE[i]] : story.hoverAisle ? COL[story.hoverAisle] : COL.spark
      const [glass, core] = s.children as THREE.Mesh[]
      const gm = glass.material as THREE.MeshPhysicalMaterial
      ;(lite ? gm.color : gm.attenuationColor).lerp(target, k)
      ;(core.material as THREE.MeshBasicMaterial).color.lerp(target, k)
    })
  })

  return (
    <group ref={group}>
      <pointLight position={[0, 0, 1.2]} intensity={6} distance={6} color="#E8FF47" />
      {shards.map((r, i) => (
        <group key={AISLE[i]} ref={r}>
          <mesh geometry={geo}>
            {lite ? (
              <meshPhysicalMaterial
                color="#E8FF47"
                roughness={0.15}
                metalness={0.1}
                clearcoat={1}
                clearcoatRoughness={0.05}
                transparent
                opacity={0.85}
                emissive="#E8FF47"
                emissiveIntensity={0.25}
              />
            ) : (
              <MeshTransmissionMaterial
                color="#FFFFFF"
                attenuationColor="#E8FF47"
                attenuationDistance={0.9}
                thickness={0.35}
                roughness={0.02}
                ior={1.45}
                chromaticAberration={0.12}
                anisotropicBlur={0}
                distortion={0.2}
                distortionScale={0.3}
                temporalDistortion={0.08}
                samples={2}
                resolution={192}
                backside
                backsideThickness={0.2}
              />
            )}
          </mesh>
          {/* lightning trapped inside the glass: never remove this core mesh */}
          <mesh geometry={geo} scale={[0.5, 0.5, 0.3]}>
            <meshBasicMaterial color="#E8FF47" toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/** Tracks which [data-3d] section owns the screen, the pointer, and whether anything 3D is visible. */
function useStoryTracking(): boolean {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const ratios = new Map<HTMLElement, number>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) ratios.set(e.target as HTMLElement, e.intersectionRatio)
        let best: HTMLElement | null = null
        let max = 0
        for (const [el, r] of ratios)
          if (r > max) {
            max = r
            best = el
          }
        setVisible(max > 0.02 && !document.hidden)
        if (best) story.stage = best.dataset['3d'] as Stage
      },
      { threshold: [0, 0.05, 0.15, 0.3, 0.5, 0.75, 1] },
    )
    const watch = () => document.querySelectorAll<HTMLElement>('[data-3d]').forEach((el) => io.observe(el))
    watch()
    const retry = window.setTimeout(watch, 600) // sections of lazy routes mount slightly later
    const move = (e: PointerEvent) => {
      story.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      story.pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      io.disconnect()
      window.clearTimeout(retry)
      window.removeEventListener('pointermove', move)
    }
  }, [])
  return visible
}

export function Scene3DCanvas({ tier }: { tier: 'full' | 'light' }) {
  const lite = tier === 'light'
  const active = useStoryTracking()
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-700"
      style={{ opacity: active ? 1 : 0 }}
    >
      <Canvas
        dpr={[1, lite ? 1 : 1.25]}
        frameloop={active ? 'always' : 'never'}
        gl={{ antialias: !lite, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 6], fov: 35 }}
        onCreated={({ gl }) => {
          document.documentElement.dataset.webgl = 'on'
          gl.domElement.addEventListener('webglcontextlost', (event) => event.preventDefault())
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={3} />
        <ElectricField />
        <Shards lite={lite} />
        <Sparkles count={lite ? 40 : 70} scale={[10, 6, 3]} size={2.5} speed={0.3} opacity={0.75} color="#E8FF47" />
        <Environment resolution={lite ? 64 : 256} frames={1}>
          <Lightformer form="rect" intensity={8} position={[0, 3, 3]} scale={[8, 1, 1]} />
          <Lightformer form="rect" intensity={6} color="#2B4BFF" position={[-4, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} />
          <Lightformer form="rect" intensity={5} color="#FFFFFF" position={[4, 1, -1]} rotation-y={-Math.PI / 2} scale={[4, 4, 1]} />
          <Lightformer form="ring" intensity={10} color="#E8FF47" position={[3, -1, 2]} scale={1.5} />
        </Environment>
      </Canvas>
    </div>
  )
}
