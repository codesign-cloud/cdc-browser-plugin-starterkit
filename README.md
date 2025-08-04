# Preact + Tailwind CSS Starter Kit (TypeScript)

A lightweight starter kit for building web applications with Preact and Tailwind CSS in TypeScript, optimized for Firefox, Chrome, and Edge browsers.

## Features

- ⚡️ [Preact](https://preactjs.com/) - Fast 3kB alternative to React with the same modern API
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- 🚀 [Vite](https://vitejs.dev/) - Lightning fast build tool
- 🔄 Hot Module Replacement (HMR)
- 📦 Optimized builds for production
- 🌐 Cross-browser support (Firefox, Chrome, Edge)
- 📘 TypeScript support

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone this repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd preact-tailwind-starterkit
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Building for Production

Create a production build:

```bash
npm run build
# or
yarn build
```

Preview the production build:

```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
├── public/              # Static assets
├── src/                 # Source code
│   ├── App.tsx          # Main application component
│   ├── index.css        # Global CSS styles (Tailwind imports)
│   └── main.ts          # Application entry point
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
├── vite.config.js       # Vite configuration
└── README.md            # This file
```

## Browser Support

This starter kit is optimized for:

- Firefox (version 60 and above)
- Chrome (version 60 and above)
- Edge (Chromium-based)

The build configuration targets ES2015+ syntax for modern browsers while maintaining compatibility with the specified minimum versions.

## Customization

### Tailwind CSS

To customize Tailwind CSS, modify the `tailwind.config.js` file. You can extend the theme, add plugins, or configure other options according to your project needs.

### Preact

Preact is configured through the Vite plugin in `vite.config.js`. You can modify the configuration there if needed.

### TypeScript

TypeScript is configured through the `tsconfig.json` file. The configuration is set up to work with Preact and Vite, with JSX transforms enabled.

## Deployment

The production build outputs to the `dist/` directory. You can deploy this folder to any static hosting service:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)
- Any traditional web server

## License

MIT
