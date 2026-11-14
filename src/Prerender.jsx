import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import HeroContent from './components/HeroContent'
import Mission from './components/Mission'
import Timeline from './components/Timeline'
import Gallery from './components/Gallery'
export function renderPage(page) {
  return renderToStaticMarkup(<div className="app-root"><div id="container">
    <nav className="navbar" aria-label="Main navigation">
      <a className="nav-brand" href="/" aria-label="Skylab home"><img className="mission-patch" src="/images/skylab-program-patch.png" alt="Skylab program mission patch" width="64" height="64" /><div className="nav-brand-text"><h1>Skylab</h1><span>1973-1979</span></div></a>
      <ul className="nav-links"><li><a href="/mission/">Mission</a></li><li><a href="/timeline/">Timeline</a></li><li><a href="/gallery/">Gallery</a></li></ul>
    </nav>
    <main>{page === 'home' && <HeroContent isPaused={false} isFocused={false} />}
    {page === 'mission' && <Mission active />}
    {page === 'timeline' && <Timeline active />}
    {page === 'gallery' && <Gallery active />}</main>
  </div></div>)
}
