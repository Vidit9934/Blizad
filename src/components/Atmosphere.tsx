import { useEffect, useRef } from 'react'
import { MQ, useMotion } from '../motion/MotionProvider'
import './atmosphere.css'

/**
 * Fixed background stack behind every page (see DESIGN.md):
 * ground gradient → drifting lights → contour grid → signal canvas → grain → vignette.
 * The canvas only exists when motion is accepted.
 */
export function Atmosphere() {
  const { enabled } = useMotion()
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="atmosphere__ground" />
      <div className="atmosphere__light atmosphere__light--a" />
      <div className="atmosphere__light atmosphere__light--b" />
      <div className="atmosphere__grid" />
      {enabled && <SignalCanvas />}
      <div className="atmosphere__grain" />
      <div className="atmosphere__vignette" />
    </div>
  )
}

const GRID = 96

interface Mote {
  /** Which grid line it rides, and along which axis. */
  axis: 'x' | 'y'
  line: number
  pos: number
  speed: number
  depth: number
  size: number
  glint: number
}

/**
 * Signal motes travelling along the contour grid, like data on a wire.
 * Caps: ≤ 80 motes (40 on small screens), DPR ≤ 1.5, paused when the tab is hidden.
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

    const spawn = (): Mote => {
      const axis = Math.random() < 0.6 ? 'x' : 'y'
      const lines = Math.ceil((axis === 'x' ? height : width) / GRID)
      return {
        axis,
        line: Math.floor(Math.random() * lines) * GRID,
        pos: Math.random() * (axis === 'x' ? width : height),
        speed: (0.25 + Math.random() * 0.9) * (Math.random() < 0.5 ? -1 : 1),
        depth: 0.3 + Math.random() * 0.7,
        size: 0.6 + Math.random() * 1.3,
        glint: Math.random() < 0.08 ? Math.random() * 200 : 0,
      }
    }

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
        mote.pos += mote.speed * mote.depth
        const limit = mote.axis === 'x' ? width : height
        if (mote.pos < -40 || mote.pos > limit + 40) Object.assign(mote, spawn(), { pos: mote.speed > 0 ? -30 : limit + 30 })

        const px = (mote.axis === 'x' ? mote.pos : mote.line) + pointer.x * mote.depth * 14
        const py = (mote.axis === 'x' ? mote.line : mote.pos) + pointer.y * mote.depth * 14
        const tail = 26 * mote.depth * Math.sign(mote.speed)
        const alpha = 0.18 + mote.depth * 0.5

        const gradient =
          mote.axis === 'x'
            ? ctx.createLinearGradient(px - tail, py, px, py)
            : ctx.createLinearGradient(px, py - tail, px, py)
        gradient.addColorStop(0, 'rgba(0,191,239,0)')
        gradient.addColorStop(1, `rgba(0,191,239,${alpha * 0.55})`)
        ctx.strokeStyle = gradient
        ctx.lineWidth = mote.size * 0.8
        ctx.beginPath()
        if (mote.axis === 'x') {
          ctx.moveTo(px - tail, py)
          ctx.lineTo(px, py)
        } else {
          ctx.moveTo(px, py - tail)
          ctx.lineTo(px, py)
        }
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
