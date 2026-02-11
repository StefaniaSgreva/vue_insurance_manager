<template>
  <div class="clients-view">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Client Management</h2>
        <p class="text-gray-600 mt-1">Manage your insurance clients and their information</p>
      </div>
      <button @click="openCreateModal" class="btn-primary flex items-center mt-4 md:mt-0">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Add Client
      </button>
    </div>

    <!-- Statistiche clienti (dinamiche) -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5">
        <div class="flex items-center">
          <div class="p-3 rounded-lg bg-blue-500 bg-opacity-20">
            <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm text-blue-700">Total Clients</p>
            <p class="text-2xl font-bold text-blue-900">{{ stats.totalClients }}</p>
          </div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-5">
        <div class="flex items-center">
          <div class="p-3 rounded-lg bg-green-500 bg-opacity-20">
            <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm text-green-700">Active Policies</p>
            <p class="text-2xl font-bold text-green-900">{{ stats.activePolicies }}</p>
          </div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-5">
        <div class="flex items-center">
          <div class="p-3 rounded-lg bg-purple-500 bg-opacity-20">
            <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"
              />
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm text-purple-700">Total Premium</p>
            <p class="text-2xl font-bold text-purple-900">€{{ stats.totalPremium.toFixed(2) }}</p>
          </div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-5">
        <div class="flex items-center">
          <div class="p-3 rounded-lg bg-orange-500 bg-opacity-20">
            <svg class="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm text-orange-700">Avg. Premium</p>
            <p class="text-2xl font-bold text-orange-900">€{{ stats.avgPremium.toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Barra di ricerca -->
    <div class="mb-4 flex justify-end">
      <div class="relative w-full md:w-64">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search clients..."
          class="input pl-10"
        />
        <svg
          class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>

    <!-- Tabella clienti -->
    <div class="overflow-hidden rounded-xl border border-gray-200">
      <!-- Loading -->
      <div v-if="loading" class="p-8 text-center">
        <svg
          class="animate-spin h-8 w-8 text-primary-600 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <p class="mt-2 text-gray-500">Loading clients...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="p-8 text-center text-red-600">
        <p>{{ error }}</p>
        <button @click="loadClients" class="btn-secondary mt-4">Retry</button>
      </div>

      <!-- Nessun cliente -->
      <div v-else-if="filteredClients.length === 0" class="p-8 text-center">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No clients found</h3>
        <p class="mt-1 text-sm text-gray-500">
          {{
            searchQuery ? 'Try a different search term' : 'Get started by creating a new client.'
          }}
        </p>
      </div>

      <!-- Tabella -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Client
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Contact
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Fiscal Code
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Policies
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="client in filteredClients"
              :key="client.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-10 w-10 flex-shrink-0">
                    <div
                      class="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 font-semibold"
                    >
                      {{ client.name.charAt(0).toUpperCase() }}
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ client.name }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ client.email }}</div>
                <div class="text-xs text-gray-500">{{ client.phone || 'No phone' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ client.fiscal_code }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                >
                  {{ client.policies_count || 0 }} active
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="editClient(client)"
                  class="text-primary-600 hover:text-primary-900 mr-3"
                >
                  Edit
                </button>
                <button @click="confirmDelete(client)" class="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal per creare/modificare cliente -->
    <div
      v-if="clientModalStore.isOpen"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-xl max-w-md w-full p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ editingClient ? 'Edit Client' : 'Add New Client' }}
        </h3>

        <form @submit.prevent="saveClient" class="space-y-4">
          <div>
            <label for="name" class="label">Full Name *</label>
            <input
              v-model="form.name"
              type="text"
              id="name"
              class="input"
              required
              placeholder="John Doe"
            />
          </div>
          <div>
            <label for="email" class="label">Email Address *</label>
            <input
              v-model="form.email"
              type="email"
              id="email"
              class="input"
              required
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label for="phone" class="label">Phone Number</label>
            <input
              v-model="form.phone"
              type="tel"
              id="phone"
              class="input"
              placeholder="+39 123 456 7890"
            />
          </div>
          <div>
            <label for="fiscal_code" class="label">Fiscal Code *</label>
            <input
              v-model="form.fiscal_code"
              type="text"
              id="fiscal_code"
              class="input"
              required
              placeholder="ABCDEF12G34H567I"
            />
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="closeModal" class="btn-secondary">Cancel</button>
            <button type="submit" class="btn-primary" :disabled="saving">
              <span v-if="saving" class="flex items-center">
                <svg
                  class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Saving...
              </span>
              <span v-else>{{ editingClient ? 'Update' : 'Create' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import { apiService } from '@/api/client'
import type { Client } from '@/types/insurance'
import { useClientModalStore } from '@/stores/clientModalStore'

const clientModalStore = useClientModalStore()

// --- Stato ---
const clients = ref<Client[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const saving = ref(false)
const editingClient = ref<Client | null>(null)
const searchQuery = ref('')

// --- Form ---
const form = reactive({
  name: '',
  email: '',
  phone: '',
  fiscal_code: '',
})

// --- Statistiche calcolate ---
const stats = computed(() => {
  const totalClients = clients.value.length
  const totalPolicies = clients.value.reduce((sum, c) => sum + (c.policies_count || 0), 0)
  const totalPremium = totalPolicies * 1200 // esempio, in futuro prendere da API
  const avgPremium = totalPolicies > 0 ? totalPremium / totalPolicies : 0
  return {
    totalClients,
    activePolicies: totalPolicies,
    totalPremium,
    avgPremium,
  }
})

// --- Filtro ricerca ---
const filteredClients = computed(() => {
  if (!searchQuery.value) return clients.value
  const q = searchQuery.value.toLowerCase()
  return clients.value.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.fiscal_code.toLowerCase().includes(q),
  )
})

// --- Caricamento clienti (con conteggio polizze) ---
const loadClients = async () => {
  loading.value = true
  error.value = null
  try {
    clients.value = await apiService.getClients()
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      error.value = `API Error (${err.response?.status}): ${err.response?.data?.message || err.message}`
    } else if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = 'Failed to load clients'
    }
  } finally {
    loading.value = false
  }
}

