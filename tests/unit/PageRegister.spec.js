import { mount } from '@vue/test-utils'
import Register from '@/views/Register.vue'
import { saltedPassword } from '@/utils/mappings'
import store from '@/vuex'

describe('Register.vue', () => {
  const password = 'PASSWORD FOR TEST ONLY'
  const saltPassword = saltedPassword(password)

  beforeEach(() => {
    store.commit('initForm', {
      form: {},
      type: 'null'
    })
  })

  const inputFullField = (wrapper) => {
    wrapper.find('input[name="email"]').setValue('YanWQmonad@gmail.com')
    wrapper.find('input[name="username"]').setValue('Monad')
    wrapper.find('input[name="password"]').setValue(password)
  }

  it('update vm data', () => {
    const wrapper = mount(Register, { store })
    inputFullField(wrapper)

    expect(wrapper.vm.form.email).toBe('YanWQmonad@gmail.com')
    expect(wrapper.vm.form.username).toBe('Monad')
    expect(wrapper.vm.form.password).toBe(password)
  })

  it('submit register fetch', () => {
    const wrapper = mount(Register, { store })
    inputFullField(wrapper)

    fetch.resetMocks()
    fetch.mockResponseOnce('{"error": null}')

    wrapper.trigger('submit')
    expect(fetch.mock.calls.length).toEqual(1)
    const requestBody = JSON.parse(fetch.mock.calls[0][1].body)
    expect(requestBody.email).toBe('YanWQmonad@gmail.com')
    expect(requestBody.username).toBe('Monad')
    expect(requestBody.password).toBe(saltPassword)
  })

  it('alarm on invalid email', () => {
    const wrapper = mount(Register, { store })
    inputFullField(wrapper)
    wrapper.find('input[name="email"]').setValue('invalid email')

    fetch.resetMocks()
    wrapper.trigger('submit')
    expect(fetch.mock.calls.length).toEqual(0)

    expect(wrapper.find('.field.error > label').text()).toBe('Email')
    expect(wrapper.find('.message.warning li').text()).toBe('Email must be a valid email address')
  })

  it('alarm on empty username', () => {
    const wrapper = mount(Register, { store })
    inputFullField(wrapper)
    wrapper.find('input[name="username"]').setValue('')

    fetch.resetMocks()
    wrapper.trigger('submit')
    expect(fetch.mock.calls.length).toEqual(0)

    expect(wrapper.find('.field.error > label').text()).toBe('Username')
    expect(wrapper.find('.message.warning li').text()).toBe('Username could not be empty')
  })

  it('alarm on weak password', () => {
    const wrapper = mount(Register, { store })
    inputFullField(wrapper)
    wrapper.find('input[name="password"]').setValue('qwerty')

    fetch.resetMocks()
    wrapper.trigger('submit')
    expect(fetch.mock.calls.length).toEqual(0)

    expect(wrapper.find('.field.error > label').text()).toBe('Password')
    expect(wrapper.find('.message.warning li').text()).toBe('Password must be at least 8 characters long')
  })
})
