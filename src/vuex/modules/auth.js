import { ajax } from '@/api'

const state = {
  token: null,
  name: null,
  admin: -1
}

const getters = {
  loggedIn: state => state.name !== null
}

const mutations = {
  setToken (state, { token }) {
    state.token = token
  },
  setUser (state, { user }) {
    state.name = user.name
    state.admin = user.admin
  },
  logout (state) {
    state.token = null
    state.name = null
    state.admin = -1
    localStorage.removeItem('token')
  }
}

const actions = {
  init ({ commit }) {
    const token = localStorage.getItem('token')
    if (token === null) return

    commit('setToken', { token })
    ajax('/api/auth/check_token', 'GET').then(data => {
      commit('setUser', { user: data })
    }).catch(() => {
      commit('setToken', { token: null })
    })
  },
  setToken ({ commit }, { token }) {
    ajax('/api/auth/check_token', 'GET').then(data => {
      commit('setToken', { token })
      commit('setUser', { user: data })
      localStorage.setItem('token', token)
    })
  }
}

const auth = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default auth
