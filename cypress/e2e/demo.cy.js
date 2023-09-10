describe('template spec', () => {
  it('passes', () => {
      
    cy.logger('apitest', 'This is a apitest log message');
    cy.logger('application', 'This is a webui log message');
    cy.logger('performance', 'This is a performance log message');
    })
  })