describe('Index Render Test', () => {
  before(() => {
    cy.visit('/')
  })

  it('Check the contents in root url', () => {
    cy.contains('h1', 'Monad OJ')
    cy.contains('.container p', 'Welcome to Monad OJ')
  })

  it('Check navigation bar', () => {
    cy.get('div.fixed.menu').within(() => {
      cy.contains('a', 'HOME').should('have.class', 'active')
    })
  })

  it('Check footer bar', () => {
    cy.get('div.footer').within(() => {
      cy.contains('a', 'Monad').should('have.attr', 'href', 'https://github.com/YanWQ-monad')
      cy.contains('a', 'O').should('have.attr', 'href', 'https://github.com/YanWQ-monad/MonadOJ-Frontend')
      cy.contains('a', 'J').should('have.attr', 'href', 'https://github.com/YanWQ-monad/MonadOJ-Backend')
    })
  })
})
