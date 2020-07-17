import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/css/geral.scss'
import feather from 'vue-icon'

Vue.config.productionTip = false

const EventBus = new Vue()

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})

Vue.use(feather, 'v-icon')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
