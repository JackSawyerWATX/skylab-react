import * as THREE from 'three'
import catalog from '../data/stars.json'

// J2000 equatorial coordinates; Y points to the north celestial pole.
// HYG v4.1, David Nash / Astronexus, CC BY-SA 4.0. See public/data/README.md.
export default function createStarMap() {
  const sky = new THREE.Group()
  const bins = Array.from({ length: 4 }, () => ({ positions: [], colors: [] }))
  for (const [raDegrees, decDegrees, magnitude, colorIndex] of catalog) {
    const ra = THREE.MathUtils.degToRad(raDegrees)
    const dec = THREE.MathUtils.degToRad(decDegrees)
    const bin = bins[magnitude < 1 ? 3 : magnitude < 2.5 ? 2 : magnitude < 4 ? 1 : 0]
    bin.positions.push(500 * Math.cos(dec) * Math.cos(ra), 500 * Math.sin(dec), -500 * Math.cos(dec) * Math.sin(ra))
    // Approximate stellar color from the catalog's measured B-V index.
    const color = new THREE.Color(0xf3f5ff)
    if (colorIndex < 0) color.lerp(new THREE.Color(0xa9c7ff), Math.min(1, -colorIndex / 0.4))
    else color.lerp(new THREE.Color(0xffb777), Math.min(1, colorIndex / 1.8))
    color.convertSRGBToLinear()
    const brightness = THREE.MathUtils.clamp(Math.pow(10, -0.12 * magnitude), 0.16, 1.3)
    bin.colors.push(color.r * brightness, color.g * brightness, color.b * brightness)
  }
  bins.forEach((bin, i) => {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(bin.positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(bin.colors, 3))
    const material = new THREE.PointsMaterial({
      vertexColors: true, size: [0.85, 1.1, 1.6, 2.3][i],
      sizeAttenuation: false, fog: false, depthWrite: false
    })
    sky.add(new THREE.Points(geometry, material))
  })
  return sky
}
