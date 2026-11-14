import { createServer, loadEnv } from 'vite'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { pages, SITE_URL, structuredData } from '../src/seo.mjs'
const origin = new URL(process.env.VITE_SITE_URL || loadEnv('production', process.cwd(), '').VITE_SITE_URL || SITE_URL).origin
const template = await readFile('dist/index.html', 'utf8')
const server = await createServer({ cacheDir: 'node_modules/.cache/skylab-prerender', optimizeDeps: { disabled: true }, server: { middlewareMode: true, hmr: false, watch: { ignored: ['**/dist/**'] } }, appType: 'custom' })
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
try {
  const { renderPage } = await server.ssrLoadModule('/src/Prerender.jsx')
  for (const [page, data] of Object.entries(pages)) {
    let html = template.replace(/<title>.*?<\/title>/s, `<title>${escape(data.title)}</title>`)
    html = html.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escape(data.description)}" />`)
    const tags = [
      `<meta property="og:title" content="${escape(data.title)}" />`,
      `<meta property="og:description" content="${escape(data.description)}" />`,
      `<meta name="twitter:title" content="${escape(data.title)}" />`,
      `<meta name="twitter:description" content="${escape(data.description)}" />`,
      `<link rel="canonical" href="${escape(origin + data.path)}" />`,
      `<meta property="og:url" content="${escape(origin + data.path)}" />`,
      `<meta property="og:image" content="${escape(origin)}/images/skylab-program-patch.png" />`,
      `<meta name="twitter:image" content="${escape(origin)}/images/skylab-program-patch.png" />`,
      `<script id="site-schema" type="application/ld+json">${JSON.stringify(structuredData(page, origin)).replaceAll('<', '\\u003c')}</script>`
    ]
    html = html.replace('</head>', tags.join('\n    ') + '\n  </head>')
    html = html.replace('<div id="root"></div>', `<div id="root">${renderPage(page)}</div>`)
    const directory = page === 'home' ? 'dist' : `dist/${page}`
    await mkdir(directory, { recursive: true })
    await writeFile(`${directory}/index.html`, html)
  }
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`)
  const urls = Object.values(pages).map(({ path }) => `<url><loc>${escape(origin + path)}</loc></url>`).join('')
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`)
  console.log(`Pre-rendered four pages; canonical URLs and sitemap use ${origin}`)
} finally { await server.close() }
