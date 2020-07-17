import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import Order from '../views/Order/Order.vue'
import Products from '../views/Products/Products.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Produtos',
    component: Products
  },
  {
    path: '/new-order',
    name: 'Novo Pedido',
    component: Order
  },
  {
    path: '/order/:idOrderUrl',
    name: 'Pedido',
    pros: true,
    component: Order
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
