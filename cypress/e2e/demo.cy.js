describe('Database Query', () => {
  it('should execute an SQL query', () => {
    const query = 'SELECT * FROM user_details';
    cy.task("queryDb",query);
    });
});
