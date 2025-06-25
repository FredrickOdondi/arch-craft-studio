import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Project {
  id: string
  title: string
  category: string
  image: string
  description: string
  location: string
  year: string
  size: string
  client: string
  full_description: string
  features: string[]
  additional_images: string[]
  created_at: string
  updated_at: string
}

export interface ContactSubmission {
  id: string
  first_name: string
  last_name: string
  email: string
  project_type: string
  message: string
  status: string
  created_at: string
}

export interface AdminUser {
  id: string
  username: string
  role: string
  is_active: boolean
  last_login: string | null
  created_at: string
}