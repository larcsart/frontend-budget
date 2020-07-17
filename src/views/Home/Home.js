import Orders from '@/components/Orders/Orders.vue'

export default {
  name: 'Home',
  props: {
    orders: Array
  },
  components: {
    Orders
  }
}
