export const SITE_URL = (import.meta.env?.VITE_SITE_URL || 'https://main.d12xtr33aiyayl.amplifyapp.com').replace(/\/$/, '')
export const pages = {
  home: { path: '/', title: "Skylab: America's First Space Station | History & 3D Orbit", description: "Explore Skylab, America's first space station. Discover its 1973-1974 crewed missions, NASA mission timeline, historic photos, and interactive 3D orbit." },
  mission: { path: '/mission/', title: 'Skylab Mission: Astronauts, Science & Space Station History', description: "Discover Skylab's mission, nine astronauts, three crewed expeditions, solar astronomy, Earth observations, and the legacy of America's first space station." },
  timeline: { path: '/timeline/', title: 'Skylab Timeline: Development, 1973 Launch & 1979 Reentry', description: 'Follow the Skylab timeline from Apollo Applications development to the 1973 launch, Skylab 2, 3 and 4 missions, and atmospheric reentry on July 11, 1979.' },
  gallery: { path: '/gallery/', title: 'Skylab Photo Gallery: Space Station, Astronauts & Missions', description: 'Explore historic Skylab photos of station development, Saturn launches, astronaut life, spacewalks, solar experiments, and the legacy of the NASA program.' }
}
export function pageFromPath(path) {
  const normalized = path.replace(/\/+$/, '') || '/'
  return Object.keys(pages).find(key => (pages[key].path.replace(/\/+$/, '') || '/') === normalized) || 'home'
}
export function structuredData(page, origin = SITE_URL) {
  const data = pages[page]
  return {
    '@context': 'https://schema.org', '@type': page === 'gallery' ? 'CollectionPage' : 'WebPage',
    name: data.title, description: data.description, inLanguage: 'en', url: origin + data.path,
    isPartOf: { '@type': 'WebSite', name: 'Skylab', url: origin + '/' },
    about: { '@type': 'Thing', name: 'Skylab', sameAs: 'https://www.nasa.gov/skylab/' }
  }
}
export function applyPageSeo(page) {
  const data = pages[page]
  document.title = data.title
  for (const [attribute, name, content] of [
    ['name', 'description', data.description],
    ['property', 'og:title', data.title], ['property', 'og:description', data.description],
    ['property', 'og:url', SITE_URL + data.path],
    ['property', 'og:image', SITE_URL + '/images/skylab-program-patch.png'],
    ['name', 'twitter:title', data.title], ['name', 'twitter:description', data.description],
    ['name', 'twitter:image', SITE_URL + '/images/skylab-program-patch.png']
  ]) {
    let tag = document.head.querySelector(`meta[${attribute}="${name}"]`)
    if (!tag) { tag = document.createElement('meta'); tag.setAttribute(attribute, name); document.head.append(tag) }
    tag.content = content
  }
  let canonical = document.head.querySelector('link[rel="canonical"]')
  if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical) }
  canonical.href = SITE_URL + data.path
  let schema = document.getElementById('site-schema')
  if (!schema) { schema = document.createElement('script'); schema.id = 'site-schema'; schema.type = 'application/ld+json'; document.head.append(schema) }
  schema.textContent = JSON.stringify(structuredData(page))
}
