import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/offline/',
      component: () => import('../views/OfflineView.vue'),
      name: 'offline'
    },
    {
      path: '/online/',
      component: () => import('../views/OnlineView.vue'),
      name: 'online'
    },
    {
      path: '/hybrid/',
      component: () => import('../views/HybridView.vue'),
      name: 'hybrid'
    }
  ]
})

export default router
