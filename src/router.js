import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import AdminNavigation from '@/views/admin/Navigation.vue'
import AdminDefault from '@/views/admin/Default.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/manage',
      name: 'Admin Navigation',
      component: AdminNavigation,
      children: [
        {
          path: '',
          name: 'Admin Default',
          component: AdminDefault
        }
      ]
    }
  ]
})
