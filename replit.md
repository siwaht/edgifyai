# EdgifyAI

## Overview
EdgifyAI is a React-based single page application built with Vite and styled with Tailwind CSS.

## Tech Stack
- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Structure
```
/
├── src/
│   ├── components/   # React components
│   ├── assets/       # Static assets
│   ├── App.jsx       # Main application component
│   ├── App.css       # App-specific styles
│   ├── index.css     # Global styles with Tailwind
│   └── main.jsx      # Application entry point
├── public/           # Public static files
├── index.html        # HTML entry point
├── vite.config.js    # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
└── package.json      # Dependencies and scripts
```

## Development
- **Dev Server**: `npm run dev` - Runs on port 5000
- **Build**: `npm run build` - Creates production build in `dist/`
- **Preview**: `npm run preview` - Preview production build
- **Lint**: `npm run lint` - Run ESLint

## Configuration
- Vite is configured to run on `0.0.0.0:5000` with all hosts allowed for Replit compatibility
- PostCSS with Tailwind CSS and Autoprefixer

## Recent Changes
- 2026-02-05: Initial setup for Replit environment - configured Vite for port 5000 with allowed hosts
