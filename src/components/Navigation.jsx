import React from 'react'

export default function Navigation({ onNavigate }){
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h1>SKYLAB</h1>
        <span>1973-1979</span>
      </div>
      <ul className="nav-links">
        <li><button onClick={() => onNavigate('mission')}>Mission</button></li>
        <li><button onClick={() => onNavigate('timeline')}>Timeline</button></li>
        <li><button onClick={() => onNavigate('gallery')}>Gallery</button></li>
      </ul>
    </nav>
  )
}
