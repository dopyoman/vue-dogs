import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/breed/:breed',
    name: 'breed-details',
    component: () => import( '../views/BreedDetails.vue'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
