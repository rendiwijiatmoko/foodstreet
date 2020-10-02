import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Foods from '../views/Foods.vue'
import FoodDetail from '../views/FoodDetail.vue'
import Kerangjang from '../views/Cart.vue'
import PesananSukses from '../views/PesananSukses.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/foods',
    name: 'Foods',
    component: Foods
  },
  {
    path: '/food/:id',
    name: 'FoodDetail',
    component: FoodDetail
  },
  {
    path: '/cart',
    name: 'Keranjang',
    component: Kerangjang
  },
  {
    path: '/pesanan-sukses',
    name: 'PesananSukses',
    component: PesananSukses
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
