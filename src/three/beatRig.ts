import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { poses, lerpPose, type Pose } from './poses'

type Listener = (pose: Readonly<Pose>, beat: number, fracture: number, charge: number) => void

const listeners = new Set<Listener>()
const current: Pose = { ...poses[0] }
const proxy = { t: 0 }
const fractureState = { value: 0 }
const chargeState = { value: 0 }
let quickSeek: ((value: number) => void) | null = null
let trigger: ScrollTrigger | null = null

function beatTimeFromScroll(scrollY: number, maxScroll: number): number {
  const anchors = Array.from(document.querySelectorAll<HTMLElement>('[data-beat]'))
  if (!anchors.length || maxScroll <= 0) return 0
  // Each anchor's own top (document-relative) marks where its beat is "reached".
  const positions = anchors
    .map((el) => ({ beat: Number(el.dataset.beat), y: el.getBoundingClientRect().top + window.scrollY }))
    .sort((a, b) => a.y - b.y)
  if (scrollY <= positions[0].y) return positions[0].beat
  for (let i = 0; i < positions.length - 1; i++) {
    const a = positions[i]
    const b = positions[i + 1]
    if (scrollY >= a.y && scrollY <= b.y) {
      const span = b.y - a.y || 1
      return a.beat + ((scrollY - a.y) / span) * (b.beat - a.beat)
    }
  }
  return positions[positions.length - 1].beat
}

function applyBeat(t: number) {
  const clamped = gsap.utils.clamp(0, poses.length - 1, t)
  const i = Math.floor(clamped)
  const frac = clamped - i
  const a = poses[i]
  const b = poses[Math.min(i + 1, poses.length - 1)]
  const next = lerpPose(a, b, frac)
  current.cam = next.cam
  current.look = next.look
  current.fill = next.fill
  current.glow = next.glow
  listeners.forEach((l) => l(current, clamped, fractureState.value, chargeState.value))
}

function build() {
  quickSeek = gsap.quickTo(proxy, 't', {
    duration: 0.9,
    ease: 'power3.out',
    onUpdate: () => applyBeat(proxy.t),
  })
  trigger = ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const t = beatTimeFromScroll(self.scroll(), ScrollTrigger.maxScroll(window))
      quickSeek?.(t)
    },
    onRefresh: (self) => {
      const t = beatTimeFromScroll(self.scroll(), ScrollTrigger.maxScroll(window))
      proxy.t = t
      applyBeat(t) // land on the right pose instantly on reload/deep-link, no animating in from beat 0
    },
  })
}

function teardown() {
  trigger?.kill()
  trigger = null
  quickSeek = null
}

/** One shared subscription (same pub-sub shape as `useScrollVelocity`) — built lazily, torn down with the last subscriber. */
export function subscribeBeat(listener: Listener) {
  if (listeners.size === 0) build()
  listeners.add(listener)
  listener(current, proxy.t, fractureState.value, chargeState.value)
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) teardown()
  }
}

/** Pipeline's compare toggle: 0 = "One Blizad pipeline" (united spine), 1 = "3 agencies" (fractured). */
export function setFracture(target: 0 | 1) {
  gsap.to(fractureState, { value: target, duration: 0.6, ease: 'power2.out', onUpdate: () => applyBeat(proxy.t) })
}

/** Estimator's answered-question count (0..1) drives the charge-meter pose directly, not scroll. */
export function setCharge(target: number) {
  gsap.to(chargeState, { value: target, duration: 0.5, ease: 'power2.out', onUpdate: () => applyBeat(proxy.t) })
}
