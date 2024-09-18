import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'FormView',
      component: () => import('../views/FormsView.vue')
    }
  ]
})

export default router
