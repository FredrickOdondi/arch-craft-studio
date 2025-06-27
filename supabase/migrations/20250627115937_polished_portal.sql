/*
  # Database Performance and Data Integrity Improvements

  1. Indexes for Performance
    - Add indexes on frequently queried columns
    - Improve search and filtering performance

  2. Data Validation
    - Add check constraints for data integrity
    - Ensure valid email formats and status values

  3. Additional Features
    - Add project view tracking
    - Add contact submission priority levels
    - Add project categories enum
*/

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_year ON projects(year);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_project_type ON contact_submissions(project_type);

CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);
CREATE INDEX IF NOT EXISTS idx_admin_users_last_login ON admin_users(last_login DESC);

-- Add check constraints for data validation
ALTER TABLE contact_submissions 
ADD CONSTRAINT check_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE contact_submissions 
ADD CONSTRAINT check_status_values 
CHECK (status IN ('new', 'in_progress', 'completed', 'archived'));

ALTER TABLE contact_submissions 
ADD CONSTRAINT check_project_type_values 
CHECK (project_type IN ('residential', 'commercial', 'villa', 'renovation', 'consultation'));

ALTER TABLE projects 
ADD CONSTRAINT check_category_values 
CHECK (category IN ('Residential', 'Commercial', 'Modern Villas', 'Renovation', 'Urban Planning'));

-- Add project view tracking
ALTER TABLE projects ADD COLUMN IF NOT EXISTS view_count integer DEFAULT 0;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS last_viewed timestamptz;

-- Add priority to contact submissions
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS priority text DEFAULT 'normal';
ALTER TABLE contact_submissions 
ADD CONSTRAINT check_priority_values 
CHECK (priority IN ('low', 'normal', 'high', 'urgent'));

-- Add phone number to contact submissions
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS phone text;

-- Add project status for better project management
ALTER TABLE projects ADD COLUMN IF NOT EXISTS status text DEFAULT 'published';
ALTER TABLE projects 
ADD CONSTRAINT check_project_status_values 
CHECK (status IN ('draft', 'published', 'archived', 'featured'));

-- Add project budget range (optional)
ALTER TABLE projects ADD COLUMN IF NOT EXISTS budget_range text;

-- Function to increment project view count
CREATE OR REPLACE FUNCTION increment_project_views(project_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE projects 
  SET 
    view_count = COALESCE(view_count, 0) + 1,
    last_viewed = now()
  WHERE id = project_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get project statistics
CREATE OR REPLACE FUNCTION get_project_stats()
RETURNS TABLE(
  total_projects bigint,
  published_projects bigint,
  total_views bigint,
  most_viewed_project text
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_projects,
    COUNT(*) FILTER (WHERE status = 'published') as published_projects,
    COALESCE(SUM(view_count), 0) as total_views,
    (SELECT title FROM projects ORDER BY view_count DESC LIMIT 1) as most_viewed_project
  FROM projects;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get contact submission statistics
CREATE OR REPLACE FUNCTION get_contact_stats()
RETURNS TABLE(
  total_submissions bigint,
  new_submissions bigint,
  completed_submissions bigint,
  high_priority_submissions bigint
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_submissions,
    COUNT(*) FILTER (WHERE status = 'new') as new_submissions,
    COUNT(*) FILTER (WHERE status = 'completed') as completed_submissions,
    COUNT(*) FILTER (WHERE priority = 'high') as high_priority_submissions
  FROM contact_submissions;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;