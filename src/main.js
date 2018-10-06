import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex'

Vue.config.productionTip = false

import '../semantic/dist/semantic.min.css'
import '../semantic/dist/semantic.min.js'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
