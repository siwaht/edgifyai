/*
  # Create contact_submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - unique identifier for each submission
      - `name` (text, not null) - submitter's name
      - `email` (text, not null) - submitter's email address
      - `project_type` (text, not null, default 'Enterprise AI') - type of project inquiry
      - `message` (text, not null) - the message content
      - `created_at` (timestamptz, default now()) - when the submission was created

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add INSERT policy for anonymous users (public contact form)
    - No SELECT/UPDATE/DELETE policies (submissions are write-only from the frontend)
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  project_type text NOT NULL DEFAULT 'Enterprise AI',
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (
    length(name) > 0
    AND length(email) > 0
    AND length(message) > 0
  );
