import React, { useState, useRef, useEffect, useCallback } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Navigation from './components/Navigation'
import ThreeScene from './components/ThreeScene'
import HeroContent from './components/HeroContent'
import Mission from './components/Mission'
import Timeline from './components/Timeline'
import Gallery from './components/Gallery'
import { createAmbientAudio } from './ambientAudio'
import { pages, pageFromPath, applyPageSeo } from './seo.mjs'

export default function App(){
  const [page, setPage] = useState(() => pageFromPath(window.location.pathname))
  const [isLoading, setIsLoading] = useState(true)
  const [isSceneReady, setIsSceneReady] = useState(false)
  const handleSceneReady = useCallback(() => setIsSceneReady(true), [])
  const [isPaused, setIsPaused] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const threeSceneRef = useRef()
  const fullscreenRootRef = useRef()
  const ambientRef = useRef()
  const screensaverButtonRef = useRef()
  const [isScreensaver, setIsScreensaver] = useState(false)
  const [screensaverError, setScreensaverError] = useState('')
  const [showFullscreenHint, setShowFullscreenHint] = useState(false)

  useEffect(() => {
    setShowFullscreenHint(false)
    if (!isScreensaver) return
    let hideTimer
    const onMouseMove = () => {
      setShowFullscreenHint(true)
      clearTimeout(hideTimer)
      hideTimer = setTimeout(() => setShowFullscreenHint(false), 2500)
    }
    document.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      clearTimeout(hideTimer)
    }
  }, [isScreensaver])

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

  useEffect(() => {
    const onPopState = () => setPage(pageFromPath(window.location.pathname))
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])
  useEffect(() => { applyPageSeo(page) }, [page])

  function handleNavigate(target){
    if (window.location.pathname !== pages[target].path) window.history.pushState({}, '', pages[target].path)
    setPage(target)
    window.scrollTo(0,0)
  }

  const handleLoadingComplete = useCallback(() => setIsLoading(false), [])

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
      {isLoading && <LoadingScreen isReady={isSceneReady} onLoadingComplete={handleLoadingComplete} />}
      
      {isScreensaver && <div className={`fullscreen-exit-hint ${showFullscreenHint ? 'is-visible' : ''}`} aria-hidden="true">Press ESC to Exit Fullscreen</div>}
      <div id="container">
        {!isScreensaver && <Navigation currentPage={page} onNavigate={handleNavigate} onScreensaver={handleScreensaver} screensaverButtonRef={screensaverButtonRef} screensaverError={screensaverError} />}
        
        {/* Full-screen Three.js canvas */}
        <ThreeScene onReady={handleSceneReady} ref={threeSceneRef} isPaused={isScreensaver ? false : isPaused} isScreensaver={isScreensaver} />
        
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
        <Mission active={page === 'mission'} onClose={() => handleNavigate('home')} />
        <Timeline active={page === 'timeline'} onClose={() => handleNavigate('home')} />
        <Gallery active={page === 'gallery'} onClose={() => handleNavigate('home')} />
      </div>
    </div>
  )
}
