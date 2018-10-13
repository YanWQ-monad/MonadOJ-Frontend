import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex'

Vue.config.productionTip = false

import '../semantic/dist/semantic.min.css'
import '../semantic/dist/semantic.min.js'

const app = new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    this.$store.dispatch('auth/init')
  },
  mounted () {
    if (this.$route.matched.some(record => record.meta.requiresAdmin) && store.state.auth.admin <= 0) {
      this.$alert.addMessage('error', 'Access is denied', 'You have no permission to access the page')
      this.$router.push({ name: 'Home' })
    } else if (this.$route.matched.some(record => record.meta.requiresLogin) && store.state.auth.token === null) {
      this.$alert.addMessage('info', 'Login required', 'You have to login to access the page')
      this.$router.push({ name: 'Login' })
    }
  }
})
app.$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAdmin) && store.state.auth.admin <= 0) {
    app.$alert.addMessage('error', 'Access is denied', 'You have no permission to access the page')
    next(false)
  } else if (to.matched.some(record => record.meta.requiresLogin) && !store.getters['auth/loggedIn']) {
    app.$alert.addMessage('info', 'Login required', 'You have to login to access the page')
    next(false)
  } else {
    next()
  }
})
