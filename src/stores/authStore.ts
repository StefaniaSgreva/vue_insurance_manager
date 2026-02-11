import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import apiClient from '@/api/client'
import type { User } from '@/types/user'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  function setAuthData(userData: User, tokenData: string) {
    user.value = userData
    token.value = tokenData
    localStorage.setItem('token', tokenData)
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${tokenData}`
  }

  function clearAuthData() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    delete apiClient.defaults.headers.common['Authorization']
  }

  async function register(
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.post('/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
      setAuthData(response.data.user, response.data.token)
      return true
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        error.value = err.response?.data?.message || 'Registration failed'
        console.error('Register error:', err.response?.data || err)
      } else if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'Registration failed'
      }
      return false
    } finally {
      loading.value = false
    }
  }

  async function login(email: string, password: string) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.post('/login', { email, password })
      setAuthData(response.data.user, response.data.token)
      return true
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        error.value = err.response?.data?.message || 'Invalid credentials'
      } else if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'Invalid credentials'
      }
      return false
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    loading.value = true
    try {
      await apiClient.post('/logout', null, {
        headers: { Authorization: `Bearer ${token.value}` },
      })
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error('Logout error:', err.response?.data || err.message)
      } else if (err instanceof Error) {
        console.error('Logout error:', err.message)
      }
    } finally {
      clearAuthData()
      loading.value = false
    }
  }

  async function fetchUser() {
    if (!token.value) return
    try {
      const response = await apiClient.get('/user', {
        headers: { Authorization: `Bearer ${token.value}` },
      })
      user.value = response.data
    } catch {
      clearAuthData()
    }
  }

  if (token.value) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
    fetchUser()
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    register,
    login,
    logout,
    fetchUser,
  }
})
