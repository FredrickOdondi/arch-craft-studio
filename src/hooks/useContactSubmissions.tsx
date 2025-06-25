import { useState, useEffect } from 'react'
import { supabase, ContactSubmission } from '../lib/supabase'

export const useContactSubmissions = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSubmissions = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setSubmissions(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const submitContactForm = async (formData: {
    first_name: string
    last_name: string
    email: string
    project_type: string
    message: string
  }) => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([formData])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred'
      return { data: null, error }
    }
  }

  const updateSubmissionStatus = async (id: string, status: string) => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setSubmissions(prev => prev.map(s => s.id === id ? data : s))
      return { data, error: null }
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred'
      return { data: null, error }
    }
  }

  useEffect(() => {
    fetchSubmissions()
  }, [])

  return {
    submissions,
    isLoading,
    error,
    fetchSubmissions,
    submitContactForm,
    updateSubmissionStatus,
  }
}