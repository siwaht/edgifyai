/*
# Create contact submissions table

1. Overview
   The marketing site has a "Get In Touch" form where prospective customers
   describe the AI agents they want built. Previously the form posted to an
   external automation webhook and nothing was stored in our own database.
   This migration adds a table so every enquiry is captured and can be
   reviewed later from the Supabase dashboard.

2. New Tables
- `contact_submissions`
  - `id` (uuid, primary key) - unique identifier for each enquiry
  - `name` (text, not null) - the sender's full name
  - `email` (text, not null) - the sender's work email address
  - `company` (text, nullable) - the sender's company, optional
  - `agent_types` (text[], not null, default empty) - the list of agent
    categories the sender selected, e.g. Voice Agent, Vision Agent
  - `message` (text, not null) - the free-text description of their project
  - `source` (text, not null, default 'website') - where the enquiry came from,
    so future channels can reuse the same table
  - `created_at` (timestamptz, default now()) - when the enquiry arrived

3. Indexes
- An index on `created_at` (descending) so the newest enquiries can be listed
  quickly.

4. Security
- Row Level Security is enabled on `contact_submissions`.
- The public website (no sign-in) writes rows as the `anon` role, so `anon` and
  `authenticated` are granted INSERT only.
- There is deliberately NO SELECT policy: submissions contain personal contact
  details and must not be readable from the public website. Staff read them
  from the Supabase dashboard, which uses a privileged role that bypasses RLS.

5. Notes
- Inserts are validated for shape (non-empty name/email/message, sane length
  limits) in the database so a malformed or oversized payload cannot be stored
  even if the browser is bypassed.
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254 AND position('@' in email) > 1),
  company text CHECK (company IS NULL OR char_length(company) <= 160),
  agent_types text[] NOT NULL DEFAULT '{}',
  message text NOT NULL CHECK (char_length(btrim(message)) BETWEEN 1 AND 5000),
  source text NOT NULL DEFAULT 'website' CHECK (char_length(source) <= 60),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx
  ON contact_submissions (created_at DESC);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON contact_submissions TO anon, authenticated;

DROP POLICY IF EXISTS "anyone_can_submit_enquiry" ON contact_submissions;
CREATE POLICY "anyone_can_submit_enquiry" ON contact_submissions FOR INSERT
  TO anon, authenticated WITH CHECK (true);
