describe('template spec', () => {
  it('passes', () => {
    cy.fixture('Testdata').then((registerUserdata) => {
       cy.log(registerUserdata.UserName);
       cy.log(registerUserdata.UserPassword);
       cy.log(registerUserdata.expectedsignupMsg);
       cy.log(registerUserdata.userExistMsg);
       cy.log(registerUserdata.InvalidDataMsg);
       cy.log(registerUserdata.loginmsg);
    })
  })
})