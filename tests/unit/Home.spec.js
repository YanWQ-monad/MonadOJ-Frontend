import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home.vue', () => {
  it('render basic information', () => {
    const wrapper = shallowMount(Home)
    expect(wrapper.find('h1').text()).toBe('Monad OJ')
    expect(wrapper.find('p').text()).toMatch('Monad OJ')
  })
})
