import { mount, RouterLinkStub } from '@vue/test-utils'
import Paginate from '@/components/Paginate'
import Vue from 'vue'

const $route = {
  path: '/mock/1',
  name: 'Mock page'
}

const default_param = {
  stubs: {
    RouterLink: RouterLinkStub
  },
  mocks: {
    $route
  }
}

describe('Paginate.vue', () => {
  it('has next page only', () => {
    // use a part of config to reduce the code size
    // full_config: 'has_next', 'has_previous', 'item_count', 'limit',
    //              'offset', 'page_count', 'page_index', 'page_size'
    const page = {
      has_next: true,
      has_previous: false,
      page_count: 3,
      page_index: 1
    }
    const wrapper = mount(Paginate, {
      ...default_param,
      propsData: {
        page,
        routerKey: 'id',
        routerType: 'direct'
      }
    })

    return Vue.nextTick().then(() => {
      expect(wrapper.findAll('a').at(0).classes('disabled')).toBeTruthy()
      expect(wrapper.findAll('a').at(1).classes('disabled')).toBeTruthy()
      expect(wrapper.findAll('a').at(2).classes('disabled')).not.toBeTruthy()
      expect(wrapper.findAll('a').at(3).classes('disabled')).not.toBeTruthy()

      expect(wrapper.findAll('a').at(2).props().to.params.id).toEqual(2)
      expect(wrapper.findAll('a').at(3).props().to.params.id).toEqual(3)
      expect(wrapper.find('div.show_page_index').text()).toBe('1')
    })
  })

  it('has next page and previous page', () => {
    const page = {
      has_next: true,
      has_previous: true,
      page_count: 5,
      page_index: 4
    }
    const wrapper = mount(Paginate, {
      ...default_param,
      propsData: {
        page,
        routerKey: 'id',
        routerType: 'direct'
      }
    })

    return Vue.nextTick().then(() => {
      expect(wrapper.findAll('a').at(0).classes('disabled')).not.toBeTruthy()
      expect(wrapper.findAll('a').at(1).classes('disabled')).not.toBeTruthy()
      expect(wrapper.findAll('a').at(2).classes('disabled')).not.toBeTruthy()
      expect(wrapper.findAll('a').at(3).classes('disabled')).not.toBeTruthy()

      expect(wrapper.findAll('a').at(0).props().to.params.id).toEqual(1)
      expect(wrapper.findAll('a').at(1).props().to.params.id).toEqual(3)
      expect(wrapper.findAll('a').at(2).props().to.params.id).toEqual(5)
      expect(wrapper.findAll('a').at(3).props().to.params.id).toEqual(5)
      expect(wrapper.find('div.show_page_index').text()).toBe('4')
    })
  })

  it('has only one page', () => {
    const page = {
      has_next: false,
      has_previous: false,
      page_count: 1,
      page_index: 1
    }
    const wrapper = mount(Paginate, {
      ...default_param,
      propsData: {
        page,
        routerKey: 'id',
        routerType: 'direct'
      }
    })

    return Vue.nextTick().then(() => {
      expect(wrapper.findAll('a').at(0).classes('disabled')).toBeTruthy()
      expect(wrapper.findAll('a').at(1).classes('disabled')).toBeTruthy()
      expect(wrapper.findAll('a').at(2).classes('disabled')).toBeTruthy()
      expect(wrapper.findAll('a').at(3).classes('disabled')).toBeTruthy()
      expect(wrapper.find('div.show_page_index').text()).toBe('1')
    })
  })

  it('emit page change', () => {
    const page = {
      has_next: true,
      has_previous: false,
      page_count: 3,
      page_index: 1
    }
    const wrapper = mount(Paginate, {
      ...default_param,
      propsData: {
        page,
        routerType: 'event'
      }
    })

    return Vue.nextTick().then(() => {
      expect(wrapper.find('div.show_page_index').text()).toBe('1')
      wrapper.findAll('a').at(3).trigger('click')
      wrapper.findAll('a').at(2).trigger('click')
      expect(wrapper.emitted('change')).toEqual([[3], [2]])
    })
  })

  it('update on page change', () => {
    const page = {
      has_next: true,
      has_previous: false,
      page_count: 3,
      page_index: 1
    }
    const new_page = {
      has_next: true,
      has_previous: true,
      page_count: 3,
      page_index: 2
    }
    const wrapper = mount(Paginate, {
      ...default_param,
      propsData: {
        page,
        routerType: 'event'
      }
    })

    return Vue.nextTick().then(() => {
      expect(wrapper.find('div.show_page_index').text()).toBe('1')
      wrapper.findAll('a').at(2).trigger('click')
      wrapper.setProps({ page: new_page, routerKey: 'event' })
      return Vue.nextTick().then(() => {
        expect(wrapper.findAll('a').at(0).classes('disabled')).not.toBeTruthy()
        wrapper.findAll('a').at(0).trigger('click')
        expect(wrapper.emitted('change')).toEqual([[2], [1]])
      })
    })
  })

  it('invalid data', () => {
    const page = {}
    const wrapper = mount(Paginate, {
      ...default_param,
      propsData: {
        page,
        routerKey: 'id',
        routerType: 'direct'
      }
    })

    return Vue.nextTick().then(() => {
      expect(wrapper.findAll('a')).toHaveLength(0)
    })
  })
})
