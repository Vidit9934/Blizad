export interface Pose {
  /** Camera position in world units. */
  cam: [number, number, number]
  /** Point the camera looks at. */
  look: [number, number, number]
  /** 0 = hairline cyan wireframe, 1 = fully solid Electric-Blue fill. */
  fill: number
  /** Key-light intensity. */
  glow: number
}

/**
 * One pose per chapter (beat index = chapter index, 0-7). `beatRig` interpolates
 * between adjacent poses as the visitor scrolls through each chapter's
 * `data-beat` anchors. See `DESIGN.md`'s "3D signature layer" section.
 */
export const poses: Pose[] = [
  // 0 — Ignition: close, low-angle, biased right of the headline (DESIGN.md's asymmetric composition).
  { cam: [0, 0.15, 5.5], look: [-1.6, 0, 0], fill: 0.18, glow: 0.45 },
  // 1 — The Promise, Proven: pulls back slightly, fills facet by facet with the 4 stats.
  { cam: [0.6, 0.1, 4.8], look: [0, 0, 0], fill: 0.55, glow: 0.55 },
  // 2 — Pick Your Door: recedes to one side, casts light rather than being looked at.
  { cam: [1.8, 0.3, 5.6], look: [0.6, 0, 0], fill: 0.5, glow: 0.65 },
  // 3 — Proof of Craft: flattened, grazing graze-light pass, then motionless/embossed.
  { cam: [0, 0.6, 5.2], look: [0, -0.2, 0], fill: 0.6, glow: 0.4 },
  // 4 — Who You're Trusting: recessive, dim glow, barely rotating (editorial register: quiet).
  { cam: [-0.4, 0.1, 5.0], look: [0, 0, 0], fill: 0.45, glow: 0.22 },
  // 5 — The Pipeline: side-on, spine framing for the gate-lighting trace.
  { cam: [2.4, 0, 4.4], look: [0, 0, 0], fill: 0.7, glow: 0.7 },
  // 6 — Build Your Stack: tight push-in, charge-meter framing (charge itself is a separate override).
  { cam: [0, 0, 3.6], look: [0, 0, 0], fill: 0.75, glow: 0.75 },
  // 7 — No More Reasons to Wait: full power, centred, brightest pose on the page.
  { cam: [0, 0, 4.0], look: [0, 0, 0], fill: 1, glow: 1 },
]

export function lerpPose(a: Pose, b: Pose, t: number): Pose {
  const lerp = (x: number, y: number) => x + (y - x) * t
  return {
    cam: [lerp(a.cam[0], b.cam[0]), lerp(a.cam[1], b.cam[1]), lerp(a.cam[2], b.cam[2])],
    look: [lerp(a.look[0], b.look[0]), lerp(a.look[1], b.look[1]), lerp(a.look[2], b.look[2])],
    fill: lerp(a.fill, b.fill),
    glow: lerp(a.glow, b.glow),
  }
}
