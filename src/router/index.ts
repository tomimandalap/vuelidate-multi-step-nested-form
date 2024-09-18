import { createRouter, createWebHistory } from 'vue-router'

import FormView from '@/views/FormsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'FormView',
      component: FormView
    }
  ]
})

export default router
