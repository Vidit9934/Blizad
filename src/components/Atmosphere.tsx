import { useEffect, useRef } from 'react'
import { MQ, useMotion } from '../motion/MotionProvider'
import { useScrollVelocity } from '../motion/useScrollVelocity'
import './atmosphere.css'

/**
 * Fixed background stack behind every page (see DESIGN.md):
 * ground gradient → drifting lights → signal field → persistent cone → echo
 * rings → grain → vignette. The canvas and the two scroll-reactive layers only
 * exist when motion is accepted.
 */
export function Atmosphere() {
  const { enabled } = useMotion()
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="atmosphere__ground" />
      <div className="atmosphere__light atmosphere__light--a" />
      <div className="atmosphere__light atmosphere__light--b" />
      {enabled && <SignalCanvas />}
      <div className="atmosphere__cone" />
      {enabled && <EchoRings />}
      <div className="atmosphere__grain" />
      <div className="atmosphere__vignette" />
    </div>
  )
}

/**
 * Two or three concentric rings, centred on the same `--cone-x`/`--cone-y` point
 * the 3D layer writes (see `Scene3DCanvas.tsx`), that expand and fade faster the
 * faster the visitor scrolls — reusing the shared `useScrollVelocity()` signal,
 * not a new listener. Transform/opacity only, no `filter: blur()`.
 */
function EchoRings() {
  const a = useRef<HTMLDivElement>(null)
  const b = useRef<HTMLDivElement>(null)
  const c = useRef<HTMLDivElement>(null)

  useScrollVelocity((velocity) => {
    const scale = 1 + velocity * 0.9
    const opacity = 0.12 + velocity * 0.22
    for (const ring of [a, b, c]) {
      const el = ring.current
      if (!el) continue
      el.style.setProperty('--echo-scale', scale.toFixed(3))
      el.style.setProperty('--echo-opacity', opacity.toFixed(3))
    }
  })

  return (
    <div className="atmosphere__echo">
      <div ref={a} className="atmosphere__echo-ring atmosphere__echo-ring--a" />
      <div ref={b} className="atmosphere__echo-ring atmosphere__echo-ring--b" />
      <div ref={c} className="atmosphere__echo-ring atmosphere__echo-ring--c" />
    </div>
  )
}

interface Mote {
  x: number
  y: number
  heading: number
  speed: number
  depth: number
  size: number
  glint: number
}

/**
 * Signal motes drifting freely (a gentle curving heading, not locked to a
 * cartesian grid — the grid read as a circuit-board diagram, which this
 * replaces). Same caps as before: ≤ 80 motes (40 on small screens), DPR ≤ 1.5,
 * paused when the tab is hidden.
 */
function SignalCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let width = 0
    let height = 0
    let motes: Mote[] = []
    let frame = 0
    let running = true
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
    const finePointer = window.matchMedia(MQ.pointer).matches

    const spawn = (): Mote => ({
      x: Math.random() * width,
      y: Math.random() * height,
      heading: Math.random() * Math.PI * 2,
      speed: 0.25 + Math.random() * 0.9,
      depth: 0.3 + Math.random() * 0.7,
      size: 0.6 + Math.random() * 1.3,
      glint: Math.random() < 0.08 ? Math.random() * 200 : 0,
    })

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = width < 700 ? 40 : 80
      motes = Array.from({ length: count }, spawn)
    }

    const draw = () => {
      if (!running) return
      ctx.clearRect(0, 0, width, height)
      pointer.x += (pointer.tx - pointer.x) * 0.05
      pointer.y += (pointer.ty - pointer.y) * 0.05

      for (const mote of motes) {
        // A shallow, slowly-rotating heading — a curving drift rather than a
        // locked horizontal/vertical wire.
        mote.heading += (Math.random() - 0.5) * 0.03
        mote.x += Math.cos(mote.heading) * mote.speed * mote.depth
        mote.y += Math.sin(mote.heading) * mote.speed * mote.depth

        if (mote.x < -40 || mote.x > width + 40 || mote.y < -40 || mote.y > height + 40) {
          Object.assign(mote, spawn())
        }

        const px = mote.x + pointer.x * mote.depth * 14
        const py = mote.y + pointer.y * mote.depth * 14
        const tailX = px - Math.cos(mote.heading) * 26 * mote.depth
        const tailY = py - Math.sin(mote.heading) * 26 * mote.depth
        const alpha = 0.18 + mote.depth * 0.5

        // A flat alpha stroke, not a fresh CanvasGradient per mote per frame —
        // creating up to 80 gradient objects every frame measurably cost more
        // than the fade-to-transparent tail was worth (qa-scroll.mjs's
        // frame-time gate at 1440px: this was the one remaining thing standing
        // between a ~33ms and a ~16.7ms median once the 3D layer and the Builds
        // fan were already accounted for — see DESIGN.md).
        ctx.strokeStyle = `rgba(0,191,239,${alpha * 0.4})`
        ctx.lineWidth = mote.size * 0.8
        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(px, py)
        ctx.stroke()

        let glow = 0
        if (mote.glint) {
          mote.glint = (mote.glint + 1) % 260
          glow = mote.glint < 40 ? Math.sin((mote.glint / 40) * Math.PI) : 0
        }
        ctx.fillStyle = `rgba(160,230,255,${Math.min(1, alpha + glow * 0.5)})`
        ctx.beginPath()
        ctx.arc(px, py, mote.size + glow * 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
      frame = requestAnimationFrame(draw)
    }

    const onPointer = (event: PointerEvent) => {
      pointer.tx = event.clientX / width - 0.5
      pointer.ty = event.clientY / height - 0.5
    }
    const onVisibility = () => {
      running = !document.hidden
      cancelAnimationFrame(frame)
      if (running) frame = requestAnimationFrame(draw)
    }

    resize()
    frame = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    if (finePointer) window.addEventListener('pointermove', onPointer, { passive: true })
    return () => {
      running = false
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [])

  return <canvas ref={ref} className="atmosphere__canvas" />
}
