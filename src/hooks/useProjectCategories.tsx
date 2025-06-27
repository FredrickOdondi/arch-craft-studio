import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

interface ProjectCategory {
  id: string
  name: string
  slug: string
  description: string
  color: string
  icon: string
  sort_order: number
  is_active: boolean
}

interface ProjectTag {
  id: string
  name: string
  slug: string
  color: string
}

export const useProjectCategories = () => {
  const [categories, setCategories] = useState<ProjectCategory[]>([])
  const [tags, setTags] = useState<ProjectTag[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('project_categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')

      if (error) throw error
      setCategories(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  const fetchTags = async () => {
    try {
      const { data, error } = await supabase
        .from('project_tags')
        .select('*')
        .order('name')

      if (error) throw error
      setTags(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  const fetchData = async () => {
    setIsLoading(true)
    await Promise.all([fetchCategories(), fetchTags()])
    setIsLoading(false)
  }

  const addTagToProject = async (projectId: string, tagId: string) => {
    try {
      const { error } = await supabase
        .from('project_tag_relations')
        .insert({ project_id: projectId, tag_id: tagId })

      if (error) throw error
      return { error: null }
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred'
      return { error }
    }
  }

  const removeTagFromProject = async (projectId: string, tagId: string) => {
    try {
      const { error } = await supabase
        .from('project_tag_relations')
        .delete()
        .eq('project_id', projectId)
        .eq('tag_id', tagId)

      if (error) throw error
      return { error: null }
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred'
      return { error }
    }
  }

  const getProjectsWithTags = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_projects_with_tags')

      if (error) throw error
      return { data, error: null }
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred'
      return { data: null, error }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    categories,
    tags,
    isLoading,
    error,
    fetchCategories,
    fetchTags,
    addTagToProject,
    removeTagFromProject,
    getProjectsWithTags,
  }
}