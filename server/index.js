import express from 'express';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

const { Pool } = pg;
const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Behind Replit's / Vite's proxy, so read the client IP from X-Forwarded-For (one hop).
app.set('trust proxy', 1);
app.use(express.json({ limit: '20kb' }));

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text NOT NULL,
      email text NOT NULL,
      project_type text NOT NULL DEFAULT 'General Inquiry',
      message text NOT NULL,
      created_at timestamptz DEFAULT now()
    )
  `);
}

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const clean = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

// Minimal in-memory rate limit for the public contact endpoint (per IP, per window).
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map();

const rateLimit = (req, res, next) => {
  const now = Date.now();
  const key = req.ip || 'unknown';
  const recent = (hits.get(key) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }
  recent.push(now);
  hits.set(key, recent);
  return next();
};

setInterval(() => {
  const now = Date.now();
  for (const [key, times] of hits) {
    if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
  }
}, RATE_WINDOW_MS).unref();

app.post('/api/contact', rateLimit, async (req, res) => {
  const name = clean(req.body?.name, 200);
  const email = clean(req.body?.email, 320);
  const projectType = clean(req.body?.project_type, 500) || 'General Inquiry';
  const message = clean(req.body?.message, 5000);

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  try {
    await pool.query(
      'INSERT INTO contact_submissions (name, email, project_type, message) VALUES ($1, $2, $3, $4)',
      [name, email, projectType, message]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('DB insert error:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));
app.get('/{*path}', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

initDb()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
