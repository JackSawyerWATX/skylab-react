import * as THREE from 'three'

// Stylized repaired, crewed Skylab configuration. Dimensions are relative.
export default function createSkylab() {
  const station = new THREE.Group()
  const metal = new THREE.MeshPhongMaterial({ color: 0xd1d4d3, shininess: 65 })
  const white = new THREE.MeshPhongMaterial({ color: 0xe4e0d3, shininess: 22 })
  const dark = new THREE.MeshPhongMaterial({ color: 0x292b2c, shininess: 35 })
  const gold = new THREE.MeshPhongMaterial({ color: 0xd9ab55, specular: 0x9f8654, shininess: 45, side: THREE.DoubleSide })
  const add = (geometry, material, position, parent = station) => {
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(...position)
    mesh.castShadow = true
    mesh.receiveShadow = true
    parent.add(mesh)
    return mesh
  }
  const cylinder = (radius, length, material, x, y = 0, z = 0, parent = station) => {
    const mesh = add(new THREE.CylinderGeometry(radius, radius, length, 48), material, [x, y, z], parent)
    mesh.rotation.z = Math.PI / 2
    return mesh
  }
  const rod = (a, b, radius = 0.018, material = metal, parent = station) => {
    const start = new THREE.Vector3(...a), end = new THREE.Vector3(...b)
    const mesh = add(new THREE.CylinderGeometry(radius, radius, start.distanceTo(end), 8), material, start.clone().add(end).multiplyScalar(0.5).toArray(), parent)
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), end.sub(start).normalize())
    return mesh
  }

  // Photovoltaic cells, bus bars and panel divisions remain visible at close range.
  const canvas = document.createElement('canvas')
  canvas.width = 512; canvas.height = 128
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#aaa68d'; ctx.fillRect(0, 0, 512, 128)
  for (let x = 0; x < 32; x++) for (let y = 0; y < 8; y++) {
    ctx.fillStyle = (x + y) % 3 === 0 ? '#253c62' : '#182d50'
    ctx.fillRect(x * 16 + 1, y * 16 + 1, 14, 14)
    ctx.fillStyle = '#60748e'; ctx.fillRect(x * 16 + 7, y * 16 + 1, 1, 14)
  }
  const cells = new THREE.CanvasTexture(canvas)
  cells.encoding = THREE.sRGBEncoding
  const solar = new THREE.MeshPhongMaterial({ map: cells, specular: 0x64778b, shininess: 65, side: THREE.DoubleSide })
  const panel = (length, width, parent) => {
    add(new THREE.BoxGeometry(length + 0.045, width + 0.045, 0.035), metal, [0, 0, 0], parent)
    add(new THREE.PlaneGeometry(length, width), solar, [0, 0, 0.02], parent)
    const back = add(new THREE.PlaneGeometry(length, width), solar, [0, 0, -0.02], parent)
    back.rotation.y = Math.PI
    for (let i = 1; i < 5; i++) add(new THREE.BoxGeometry(0.022, width, 0.05), metal, [-length / 2 + length * i / 5, 0, 0], parent)
  }

  // Saturn-derived workshop: broad barrel, aft dome, circumferential seams.
  cylinder(0.83, 3.35, white, -0.65)
  const dome = add(new THREE.SphereGeometry(0.82, 40, 24), metal, [-2.3, 0, 0])
  dome.scale.x = 0.32
  for (const x of [-2.22, -1.9, -0.4, 0.85, 1.0]) cylinder(0.845, 0.045, metal, x)
  for (let i = 0; i < 24; i++) {
    const angle = i * Math.PI / 12
    rod([-2.2, Math.cos(angle) * 0.834, Math.sin(angle) * 0.834], [0.95, Math.cos(angle) * 0.834, Math.sin(angle) * 0.834], 0.007)
  }
  // Gold repair sunshade, tented above the workshop rather than a gold barrel.
  const shade = new THREE.BufferGeometry()
  shade.setAttribute('position', new THREE.Float32BufferAttribute([
    -2.1,-0.86,0.72, 0.75,-0.86,0.72, 0.75,0,1.05,
    -2.1,-0.86,0.72, 0.75,0,1.05, -2.1,0,1.05,
    -2.1,0,1.05, 0.75,0,1.05, 0.75,0.86,0.72,
    -2.1,0,1.05, 0.75,0.86,0.72, -2.1,0.86,0.72
  ], 3))
  shade.computeVertexNormals()
  add(shade, gold, [0, 0, 0])
  for (const y of [-0.86, 0.86]) rod([-2.1, y, 0.72], [0.75, y, 0.72], 0.012)

  // Airlock, taper and multiple docking adapter.
  const taper = add(new THREE.CylinderGeometry(0.43, 0.82, 0.6, 48), white, [1.3, 0, 0])
  taper.rotation.z = -Math.PI / 2
  cylinder(0.43, 1.05, metal, 2.05)
  cylinder(0.47, 0.14, dark, 1.65)
  cylinder(0.48, 0.85, white, 2.95)
  cylinder(0.28, 0.2, dark, 3.48)
  const sidePort = add(new THREE.CylinderGeometry(0.24, 0.24, 0.22, 32), metal, [2.95, -0.5, 0])
  add(new THREE.BoxGeometry(0.32, 0.08, 0.36), dark, [2.1, 0, 0.44])

  // Telescope canister and open deployment truss, offset above the airlock.
  for (const x of [1.35, 2.55]) for (const y of [-0.4, 0.4]) {
    rod([x,y,0.25], [1.95,y * 1.4,1.65], 0.024)
  }
  const telescope = add(new THREE.CylinderGeometry(0.61, 0.61, 0.75, 8), white, [1.95, 0, 1.85])
  telescope.rotation.x = Math.PI / 2
  for (const [x,y,r] of [[1.72,-0.22,0.13],[2.17,-0.22,0.16],[1.72,0.22,0.17],[2.17,0.22,0.11]]) {
    const aperture = add(new THREE.CylinderGeometry(r, r, 0.03, 24), dark, [x,y,2.24])
    aperture.rotation.x = Math.PI / 2
  }
  // Four equal windmill arrays around the ATM face.
  for (let i = 0; i < 4; i++) {
    const arm = new THREE.Group()
    arm.position.set(1.95, 0, 1.85)
    arm.rotation.z = Math.PI / 4 + i * Math.PI / 2
    station.add(arm)
    rod([0.4,0,0], [1.05,0,0], 0.035, metal, arm)
    const wing = new THREE.Group()
    wing.position.x = 2.55
    arm.add(wing)
    panel(3.25, 0.66, wing)
  }
  // Only the surviving workshop wing is deployed in the repaired configuration.
  rod([-1.2,0.8,0], [-1.2,1.7,0], 0.045)
  const workshopWing = new THREE.Group()
  workshopWing.position.set(-1.2, 3.3, 0)
  workshopWing.rotation.z = Math.PI / 2
  station.add(workshopWing)
  panel(3.3, 1.05, workshopWing)
  add(new THREE.BoxGeometry(0.25,0.14,0.3), dark, [-1.2,-0.83,0])

  // Apollo nose docks to the adapter; the service engine points outboard.
  cylinder(0.13, 0.18, metal, 3.65)
  const command = add(new THREE.CylinderGeometry(0.4, 0.1, 0.62, 48), metal, [4.02,0,0])
  command.rotation.z = -Math.PI / 2
  cylinder(0.4, 1.08, white, 4.85)
  for (let i = 0; i < 6; i++) {
    const a = i * Math.PI / 3
    rod([4.35,Math.cos(a)*0.405,Math.sin(a)*0.405], [5.35,Math.cos(a)*0.405,Math.sin(a)*0.405], 0.015, metal)
  }
  const engine = add(new THREE.CylinderGeometry(0.16,0.3,0.45,32,1,true), dark, [5.6,0,0])
  engine.rotation.z = Math.PI / 2
  for (let i = 0; i < 4; i++) {
    const a = Math.PI / 4 + i * Math.PI / 2
    add(new THREE.BoxGeometry(0.13,0.12,0.12), dark, [5.05,Math.cos(a)*0.43,Math.sin(a)*0.43])
  }
  return station
}
