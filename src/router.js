import { createRouter, createWebHistory } from 'vue-router'
import HelloComponent from './components/HelloComponent.vue'

const routes = [
  {
    path: '/:greeting',
    name: 'Hello',
    component: HelloComponent
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router