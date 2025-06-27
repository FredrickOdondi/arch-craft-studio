/*
  # Add Project Categories and Tags System

  1. New Tables
    - `project_categories` - Predefined categories for projects
    - `project_tags` - Flexible tagging system
    - `project_tag_relations` - Many-to-many relationship

  2. Enhanced Features
    - Better categorization system
    - Flexible tagging for better search
    - SEO-friendly slugs
*/

-- Create project categories table
CREATE TABLE IF NOT EXISTS project_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  color text DEFAULT '#000000',
  icon text,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create project tags table
CREATE TABLE IF NOT EXISTS project_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  color text DEFAULT '#6B7280',
  created_at timestamptz DEFAULT now()
);

-- Create project-tag relationship table
CREATE TABLE IF NOT EXISTS project_tag_relations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES project_tags(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(project_id, tag_id)
);

-- Enable RLS
ALTER TABLE project_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_tag_relations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for project_categories
CREATE POLICY "Categories are viewable by everyone"
  ON project_categories FOR SELECT TO public USING (is_active = true);

CREATE POLICY "Authenticated users can manage categories"
  ON project_categories FOR ALL TO authenticated USING (true);

-- RLS Policies for project_tags
CREATE POLICY "Tags are viewable by everyone"
  ON project_tags FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can manage tags"
  ON project_tags FOR ALL TO authenticated USING (true);

-- RLS Policies for project_tag_relations
CREATE POLICY "Tag relations are viewable by everyone"
  ON project_tag_relations FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can manage tag relations"
  ON project_tag_relations FOR ALL TO authenticated USING (true);

-- Insert default categories
INSERT INTO project_categories (name, slug, description, color, sort_order) VALUES
('Residential', 'residential', 'Single and multi-family homes, apartments, and residential complexes', '#10B981', 1),
('Commercial', 'commercial', 'Office buildings, retail spaces, and commercial developments', '#3B82F6', 2),
('Modern Villas', 'modern-villas', 'Luxury villas and high-end residential properties', '#8B5CF6', 3),
('Renovation', 'renovation', 'Renovation and restoration projects', '#F59E0B', 4),
('Urban Planning', 'urban-planning', 'City planning and large-scale development projects', '#EF4444', 5)
ON CONFLICT (slug) DO NOTHING;

-- Insert default tags
INSERT INTO project_tags (name, slug, color) VALUES
('Sustainable', 'sustainable', '#10B981'),
('Modern', 'modern', '#3B82F6'),
('Luxury', 'luxury', '#8B5CF6'),
('Eco-Friendly', 'eco-friendly', '#059669'),
('Smart Home', 'smart-home', '#7C3AED'),
('Minimalist', 'minimalist', '#6B7280'),
('Traditional', 'traditional', '#92400E'),
('Coastal', 'coastal', '#0EA5E9'),
('Urban', 'urban', '#DC2626'),
('Family-Friendly', 'family-friendly', '#F59E0B')
ON CONFLICT (slug) DO NOTHING;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_project_categories_slug ON project_categories(slug);
CREATE INDEX IF NOT EXISTS idx_project_categories_active ON project_categories(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_project_tags_slug ON project_tags(slug);
CREATE INDEX IF NOT EXISTS idx_project_tag_relations_project ON project_tag_relations(project_id);
CREATE INDEX IF NOT EXISTS idx_project_tag_relations_tag ON project_tag_relations(tag_id);

-- Function to get projects with their tags
CREATE OR REPLACE FUNCTION get_projects_with_tags()
RETURNS TABLE(
  project_id uuid,
  title text,
  category text,
  tags text[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id as project_id,
    p.title,
    p.category,
    COALESCE(array_agg(pt.name) FILTER (WHERE pt.name IS NOT NULL), '{}') as tags
  FROM projects p
  LEFT JOIN project_tag_relations ptr ON p.id = ptr.project_id
  LEFT JOIN project_tags pt ON ptr.tag_id = pt.id
  WHERE p.status = 'published'
  GROUP BY p.id, p.title, p.category
  ORDER BY p.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;