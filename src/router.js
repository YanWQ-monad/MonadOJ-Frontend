import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import AdminNavigation from '@/views/admin/Navigation.vue'
import AdminDefault from '@/views/admin/Default.vue'
import AdminListProblems from '@/views/admin/ListProblems.vue'
import AdminAddProblem from '@/views/admin/AddProblem.vue'
import AdminEditProblem from '@/views/admin/EditProblem.vue'

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
      meta: { requiresAdmin: true },
      children: [
        {
          path: 'add_problem',
          name: 'Admin Add Problem',
          component: AdminAddProblem
        },
        {
          path: 'problems/:page?',
          name: 'Admin Problems List',
          component: AdminListProblems
        },
        {
          path: 'problem/:pid?',
          name: 'Admin Edit Problem',
          component: AdminEditProblem
        },
        {
          path: '',
          name: 'Admin Default',
          component: AdminDefault
        }
      ]
    }
  ]
})
