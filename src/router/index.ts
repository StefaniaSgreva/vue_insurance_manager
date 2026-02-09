import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/pages/HomeView.vue'

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
      name: 'home',
      component: HomeView,
    },
  ],
})

export default router
