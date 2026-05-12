# EdgifyAI

## Overview
EdgifyAI is a React-based single page application built with Vite and styled with Tailwind CSS. It features an Express.js backend that handles contact form submissions and stores them in a PostgreSQL database.

## Tech Stack
- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Express.js (Node.js)
- **Database**: PostgreSQL (Replit built-in)

## Project Structure
```
/
├── src/
│   ├── components/   # React components
│   ├── assets/       # Static assets
│   ├── context/      # React context (ThemeContext)
│   ├── App.jsx       # Main application component
│   ├── App.css       # App-specific styles
│   ├── index.css     # Global styles with Tailwind
│   └── main.jsx      # Application entry point
├── server/
│   └── index.js      # Express server with /api/contact endpoint
├── public/           # Public static files
├── index.html        # HTML entry point
├── vite.config.js    # Vite configuration (proxies /api to port 3000)
├── tailwind.config.js # Tailwind CSS configuration
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

## Recent Changes
- 2026-05-02: Migrated from Supabase to Replit PostgreSQL. Replaced Supabase client with an Express API route. Removed @supabase/supabase-js dependency.
