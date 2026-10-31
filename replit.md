# EdgifyAI

## Overview
EdgeifyAI is the marketing site for an AI agent agency. It is a React single page application built with Vite and styled with plain CSS (design tokens as CSS custom properties in `src/index.css`, plus one CSS file per component). An Express.js backend handles contact form submissions and stores them in PostgreSQL.

## Tech Stack
- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Plain CSS with custom properties (light/dark themes via `html.light` / `html.dark`)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Express.js (Node.js)
- **Database**: PostgreSQL (Replit built-in)

## Project Structure
```
/
├── src/
│   ├── components/   # React components, each with a colocated .css file
│   ├── assets/       # Static assets
│   ├── context/      # Theme context (ThemeContext, theme.js)
│   ├── data/site.js  # Shared content: brand details, nav items, service names
│   ├── App.jsx       # Main application component
│   ├── index.css     # Design tokens, base styles, shared primitives (buttons, cards)
│   └── main.jsx      # Application entry point
├── server/
│   └── index.js      # Express server with /api/contact endpoint
├── public/           # Public static files
├── index.html        # HTML entry point
├── vite.config.js    # Vite configuration (proxies /api to port 3000)
└── package.json      # Dependencies and scripts
```

## Development
- **Dev Server**: `npm run dev` - Runs Express (port 3000) + Vite (port 5000) concurrently
- **Build**: `npm run build` - Creates production build in `dist/`
- **Start**: `npm start` - Runs Express server only (serves built `dist/`)

## API Routes
- `POST /api/contact` — Accepts contact form submissions, validates, and stores in `contact_submissions` table

## Database
- PostgreSQL is provisioned via Replit's built-in database
- Connection via `DATABASE_URL` environment variable (auto-set by Replit)
- Table `contact_submissions` is created automatically on server startup

## Configuration
- Vite is configured to run on `0.0.0.0:5000` with all hosts allowed for Replit compatibility
- Vite proxies `/api/*` requests to `http://localhost:3000` (Express server)
- Express serves the built `dist/` folder in production

## Contact form delivery
- The deployment target is `static`, so `/api/contact` does not exist in production. The form also posts to a Make.com webhook, which is the path that works in production.
- The form only treats `/api/contact` as successful when it returns JSON `{ "success": true }`, so a static host answering with `index.html` is not mistaken for success.
- `/api/contact` has a per-IP rate limit (5 requests per 10 minutes) and the form has a hidden honeypot field.

## Recent Changes
- 2026-10-31: Visual redesign and content rewrite for the AI agency positioning. Replaced inline styles and JS hover handlers with CSS custom properties and per-component CSS. Fixed theme flash on load, light-mode scrollbar, hero parallax/entrance opacity conflict, uneven marquee spacing, legal modal exit animation, Escape key, focus and scroll lock, and false-positive form success on static hosting.
- 2026-05-02: Migrated from Supabase to Replit PostgreSQL. Replaced Supabase client with an Express API route. Removed @supabase/supabase-js dependency.
