import { shallowMount } from '@vue/test-utils'
import Alert from '@/components/Alert.vue'

describe('Alert.vue', () => {
  it('test add message', () => {
    const wrapper = shallowMount(Alert)

    wrapper.vm.addMessage('success', 'Success header', 'Success content')
    expect(wrapper.find('.alert-container > .success.alert-content').text()).toMatch('Success content')
  })

  it('click close', () => {
    const wrapper = shallowMount(Alert)
    wrapper.vm.addMessage('success', '', '', 1000)
    wrapper.find('.alert-container > .success.alert-content > .close.icon').trigger('click')

    expect(wrapper.findAll('.alert-container > .alert-content').length).toEqual(0)
  })

  it('auto remove message', done => {
    const wrapper = shallowMount(Alert)
    wrapper.vm.addMessage('success', '', '', 100)

    setTimeout(() => {
      expect(wrapper.findAll('.alert-container > .alert-content').length).toEqual(0)
      done()
    }, 200)
  })
})
