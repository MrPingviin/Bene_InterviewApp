describe('Page 404 Tests:', () => {
  describe('Checks if the:', () => {
    it('page appears upon searching for a non-existent page', () => {
      cy.visit('http://localhost:5173/randomsomething123')
      cy.url().should('include', '/randomsomething123')
    })
  
    it('`here` navigates the user back to the main page', () => {
      cy.visit('http://localhost:5173/randomsomething123')
      cy.get('a').contains('here').click()
      cy.url().should('eq', 'http://localhost:5173/')
    })
  });
})