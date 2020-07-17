import Table from '@/components/Table/Table.vue'
import api from '@/services/api'

export default {
  name: 'Products',
  props: {
    products: Array
  },
  components: {
    Table
  },
  data () {
    return {
      headers: [
        'Nome', 'Preço', 'Peso'
      ],
      product: {
        name: '', price: '', weight: ''
      },
      loading: false
    }
  },
  computed: {
    listProducts: function () {
      return this.products.map(product => [
        product.name, product.price, product.weight
      ])
    }
  },
  methods: {
    addProduct: async function (event) {
      event.preventDefault()

      this.loading = true

      const response = await api.post('/products', this.product)

      if (response.data.status) {
        const product = response.data.data

        this.products.push(product)

        localStorage.setItem('products', JSON.stringify(this.products))

        this.$bus.$emit('refreshProducts')

        this.product = { name: '', price: '', weight: '' }

        alert('Produto cadastrado com secusso')
      } else {
        alert('Falha ao tentar cadastrar um novo produto')
      }

      this.loading = false
    }
  }
}
