import waitForExpect from 'wait-for-expect'
import store from '@/vuex'

describe('vuex auth.js', () => {
  beforeEach(() => {
    store.commit('auth/logout')
    fetch.resetMocks()
    localStorage.clear()
  })

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
  const token = 'TEMP TOKEN'

  it('test init with valid token', done => {
    localStorage.setItem('token', token)
    fetch.mockResponseOnce(JSON.stringify(user_information))

    store.dispatch('auth/init')

    waitForExpect(() => {
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(store.state.auth.name).toBe(user_information.name)
      expect(store.state.auth.admin).toBe(user_information.admin)
      expect(store.getters['auth/loggedIn']).toBeTruthy()
      done()
    })
  })

  it('test init without token', done => {
    store.dispatch('auth/init')

    waitForExpect(() => {
      expect(fetch).toHaveBeenCalledTimes(0)
      expect(store.getters['auth/loggedIn']).not.toBeTruthy()
      done()
    })
  })

  it('test init without a valid token', done => {
    localStorage.setItem('token', 'Invalid token')
    const error_response = {
      error: 'auth:invalid_token',
      msg: 'Invalid Token'
    }
    fetch.mockResponseOnce(JSON.stringify(error_response))

    store.dispatch('auth/init')

    waitForExpect(() => {
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(store.getters['auth/loggedIn']).not.toBeTruthy()
      expect(store.state.auth.token).toBeNull()
      done()
    })
  })

  it('test logout', done => {
    localStorage.setItem('token', token)
    fetch.mockResponseOnce(JSON.stringify(user_information))

    store.dispatch('auth/init')

    waitForExpect(() => {
      expect(store.getters['auth/loggedIn']).toBeTruthy()
      store.commit('auth/logout')
      
      waitForExpect(() => {
        expect(store.getters['auth/loggedIn']).not.toBeTruthy()
        expect(store.state.auth.token).toBeNull()
        expect(localStorage.getItem('token')).toBeNull()
        done()
      })
    })
  })

  it('test set valid token', done => {
    store.dispatch('auth/init')

    fetch.mockResponseOnce(JSON.stringify(user_information))
    store.dispatch('auth/setToken', { token })

    waitForExpect(() => {
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(store.state.auth.name).toBe(user_information.name)
      expect(store.getters['auth/loggedIn']).toBeTruthy()
      expect(localStorage.getItem('token')).toBe(token)
      done()
    })
  })
})
