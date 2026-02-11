<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView, useRouter, useRoute } from 'vue-router'
import TheHeader from '../components/layout/TheHeader.vue'
import TheFooter from '../components/layout/TheFooter.vue'
import { apiService } from '@/api/client'
import { usePolicyModalStore } from '@/stores/policyModalStore'
import { useClientModalStore } from '@/stores/clientModalStore'

const router = useRouter()
const route = useRoute()
const policyModalStore = usePolicyModalStore()
const clientModalStore = useClientModalStore()

// --- Apertura modale nuova polizza (via store) ---
const openNewPolicyModal = () => {
  policyModalStore.openModal()
  // Se non siamo già sulla pagina delle polizze, naviga
  if (route.path !== '/policies') {
    router.push('/policies')
  }
}

const openNewClientModal = () => {
  clientModalStore.openModal()
  if (route.path !== '/clients') {
    router.push('/clients')
  }
}

// --- Statistiche laterali ---
const sidebarStats = ref({
  activePolicies: 0,
  expiringSoon: 0,
  newClients: 0,
})

const loadSidebarStats = async () => {
  try {
    // 1. Statistiche globali (active_policies, total_policies, expired_policies, total_premium)
    const stats = await apiService.getStats()
    sidebarStats.value.activePolicies = stats.active_policies

    // 2. Totale clienti (usato come "New Clients")
    const clients = await apiService.getClients()
    sidebarStats.value.newClients = clients.length

    // 3. Polizze attive in scadenza nei prossimi 30 giorni
    const expiringResponse = await apiService.getPolicies(1, 100, {
      status: 'active',
    })
    const today = new Date()
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(today.getDate() + 30)

    const expiringCount = expiringResponse.data.filter((p) => {
      const endDate = new Date(p.end_date)
      return endDate >= today && endDate <= thirtyDaysFromNow
    }).length
    sidebarStats.value.expiringSoon = expiringCount
  } catch (error) {
    console.error('Failed to load sidebar stats:', error)
    // Fallback: valori già inizializzati a 0
  }
}

onMounted(() => {
  loadSidebarStats()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <TheHeader />

    <!-- Sidebar e contenuto principale -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar laterale (desktop) -->
        <aside class="hidden lg:block w-64 flex-shrink-0">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div class="space-y-3">
              <button
                @click="openNewClientModal"
                class="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                New Client
              </button>
              <button
                @click="openNewPolicyModal"
                class="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                New Policy
              </button>
            </div>

            <!-- Statistiche laterali (dati reali) -->
            <div class="mt-8 pt-6 border-t border-gray-200">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Today's Stats</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Active Policies</span>
                  <span class="font-semibold text-primary-600">{{
                    sidebarStats.activePolicies
                  }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Expiring Soon</span>
                  <span class="font-semibold text-yellow-600">{{ sidebarStats.expiringSoon }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">New Clients</span>
                  <span class="font-semibold text-green-600">{{ sidebarStats.newClients }}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Contenuto principale -->
        <main class="flex-1">
          <!-- Breadcrumb -->
          <div class="mb-6">
            <nav class="flex" aria-label="Breadcrumb">
              <ol class="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <router-link to="/" class="hover:text-primary-600">Dashboard</router-link>
                </li>
                <li v-if="route.meta.breadcrumb" class="flex items-center">
                  <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="ml-2">{{ route.meta.breadcrumb }}</span>
                </li>
              </ol>
            </nav>
            <h1 class="text-2xl font-bold text-gray-900 mt-2">
              {{ route.meta.title || 'Dashboard' }}
            </h1>

            <!-- Slot per le view -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <RouterView />
            </div>
          </div>
        </main>
      </div>
    </div>

    <TheFooter />
  </div>
</template>

<style scoped></style>
