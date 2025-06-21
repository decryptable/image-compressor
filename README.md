# Image Compressor

A modern, responsive web application for compressing images while maintaining quality, built with **React**, **TypeScript**, and **Vite**. Supports advanced compression options, theme switching, and multi-language UI (English & Indonesian).

## Features

- **Drag & Drop Image Upload**: Easily upload images for compression.
- **Advanced Compression Options**: Adjust quality, limit dimensions, and set specific output sizes.
- **Real-Time Image Comparison**: Visually compare original and compressed images with a slider.
- **Download Section**: Download both original and compressed images.
- **Theme Switcher**: Toggle between Light, Dark, and System themes.
- **Language Switcher**: Switch between English and Indonesian.
- **Responsive UI**: Works seamlessly on desktop and mobile devices.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Bun](https://bun.sh/) (for development scripts, optional but recommended)

### Installation

```sh
bun install
# or
npm install
```

### Development

Start the development server:

```sh
bun run dev
# or
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

To build the project for production:

```sh
bun run build
# or
npm run build
```

The output will be in the `dist/` directory.

### Preview Production Build

```sh
bun run preview
# or
npm run preview
```

## Project Structure

```
src/
  App.tsx                # Main app logic and layout
  main.tsx               # Entry point
  components/            # UI and feature components
    file-upload.tsx
    compression-options.tsx
    image-comparison.tsx
    download-section.tsx
    header-controls.tsx
    ui/                  # Reusable UI primitives (Button, Card, etc.)
  contexts/              # Theme and language context providers
  lib/
    utils.ts             # Utility functions (e.g., className merging)
  index.css              # Tailwind and custom styles
```

## Customization

- **Themes**: Uses CSS variables and Tailwind for easy theming.
- **Languages**: Add new languages in [`src/contexts/language-context.tsx`](src/contexts/language-context.tsx).
- **Compression**: Powered by [compressorjs](https://github.com/fengyuanchen/compressorjs).

## Deployment

This project is ready for deployment to static hosts (e.g., GitHub Pages, Vercel, Netlify).

GitHub Actions workflow is provided in [`.github/workflows/deploy.yaml`](.github/workflows/deploy.yaml) for automatic deployment to GitHub Pages.
