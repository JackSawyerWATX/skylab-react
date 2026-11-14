import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import * as THREE from 'three'
import createSkylab from './createSkylab'
import createStarMap from './createStarMap'
import { orbitPosition, earthRotation, TIME_SCALE, TRUE_STATION_SCALE, METERS_TO_SCENE } from './skylabOrbit.mjs'

const ThreeScene = forwardRef(({ isPaused, isScreensaver, onReady }, ref) => {
  const containerRef = useRef(null)
  const reqRef = useRef()
  const sceneRef = useRef()
  const cameraRef = useRef()
  const rendererRef = useRef()
  const earthRef = useRef()
  const skylabRef = useRef()
  const starsRef = useRef()
  const clockRef = useRef()
  const isPausedRef = useRef(false)
  const isFocusedRef = useRef(false)
  const originalCameraPositionRef = useRef()
  const updateTrackingRef = useRef()
  const updateEarthDetailRef = useRef()
  const screensaverRef = useRef(false)
  const previousViewRef = useRef()
  const frameSceneRef = useRef()

  useImperativeHandle(ref, () => ({
    toggleFocus: (focusState) => {
      isFocusedRef.current = focusState
      updateEarthDetailRef.current?.(focusState)
      
      if (focusState && cameraRef.current && skylabRef.current) {
        // Store original camera position when focus starts
        originalCameraPositionRef.current = cameraRef.current.position.clone()
        
        skylabRef.current.scale.setScalar(TRUE_STATION_SCALE)
        cameraRef.current.near = METERS_TO_SCENE * 0.5
        cameraRef.current.updateProjectionMatrix()
        updateTrackingRef.current?.()
      } else if (!focusState && cameraRef.current && originalCameraPositionRef.current) {
        skylabRef.current.scale.setScalar(0.06)
        cameraRef.current.near = 0.1
        cameraRef.current.updateProjectionMatrix()
        cameraRef.current.position.copy(originalCameraPositionRef.current)
        cameraRef.current.lookAt(0, 0, 0)
      }
    },
    toggleAnimation: () => {
      isPausedRef.current = !isPausedRef.current
    }
  }))

  useEffect(() => {
    isPausedRef.current = isPaused
  }, [isPaused])

  useEffect(() => {
    const width = window.innerWidth
    const height = window.innerHeight

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)
    scene.fog = new THREE.Fog(0x000000, 50, 100)
    sceneRef.current = scene
    
    const stars = createStarMap()
    starsRef.current = stars
    scene.add(stars)

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.set(25, 10, 25)
    camera.lookAt(0, 0, 0)
    // Offset the projection so both Earth view and station-follow view leave room for copy.
    function frameScene(w, h) {
      camera.aspect = w / h
      const horizontalOffset = screensaverRef.current ? 0 : (w > 768 ? -w * 0.23 : -w * 0.08)
      camera.setViewOffset(w, h, horizontalOffset, 0, w, h)
      camera.updateProjectionMatrix()
    }
    frameSceneRef.current = frameScene
    frameScene(width, height)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, logarithmicDepthBuffer: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    rendererRef.current = renderer
    
    // Add canvas to container with id for styling
    renderer.domElement.id = 'three-canvas'
    containerRef.current.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x7187a3, 0.22)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 10, 7.5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    // Local Earth maps from the official Three.js planet example.
    const earthGroup = new THREE.Group()
    const loadingManager = new THREE.LoadingManager()
    loadingManager.onLoad = () => onReady?.()
    const textureLoader = new THREE.TextureLoader(loadingManager)
    const loadMap = (name, color = false) => {
      const texture = textureLoader.load(`/textures/${name}`)
      texture.anisotropy = Math.min(16, renderer.capabilities.getMaxAnisotropy())
      if (color) texture.encoding = THREE.sRGBEncoding
      return texture
    }
    const earthMat = new THREE.MeshPhongMaterial({
      map: loadMap('earth-day.jpg', true),
      normalMap: loadMap('earth-normal.jpg'),
      normalScale: new THREE.Vector2(0.35, 0.35),
      specularMap: loadMap('earth-specular.jpg'),
      specular: new THREE.Color(0x667c91),
      shininess: 28
    })
    const earth = new THREE.Mesh(new THREE.SphereGeometry(10, 256, 128), earthMat)
    const overviewTexture = earthMat.map
    let detailedTexture
    let detailReady = false
    let disposed = false
    updateEarthDetailRef.current = (following) => {
      if (following && !detailedTexture) {
        detailedTexture = textureLoader.load('/textures/earth-day-8k.jpg', () => {
          if (disposed) { detailedTexture.dispose(); return }
          detailReady = true
          if (isFocusedRef.current) earthMat.map = detailedTexture
        }, undefined, () => { detailReady = false })
        detailedTexture.encoding = THREE.sRGBEncoding
        detailedTexture.anisotropy = Math.min(16, renderer.capabilities.getMaxAnisotropy())
      }
      earthMat.map = following && detailReady ? detailedTexture : overviewTexture
      // Keep sun glitter from washing out the terrain during close tracking.
      earthMat.specular.setHex(following ? 0x263748 : 0x667c91)
    }
    earth.receiveShadow = true
    earthGroup.add(earth)

    // Clouds sit above the surface and drift independently of the terrain.
    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(10.045, 96, 64),
      new THREE.MeshPhongMaterial({
        map: loadMap('earth-clouds.png', true),
        transparent: true,
        opacity: 0.78,
        depthWrite: false,
        shininess: 2
      })
    )
    earthGroup.add(clouds)

    // Fresnel scattering keeps the atmosphere at the limb rather than tinting the globe.
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(10.15, 96, 64),
      new THREE.ShaderMaterial({
        uniforms: { sunDirection: { value: directionalLight.position.clone().normalize() } },
        vertexShader: `
          #include <logdepthbuf_pars_vertex>
          varying vec3 vNormal;
          varying vec3 vWorldPosition;
          void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            vNormal = normalize(mat3(modelMatrix) * normal);
            gl_Position = projectionMatrix * viewMatrix * worldPosition;
            #include <logdepthbuf_vertex>
          }
        `,
        fragmentShader: `
          #include <logdepthbuf_pars_fragment>
          uniform vec3 sunDirection;
          varying vec3 vNormal;
          varying vec3 vWorldPosition;
          void main() {
            #include <logdepthbuf_fragment>
            vec3 normal = normalize(vNormal);
            vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
            float rim = pow(1.0 - max(dot(normal, viewDirection), 0.0), 4.0);
            float daylight = smoothstep(-0.25, 0.8, dot(normal, sunDirection));
            gl_FragColor = vec4(0.18, 0.48, 1.0, rim * (0.12 + daylight * 0.55));
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    )
    earthGroup.add(atmosphere)
    scene.add(earthGroup)
    earthRef.current = earthGroup

    const skylabGroup = createSkylab()

    // Correct altitude puts the station close to the surface. The station
    // remains enlarged for visibility, but fits entirely above the globe.
    skylabGroup.position.set(...orbitPosition(0))
    skylabGroup.scale.setScalar(0.06)
    skylabGroup.castShadow = true
    scene.add(skylabGroup)
    skylabRef.current = skylabGroup

    updateTrackingRef.current = () => {
      const position = skylabGroup.position
      const outward = position.clone().normalize()
      const sideways = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), outward).normalize()
      camera.position.copy(position)
        .addScaledVector(outward, 80 * METERS_TO_SCENE)
        .addScaledVector(sideways, 60 * METERS_TO_SCENE)
      camera.lookAt(position)
    }

    // Clock for animation
    const clock = new THREE.Clock()
    clockRef.current = clock

    // Resize handler
    function handleResize() {
      const w = window.innerWidth
      const h = window.innerHeight
      frameScene(w, h)
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    // Accumulate only unpaused time so resuming never jumps ahead.
    let simulationTime = 0
    function animate() {
      const delta = clock.getDelta()
      if (!isPausedRef.current) {
        simulationTime += delta * (isFocusedRef.current ? 1 : TIME_SCALE)
        const t = simulationTime
        
        // Rotate Earth
        if (earthRef.current) {
          earth.rotation.y = earthRotation(t, 1)
          // Requested daily sky sweep: opposite Earth's eastward spin,
          // one turn per sidereal day on the shared simulation clock.
          stars.rotation.y = -earthRotation(t, 1)
          clouds.rotation.y = earthRotation(t, 1) * 1.02
        }
        
        // Orbit Skylab around Earth
        if (skylabRef.current) {
          skylabRef.current.position.set(...orbitPosition(t, 1))

          // Make Skylab always face away from Earth (ATM panels pointing outward)
          // The station should rotate to keep its "top" (positive Z in local space) pointing away from Earth
          skylabRef.current.lookAt(
            skylabRef.current.position.x * 2, // Look away from Earth center
            skylabRef.current.position.y * 2,
            skylabRef.current.position.z * 2
          )
          
          // Additional rotation to ensure ATM panels (top) face outward
          skylabRef.current.rotateZ(Math.PI) // 180-degree rotation to flip orientation
          
          if (isFocusedRef.current) updateTrackingRef.current?.()
        }
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        // Keep the catalog at effectively infinite distance, without orbital parallax.
        stars.position.copy(cameraRef.current.position)
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }
      
      reqRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      loadingManager.onLoad = () => {}
      disposed = true
      detailedTexture?.dispose()
      overviewTexture.dispose()
      updateEarthDetailRef.current = null
      if (reqRef.current) {
        cancelAnimationFrame(reqRef.current)
      }
      window.removeEventListener('resize', handleResize)
      scene.traverse((object) => {
        object.geometry?.dispose()
        const materials = Array.isArray(object.material) ? object.material : [object.material]
        materials.filter(Boolean).forEach((material) => {
          Object.values(material).forEach((value) => { if (value?.isTexture) value.dispose() })
          material.dispose()
        })
      })
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  useEffect(() => {
    const camera = cameraRef.current
    if (!camera) return
    screensaverRef.current = isScreensaver
    if (isScreensaver) {
      previousViewRef.current = {
        position: camera.position.clone(), quaternion: camera.quaternion.clone(),
        focused: isFocusedRef.current
      }
      // Preserve station tracking; only use the Earth view when not following.
      if (!isFocusedRef.current) {
        camera.position.set(25, 10, 25)
        camera.lookAt(0, 0, 0)
      }
    } else if (previousViewRef.current) {
      camera.position.copy(previousViewRef.current.position)
      camera.quaternion.copy(previousViewRef.current.quaternion)
      isFocusedRef.current = previousViewRef.current.focused
      previousViewRef.current = null
    }
    frameSceneRef.current?.(window.innerWidth, window.innerHeight)
  }, [isScreensaver])

  return (
    <div className="three-container" ref={containerRef}></div>
  )
})

ThreeScene.displayName = 'ThreeScene'

export default ThreeScene
