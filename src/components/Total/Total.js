export default {
  name: 'Products',
  props: {
    icon: String,
    label: String,
    value: String
  },
  computed: {
    valueFormated: function () {
      if (this.value !== '') {
        if (this.label === 'Quantidade Total') {
          return parseInt(this.value)
        }
        return parseFloat(this.value).toFixed(2)
      }
      return ''
    }
  }
}
