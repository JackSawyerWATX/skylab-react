import React from 'react'

export default function HeroContent({ onToggleFocus, onToggleAnimation, isPaused, isFocused }) {
  return (
    <div className="hero-content">
      <div className="hero-text">
        <h1 className="hero-title">SKYLAB</h1>
        <h2 className="hero-subtitle">America's First Space Station</h2>
        <p className="hero-description">
          Experience the pioneering spirit of Skylab, NASA's first space station that orbited Earth from 1973 to 1979, 
          advancing our understanding of space science and human spaceflight.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={onToggleFocus}>
            {isFocused ? 'Release Camera' : 'Follow Skylab'}
          </button>
          <button className="btn btn-secondary" onClick={onToggleAnimation}>
            {isPaused ? 'Resume' : 'Pause'} Animation
          </button>
        </div>
      </div>
    </div>
  )
}