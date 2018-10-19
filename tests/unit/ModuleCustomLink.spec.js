import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import CustomLink from '@/components/CustomLink.vue'
import VueRouter from 'vue-router'
import Vue from 'vue'

describe('CustomLink.vue', () => {
  it('check direct link', () => {
    const localVue = createLocalVue()
    const router = new VueRouter({
      mode: 'history'
    })
    localVue.use(VueRouter)
    const wrapper = mount(CustomLink, {
      localVue,
      router,
      propsData: {
        linkType: 'direct',
        to: { path: '/target' }
      }
    })

    expect(wrapper.find('a').attributes('href')).toBe('/target')
  })

  it('check event link', () => {
    const wrapper = mount(CustomLink, {
      propsData: {
        linkType: 'event'
      }
    })

    wrapper.find('a').trigger('click')
    expect(wrapper.emitted().click.length).toEqual(1)
  })
})
