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

    <!-- Filtri (inviati al backend) -->
    <div class="bg-white rounded-xl p-4 mb-6 border border-gray-200">
      <div class="flex flex-wrap gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Policy Type</label>
          <select v-model="filters.type" @change="applyFilters" class="input py-1.5">
            <option value="">All Types</option>
            <option value="auto">Auto</option>
            <option value="home">Home</option>
            <option value="life">Life</option>
            <option value="health">Health</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select v-model="filters.status" @change="applyFilters" class="input py-1.5">
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

    <!-- Statistiche -->
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

    <!-- Tabella polizze (dati paginati e filtrati dal backend) -->
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
        <p class="mt-2 text-gray-500">Loading policies...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="p-8 text-center text-red-600">
        <p>{{ error }}</p>
        <button @click="loadPolicies(currentPage)" class="btn-secondary mt-4">Retry</button>
      </div>

      <!-- Nessuna polizza -->
      <div v-else-if="policies.length === 0" class="p-8 text-center">
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
        <table class="min-w-full table-fixed divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Policy #
              </th>
              <th
                scope="col"
                class="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Client
              </th>
              <th
                scope="col"
                class="w-20 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                scope="col"
                class="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Premium
              </th>
              <th
                scope="col"
                class="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Coverage
              </th>
              <th
                scope="col"
                class="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Details
              </th>
              <th
                scope="col"
                class="w-40 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Period
              </th>
              <th
                scope="col"
                class="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                class="w-28 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="policy in policies"
              :key="policy.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td
                class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate"
                :title="policy.policy_number"
              >
                {{ policy.policy_number }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 truncate" :title="policy.client?.name">
                  {{ policy.client?.name || 'N/A' }}
                </div>
                <div class="text-xs text-gray-500 truncate">
                  {{ policy.client?.fiscal_code || '' }}
                </div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <span
                  :class="typeClass(policy.type)"
                  class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize"
                >
                  {{ policy.type }}
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                €{{ (policy.premium ?? 0).toFixed(2) }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                €{{ (policy.coverage_amount ?? 0).toFixed(2) }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                <div v-if="policy.details" class="truncate max-w-full">
                  <span
                    v-if="
                      typeof policy.details.vehicle === 'string' &&
                      typeof policy.details.year === 'string'
                    "
                    class="text-xs"
                    :title="`${policy.details.vehicle} (${policy.details.year})`"
                  >
                    🚗 {{ policy.details.vehicle }} ({{ policy.details.year }})
                  </span>
                  <span
                    v-else-if="typeof policy.details.property_address === 'string'"
                    class="text-xs"
                    :title="policy.details.property_address"
                  >
                    🏠 {{ truncateAddress(policy.details.property_address) }}
                  </span>
                  <span v-else class="text-xs text-gray-400">
                    <button @click="viewDetails(policy)" class="text-primary-600 hover:underline">
                      View
                    </button>
                  </span>
                </div>
                <div v-else class="text-xs text-gray-400">—</div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(policy.start_date) }}</div>
                <div class="text-xs text-gray-500">→ {{ formatDate(policy.end_date) }}</div>
                <div v-if="getDaysRemaining(policy.end_date) > 0" class="text-xs text-green-600">
                  {{ getDaysRemaining(policy.end_date) }}d
                </div>
                <div v-else class="text-xs text-red-600">Expired</div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <span
                  :class="statusClass(policy.status)"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize"
                >
                  {{ policy.status }}
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="editPolicy(policy)"
                  class="text-primary-600 hover:text-primary-900 mr-2"
                >
                  Edit
                </button>
                <button @click="confirmDelete(policy)" class="text-red-600 hover:text-red-900">
                  Del
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Paginazione lato backend -->
      <div
        v-if="!loading && !error && total > 0"
        class="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6"
      >
        <div class="flex justify-between sm:hidden">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === lastPage"
            class="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing
              <span class="font-medium">{{ (currentPage - 1) * perPage + 1 }}</span>
              to
              <span class="font-medium">{{ Math.min(currentPage * perPage, total) }}</span>
              of
              <span class="font-medium">{{ total }}</span>
              results
            </p>
          </div>
          <div>
            <nav
              class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50"
              >
                <span class="sr-only">Previous</span>
                <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  page === currentPage
                    ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                  'relative inline-flex items-center px-4 py-2 text-sm font-medium border',
                ]"
              >
                {{ page }}
              </button>
              <button
                @click="nextPage"
                :disabled="currentPage === lastPage"
                class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50"
              >
                <span class="sr-only">Next</span>
                <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
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
                v-model.number="form.premium"
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
                v-model.number="form.coverage_amount"
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

          <!-- Campo DETAILS (JSON) -->
          <div>
            <label for="details" class="label">Additional Details (JSON)</label>
            <textarea
              v-model="detailsText"
              id="details"
              rows="3"
              class="input font-mono text-sm"
              placeholder='{"vehicle":"Audi","year":"2020"}'
            ></textarea>
            <p class="text-xs text-gray-500 mt-1">Inserisci un oggetto JSON valido (opzionale)</p>
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
              <span v-else>{{ editingPolicy ? 'Update' : 'Create' }}</span>
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
import type { Client, Policy } from '@/types/insurance'

