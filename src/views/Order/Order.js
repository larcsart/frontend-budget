import Table from '@/components/Table/Table.vue'
import Total from '@/components/Total/Total.vue'
import Loading from '@/components/Loading/Loading.vue'
import api from '@/services/api'

export default {
  name: 'Order',
  components: {
    Table,
    Total,
    Loading
  },
  props: {
    products: Array,
    idOrderUrl: String
  },
  data () {
    return {
      headers: [
        'Nome', 'Preço', 'Peso'
      ],
      productsSelecteds: [],
      productSelect: 0,
      idOrder: '',
      idStatus: 0,
      loadingSave: false
    }
  },
  mounted () {
    const excludes = ['', 0, null, undefined]
    if (!excludes.includes(this.$route.params.idOrderUrl)) {
      this.idOrder = this.$route.params.idOrderUrl
    }

    if (this.idOrder === '') {
      this.idStatus = 1
      return
    }

    this.loadingSave = true
    api.get('/orders/' + this.idOrder).then(response => {
      if (response.data.status) {
        this.productsSelecteds = response.data.data.products
        this.idStatus = response.data.data.status_id
      } else {
        this.idStatus = 1
      }

      this.loadingSave = false
    })
  },
  computed: {
    listProducts: function () {
      if (this.productsSelecteds === undefined) {
        return []
      }
      return this.productsSelecteds.map(product => [
        product.name, product.price, product.weight
      ])
    },
    totalPrice: function () {
      if (this.productsSelecteds === undefined) {
        return '0'
      }
      const total = this.productsSelecteds.reduce((accumulator, product) => {
        return accumulator + parseFloat(product.price)
      }, 0)
      return String(total)
    },
    totalWeight: function () {
      if (this.productsSelecteds === undefined) {
        return '0'
      }
      const total = this.productsSelecteds.reduce((accumulator, product) => {
        return accumulator + parseFloat(product.weight)
      }, 0)
      return String(total)
    },
    totalAmount: function () {
      if (this.productsSelecteds === undefined) {
        return '0'
      }
      return String(this.productsSelecteds.length)
    },
    hasProduct: function () {
      if (this.productsSelecteds === undefined) {
        return false
      }
      return this.productsSelecteds.filter(p => {
        if (p.pivot === undefined) {
          return true
        }
        return false
      }).length > 0
    },
    canFinalize: function () {
      const excludes = ['', null, 0, undefined]

      let countProducts = 0
      let countProductsSaves = 0
      if (this.productsSelecteds !== undefined) {
        countProductsSaves = this.productsSelecteds.filter(p => {
          if (p.pivot === undefined) {
            return true
          }
          return false
        }).length
        countProducts = this.productsSelecteds.length
      }

      return (
        !excludes.includes(this.idOrder) &&
        this.idStatus === 1 &&
        countProductsSaves === 0 &&
        countProducts > 0
      )
    }
  },
  methods: {
    addProduct: function (event) {
      event.preventDefault()

      const product = this.products.filter((p, index) => {
        return index === this.productSelect
      })

      this.productsSelecteds.push(product[0])
    },
    saveOrder: async function () {
      this.loadingSave = true

      if (this.idOrder === '' || this.idOrder === undefined) {
        const responseOrder = await api.post('/orders', { status_id: 1 })

        if (responseOrder.data.status) {
          this.idOrder = responseOrder.data.data.id
        }
      }

      const excludes = ['', null, 0, undefined]
      if (!excludes.includes(this.idOrder)) {
        const productsId = await this.getProductsLessId()

        const response = await api.post('/orders/' + this.idOrder, productsId)

        if (response.data.status) {
          this.productsSelecteds = response.data.data.products
        }
      }

      this.loadingSave = false
    },
    getProductsLessId: async function () {
      const productsId = []
      await this.productsSelecteds.filter(p => {
        if (p.id !== undefined) {
          productsId.push(p.id)
        }
      })

      return productsId
    },
    finalizeOrder: async function () {
      this.loadingSave = true

      const response = await api.put('/orders/' + this.idOrder)

      console.log('finalizeOrder', response)

      if (response.data.status) {
        this.idStatus = 2
      }

      console.log('this.status', this.status)

      this.loadingSave = false
    }
  }
}
