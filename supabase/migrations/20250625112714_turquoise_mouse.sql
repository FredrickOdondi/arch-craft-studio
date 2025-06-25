/*
  # Create admin users table for enhanced authentication

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text, unique admin username)
      - `role` (text, admin role)
      - `is_active` (boolean, account status)
      - `last_login` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `admin_users` table
    - Add policy for authenticated admin users only
*/

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  role text DEFAULT 'admin',
  is_active boolean DEFAULT true,
  last_login timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only allow authenticated users to read their own admin profile
CREATE POLICY "Admin users can read own profile"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Only allow authenticated users to update their own profile
CREATE POLICY "Admin users can update own profile"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Function to create admin user profile on signup
CREATE OR REPLACE FUNCTION create_admin_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO admin_users (id, username)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'username', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create admin profile
CREATE TRIGGER create_admin_user_profile_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_admin_user_profile();