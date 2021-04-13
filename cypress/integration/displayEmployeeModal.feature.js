describe('Display of employee modal', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-cy=employee-list]').within(() => {
      cy.get('[data-cy=employee-item]')
      .first()
      .find('[data-cy=view-button]')
      .click()
    })
  })

  it('opens up a Modal when view button is clicked', () => {
    cy.get('[data-cy=modal-container]').should('be.visible')
  });

  it('the modal features expected content', () => {
    cy.get('[data-cy=modal-container]').within(() => {
      cy.get('[data-cy=name]').should('contain', 'Tobias Funke')
      cy.get('[data-cy=image]').should('be.visible')
      cy.get('[data-cy=email]').should('contain', 'tobias.funke@reqres.in')
    })
  });
})
