import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import * as THREE from 'three'

const ThreeScene = forwardRef(({ isPaused }, ref) => {
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
  const cameraOffsetRef = useRef()

  useImperativeHandle(ref, () => ({
    toggleFocus: (focusState) => {
      isFocusedRef.current = focusState
      
      if (focusState && cameraRef.current && skylabRef.current) {
        // Store original camera position when focus starts
        originalCameraPositionRef.current = cameraRef.current.position.clone()
        
        // Calculate relative offset from Skylab when focus is activated
        const skylabPosition = skylabRef.current.position.clone()
        cameraOffsetRef.current = cameraRef.current.position.clone().sub(skylabPosition)
      } else if (!focusState && cameraRef.current && originalCameraPositionRef.current) {
        // Smoothly return to original position when focus is disabled
        const startPosition = cameraRef.current.position.clone()
        const targetPosition = originalCameraPositionRef.current.clone()
        let progress = 0
        
        function returnCamera() {
          progress += 0.02
          if (progress <= 1) {
            cameraRef.current.position.lerpVectors(startPosition, targetPosition, progress)
            cameraRef.current.lookAt(0, 0, 0) // Look back at Earth center
            requestAnimationFrame(returnCamera)
          }
        }
        returnCamera()
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
    
    // Create starfield
    const starsGeometry = new THREE.BufferGeometry()
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.3,
        sizeAttenuation: false
    })
    
    const starsVertices = []
    const EARTH_EXCLUSION_RADIUS = 25
    const MIN_STAR_DISTANCE = 60
    
    for (let i = 0; i < 15000; i++) {
        let x, y, z, distance
        let attempts = 0
        
        do {
            const radius = MIN_STAR_DISTANCE + Math.random() * 140
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)
            
            x = radius * Math.sin(phi) * Math.cos(theta)
            y = radius * Math.sin(phi) * Math.sin(theta)
            z = radius * Math.cos(phi)
            
            distance = Math.sqrt(x * x + y * y + z * z)
            attempts++
        } while (distance < EARTH_EXCLUSION_RADIUS && attempts < 10)
        
        if (distance >= EARTH_EXCLUSION_RADIUS) {
            starsVertices.push(x, y, z)
        }
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3))
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    starsRef.current = stars
    scene.add(stars)

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.set(25, 10, 25)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    rendererRef.current = renderer
    
    // Add canvas to container with id for styling
    renderer.domElement.id = 'three-canvas'
    containerRef.current.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 10, 7.5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    // Create realistic Earth with detailed continents
    const earthGroup = new THREE.Group()
    const earthGeo = new THREE.SphereGeometry(10, 64, 64)
    
    // Create realistic Earth texture with continents and oceans
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512
    const context = canvas.getContext('2d')
    
    // Start with deep ocean blue background
    context.fillStyle = '#0f4c75' // Deep ocean blue
    context.fillRect(0, 0, 1024, 512)
    
    // Add ocean variations and depth
    for (let i = 0; i < 100; i++) {
        context.fillStyle = `rgba(15, 76, 117, ${Math.random() * 0.3})`
        context.fillRect(Math.random() * 1024, Math.random() * 512, 
                        Math.random() * 200, Math.random() * 200)
    }
    
    // Draw Americas (connected through Panama)
    context.fillStyle = '#2d5016' // Forest green
    context.beginPath()
    context.moveTo(80, 80)
    context.lineTo(320, 60)
    context.lineTo(340, 100)
    context.lineTo(300, 120)
    context.lineTo(280, 140)
    context.lineTo(260, 160)
    context.lineTo(240, 170)
    context.lineTo(200, 180)
    context.lineTo(180, 190)
    context.lineTo(160, 210)
    context.lineTo(150, 220)
    context.lineTo(145, 225)
    context.lineTo(142, 228)
    context.lineTo(140, 232)
    context.lineTo(138, 236)
    context.lineTo(137, 240) // Panama Canal area
    context.lineTo(136, 244) // Panama isthmus
    context.lineTo(138, 248) // Panama-Colombia border
    context.lineTo(145, 252)
    context.lineTo(160, 250)
    context.lineTo(180, 248)
    context.lineTo(200, 247)
    context.lineTo(220, 248)
    context.lineTo(240, 252)
    context.lineTo(260, 260)
    context.lineTo(270, 280)
    context.lineTo(275, 320)
    context.lineTo(270, 360)
    context.lineTo(260, 400)
    context.lineTo(250, 420)
    context.lineTo(240, 430)
    context.lineTo(230, 410)
    context.lineTo(225, 380)
    context.lineTo(220, 350)
    context.lineTo(210, 320)
    context.lineTo(200, 290)
    context.lineTo(190, 270)
    context.lineTo(80, 150)
    context.closePath()
    context.fill()
    
    // Draw Eurasia
    context.fillStyle = '#2d5016'
    context.beginPath()
    context.moveTo(450, 100)
    context.lineTo(465, 95)
    context.lineTo(480, 90)
    context.lineTo(500, 85)
    context.lineTo(520, 80)
    context.lineTo(580, 75)
    context.lineTo(650, 70)
    context.lineTo(720, 65)
    context.lineTo(780, 70)
    context.lineTo(820, 75)
    context.lineTo(850, 85)
    context.lineTo(880, 100)
    context.lineTo(900, 120)
    context.lineTo(920, 140)
    context.lineTo(915, 160)
    context.lineTo(910, 180)
    context.lineTo(900, 200)
    context.lineTo(885, 220)
    context.lineTo(870, 240)
    context.lineTo(850, 255)
    context.lineTo(830, 270)
    context.lineTo(810, 280)
    context.lineTo(780, 275)
    context.lineTo(750, 270)
    context.lineTo(720, 260)
    context.lineTo(690, 250)
    context.lineTo(665, 235)
    context.lineTo(640, 220)
    context.lineTo(620, 200)
    context.lineTo(600, 180)
    context.lineTo(585, 165)
    context.lineTo(570, 155)
    context.lineTo(555, 150)
    context.lineTo(540, 148)
    context.lineTo(530, 150)
    context.lineTo(520, 145)
    context.lineTo(510, 140)
    context.lineTo(500, 135)
    context.lineTo(490, 130)
    context.lineTo(480, 125)
    context.lineTo(470, 120)
    context.lineTo(460, 115)
    context.lineTo(450, 110)
    context.closePath()
    context.fill()
    
    // Draw Africa
    context.fillStyle = '#8b7355' // Sahara brown
    context.beginPath()
    context.moveTo(475, 172)
    context.lineTo(480, 170)
    context.lineTo(490, 168)
    context.lineTo(510, 167)
    context.lineTo(530, 168)
    context.lineTo(545, 172)
    context.lineTo(555, 178)
    context.lineTo(560, 185)
    context.lineTo(565, 190)
    context.lineTo(567, 200)
    context.lineTo(567, 210)
    context.lineTo(565, 230)
    context.lineTo(560, 250)
    context.lineTo(555, 270)
    context.lineTo(550, 290)
    context.lineTo(540, 310)
    context.lineTo(525, 330)
    context.lineTo(510, 340)
    context.lineTo(495, 345)
    context.lineTo(480, 340)
    context.lineTo(470, 330)
    context.lineTo(465, 315)
    context.lineTo(460, 295)
    context.lineTo(450, 280)
    context.lineTo(440, 260)
    context.lineTo(440, 240)
    context.lineTo(445, 225)
    context.lineTo(448, 215)
    context.lineTo(452, 195)
    context.lineTo(458, 180)
    context.lineTo(465, 175)
    context.lineTo(475, 172)
    context.closePath()
    context.fill()
    
    // Draw Australia
    context.fillStyle = '#b5651d' // Outback red
    context.beginPath()
    context.moveTo(780, 300)
    context.lineTo(850, 295)
    context.lineTo(870, 305)
    context.lineTo(880, 320)
    context.lineTo(875, 340)
    context.lineTo(865, 355)
    context.lineTo(850, 365)
    context.lineTo(820, 370)
    context.lineTo(790, 368)
    context.lineTo(770, 360)
    context.lineTo(755, 350)
    context.lineTo(750, 335)
    context.lineTo(755, 320)
    context.lineTo(765, 310)
    context.closePath()
    context.fill()
    
    // Draw Antarctica
    context.fillStyle = '#f0f0f0'
    context.beginPath()
    context.moveTo(0, 440)
    context.lineTo(150, 430)
    context.lineTo(300, 435)
    context.lineTo(450, 440)
    context.lineTo(600, 435)
    context.lineTo(750, 438)
    context.lineTo(900, 440)
    context.lineTo(1024, 442)
    context.lineTo(1024, 512)
    context.lineTo(0, 512)
    context.closePath()
    context.fill()
    
    // Add Greenland
    context.fillStyle = '#f0f0f0'
    context.beginPath()
    context.moveTo(350, 50)
    context.lineTo(380, 45)
    context.lineTo(370, 90)
    context.lineTo(340, 85)
    context.closePath()
    context.fill()
    
    // Add mountain ranges
    context.fillStyle = '#1a3a0a'
    const mountains = [
        [200, 120], [250, 130], [480, 140], [600, 100], [280, 240]
    ]
    mountains.forEach(([x, y]) => {
        context.beginPath()
        context.arc(x, y, 15, 0, Math.PI * 2)
        context.fill()
    })
    
    // Add cloud patterns
    context.fillStyle = 'rgba(255, 255, 255, 0.3)'
    for (let i = 0; i < 15; i++) {
        const x = Math.random() * 1024
        const y = Math.random() * 512
        const size = Math.random() * 80 + 40
        context.beginPath()
        context.arc(x, y, size, 0, Math.PI * 2)
        context.fill()
    }
    
    const earthTexture = new THREE.CanvasTexture(canvas)
    earthTexture.wrapS = THREE.RepeatWrapping
    earthTexture.wrapT = THREE.RepeatWrapping
    
    const earthMat = new THREE.MeshPhongMaterial({
        map: earthTexture,
        shininess: 100,
        specular: 0x111111,
    })
    
    const earth = new THREE.Mesh(earthGeo, earthMat)
    earth.receiveShadow = true
    earth.castShadow = true
    
    // Add realistic atmosphere glow
    const atmosphereGeo = new THREE.SphereGeometry(10.3, 32, 32)
    const atmosphereMat = new THREE.MeshBasicMaterial({
        color: 0x87ceeb,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide
    })
    const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat)
    
    // Add outer atmosphere glow
    const outerAtmosphereGeo = new THREE.SphereGeometry(10.8, 32, 32)
    const outerAtmosphereMat = new THREE.MeshBasicMaterial({
        color: 0x4fc3f7,
        transparent: true,
        opacity: 0.05,
        side: THREE.BackSide
    })
    const outerAtmosphere = new THREE.Mesh(outerAtmosphereGeo, outerAtmosphereMat)
    
    earthGroup.add(earth)
    earthGroup.add(atmosphere)
    earthGroup.add(outerAtmosphere)
    scene.add(earthGroup)
    earthRef.current = earthGroup

    // Create detailed Skylab space station
    const skylabGroup = new THREE.Group()
    
    // Main Orbital Workshop (OWS) - large golden cylinder
    const owsGeo = new THREE.CylinderGeometry(0.65, 0.65, 3.5, 16)
    const owsMat = new THREE.MeshPhongMaterial({
        color: 0xDAA520, // Golden color
        shininess: 30,
        specular: 0x444444
    })
    const ows = new THREE.Mesh(owsGeo, owsMat)
    ows.rotation.z = Math.PI / 2
    ows.position.set(-0.5, 0, 0)
    ows.castShadow = true
    skylabGroup.add(ows)
    
    // Airlock Module (darker section)
    const airlockGeo = new THREE.CylinderGeometry(0.4, 0.4, 1.2, 12)
    const airlockMat = new THREE.MeshPhongMaterial({
        color: 0x2c2c2c,
        shininess: 50
    })
    const airlock = new THREE.Mesh(airlockGeo, airlockMat)
    airlock.rotation.z = Math.PI / 2
    airlock.position.set(1.3, 0, 0)
    airlock.castShadow = true
    skylabGroup.add(airlock)
    
    // Multiple Docking Adapter (MDA)
    const mdaGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.8, 8)
    const mdaMat = new THREE.MeshPhongMaterial({
        color: 0x666666,
        shininess: 60
    })
    const mda = new THREE.Mesh(mdaGeo, mdaMat)
    mda.rotation.z = Math.PI / 2
    mda.position.set(2.2, 0, 0)
    mda.castShadow = true
    skylabGroup.add(mda)
    
    // Apollo Command/Service Module (docked)
    const csmGroup = new THREE.Group()
    
    // Service Module (cylindrical section)
    const serviceModuleGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.6, 12)
    const serviceModuleMat = new THREE.MeshPhongMaterial({
        color: 0x2c3e50,
        shininess: 30
    })
    const serviceModule = new THREE.Mesh(serviceModuleGeo, serviceModuleMat)
    serviceModule.position.set(0, 0, 0)
    serviceModule.rotation.z = Math.PI / 2
    serviceModule.castShadow = true
    csmGroup.add(serviceModule)
    
    // Command Module (conical section)
    const commandModuleGeo = new THREE.ConeGeometry(0.18, 0.4, 12)
    const commandModuleMat = new THREE.MeshPhongMaterial({
        color: 0x8B4513,
        shininess: 50
    })
    const commandModule = new THREE.Mesh(commandModuleGeo, commandModuleMat)
    commandModule.position.set(0.5, 0, 0)
    commandModule.rotation.z = -Math.PI / 2
    commandModule.castShadow = true
    csmGroup.add(commandModule)
    
    // Service Module main engine thruster (black cone)
    const engineGeo = new THREE.ConeGeometry(0.18, 0.4, 12)
    const engineMat = new THREE.MeshPhongMaterial({
        color: 0x000000,
        shininess: 10
    })
    const engine = new THREE.Mesh(engineGeo, engineMat)
    engine.position.set(-0.5, 0, 0)
    engine.rotation.z = -Math.PI / 2
    engine.castShadow = true
    csmGroup.add(engine)
    
    // RCS thrusters (small details)
    const thrusterGeo = new THREE.BoxGeometry(0.02, 0.02, 0.04)
    const thrusterMat = new THREE.MeshPhongMaterial({
        color: 0x666666
    })
    
    // Add 4 RCS thruster blocks around Command Module
    for (let i = 0; i < 4; i++) {
        const thruster = new THREE.Mesh(thrusterGeo, thrusterMat)
        const angle = (i * Math.PI) / 2
        thruster.position.set(
            0.4,
            Math.cos(angle) * 0.15,
            Math.sin(angle) * 0.15
        )
        csmGroup.add(thruster)
    }
    
    // Position and orient the entire CSM group toward Skylab
    csmGroup.position.set(3.2, 0, 0)
    csmGroup.rotation.y = Math.PI // Rotate 180 degrees to point toward Skylab
    csmGroup.castShadow = true
    skylabGroup.add(csmGroup)
    
    // Apollo Telescope Mount (ATM) - central hub
    const atmHubGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.6, 8)
    const atmHubMat = new THREE.MeshPhongMaterial({
        color: 0x4a4a4a,
        shininess: 70
    })
    const atmHub = new THREE.Mesh(atmHubGeo, atmHubMat)
    atmHub.position.set(1.3, 0, 1.2)
    atmHub.castShadow = true
    skylabGroup.add(atmHub)
    
    // ATM Cross-shaped solar panels (4 panels in pinwheel configuration)
    const atmPanelMat = new THREE.MeshPhongMaterial({
        color: 0x1a1a2e,
        shininess: 20,
        transparent: true,
        opacity: 0.9
    })
    
    // Create 4 ATM solar panels in X formation (45-degree offset from cardinal directions)
    for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2 + Math.PI / 4 // Add 45-degree offset to create X pattern
        
        // Make the back panel (i = 2) shorter
        const panelWidth = (i === 2) ? 2.0 : 2.8  // Back panel is shorter
        const atmPanelGeo = new THREE.BoxGeometry(panelWidth, 0.6, 0.08)
        
        const panel = new THREE.Mesh(atmPanelGeo, atmPanelMat)
        panel.position.set(
            1.3 + Math.cos(angle) * 1.8,
            Math.sin(angle) * 1.8,
            1.2
        )
        panel.rotation.z = angle
        panel.castShadow = true
        skylabGroup.add(panel)
        
        // Add panel support struts
        const strutGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.8, 6)
        const strutMat = new THREE.MeshPhongMaterial({
            color: 0x666666
        })
        const strut = new THREE.Mesh(strutGeo, strutMat)
        strut.position.set(
            1.3 + Math.cos(angle) * 0.9,
            Math.sin(angle) * 0.9,
            1.2
        )
        strut.rotation.z = angle + Math.PI / 2
        strut.castShadow = true
        skylabGroup.add(strut)
    }
    
    // OWS Solar panels (extending from main workshop)
    const owsPanelGeo = new THREE.BoxGeometry(1.5, 0.02, 1.5)
    const owsPanelMat = new THREE.MeshPhongMaterial({
        color: 0x0d1b2a,
        shininess: 15,
        transparent: true,
        opacity: 0.95
    })
    
    // Main OWS solar panel
    const owsPanel1 = new THREE.Mesh(owsPanelGeo, owsPanelMat)
    owsPanel1.position.set(-1.5, 2.2, 0)
    owsPanel1.rotation.x = Math.PI / 2
    owsPanel1.castShadow = true
    skylabGroup.add(owsPanel1)
    
    // Panel support structures
    const supportGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.5, 6)
    const supportMat = new THREE.MeshPhongMaterial({
        color: 0x555555
    })
    
    const support1 = new THREE.Mesh(supportGeo, supportMat)
    support1.position.set(-1.5, 1.4, 0)
    support1.rotation.z = Math.PI / 2
    support1.castShadow = true
    skylabGroup.add(support1)
    
    // Add thermal protection details on OWS
    const thermalGeo = new THREE.RingGeometry(0.65, 0.67, 16)
    const thermalMat = new THREE.MeshBasicMaterial({
        color: 0x8B4513,
        transparent: true,
        opacity: 0.7
    })
    
    for (let i = 0; i < 3; i++) {
        const thermal = new THREE.Mesh(thermalGeo, thermalMat)
        thermal.position.set(-0.5 + i * 0.8, 0, 0)
        thermal.rotation.y = Math.PI / 2
        skylabGroup.add(thermal)
    }
    
    // Position Skylab in orbit and scale appropriately
    skylabGroup.position.set(15, 0, 0)
    skylabGroup.scale.set(0.8, 0.8, 0.8)
    skylabGroup.castShadow = true
    scene.add(skylabGroup)
    skylabRef.current = skylabGroup

    // Clock for animation
    const clock = new THREE.Clock()
    clockRef.current = clock

    // Resize handler
    function handleResize() {
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    // Animation loop
    function animate() {
      if (!isPausedRef.current) {
        const t = clockRef.current.getElapsedTime()
        
        // Subtle starfield movement - very slow rotation to simulate moving through space
        if (starsRef.current) {
          starsRef.current.rotation.y = t * 0.0048 // Very slow Y-axis rotation (increased 20%)
          starsRef.current.rotation.x = t * 0.0024 // Even slower X-axis rotation (increased 20%)
        }
        
        // Rotate Earth
        if (earthRef.current) {
          earthRef.current.children[0].rotation.y = t * 0.05 // Rotate the actual earth mesh
        }
        
        // Orbit Skylab around Earth
        if (skylabRef.current) {
          const orbitRadius = 15
          const orbitAngle = t * 0.8
          
          // Position Skylab in orbit
          skylabRef.current.position.x = Math.cos(orbitAngle) * orbitRadius
          skylabRef.current.position.z = Math.sin(orbitAngle) * orbitRadius
          
          // Make Skylab always face away from Earth (ATM panels pointing outward)
          // The station should rotate to keep its "top" (positive Z in local space) pointing away from Earth
          skylabRef.current.lookAt(
            skylabRef.current.position.x * 2, // Look away from Earth center
            0, // Keep level with orbital plane
            skylabRef.current.position.z * 2
          )
          
          // Additional rotation to ensure ATM panels (top) face outward
          skylabRef.current.rotateZ(Math.PI) // 180-degree rotation to flip orientation
          
          // If camera is focused, follow Skylab with fixed relative position
          if (isFocusedRef.current && cameraRef.current && cameraOffsetRef.current) {
            const skylabPosition = skylabRef.current.position.clone()
            cameraRef.current.position.copy(skylabPosition.add(cameraOffsetRef.current))
            cameraRef.current.lookAt(skylabRef.current.position)
          }
        }
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }
      
      reqRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      if (reqRef.current) {
        cancelAnimationFrame(reqRef.current)
      }
      window.removeEventListener('resize', handleResize)
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="three-container" ref={containerRef}></div>
  )
})

ThreeScene.displayName = 'ThreeScene'

export default ThreeScene