// ----------------------------------------------------------------------
// Interfaccia locale per le statistiche
// ----------------------------------------------------------------------
interface PolicyStats {
  totalPolicies: number
  activePolicies: number
  expiredPolicies: number
  totalPremium: number
}

// --- Stato ---
const policies = ref<Policy[]>([])
const clients = ref<Client[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const saving = ref(false)
const showModal = ref(false)
const editingPolicy = ref<Policy | null>(null)

// Paginazione lato backend
const currentPage = ref(1)
const lastPage = ref(1)
const perPage = ref(10)
const total = ref(0)

// Filtri (inviati al backend)
const filters = ref({
  type: '',
  status: '',
})

// Statistiche
const stats = ref<PolicyStats>({
  totalPolicies: 0,
  activePolicies: 0,
  expiredPolicies: 0,
  totalPremium: 0,
})

// Form
const form = reactive({
  client_id: '',
  policy_number: '',
  type: 'auto' as Policy['type'],
  premium: 0,
  coverage_amount: 0,
  start_date: '',
  end_date: '',
  status: 'active' as Policy['status'],
})
const detailsText = ref('')

// --- Numeri pagina visibili ---
const visiblePages = computed(() => {
  const delta = 2
  const range: number[] = []
  const rangeWithDots: (number | string)[] = []
  let l: number | undefined

  for (let i = 1; i <= lastPage.value; i++) {
    if (
      i === 1 ||
      i === lastPage.value ||
      (i >= currentPage.value - delta && i <= currentPage.value + delta)
    ) {
      range.push(i)
    }
  }

  range.forEach((i) => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i)
    l = i
  })

  return rangeWithDots
})

// --- Caricamento polizze con paginazione e filtri (lato backend) ---
const loadPolicies = async (page: number = 1) => {
  loading.value = true
  error.value = null
  try {
    const response = await apiService.getPolicies(page, perPage.value, {
      type: filters.value.type || undefined,
      status: filters.value.status || undefined,
    })
    policies.value = response.data
    currentPage.value = response.meta.current_page
    lastPage.value = response.meta.last_page
    total.value = response.meta.total
    await loadStats()
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      error.value = `API Error (${err.response?.status}): ${err.response?.data?.message || err.message}`
    } else if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = 'Failed to load policies'
    }
  } finally {
    loading.value = false
  }
}

// --- Caricamento statistiche (con fallback) ---
const loadStats = async () => {
  try {
    const data = await apiService.getStats()
    stats.value = {
      totalPolicies: data.total_policies,
      activePolicies: data.active_policies,
      expiredPolicies: data.expired_policies,
      totalPremium: Number(data.total_premium),
    }
  } catch {
    console.warn('⚠️ Statistiche non disponibili, uso fallback')
    stats.value = {
      totalPolicies: total.value, // usiamo il totale della paginazione
      activePolicies: policies.value.filter((p) => p.status?.toLowerCase() === 'active').length,
      expiredPolicies: policies.value.filter((p) => p.status?.toLowerCase() === 'expired').length,
      totalPremium: policies.value.reduce((sum, p) => sum + (Number(p.premium) || 0), 0),
    }
  }
}

// --- Caricamento clienti ---
const loadClients = async () => {
  try {
    clients.value = await apiService.getClients()
  } catch (err) {
    console.error('Failed to load clients:', err)
  }
}

// --- Filtri ---
const applyFilters = () => {
  currentPage.value = 1
  loadPolicies(1)
}

const clearFilters = () => {
  filters.value = { type: '', status: '' }
  applyFilters()
}

