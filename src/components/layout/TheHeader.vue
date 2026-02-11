<template>
  <nav
    class="bg-white shadow-md border-b border-gray-200"
    :class="{ 'shadow-lg': mobileMenuOpen }"
    aria-label="Main navigation"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo e titolo -->
        <div class="flex items-center">
          <router-link
            to="/"
            class="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
            aria-label="Home page"
          >
            <div class="flex-shrink-0 flex items-center">
              <svg
                class="h-8 w-8 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <span class="ml-2 text-xl font-bold text-gray-900">Insurance Manager</span>
            </div>
          </router-link>
        </div>

        <!-- Navigazione desktop -->
        <div
          class="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-2"
          role="menubar"
          aria-label="Desktop navigation"
        >
          <template v-for="item in navigation" :key="item.name">
            <router-link
              :to="item.to"
              :class="[
                'px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                $route.path === item.to
                  ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-200'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:scale-105',
              ]"
              :aria-current="$route.path === item.to ? 'page' : undefined"
              role="menuitem"
              :tabindex="0"
              @keydown.enter="handleNavKeydown(item)"
              @keydown.space.prevent="handleNavKeydown(item)"
            >
              {{ item.name }}
            </router-link>
          </template>
        </div>

        <!-- Desktop: Profilo utente cliccabile -->
        <div class="flex items-center">
          <!-- Link al profilo (desktop) -->
          <div v-if="authStore.isAuthenticated" class="hidden sm:flex sm:items-center sm:space-x-4">
            <div class="text-right">
              <router-link
                to="/profile"
                class="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                :aria-label="`Profilo di ${authStore.user?.name || 'Utente'}`"
              >
                <p class="text-sm font-medium text-gray-900">
                  {{ authStore.user?.name || 'Utente' }}
                </p>
                <p class="text-xs text-gray-500">Insurance Agent</p>
              </router-link>
            </div>
            <router-link
              to="/profile"
              class="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              :aria-label="`Profilo di ${authStore.user?.name || 'Utente'}`"
            >
              {{ userInitials }}
              <span class="sr-only">Profile</span>
            </router-link>
          </div>

          <!-- Hamburger button (visibile solo mobile) -->
          <button
            @click="toggleMobileMenu"
            @keydown.escape="mobileMenuOpen = false"
            class="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
            :aria-expanded="mobileMenuOpen"
            aria-controls="mobile-menu"
            aria-label="Toggle mobile menu"
            :aria-pressed="mobileMenuOpen"
          >
            <span class="sr-only">{{ mobileMenuOpen ? 'Close main menu' : 'Open main menu' }}</span>
            <!-- Icona hamburger (3 linee) -->
            <svg
              class="h-6 w-6 transform transition-all duration-300"
              :class="mobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <!-- Icona X (croce) -->
            <svg
              class="absolute h-6 w-6 transform transition-all duration-300"
              :class="mobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Navigazione mobile con animazioni -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="mobileMenuOpen"
        id="mobile-menu"
        class="sm:hidden bg-white border-t border-gray-100 shadow-lg"
        role="menu"
        aria-label="Mobile navigation"
        @keydown.escape="mobileMenuOpen = false"
      >
        <div class="px-4 pt-2 pb-3 space-y-1">
          <template v-for="item in navigation" :key="item.name">
            <router-link
              :to="item.to"
              @click="mobileMenuOpen = false"
              @keydown.enter="handleMobileNavKeydown(item)"
              @keydown.space.prevent="handleMobileNavKeydown(item)"
              :class="[
                'block px-3 py-3 rounded-md text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                $route.path === item.to
                  ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700 pl-4 transform translate-x-1'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:pl-5',
              ]"
              :aria-current="$route.path === item.to ? 'page' : undefined"
              role="menuitem"
              :tabindex="mobileMenuOpen ? 0 : -1"
            >
              {{ item.name }}
            </router-link>
          </template>

          <!-- Link al profilo in mobile -->
          <div v-if="authStore.isAuthenticated" class="border-t border-gray-200 pt-4 mt-4">
            <div class="flex items-center px-3 py-3">
              <div
                class="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold"
              >
                {{ userInitials }}
              </div>
              <div class="ml-3">
                <router-link
                  to="/profile"
                  @click="mobileMenuOpen = false"
                  class="text-sm font-medium text-gray-900 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                >
                  {{ authStore.user?.name || 'Utente' }}
                </router-link>
                <p class="text-xs text-gray-500">Insurance Agent</p>
              </div>
            </div>
            <div class="mt-2 space-y-1">
              <button
                @click="handleLogout"
                class="block w-full text-left px-3 py-2 rounded-md text-base text-gray-700 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

interface NavigationItem {
  name: string
  to: string
}

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const mobileMenuOpen = ref(false)

// Navigazione
const navigation: NavigationItem[] = [
  { name: 'Dashboard', to: '/' },
  { name: 'Clients', to: '/clients' },
  { name: 'Policies', to: '/policies' },
  { name: 'Reports', to: '/reports' },
  { name: 'Settings', to: '/settings' },
]

// Iniziali utente
const userInitials = computed(() => {
  const name = authStore.user?.name || ''
  if (name.length === 0) return '?'
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
})

// Funzioni toggle
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Logout
const handleLogout = async () => {
  await authStore.logout()
  mobileMenuOpen.value = false
  router.push('/login')
}

// Gestione tastiera per navigazione
const handleNavKeydown = (item: NavigationItem) => {
  router.push(item.to)
}

const handleMobileNavKeydown = (item: NavigationItem) => {
  router.push(item.to)
  mobileMenuOpen.value = false
}

// Gestione focus per accessibilità (trap focus nel menu mobile)
const trapFocus = (e: KeyboardEvent) => {
  if (!mobileMenuOpen.value) return

  const focusableElements = document.querySelectorAll<HTMLElement>(
    '#mobile-menu [role="menuitem"], #mobile-menu button, #mobile-menu a[href="/profile"]',
  )
  if (focusableElements.length === 0) return

  const firstFocusable = focusableElements[0]
  const lastFocusable = focusableElements[focusableElements.length - 1]

  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === firstFocusable) {
      e.preventDefault()
      lastFocusable.focus()
    } else if (!e.shiftKey && document.activeElement === lastFocusable) {
      e.preventDefault()
      firstFocusable.focus()
    }
  }
}

// Gestione tasti globali
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && mobileMenuOpen.value) {
    mobileMenuOpen.value = false
  }
  trapFocus(e)
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>
