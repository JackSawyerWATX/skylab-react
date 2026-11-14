# Image Organization Guide

This folder structure is organized to match the Gallery categories from the original Skylab site.

## Folder Structure

```
public/images/
├── design-development/     # 5 photos: Engineering and construction phases
├── launch-operations/      # 5 photos: Saturn V launch and deployment
├── crew-operations/        # 7 photos: Daily life and human factors
├── experiments/           # 7 photos: Scientific research activities
├── mission-progression/   # 5 photos: Three crew rotations
├── final-operations/      # 5 photos: Deactivation and departure
├── reentry-debris/        # 6 photos: 1979 reentry and recovery
└── legacy/               # 3 photos: Impact on future programs
```

## Image Naming Convention

Use descriptive filenames that match the Gallery captions:
- `concept-sketches.jpg`
- `saturn-v-pad.jpg`
- `spacewalk-repair.jpg`
- etc.

## Supported Formats

- `.jpg` / `.jpeg` (recommended for photos)
- `.png` (for images with transparency)
- `.webp` (modern format, smaller files)

## Adding Images

1. Place images in the appropriate category folder
2. Update the `imageSrc` paths in `src/components/Gallery.jsx` if needed
3. Images will automatically fallback to emoji icons if files are missing

## Image Sources

All Skylab images should be sourced from:
- NASA Image Gallery (public domain)
- NASA History Office archives
- Smithsonian National Air and Space Museum
- Other public domain sources

Make sure to verify copyright/licensing before adding any images.