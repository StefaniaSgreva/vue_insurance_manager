<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from './components/layout/TheHeader.vue'
import TheFooter from './components/layout/TheFooter.vue'
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
                @click="$router.push('/clients/new')"
                class="w-full flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
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
                @click="$router.push('/policies/new')"
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

            <!-- Statistiche laterali -->
            <div class="mt-8 pt-6 border-t border-gray-200">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Today's Stats</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Active Policies</span>
                  <span class="font-semibold text-primary-600">24</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Expiring Soon</span>
                  <span class="font-semibold text-yellow-600">3</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">New Clients</span>
                  <span class="font-semibold text-green-600">5</span>
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
                <li v-if="$route.meta.breadcrumb" class="flex items-center">
                  <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="ml-2">{{ $route.meta.breadcrumb }}</span>
                </li>
              </ol>
            </nav>
            <h1 class="text-2xl font-bold text-gray-900 mt-2">
              {{ $route.meta.title || 'Dashboard' }}
            </h1>

            <!-- Slot per il contenuto delle view -->
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
