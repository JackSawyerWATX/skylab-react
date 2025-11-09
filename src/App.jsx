import React, { useState, useRef } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Navigation from './components/Navigation'
import ThreeScene from './components/ThreeScene'
import HeroContent from './components/HeroContent'
import Mission from './components/Mission'
import Timeline from './components/Timeline'
import Gallery from './components/Gallery'

export default function App(){
  const [page, setPage] = useState('home') // home, mission, timeline, gallery
  const [isLoading, setIsLoading] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const threeSceneRef = useRef()

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
    <div className="app-root">
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      
      <div id="container">
        <Navigation onNavigate={handleNavigate} />
        
        {/* Full-screen Three.js canvas */}
        <ThreeScene ref={threeSceneRef} isPaused={isPaused} />
        
        {/* Hero content overlay */}
        {page === 'home' && !isLoading && (
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
