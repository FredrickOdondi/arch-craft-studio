/*
  # Create projects table for portfolio

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text, project title)
      - `category` (text, project category)
      - `image` (text, main project image URL)
      - `description` (text, short description)
      - `location` (text, project location)
      - `year` (text, completion year)
      - `size` (text, project size)
      - `client` (text, client name)
      - `full_description` (text, detailed description)
      - `features` (text[], array of key features)
      - `additional_images` (text[], array of additional image URLs)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `projects` table
    - Add policy for public read access
    - Add policy for authenticated admin users to manage projects
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Residential',
  image text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  year text NOT NULL,
  size text NOT NULL,
  client text NOT NULL,
  full_description text NOT NULL,
  features text[] DEFAULT '{}',
  additional_images text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access to projects
CREATE POLICY "Projects are viewable by everyone"
  ON projects
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert projects
CREATE POLICY "Authenticated users can insert projects"
  ON projects
  FOR INSERT
  TO authenticated
  USING (true);

-- Allow authenticated users to update projects
CREATE POLICY "Authenticated users can update projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users to delete projects
CREATE POLICY "Authenticated users can delete projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();