# Search configuration

Public origin: https://main.d12xtr33aiyayl.amplifyapp.com

Run npm run build. The dist directory contains pre-rendered HTML for /,
/mission/, /timeline/, and /gallery/, unique titles and descriptions,
Open Graph / Twitter metadata, canonical URLs, WebPage structured data,
robots.txt, and sitemap.xml. All use the public Amplify origin above.

VITE_SITE_URL can override the origin if a custom domain is added later.
Set it in the build environment before npm run build.

Amplify should build with npm run build and publish dist. Serve the generated
directory index.html for each route. After deployment, check the four URLs
and /sitemap.xml return HTTP 200, then submit the sitemap in Search Console.
No deployment is performed by this local SEO configuration.

The static HTML exposes existing page content without waiting for JavaScript;
the interactive loading screen and visual design remain in the client app.
Historical claims and captions are not modified by this SEO work.