// --- Paginazione ---
const nextPage = () => {
  if (currentPage.value < lastPage.value) {
    loadPolicies(currentPage.value + 1)
  }
}
const prevPage = () => {
  if (currentPage.value > 1) {
    loadPolicies(currentPage.value - 1)
  }
}
const goToPage = (page: number | string) => {
  if (typeof page !== 'number') return
  if (page >= 1 && page <= lastPage.value) {
    loadPolicies(page)
  }
}

// --- Watcher: quando cambiano i filtri, resetta a pagina 1 ---
watch(
  () => filters.value,
  () => {
    currentPage.value = 1
    loadPolicies(1)
  },
  { deep: true },
)

// --- Utility ---
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('it-IT')
const getDaysRemaining = (endDate: string) => {
  const diff = new Date(endDate).getTime() - new Date().getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}
const truncateAddress = (address: string) =>
  address.length > 30 ? address.substring(0, 27) + '...' : address
const viewDetails = (policy: Policy) => alert(JSON.stringify(policy.details, null, 2))

// --- Classi dinamiche (case‑insensitive) ---
const typeClass = (type: string) => {
  const t = type.toLowerCase()
  const classes = {
    auto: 'bg-blue-100 text-blue-800',
    home: 'bg-green-100 text-green-800',
    life: 'bg-purple-100 text-purple-800',
    health: 'bg-pink-100 text-pink-800',
  }
  return classes[t as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}
const statusClass = (status: string) => {
  const s = status.toLowerCase()
  const classes = {
    active: 'bg-green-100 text-green-800',
    expired: 'bg-red-100 text-red-800',
    cancelled: 'bg-yellow-100 text-yellow-800',
    pending: 'bg-orange-100 text-orange-800',
  }
  return classes[s as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

// --- Gestione form (CRUD) ---
const resetForm = () => {
  form.client_id = ''
  form.policy_number = ''
  form.type = 'auto'
  form.premium = 0
  form.coverage_amount = 0
  form.start_date = ''
  form.end_date = ''
  form.status = 'active'
  detailsText.value = ''
  editingPolicy.value = null
}

const openCreateModal = () => {
  resetForm()
  const today = new Date()
  const nextYear = new Date()
  nextYear.setFullYear(today.getFullYear() + 1)
  form.start_date = today.toISOString().slice(0, 10)
  form.end_date = nextYear.toISOString().slice(0, 10)
  showModal.value = true
}

const editPolicy = (policy: Policy) => {
  editingPolicy.value = policy
  form.client_id = String(policy.client_id)
  form.policy_number = policy.policy_number
  form.type = policy.type
  form.premium = Number(policy.premium)
  form.coverage_amount = Number(policy.coverage_amount)
  form.start_date = policy.start_date.slice(0, 10)
  form.end_date = policy.end_date.slice(0, 10)
  form.status = policy.status
  detailsText.value = policy.details ? JSON.stringify(policy.details, null, 2) : ''
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const savePolicy = async () => {
  saving.value = true
  let details = null
  if (detailsText.value.trim()) {
    try {
      details = JSON.parse(detailsText.value)
    } catch {
      alert('Invalid JSON format in details field')
      saving.value = false
      return
    }
  }
  const policyData = {
    ...form,
    client_id: Number(form.client_id),
    details,
  }
  try {
    if (editingPolicy.value) {
      const updated = await apiService.updatePolicy(editingPolicy.value.id, policyData)
      const index = policies.value.findIndex((p) => p.id === updated.id)
      if (index !== -1) policies.value[index] = updated
    } else {
      const newPolicy = await apiService.createPolicy(policyData)
      policies.value.push(newPolicy)
    }
    closeModal()
    // Ricarica la pagina corrente
    loadPolicies(currentPage.value)
  } catch (err: unknown) {
    let errorMessage = 'An error occurred while saving the policy'
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

const confirmDelete = async (policy: Policy) => {
  if (!confirm(`Are you sure you want to delete policy ${policy.policy_number}?`)) return
  try {
    await apiService.deletePolicy(policy.id)
    policies.value = policies.value.filter((p) => p.id !== policy.id)
    // Ricarica la pagina corrente
    loadPolicies(currentPage.value)
  } catch (err: unknown) {
    let errorMessage = 'Failed to delete policy'
    if (err instanceof Error) errorMessage = err.message
    alert(`Error: ${errorMessage}`)
  }
}

// --- Mount ---
onMounted(() => {
  loadPolicies(1)
  loadClients()
})
</script>

<style scoped>
/* Tutti gli stili sono gestiti da Tailwind */
</style>
