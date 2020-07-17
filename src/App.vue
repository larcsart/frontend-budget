<template>
  <div id="app">
    <Header/>

    <div class="breadcrumb">
      <div class="content">
        <div id="nav">
          <router-link to="/">Pedidos</router-link> |
          <router-link to="/products">Produtos</router-link>
        </div>
      </div>
    </div>

    <router-view :products="products" :orders="orders"/>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'
import api from '@/services/api'
import 'vue-material-design-icons/styles.css'

export default {
  name: 'Home',
  components: {
    Header
  },
  data () {
    return {
      products: [],
      orders: []
    }
  },
  mounted () {
    this.loadOrders()
    this.loadProducts()

    this.$bus.$on('refreshProducts', () => {
      this.products = JSON.parse(localStorage.getItem('products'))
    })

    this.$bus.$on('refreshProducts', () => {
      this.orders = JSON.parse(localStorage.getItem('orders'))
    })
  },
  methods: {
    loadOrders: function () {
      api.get('/orders').then(response => {
        if (response.data.status) {
          const orders = response.data.data

          this.orders = orders
          localStorage.setItem('orders', JSON.stringify(orders))
        }
      }).catch(() => {
        localStorage.setItem('orders', JSON.stringify([]))
      })
    },
    loadProducts: function () {
      api.get('/products').then(response => {
        if (response.data.status) {
          const products = response.data.data

          this.products = products
          localStorage.setItem('products', JSON.stringify(products))
        }
      }).catch(() => {
        localStorage.setItem('products', JSON.stringify([]))
      })
    }
  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  background: #ffffff;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .breadcrumb {
    width: 100%;
    padding: 15px;
    background: #cccccc;

    display: flex;
    justify-content: center;

    .content {
      width: 90%;

      display: flex;
      justify-content: left;

      #nav {
        a {
          font-weight: bold;
          color: #2c3e50;

          &.router-link-exact-active {
            color: #42b983;
          }
        }
      }
    }
  }
}

</style>
