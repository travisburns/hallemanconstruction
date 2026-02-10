import axios from 'axios'
import type { LeadCreateDto, LoginRequest, LoginResponse, Lead, LeadStats } from './types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5057/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Leads API
export const leadsApi = {
  create: async (data: LeadCreateDto) => {
    const response = await api.post('/leads', data)
    return response.data
  },
  
  getAll: async (): Promise<Lead[]> => {
    const response = await api.get('/leads')
    return response.data
  },
  
  getById: async (id: number): Promise<Lead> => {
    const response = await api.get(`/leads/${id}`)
    return response.data
  },
  
  update: async (id: number, data: Partial<Lead>) => {
    const response = await api.put(`/leads/${id}`, data)
    return response.data
  },
  
  delete: async (id: number) => {
    const response = await api.delete(`/leads/${id}`)
    return response.data
  },
  
  getStats: async (): Promise<LeadStats> => {
    const response = await api.get('/leads/stats')
    return response.data
  },
}

// Auth API
export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },
  
  logout: () => {
    localStorage.removeItem('authToken')
  },
  
  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false
    return !!localStorage.getItem('authToken')
  },
}

// Analytics API
export const analyticsApi = {
  trackPageView: async (pageUrl: string, referrerUrl: string) => {
    await api.post('/analytics/page-view', { pageUrl, referrerUrl })
  },
  
  trackPhoneClick: async (pageUrl: string) => {
    await api.post('/analytics/phone-click', { pageUrl })
  },
  
  trackEmailClick: async (pageUrl: string) => {
    await api.post('/analytics/email-click', { pageUrl })
  },
}

export default api