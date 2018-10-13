describe('register Test', () => {
  const password = 'PASSWORD FOR TEST ONLY'
  let polyfill

  before(() => {
    const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js'
    cy.request(polyfillUrl).then((response) => {
      polyfill = response.body
    })
  })

  beforeEach(() => {
    cy.visit('/register', {
      onBeforeLoad (window) {
        delete window.fetch
        window.eval(polyfill)
        window.fetch = window.unfetch
      }
    })

    cy.get('input[name="email"]').type('YanWQmonad@gmail.com')
    cy.get('input[name="username"]').type('Monad')
    cy.get('input[name="password"]').type(password)
  })

  it('Check register post', () => {
    cy.server()
    cy.route('POST', '/api/auth/register', {}).as('RegisterAPI')

    cy.get('button').click()
    cy.wait('@RegisterAPI')
  })

  it('Check form cache in accident exit', () => {
    cy.wait(600)

    cy.get('.message.warning').should('be.not.visible')
    cy.contains('a', 'HOME').click()
    cy.contains('a', 'Register').click()

    cy.get('input[name="email"]').should('have.value', 'YanWQmonad@gmail.com')
    cy.get('input[name="username"]').should('have.value', 'Monad')
    cy.get('input[name="password"]').should('have.value', password)
  })

  it('Check alarm on invalid email', () => {
    cy.get('input[name="email"]').clear().type('invalid email')
    cy.get('button').click()

    cy.contains('.message.warning li', 'Email must be a valid email address')
    cy.get('input[name="email"]').parent().should('have.class', 'error')
  })

  it('Check alarm on empty username', () => {
    cy.get('input[name="username"]').clear()
    cy.get('button').click()

    cy.contains('.message.warning li', 'Username could not be empty')
    cy.get('input[name="username"]').parent().should('have.class', 'error')
  })

  it('Check alarm on weak password', () => {
    cy.get('input[name="password"]').clear().type('asdfgh')
    cy.get('button').click()

    cy.contains('.message.warning li', 'Password must be at least 8 characters long')
    cy.get('input[name="password"]').parent().should('have.class', 'error')
  })
})
