import { shallowMount } from '@vue/test-utils'
import PageFooter from '@/views/PageFooter.vue'

describe('PageFooter.vue', () => {
  it('render footer bar', () => {
    const wrapper = shallowMount(PageFooter)
    expect(wrapper.find('a[href$="YanWQ-monad"]').text()).toMatch('Monad')
    expect(wrapper.find('a[href$="Frontend"]').text()).toBe('O')
    expect(wrapper.find('a[href$="Backend"]').text()).toMatch('J')
    expect(wrapper.text()).toMatch('All Rights Reserved.')
  })
})