// --- Reset form ---
const resetForm = () => {
  form.name = ''
  form.email = ''
  form.phone = ''
  form.fiscal_code = ''
  editingClient.value = null
}

// --- Apertura modale per nuovo cliente ---
const openCreateModal = () => {
  resetForm()
  clientModalStore.openModal()
}

// --- Apertura modale per modifica ---
const editClient = (client: Client) => {
  editingClient.value = client
  form.name = client.name
  form.email = client.email
  form.phone = client.phone || ''
  form.fiscal_code = client.fiscal_code
  clientModalStore.openModal()
}

// --- Chiusura modale ---
const closeModal = () => {
  clientModalStore.closeModal()
  resetForm()
}

// --- Salvataggio (creazione/aggiornamento) ---
const saveClient = async () => {
  saving.value = true
  try {
    if (editingClient.value) {
      const updated = await apiService.updateClient(editingClient.value.id, form)
      const index = clients.value.findIndex((c) => c.id === updated.id)
      if (index !== -1) clients.value[index] = updated
    } else {
      const newClient = await apiService.createClient(form)
      clients.value.push(newClient)
    }
    closeModal()
  } catch (err: unknown) {
    let errorMessage = 'An error occurred while saving the client'
    if (axios.isAxiosError(err) && err.response) {
      console.error('Validation error:', err.response.data)
      errorMessage = err.response.data.message || errorMessage
    } else if (err instanceof Error) {
      errorMessage = err.message
    }
    alert(`Error: ${errorMessage}`)
  } finally {
    saving.value = false
  }
}

// --- Eliminazione ---
const confirmDelete = async (client: Client) => {
  if (!confirm(`Are you sure you want to delete ${client.name}?`)) return
  try {
    await apiService.deleteClient(client.id)
    clients.value = clients.value.filter((c) => c.id !== client.id)
  } catch (err: unknown) {
    let errorMessage = 'Failed to delete client'
    if (err instanceof Error) errorMessage = err.message
    alert(`Error: ${errorMessage}`)
  }
}

// --- Watcher: reset form quando si apre la modale senza editing ---
watch(
  () => clientModalStore.isOpen,
  (isOpen) => {
    if (isOpen && !editingClient.value) {
      resetForm()
    }
  },
)

// --- Mount ---
onMounted(() => {
  loadClients()
})
</script>

<style scoped>
/* Tailwind gestisce tutto */
</style>
