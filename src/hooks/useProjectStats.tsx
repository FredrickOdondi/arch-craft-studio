import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

interface ProjectStats {
  total_projects: number
  published_projects: number
  total_views: number
  most_viewed_project: string
}

interface ContactStats {
  total_submissions: number
  new_submissions: number
  completed_submissions: number
  high_priority_submissions: number
}

export const useProjectStats = () => {
  const [projectStats, setProjectStats] = useState<ProjectStats | null>(null)
  const [contactStats, setContactStats] = useState<ContactStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setIsLoading(true)
      
      // Fetch project statistics
      const { data: projectData, error: projectError } = await supabase
        .rpc('get_project_stats')

      if (projectError) throw projectError

      // Fetch contact statistics
      const { data: contactData, error: contactError } = await supabase
        .rpc('get_contact_stats')

      if (contactError) throw contactError

      setProjectStats(projectData[0] || null)
      setContactStats(contactData[0] || null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const incrementProjectViews = async (projectId: string) => {
    try {
      const { error } = await supabase
        .rpc('increment_project_views', { project_id: projectId })

      if (error) throw error
    } catch (err) {
      console.error('Error incrementing project views:', err)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return {
    projectStats,
    contactStats,
    isLoading,
    error,
    fetchStats,
    incrementProjectViews,
  }
}