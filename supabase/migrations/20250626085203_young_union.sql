/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `first_name` (text, required)
      - `last_name` (text, required)
      - `email` (text, required)
      - `project_type` (text, default 'residential')
      - `message` (text, required)
      - `status` (text, default 'new')
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for public to submit contact forms
    - Add policy for authenticated users to read submissions
    - Add policy for authenticated users to update submissions
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  project_type text DEFAULT 'residential',
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public to submit contact forms
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow authenticated users to read contact submissions
CREATE POLICY "Authenticated users can read contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update contact submissions (for status changes)
CREATE POLICY "Authenticated users can update contact submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);