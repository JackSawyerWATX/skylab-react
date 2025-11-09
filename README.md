# Skylab React — Scaffold

This folder contains a React + Vite scaffold for the Skylab visualization project.

## Quick start

Install dependencies and run the dev server:

```powershell
cd skylab-react
npm install
npm run dev
```

Open `http://localhost:5173` (Vite default) in your browser.

## What's included

- `src/components/ThreeScene.jsx` — minimal Three.js scene showing an Earth sphere and a placeholder Skylab orbit.
- `src/components/Navigation.jsx` — NASA-styled nav with links to open modal pages.
- `src/components/{Mission,Timeline,Gallery}.jsx` — modal pages ported from the static site (placeholders ready for full content).
- `src/styles.css` — shared styles including the modal overlay system.

## Next steps

- Port the full `script.js` Earth continent drawing logic into `ThreeScene.jsx` (canvas textures or use react-three-fiber). The current `ThreeScene` implementation is intentionally minimal so you can iterate safely.
- Replace gallery placeholders with real images (use `public/` for assets).
- Add advanced controls and UI state as needed.

If you want, I can now:
- Port the entire original `script.js` Earth generation into `ThreeScene.jsx` (canvas-based texture) — this is the next, larger step.
- Convert the Skylab mesh creation code into the React component so the satellite appears with the same detail as the static site.

Tell me which of the next steps you'd like me to perform and I'll continue.
