export interface Pose {
  /** Camera position in world units. */
  cam: [number, number, number]
  /** Point the camera looks at. */
  look: [number, number, number]
  /** 0 = dim cyan, 1 = fully bright Electric-Blue — the current's own brightness/color mix. */
  fill: number
  /** Key-light intensity. */
  glow: number
  /** Camera field of view, degrees. Lets a beat read as a real push-in/pull-back, not just a position move. */
  fov: number
  /** Particle flow-speed multiplier along the current (0 = still water, 1 = normal flow, >1 = urgent). Not an idle-rotation knob — the object itself never spins on its own. */
  flow: number
  /** Curve tightness: 0 = a loose, wide open arc; 1 = a tight coiled loop. Drives "the current"'s held shape for this beat — a different shape per beat, not a rotation. */
  coil: number
}

/**
 * One pose per chapter (beat index = chapter index, 0-7). `beatRig` interpolates
 * between adjacent poses as the visitor scrolls through each chapter's
 * `data-beat` anchors. See `DESIGN.md`'s "Signature object" section — v9
 * replaced the bolt-shaped object with an abstract flowing current; these
 * poses now also carry that shape (`coil`) alongside the camera.
 */
export const poses: Pose[] = [
  // 0 — Ignition: a tight coiled loop, charging up — close, low-angle, biased right of the headline.
  // The pinned Hero scrub dollies cam.z toward ~3.9 and fov toward 34 via setIgnition — these are the rest pose.
  { cam: [0, 0.15, 5.5], look: [-1.6, 0, 0], fill: 0.18, glow: 0.45, fov: 38, flow: 0.7, coil: 0.85 },
  // 1 — The Signal: uncoils into a wide, calm arc — a breather beat.
  { cam: [0.6, 0.1, 4.8], look: [0, 0, 0], fill: 0.35, glow: 0.5, fov: 38, flow: 0.5, coil: 0.15 },
  // 2 — Pick Your Door: opens further, recedes to one side, casts light rather than being looked at.
  { cam: [1.8, 0.3, 5.6], look: [0.6, 0, 0], fill: 0.5, glow: 0.65, fov: 38, flow: 0.9, coil: 0.3 },
  // 3 — Proof of Craft: a long, taut, almost-straight line — flattened, confident, still.
  { cam: [0, 0.6, 5.2], look: [0, -0.2, 0], fill: 0.6, glow: 0.4, fov: 30, flow: 0.4, coil: 0.05 },
  // 4 — Who You're Trusting: recessive, dim, a quiet loose shape (editorial register: quiet).
  { cam: [-0.4, 0.1, 5.0], look: [0, 0, 0], fill: 0.4, glow: 0.22, fov: 38, flow: 0.3, coil: 0.2 },
  // 5 — The Pipeline: side-on, spine framing; setFracture splits this shape into 3 strands here.
  { cam: [2.4, 0, 4.4], look: [0, 0, 0], fill: 0.65, glow: 0.7, fov: 38, flow: 1, coil: 0.4 },
  // 6 — Build Your Stack: tight push-in, charge-meter framing (charge itself is a separate override).
  { cam: [0, 0, 3.6], look: [0, 0, 0], fill: 0.75, glow: 0.75, fov: 36, flow: 1.2, coil: 0.6 },
  // 7 — No More Reasons to Wait: full power, centred, brightest pose on the page, current running fast.
  { cam: [0, 0, 4.0], look: [0, 0, 0], fill: 1, glow: 1, fov: 34, flow: 1.6, coil: 0.5 },
]

export function lerpPose(a: Pose, b: Pose, t: number): Pose {
  const lerp = (x: number, y: number) => x + (y - x) * t
  return {
    cam: [lerp(a.cam[0], b.cam[0]), lerp(a.cam[1], b.cam[1]), lerp(a.cam[2], b.cam[2])],
    look: [lerp(a.look[0], b.look[0]), lerp(a.look[1], b.look[1]), lerp(a.look[2], b.look[2])],
    fill: lerp(a.fill, b.fill),
    glow: lerp(a.glow, b.glow),
    fov: lerp(a.fov, b.fov),
    flow: lerp(a.flow, b.flow),
    coil: lerp(a.coil, b.coil),
  }
}
