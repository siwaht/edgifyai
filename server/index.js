import express from 'express';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

const { Pool } = pg;
const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());

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

app.post('/api/contact', async (req, res) => {
  const { name, email, project_type, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }

  if (name.trim().length === 0 || email.trim().length === 0 || message.trim().length === 0) {
    return res.status(400).json({ error: 'Fields cannot be empty.' });
  }

  try {
    await pool.query(
      'INSERT INTO contact_submissions (name, email, project_type, message) VALUES ($1, $2, $3, $4)',
      [name.trim(), email.trim(), project_type || 'General Inquiry', message.trim()]
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
