import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/pages/DashboardView.vue'
// import ApiTestView from '../views/pages/ApiTestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/api-test',
    //   name: 'apiTest',
    //   component: ApiTestView,
    // },
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      meta: { title: 'Dashboard', breadcrumb: null },
    },
    {
      path: '/clients',
      name: 'clients',
      component: () => import('@/views/pages/ClientView.vue'),
      meta: {
        title: 'Client Management',
        breadcrumb: 'Clients',
      },
    },
    {
      path: '/policies',
      name: 'policies',
      component: () => import('@/views/pages/PoliciesView.vue'),
      meta: {
        title: 'Policy Management',
        breadcrumb: 'Policies',
      },
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('@/views/pages/ReportsView.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/pages/SettingsView.vue'),
    },
  ],
})

export default router
