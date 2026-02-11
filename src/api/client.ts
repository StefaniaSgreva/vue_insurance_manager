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
  async getStats(): Promise<Stats> {
    const response = await apiClient.get<Stats>('/stats')
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

  // Policies (aggiungi se necessario)
  async getPolicies(): Promise<Policy[]> {
    const response = await apiClient.get<Policy[]>('/policies')
    return response.data
  },
}

export default apiClient
