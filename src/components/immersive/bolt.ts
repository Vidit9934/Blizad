import * as THREE from 'three'

/** Extruded, bevelled lightning bolt. */
export function makeBoltGeometry(): THREE.ExtrudeGeometry {
  const pts: [number, number][] = [
    [0.18, 1],
    [-0.5, -0.08],
    [-0.06, -0.08],
    [-0.22, -1],
    [0.5, 0.14],
    [0.06, 0.14],
  ]
  const shape = new THREE.Shape()
  shape.moveTo(pts[0][0], pts[0][1])
  for (const [x, y] of pts.slice(1)) shape.lineTo(x, y)
  shape.closePath()
  const g = new THREE.ExtrudeGeometry(shape, {
    depth: 0.28,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.045,
    bevelSegments: 6,
    curveSegments: 1,
  })
  g.center()
  g.computeVertexNormals()
  return g
}
