'use client'
import { useState, useEffect } from 'react'
import { leadsApi, authApi } from '../lib/api'
import type { Lead, LeadStats } from '../lib/types'

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [stats, setStats] = useState<LeadStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (authApi.isAuthenticated()) {
      fetchLeads()
      fetchStats()
    } else {
      setIsLoading(false)
    }
  }, [])

  const fetchLeads = async () => {
    try {
      setIsLoading(true)
      const data = await leadsApi.getAll()
      setLeads(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch leads')
      console.error('Fetch leads error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const data = await leadsApi.getStats()
      setStats(data)
    } catch (err) {
      console.error('Fetch stats error:', err)
    }
  }

  const updateLead = async (id: number, updates: Partial<Lead>) => {
    try {
      await leadsApi.update(id, updates)
      await fetchLeads()
      await fetchStats()
      return true
    } catch (err) {
      console.error('Update lead error:', err)
      return false
    }
  }

  const deleteLead = async (id: number) => {
    try {
      await leadsApi.delete(id)
      await fetchLeads()
      await fetchStats()
      return true
    } catch (err) {
      console.error('Delete lead error:', err)
      return false
    }
  }

  const refreshLeads = () => {
    fetchLeads()
    fetchStats()
  }

  return {
    leads,
    stats,
    isLoading,
    error,
    updateLead,
    deleteLead,
    refreshLeads,
  }
}