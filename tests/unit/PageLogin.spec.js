import { mount } from '@vue/test-utils'
import Login from '@/views/Login.vue'
import waitForExpect from 'wait-for-expect'
import { saltedPassword } from '@/utils/mappings'
import store from '@/vuex'

describe('Login.vue', () => {
  const password = 'PASSWORD FOR TEST ONLY'
  const saltPassword = saltedPassword(password)
  const user_information = {
    admin: 0,
    created_at: 1534505160,
    email: "YanWQmonad@gmail.com",
    image: "IMAGE URL",
    name: "Monad",
    password: "********",
    uid: 1000,
    error: null
  }
  const login_response = {
    error: null,
    msg: 'Login success',
    token: 'TEMP TOKEN'
  }

  beforeEach(() => {
    store.commit('initFormCache', {
      form: {},
      type: 'null'
    })
    store.commit('auth/logout')
    fetch.resetMocks()
    localStorage.clear()
  })

  const inputFullField = (wrapper) => {
    wrapper.find('input[name="username"]').setValue('Monad')
    wrapper.find('input[name="password"]').setValue(password)
  }

  it('update vm data', () => {
    const wrapper = mount(Login, { store })
    inputFullField(wrapper)

    expect(wrapper.vm.form.username).toBe('Monad')
    expect(wrapper.vm.form.password).toBe(password)
  })

  it('submit login fetch', done => {
    const $router = {
      go: jest.fn()
    }
    const wrapper = mount(Login, {
      store,
      mocks: { $router }
    })
    inputFullField(wrapper)

    fetch.mockResponses(
      [ JSON.stringify(login_response) ],
      [ JSON.stringify(user_information) ])

    wrapper.trigger('submit')

    waitForExpect(() => {
      expect(fetch).toHaveBeenCalledTimes(2)

      const requestBody = JSON.parse(fetch.mock.calls[0][1].body)
      expect(requestBody.username).toBe('Monad')
      expect(requestBody.password).toBe(saltPassword)

      expect(localStorage.getItem('token')).toBe('TEMP TOKEN')
      expect(store.getters['auth/loggedIn']).toBeTruthy()
      expect($router.go).toHaveBeenCalledWith(-1)
      done()
    })
  })

  it('alarm on empty username', () => {
    const wrapper = mount(Login, { store })
    inputFullField(wrapper)
    wrapper.find('input[name="username"]').setValue('')
    wrapper.trigger('submit')
    expect(fetch).toHaveBeenCalledTimes(0)

    expect(wrapper.find('.field.error > label').text()).toBe('Username')
    expect(wrapper.find('.message.warning li').text()).toBe('Username could not be empty')
  })

  it('alarm on weak password', () => {
    const wrapper = mount(Login, { store })
    inputFullField(wrapper)
    wrapper.find('input[name="password"]').setValue('qwerty')
    wrapper.trigger('submit')
    expect(fetch).toHaveBeenCalledTimes(0)

    expect(wrapper.find('.field.error > label').text()).toBe('Password')
    expect(wrapper.find('.message.warning li').text()).toBe('Password must be at least 8 characters long')
  })

  it('alarm close on fixed', done => {
    const $router = {
      go: jest.fn()
    }
    const wrapper = mount(Login, {
      store,
      mocks: { $router }
    })
    inputFullField(wrapper)

    wrapper.find('input[name="password"]').setValue('qwerty')
    wrapper.trigger('submit')
    expect(fetch).toHaveBeenCalledTimes(0)
    expect(wrapper.find('.message.warning li').text()).toBe('Password must be at least 8 characters long')

    fetch.mockResponses(
      [ JSON.stringify(login_response) ],
      [ JSON.stringify(user_information) ])
    wrapper.find('input[name="password"]').setValue(password)
    wrapper.trigger('submit')

    waitForExpect(() => {
      expect(wrapper.findAll('.message.warning li').length).toEqual(0)
      expect(fetch).toHaveBeenCalledTimes(2)
      expect($router.go).toHaveBeenCalledWith(-1)
      done()
    })
  })

  it('alarm on value error', done => {
    const wrapper = mount(Login, { store })
    inputFullField(wrapper)

    const error_response = {
      error: 'auth:user_not_find',
      msg: 'Username : No such user'
    }

    fetch.mockResponseOnce(JSON.stringify(error_response))
    wrapper.trigger('submit')

    waitForExpect(() => {
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(wrapper.find('.field.error > label').text()).toBe('Username')
      expect(wrapper.find('.message.warning li').text()).toBe('Username : No such user')
      done()
    })
  })
})