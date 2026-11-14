import React, { useState, useEffect } from 'react'

export default function LoadingScreen({ isReady, onLoadingComplete }) {
  const [isLeaving, setIsLeaving] = useState(false)
  const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMinimumTimeElapsed(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isReady || !minimumTimeElapsed) return
    setIsLeaving(true)
    const timer = setTimeout(onLoadingComplete, 600)
    return () => clearTimeout(timer)
  }, [isReady, minimumTimeElapsed, onLoadingComplete])

  return (
    <div className={`loading-screen ${isLeaving ? 'fade-out' : ''}`} role="status" aria-live="polite" aria-label={isReady ? 'Skylab ready' : 'Loading Skylab mission'}>
      <div className="loading-content">
        <img className="loading-patch" src="/images/skylab-program-patch.png" alt="" width="120" height="120" />
        <h2 className="loading-wordmark" aria-label="Skylab"><span className="wordmark-sky" aria-hidden="true">Sky</span><span className="wordmark-lab" aria-hidden="true">lab</span></h2>
        <p className="loading-subtitle">America's First Space Station</p>
        <div className="loading-bar" aria-hidden="true"><div className={`loading-progress ${isLeaving ? 'is-ready' : ''}`} /></div>
        <div className="loading-caption"><span>{isLeaving ? 'Ready for orbit' : 'Preparing orbital view'}</span><span>1973 / 1979</span></div>
      </div>
    </div>
  )
}
