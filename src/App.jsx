import React, { useState, useRef, useEffect } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Navigation from './components/Navigation'
import ThreeScene from './components/ThreeScene'
import HeroContent from './components/HeroContent'
import Mission from './components/Mission'
import Timeline from './components/Timeline'
import Gallery from './components/Gallery'
import { createAmbientAudio } from './ambientAudio'

export default function App(){
  const [page, setPage] = useState('home') // home, mission, timeline, gallery
  const [isLoading, setIsLoading] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const threeSceneRef = useRef()
  const fullscreenRootRef = useRef()
  const ambientRef = useRef()
  const screensaverButtonRef = useRef()
  const [isScreensaver, setIsScreensaver] = useState(false)
  const [screensaverError, setScreensaverError] = useState('')

  useEffect(() => {
    const exit = () => {
      setIsScreensaver(false)
      ambientRef.current?.stop()
      ambientRef.current = null
      screensaverButtonRef.current?.focus()
    }
    const onFullscreenChange = () => {
      if (document.fullscreenElement !== fullscreenRootRef.current) exit()
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (document.fullscreenElement === fullscreenRootRef.current) document.exitFullscreen().catch(() => {})
        exit()
      }
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange)
      document.removeEventListener('keydown', onKeyDown)
      ambientRef.current?.stop()
    }
  }, [])

  async function handleScreensaver() {
    setScreensaverError('')
    try {
      // Both APIs must start inside the button's user gesture.
      const fullscreen = fullscreenRootRef.current.requestFullscreen()
      ambientRef.current = createAmbientAudio()
      await fullscreen
      setIsScreensaver(true)
    } catch {
      ambientRef.current?.stop()
      ambientRef.current = null
      setScreensaverError('Full screen is unavailable in this browser. Try opening the site in a browser tab.')
    }
  }

  function handleNavigate(target){
    setPage(target)
    window.scrollTo(0,0)
  }

  function handleLoadingComplete() {
    setIsLoading(false)
  }

  function handleToggleFocus() {
    const newFocusState = !isFocused
    setIsFocused(newFocusState)
    if (threeSceneRef.current) {
      threeSceneRef.current.toggleFocus(newFocusState)
    }
  }

  function handleToggleAnimation() {
    setIsPaused(!isPaused)
    if (threeSceneRef.current) {
      threeSceneRef.current.toggleAnimation()
    }
  }

  return (
    <div className={`app-root ${isScreensaver ? 'screensaver-active' : ''}`} ref={fullscreenRootRef}>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      
      <div id="container">
        {!isScreensaver && <Navigation currentPage={page} onNavigate={handleNavigate} onScreensaver={handleScreensaver} screensaverButtonRef={screensaverButtonRef} screensaverError={screensaverError} />}
        
        {/* Full-screen Three.js canvas */}
        <ThreeScene ref={threeSceneRef} isPaused={isScreensaver ? false : isPaused} isScreensaver={isScreensaver} />
        
        {/* Hero content overlay */}
        {page === 'home' && !isLoading && !isScreensaver && (
          <HeroContent 
            onToggleFocus={handleToggleFocus}
            onToggleAnimation={handleToggleAnimation}
            isPaused={isPaused}
            isFocused={isFocused}
          />
        )}

        {/* modal-like sections rendered conditionally */}
        <Mission active={page === 'mission'} onClose={() => setPage('home')} />
        <Timeline active={page === 'timeline'} onClose={() => setPage('home')} />
        <Gallery active={page === 'gallery'} onClose={() => setPage('home')} />
      </div>
    </div>
  )
}
