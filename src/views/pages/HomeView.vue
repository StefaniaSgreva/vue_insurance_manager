<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <header class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Insurance Manager - API Test
        </h1>
        <p class="text-gray-600">
          Test your Laravel API connection and endpoints
        </p>
      </header>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Left Column - API Test -->
        <div class="space-y-6">
          <!-- API Connection Test Card -->
          <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div class="p-6">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-bold text-gray-800">Test API Connection</h2>
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 rounded-full"
                       :class="{
                         'bg-green-500': apiData,
                         'bg-red-500': error,
                         'bg-yellow-500': !apiData && !error && !loading,
                         'bg-blue-500 animate-pulse': loading
                       }">
                  </div>
                  <span class="text-sm font-medium text-gray-600">
                    {{ loading ? 'Connecting...' : apiData ? 'Connected' : error ? 'Error' : 'Ready' }}
                  </span>
                </div>
              </div>

              <button
                @click="testConnection"
                :disabled="loading"
                class="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <svg v-if="loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ loading ? 'Testing Connection...' : 'Test Laravel API' }}</span>
              </button>

              <!-- Status Messages -->
              <div class="mt-6 space-y-4">
                <!-- Loading -->
                <div v-if="loading" class="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <svg class="animate-spin h-5 w-5 text-blue-600 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span class="text-blue-800 font-medium">Testing connection to Laravel backend...</span>
                </div>

                <!-- Error -->
                <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div class="flex items-start">
                    <svg class="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 class="font-semibold text-red-800">Connection Error</h3>
                      <p class="text-red-700 mt-1">{{ error }}</p>
                    </div>
                  </div>
                </div>

                <!-- Success -->
                <div v-if="apiData" class="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div class="flex items-start">
                    <svg class="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div class="flex-1">
                      <h3 class="font-semibold text-green-800">Success!</h3>
                      <p class="text-green-700 mt-1">Connected to Laravel API</p>
                      <div class="mt-3 bg-white rounded-lg border border-green-100 overflow-hidden">
                        <pre class="text-xs md:text-sm p-4 overflow-auto max-h-60 bg-gray-50 text-gray-800">{{ JSON.stringify(apiData, null, 2) }}</pre>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Initial State -->
                <div v-if="!loading && !error && !apiData" class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div class="flex items-start">
                    <svg class="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 class="font-semibold text-yellow-800">Ready to Test</h3>
                      <p class="text-yellow-700 mt-1">Click the button to test API connection</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - API Endpoints -->
        <div class="space-y-6">
          <!-- API Endpoints Card -->
          <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div class="p-6">
              <h2 class="text-xl font-bold text-gray-800 mb-6">API Endpoints</h2>

              <div class="space-y-4">
                <div v-for="endpoint in endpoints" :key="endpoint.method + endpoint.path"
                     class="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150">
                  <span :class="{
                    'bg-green-100 text-green-800': endpoint.method === 'GET',
                    'bg-blue-100 text-blue-800': endpoint.method === 'POST',
                    'bg-yellow-100 text-yellow-800': endpoint.method === 'PUT',
                    'bg-red-100 text-red-800': endpoint.method === 'DELETE'
                  }" class="px-3 py-1 rounded-md text-sm font-mono font-bold mr-4">
                    {{ endpoint.method }}
                  </span>
                  <div>
                    <code class="font-mono text-gray-800 bg-gray-200 px-2 py-1 rounded text-sm">
                      {{ endpoint.path }}
                    </code>
                    <p class="text-gray-600 text-sm mt-1">{{ endpoint.description }}</p>
                  </div>
                </div>
              </div>

              <!-- Quick Stats -->
              <div class="mt-8 pt-6 border-t border-gray-200">
                <h3 class="font-semibold text-gray-700 mb-4">API Status</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div class="text-center p-3 bg-blue-50 rounded-lg">
                    <div class="text-2xl font-bold text-blue-700">{{ endpoints.length }}</div>
                    <div class="text-sm text-blue-600">Endpoints</div>
                  </div>
                  <div class="text-center p-3 bg-green-50 rounded-lg">
                    <div class="text-2xl font-bold text-green-700">{{ apiData ? '✓' : '...' }}</div>
                    <div class="text-sm text-green-600">Status</div>
                  </div>
                  <div class="text-center p-3 bg-purple-50 rounded-lg">
                    <div class="text-2xl font-bold text-purple-700">v1.0</div>
                    <div class="text-sm text-purple-600">API Version</div>
                  </div>
                  <div class="text-center p-3 bg-gray-50 rounded-lg">
                    <div class="text-2xl font-bold text-gray-700">{{ new Date().getFullYear() }}</div>
                    <div class="text-sm text-gray-600">Current Year</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Tips -->
          <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl shadow border border-indigo-100 p-6">
            <h3 class="font-bold text-gray-800 mb-3 flex items-center">
              <svg class="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quick Tips
            </h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start">
                <svg class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Ensure Laravel server is running on port 8000
              </li>
              <li class="flex items-start">
                <svg class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Check CORS configuration in Laravel
              </li>
              <li class="flex items-start">
                <svg class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Verify API routes are properly defined
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import apiClient from '@/api/client'

const loading = ref(false)
const error = ref<string | null>(null)
const apiData = ref<any>(null)

// API endpoints data
const endpoints = ref([
  { method: 'GET', path: '/api/stats', description: 'Application statistics' },
  { method: 'GET', path: '/api/clients', description: 'List all clients' },
  { method: 'POST', path: '/api/clients', description: 'Create new client' },
  { method: 'GET', path: '/api/policies', description: 'List all policies' },
  { method: 'POST', path: '/api/policies', description: 'Create new policy' },
  { method: 'PUT', path: '/api/policies/{id}', description: 'Update policy' },
  { method: 'DELETE', path: '/api/policies/{id}', description: 'Delete policy' },
  { method: 'GET', path: '/api/users', description: 'List all users' },
])

const testConnection = async () => {
  loading.value = true
  error.value = null
  apiData.value = null

  try {
    // Try to connect to the /api/stats endpoint
    const response = await apiClient.get('/stats')
    apiData.value = response.data
  } catch (err: any) {
    error.value = err.message || 'Failed to connect to API. Make sure Laravel server is running.'
    console.error('API Error:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Custom scrollbar for the JSON output */
pre::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

pre::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

pre::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

pre::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>
