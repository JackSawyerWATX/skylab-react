import React, { useLayoutEffect, useRef } from 'react'

export default function Navigation({ onNavigate, onScreensaver, screensaverButtonRef, screensaverError, currentPage }){
  const navRef = useRef(null)
  useLayoutEffect(() => {
    const nav = navRef.current
    const updateHeight = () => document.documentElement.style.setProperty('--navbar-height', `${nav.getBoundingClientRect().height}px`)
    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(nav)
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="navbar" ref={navRef} aria-label="Main navigation">
      <a className="nav-brand" href="/" aria-label="Skylab home" onClick={(event) => { event.preventDefault(); onNavigate('home') }}>
        <img className="mission-patch" src="/images/skylab-program-patch.png" alt="Skylab program mission patch" width="64" height="64" />
        <div className="nav-brand-text">
          <h1 aria-label="Skylab"><span className="wordmark-sky" aria-hidden="true">Sky</span><span className="wordmark-lab" aria-hidden="true">lab</span></h1>
          <span>1973-1979</span>
        </div>
      </a>
      <ul className="nav-links">
        <li><button aria-current={currentPage === 'mission' ? 'page' : undefined} onClick={() => onNavigate('mission')}>Mission</button></li>
        <li><button aria-current={currentPage === 'timeline' ? 'page' : undefined} onClick={() => onNavigate('timeline')}>Timeline</button></li>
        <li><button aria-current={currentPage === 'gallery' ? 'page' : undefined} onClick={() => onNavigate('gallery')}>Gallery</button></li>
      </ul>
      <button ref={screensaverButtonRef} className="screensaver-button" onClick={onScreensaver}>Fullscreen <span aria-hidden="true">&#x26F6;</span></button>
      {screensaverError && <p className="screensaver-error" role="alert">{screensaverError}</p>}
    </nav>
  )
}
