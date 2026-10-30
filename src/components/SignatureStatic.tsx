import { BoltIcon } from './BoltMark'

/**
 * The `static` tier of the 3D signature layer: no-JS, reduced-motion, no-WebGL2
 * and low-end visitors all get exactly this — the brand's existing signature
 * object (same SVG the Hero/Curtain already use), never a new asset.
 */
export function SignatureStatic() {
  return <BoltIcon className="signature-static" />
}
