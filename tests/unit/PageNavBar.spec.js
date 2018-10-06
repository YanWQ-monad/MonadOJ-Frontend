import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import PageNavBar from '@/views/PageNavBar.vue'

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
  }
}

describe('PageNavBar.vue', () => {
  it('render navigation bar', () => {
    const wrapper = shallowMount(PageNavBar, {
      ...default_param
    })
    expect(wrapper.findAll('a').at(0).props().to.name).toEqual('Home')
  })
})
