import Vue from 'vue'
import Vuex from 'vuex'

import * as mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

import modules from './modules'

Vue.use(Vuex)

const state = {

}

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    ...modules
  },
  state,
  mutations,
  actions,
  getters
})

export default store

/* istanbul ignore next */
if (module.hot) {
  module.hot.accept([
    './mutations',
    './actions',
    './getters'
  ], () => {
    store.hotUpdate({
      mutations: require('./mutations'),
      actions: require('./actions'),
      getters: require('./getters')
    })
  })
}

