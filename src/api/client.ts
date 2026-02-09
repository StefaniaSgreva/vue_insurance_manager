import axios, { type AxiosInstance } from 'axios'

// Istanza axios pre-configurata
const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // URL del backend Laravel
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export default apiClient
