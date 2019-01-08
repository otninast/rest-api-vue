import Vue from 'vue'
import './plugins/vuetify'
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'

import AppRoot from './AppRoot.vue'
import router from './router'
import store from './store'

Vue.use(Croppa)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(AppRoot)
}).$mount('#approot')
