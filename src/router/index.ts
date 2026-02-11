import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/pages/DashboardView.vue'
import { useAuthStore } from '@/stores/authStore'

// Componente layout
import AppLayout from '@/layouts/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Rotte pubbliche (nessun layout)
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/pages/LoginView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/pages/RegisterView.vue'),
      meta: { requiresAuth: false },
    },

    // Rotte protette – raggruppate sotto un layout comune
    {
      path: '/',
      component: AppLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardView,
          meta: { title: 'Dashboard', breadcrumb: 'Dashboard' },
        },
        {
          path: 'clients',
          name: 'clients',
          component: () => import('@/views/pages/ClientView.vue'),
          meta: { title: 'Client Management', breadcrumb: 'Clients' },
        },
        {
          path: 'policies',
          name: 'policies',
          component: () => import('@/views/pages/PoliciesView.vue'),
          meta: { title: 'Policy Management', breadcrumb: 'Policies' },
        },
        {
          path: 'reports',
          name: 'reports',
          component: () => import('@/views/pages/ReportsView.vue'),
          meta: { title: 'Reports', breadcrumb: 'Reports' },
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('@/views/pages/SettingsView.vue'),
          meta: { title: 'Settings', breadcrumb: 'Settings' },
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/pages/ProfileView.vue'),
          meta: { title: 'Profile', breadcrumb: 'Profile' },
        },
      ],
    },
  ],
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/register') && authStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
