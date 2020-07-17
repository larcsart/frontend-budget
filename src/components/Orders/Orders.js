import Table from '@/components/Table/Table.vue'

export default {
  name: 'Products',
  props: {
    orders: Array
  },
  components: {
    Table
  },
  data () {
    return {
      headers: [
        'ID', 'Cadastrado em', 'Status'
      ]
    }
  },
  computed: {
    ordersList: function () {
      if (this.orders.length === 0) {
        return []
      }
      return this.orders.map(order => {
        return {
          id: { to: '/order/' + order.id, value: order.id },
          created: this.formatDate(order.created_at),
          status: order.status.description
        }
      })
    }
  },
  methods: {
    formatDate: function (dateOriginal) {
      if (dateOriginal === '' || dateOriginal === undefined) {
        return
      }

      const date = new Date(dateOriginal)
      return this.zeroLeft(date.getDate(), 2, '0') +
        '/' + this.zeroLeft((date.getMonth() + 1), 2, '0') +
        '/' + date.getFullYear() +
        ' ' + this.zeroLeft(date.getHours(), 2, '0') +
        ':' + this.zeroLeft(date.getMinutes(), 2, '0') +
        ':' + this.zeroLeft(date.getSeconds(), 2, '0')
    },
    zeroLeft: function (value, totalWidth, paddingChar) {
      const length = totalWidth - value.toString().length + 1
      return Array(length).join(paddingChar || '0') + value
    }
  }
}
