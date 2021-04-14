describe('User can see different pages of Employees', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('is expected to display Page 1 on initial render', () => {
    cy.get('[data-cy=page-header]').should('contain.text', 'Page 1')
  })

  it('is expected to show page 2 when Page 2 Button is clicked', () => {
    cy.get('[data-cy=pagination-element]').within(() => {
      cy.get('a').eq(3).click()
    })
    cy.get('[data-cy=page-header]').should('contain.text', 'Page 2')
  })

})