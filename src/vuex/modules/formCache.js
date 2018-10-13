import throttle from 'lodash/throttle'

const state = {
  form: {},
  lastUpdate: 0,
  createTime: 0,
  type: ''
}

const getters = {
  getFormCache: (state) => (type) => {
    if (state.type === type) {
      return {
        form: Object.assign({}, state.form),
        lastUpdate: state.lastUpdate
      }
    } else {
      return null
    }
  }
}

const mutations = {
  initFormCache (state, {form, type}) {
    state.form = Object.assign({}, form)
    state.createTime = +Date.now()
    state.lastUpdate = +Date.now()
    state.type = type
  },
  updateFormCache (state, {form, type}) {
    if (state.type !== type) {
      console.error('Cannot update form cache without initial')
    } else {
      state.form = Object.assign({}, form)
      state.lastUpdate = +Date.now()
    }
  },
  removeFormCache (state) {
    state.form = {}
    state.lastUpdate = +Date.now()
    state.createTime = +Date.now()
    state.type = ''
  }
}

const actions = {
  updateFormCache: throttle(({commit}, payload) => {
    commit('updateFormCache', payload)
  }, 600)
}

const formCache = {
  state,
  getters,
  mutations,
  actions
}

export default formCache
