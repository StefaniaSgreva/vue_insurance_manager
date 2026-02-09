import axios, { type AxiosInstance } from 'axios'

// Istanza axios pre-configurata
const apiClient: AxiosInstance = axios.create({
  // URL del backend Laravel
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export default apiClient
