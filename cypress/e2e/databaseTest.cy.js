
describe('Database Query', () => {
  const sqlquery='SELECT username from user_details where gender ="Female" order by user_id desc';
  it('should execute an SQL query', () => {
    cy.task('queryDb', "CREATE TABLE Persons (PersonID int, FirstName varchar(255), Address varchar(255), City varchar(255))")
    });

    it.only("query for user smith93",()=>{
      cy.task('queryDb',sqlquery).then((result) => {
        result.forEach((row, index) => {
          cy.log(`Row ${index + 1}: ${JSON.stringify(row)}`);
        

    })
    //expect(result[0].first_name).to.equal('rogers');
})
})
})