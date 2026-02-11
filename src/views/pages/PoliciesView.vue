<template>
  <div class="policies-view">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-6">
      <p class="text-gray-600 mt-1">Manage insurance policies and coverage details</p>

      <button @click="openCreateModal" class="btn-primary flex items-center mt-4 md:mt-0">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        New Policy
      </button>
    </div>

    <!-- Filtri -->
    <div class="bg-white rounded-xl p-4 mb-6 border border-gray-200">
      <div class="flex flex-wrap gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Policy Type</label>
          <select v-model="filters.type" class="input py-1.5">
            <option value="">All Types</option>
            <option value="auto">Auto</option>
            <option value="home">Home</option>
            <option value="life">Life</option>
            <option value="health">Health</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select v-model="filters.status" class="input py-1.5">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="cancelled">Cancelled</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div class="flex items-end">
          <button @click="clearFilters" class="btn-secondary">Clear Filters</button>
        </div>
      </div>
    </div>

    <!-- Statistiche rapide -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5">
        <div class="flex items-center">
          <div class="p-3 rounded-lg bg-blue-500 bg-opacity-20">
            <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm text-blue-700">Total Policies</p>
            <p class="text-2xl font-bold text-blue-900">{{ stats.totalPolicies }}</p>
          </div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-5">
        <div class="flex items-center">
          <div class="p-3 rounded-lg bg-green-500 bg-opacity-20">
            <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812z"
                clip-rule="evenodd"
              />
              <path fill-rule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm text-green-700">Active</p>
            <p class="text-2xl font-bold text-green-900">{{ stats.activePolicies }}</p>
          </div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-5">
        <div class="flex items-center">
          <div class="p-3 rounded-lg bg-yellow-500 bg-opacity-20">
            <svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm text-yellow-700">Expired</p>
            <p class="text-2xl font-bold text-yellow-900">{{ stats.expiredPolicies }}</p>
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
    </div>

    <!-- Tabella polizze -->
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
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p class="mt-2 text-gray-500">Loading policies...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="p-8 text-center text-red-600">
        <p>{{ error }}</p>
        <button @click="loadPolicies" class="btn-secondary mt-4">Retry</button>
      </div>

      <!-- Nessuna polizza -->
      <div v-else-if="filteredPolicies.length === 0" class="p-8 text-center">
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No policies found</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by creating a new policy.</p>
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
                Policy #
              </th>
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
                Type
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Premium
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Coverage
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Period
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
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
              v-for="policy in filteredPolicies"
              :key="policy.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ policy.policy_number }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ policy.client?.name || 'N/A' }}</div>
                <div class="text-xs text-gray-500">{{ policy.client?.fiscal_code || '' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="typeClass(policy.type)"
                  class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize"
                >
                  {{ policy.type }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">€{{ policy.premium.toFixed(2) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">€{{ policy.coverage_amount.toFixed(2) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(policy.start_date) }}</div>
                <div class="text-xs text-gray-500">→ {{ formatDate(policy.end_date) }}</div>
                <div v-if="getDaysRemaining(policy.end_date) > 0" class="text-xs text-green-600">
                  {{ getDaysRemaining(policy.end_date) }} days left
                </div>
                <div v-else class="text-xs text-red-600">Expired</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="statusClass(policy.status)"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize"
                >
                  {{ policy.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="editPolicy(policy)"
                  class="text-primary-600 hover:text-primary-900 mr-3"
                >
                  Edit
                </button>
                <button @click="confirmDelete(policy)" class="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal per creare/modificare polizza -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ editingPolicy ? 'Edit Policy' : 'Create New Policy' }}
        </h3>

        <form @submit.prevent="savePolicy" class="space-y-4">
          <!-- Client select -->
          <div>
            <label for="client_id" class="label">Client *</label>
            <select v-model="form.client_id" id="client_id" class="input" required>
              <option value="">Select a client</option>
              <option v-for="client in clients" :key="client.id" :value="client.id">
                {{ client.name }} ({{ client.fiscal_code }})
              </option>
            </select>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="policy_number" class="label">Policy Number *</label>
              <input
                v-model="form.policy_number"
                type="text"
                id="policy_number"
                class="input"
                required
              />
            </div>
            <div>
              <label for="type" class="label">Policy Type *</label>
              <select v-model="form.type" id="type" class="input" required>
                <option value="auto">Auto</option>
                <option value="home">Home</option>
                <option value="life">Life</option>
                <option value="health">Health</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="premium" class="label">Premium (€) *</label>
              <input
                v-model="form.premium"
                type="number"
                step="0.01"
                id="premium"
                class="input"
                required
              />
            </div>
            <div>
              <label for="coverage_amount" class="label">Coverage Amount (€) *</label>
              <input
                v-model="form.coverage_amount"
                type="number"
                step="0.01"
                id="coverage_amount"
                class="input"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="start_date" class="label">Start Date *</label>
              <input v-model="form.start_date" type="date" id="start_date" class="input" required />
            </div>
            <div>
              <label for="end_date" class="label">End Date *</label>
              <input v-model="form.end_date" type="date" id="end_date" class="input" required />
            </div>
          </div>

          <div>
            <label for="status" class="label">Status</label>
            <select v-model="form.status" id="status" class="input">
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
              <option value="expired">Expired</option>
            </select>
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
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </span>
              <span v-else>{{ editingPolicy ? 'Update' : 'Create' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { apiService } from '@/api/client'
import type { Client, Policy } from '@/types/insurance'

// Stato
const policies = ref<Policy[]>([])
const clients = ref<Client[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const saving = ref(false)
const showModal = ref(false)
const editingPolicy = ref<Policy | null>(null)

// Filtri
const filters = ref({
  type: '',
  status: '',
})

// Form
const form = reactive({
  client_id: 0,
  policy_number: '',
  type: 'auto' as Policy['type'],
  premium: 0,
  coverage_amount: 0,
  start_date: '',
  end_date: '',
  status: 'active' as Policy['status'],
})

// Statistiche calcolate
const stats = computed(() => {
  const totalPolicies = policies.value.length
  const activePolicies = policies.value.filter((p) => p.status === 'active').length
  const expiredPolicies = policies.value.filter((p) => p.status === 'expired').length
  const totalPremium = policies.value.reduce((sum, p) => sum + p.premium, 0)
  return { totalPolicies, activePolicies, expiredPolicies, totalPremium }
})

// Polizze filtrate
const filteredPolicies = computed(() => {
  return policies.value.filter((policy) => {
    const matchesType = !filters.value.type || policy.type === filters.value.type
    const matchesStatus = !filters.value.status || policy.status === filters.value.status
    return matchesType && matchesStatus
  })
})

// Formatta data
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('it-IT')
}

// Giorni rimanenti
const getDaysRemaining = (endDate: string) => {
  const end = new Date(endDate)
  const today = new Date()
  const diff = end.getTime() - today.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

// Classi CSS
const typeClass = (type: string) => {
  const classes = {
    auto: 'bg-blue-100 text-blue-800',
    home: 'bg-green-100 text-green-800',
    life: 'bg-purple-100 text-purple-800',
    health: 'bg-pink-100 text-pink-800',
  }
  return classes[type as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const statusClass = (status: string) => {
  const classes = {
    active: 'bg-green-100 text-green-800',
    expired: 'bg-red-100 text-red-800',
    cancelled: 'bg-yellow-100 text-yellow-800',
    pending: 'bg-orange-100 text-orange-800',
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

// Carica dati
const loadPolicies = async () => {
  loading.value = true
  error.value = null
  try {
    policies.value = await apiService.getPolicies()
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = 'Failed to load policies'
    }
    console.error(err)
  } finally {
    loading.value = false
  }
}

const loadClients = async () => {
  try {
    clients.value = await apiService.getClients()
  } catch (err: unknown) {
    console.error('Failed to load clients:', err)
  }
}

// Reset form
const resetForm = () => {
  form.client_id = 0
  form.policy_number = ''
  form.type = 'auto'
  form.premium = 0
  form.coverage_amount = 0
  form.start_date = ''
  form.end_date = ''
  form.status = 'active'
  editingPolicy.value = null
}

// Apri modale per nuova polizza
const openCreateModal = () => {
  resetForm()
  // Valori di default con slice(0,10) – più sicuro di split
  const today = new Date()
  const nextYear = new Date()
  nextYear.setFullYear(today.getFullYear() + 1)
  form.start_date = today.toISOString().slice(0, 10)
  form.end_date = nextYear.toISOString().slice(0, 10)
  showModal.value = true
}

// Apri modale per modifica
const editPolicy = (policy: Policy) => {
  editingPolicy.value = policy
  form.client_id = policy.client_id
  form.policy_number = policy.policy_number
  form.type = policy.type
  form.premium = policy.premium
  form.coverage_amount = policy.coverage_amount
  form.start_date = policy.start_date
  form.end_date = policy.end_date
  form.status = policy.status
  showModal.value = true
}

// Chiudi modale
const closeModal = () => {
  showModal.value = false
  resetForm()
}

// Salva polizza
const savePolicy = async () => {
  saving.value = true
  try {
    if (editingPolicy.value) {
      const updated = await apiService.updatePolicy(editingPolicy.value.id, form)
      const index = policies.value.findIndex((p) => p.id === updated.id)
      if (index !== -1) policies.value[index] = updated
    } else {
      const newPolicy = await apiService.createPolicy(form)
      policies.value.push(newPolicy)
    }
    closeModal()
  } catch (err: unknown) {
    let errorMessage = 'An error occurred while saving the policy'
    if (err instanceof Error) {
      errorMessage = err.message
    }
    alert(`Error: ${errorMessage}`)
  } finally {
    saving.value = false
  }
}

// Elimina polizza
const confirmDelete = async (policy: Policy) => {
  if (!confirm(`Are you sure you want to delete policy ${policy.policy_number}?`)) return
  try {
    await apiService.deletePolicy(policy.id)
    policies.value = policies.value.filter((p) => p.id !== policy.id)
  } catch (err: unknown) {
    let errorMessage = 'Failed to delete policy'
    if (err instanceof Error) {
      errorMessage = err.message
    }
    alert(`Error: ${errorMessage}`)
  }
}

// Pulisci filtri
const clearFilters = () => {
  filters.value = { type: '', status: '' }
}

onMounted(() => {
  loadPolicies()
  loadClients()
})
</script>

<style scoped>
/* Tailwind si occupa di tutto */
</style>
