import { mount, RouterLinkStub } from '@vue/test-utils'
import PageNavBar from '@/views/PageNavBar.vue'
import store from '@/vuex'

const $route = {
  path: '/',
  name: 'Home'
}

const default_param = {
  stubs: {
    RouterLink: RouterLinkStub
  },
  mock: {
    $route
  },
  store
}

describe('PageNavBar.vue', () => {
  it('render navigation bar', () => {
    const wrapper = mount(PageNavBar, {
      ...default_param
    })
    expect(wrapper.findAll('a').at(0).props().to.name).toEqual('Home')
  })

  it('render user', () => {
    const wrapper = mount(PageNavBar, {
      ...default_param
    })

    store.commit('auth/setUser', { user: { name: 'Monad', admin: 0 } })

    expect(wrapper.text()).toMatch(/Monad/)
  })

  it('user logout', () => {
    const wrapper = mount(PageNavBar, {
      ...default_param
    })

    store.commit('auth/setUser', { user: { name: 'Monad', admin: 0 } })

    wrapper.find('.ui.simple.dropdown .item').trigger('click')

    expect(store.getters['auth/loggedIn']).not.toBeTruthy()
    expect(store.state.auth.token).toBeNull()
  })
})
