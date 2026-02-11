<template>
  <div class="profile-view">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Profile</h2>
      <p class="text-gray-600 mt-1">Your personal information and account settings</p>
    </div>

    <!-- Card profilo -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <!-- Header card con avatar -->
      <div class="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-8">
        <div class="flex items-center">
          <div
            class="h-20 w-20 rounded-full bg-white flex items-center justify-center text-2xl font-bold text-blue-600 shadow-lg"
          >
            {{ userInitials }}
          </div>
          <div class="ml-6">
            <h3 class="text-xl font-bold text-white">{{ authStore.user?.name }}</h3>
            <p class="text-blue-100">Insurance Agent</p>
          </div>
        </div>
      </div>

      <!-- Dettagli utente -->
      <div class="p-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">Account Information</h4>
        <dl class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <dt class="text-sm font-medium text-gray-500">Full name</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ authStore.user?.name || '—' }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Email address</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ authStore.user?.email || '—' }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Account ID</dt>
            <dd class="mt-1 text-sm text-gray-900">#{{ authStore.user?.id }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Member since</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ formatDate(authStore.user?.created_at) }}
            </dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Email verified</dt>
            <dd class="mt-1">
              <span
                :class="
                  authStore.user?.email_verified_at
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                "
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
              >
                {{ authStore.user?.email_verified_at ? 'Verified' : 'Pending' }}
              </span>
            </dd>
          </div>
        </dl>

        <div class="mt-8 pt-6 border-t border-gray-200 flex justify-end">
          <button
            @click="handleLogout"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sign out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

// Iniziali utente
const userInitials = computed(() => {
  const name = authStore.user?.name || ''
  if (name.length === 0) return '?'
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
})

// Formatta data (es. 15 Mar 2024)
const formatDate = (dateString?: string | null) => {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// Logout
const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>
