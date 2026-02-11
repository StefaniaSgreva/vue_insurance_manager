import axios from 'axios'
import type { Client, Policy, Stats } from '@/types/insurance'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export const apiService = {
  // Stats
  async getStats(): Promise<{
    total_policies: number
    active_policies: number
    expired_policies: number
    total_premium: number
  }> {
    const response = await apiClient.get('/stats')
    return response.data
  },

  // Clients
  async getClients(): Promise<Client[]> {
    const response = await apiClient.get<Client[]>('/clients')
    return response.data
  },

  async getClient(id: number): Promise<Client> {
    const response = await apiClient.get<Client>(`/clients/${id}`)
    return response.data
  },

  async createClient(clientData: Omit<Client, 'id'>): Promise<Client> {
    const response = await apiClient.post<Client>('/clients', clientData)
    return response.data
  },

  async updateClient(id: number, clientData: Partial<Client>): Promise<Client> {
    const response = await apiClient.put<Client>(`/clients/${id}`, clientData)
    return response.data
  },

  async deleteClient(id: number): Promise<void> {
    await apiClient.delete(`/clients/${id}`)
  },

  // Policies (versione paginata e filtrata)
  async getPolicies(
    page: number = 1,
    perPage: number = 10,
    filters?: { type?: string; status?: string },
  ): Promise<{ data: Policy[]; meta: any }> {
    const params: any = { page, per_page: perPage }
    if (filters?.type) params.type = filters.type
    if (filters?.status) params.status = filters.status

    const response = await apiClient.get('/policies', { params })

    // Helper per convertire stringhe → numeri
    const parsePolicyNumbers = (policy: any): Policy => ({
      ...policy,
      premium: Number(policy.premium),
      coverage_amount: Number(policy.coverage_amount),
    })

    // Caso 1: risposta paginata (Laravel)
    if (
      response.data &&
      Array.isArray(response.data.data) &&
      response.data.current_page !== undefined
    ) {
      const convertedData = response.data.data.map(parsePolicyNumbers)
      return {
        data: convertedData,
        meta: {
          current_page: response.data.current_page,
          last_page: response.data.last_page,
          per_page: response.data.per_page,
          total: response.data.total,
        },
      }
    }

    // Caso 2: array semplice (fallback)
    if (Array.isArray(response.data)) {
      const convertedData = response.data.map(parsePolicyNumbers)
      const start = (page - 1) * perPage
      const end = start + perPage
      const paginatedData = convertedData.slice(start, end)
      return {
        data: paginatedData,
        meta: {
          current_page: page,
          last_page: Math.ceil(convertedData.length / perPage),
          per_page: perPage,
          total: convertedData.length,
        },
      }
    }

    throw new Error('Formato risposta API /policies non riconosciuto')
  },
  async getPolicy(id: number): Promise<Policy> {
    const response = await apiClient.get<Policy>(`/policies/${id}`)
    return response.data
  },
  async createPolicy(policyData: Omit<Policy, 'id' | 'client'>): Promise<Policy> {
    const response = await apiClient.post<Policy>('/policies', policyData)
    return response.data
  },
  async updatePolicy(id: number, policyData: Partial<Policy>): Promise<Policy> {
    const response = await apiClient.put<Policy>(`/policies/${id}`, policyData)
    return response.data
  },
  async deletePolicy(id: number): Promise<void> {
    await apiClient.delete(`/policies/${id}`)
  },
}

export default apiClient
