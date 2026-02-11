import { createRouter, createWebHistory } from 'vue-router'
import ClientView from '@/views/pages/ClientView.vue'
import PoliciesView from '@/views/pages/PoliciesView.vue'
import ReportsView from '@/views/pages/ReportsView.vue'
import SettingsView from '@/views/pages/SettingsView.vue'
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
    },
    {
      path: '/clients',
      name: 'clients',
      component: ClientView,
    },
    {
      path: '/policies',
      name: 'policies',
      component: PoliciesView,
    },
    {
      path: '/reports',
      name: 'reports',
      component: ReportsView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    },
  ],
})

export default router
