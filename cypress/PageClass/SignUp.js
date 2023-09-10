class SignUp
{
    registerbtn ="//a[.='Sign up']";
    txtusername = "//input[@id='sign-username']";
    txtpassword = "//input[@id='sign-password']";
    signUpbtn = "//button[.='Sign up']";

    clickSignUp()
    {
        cy.xpath(this.registerbtn).click();
        cy.xpath("//h5[.='Sign up']").should('be.visible');
    }
    
    setUserName(username)
    {
        cy.xpath(this.txtusername).click().type(username);
    }
    setPassword(password)
    {
        cy.xpath(this.txtpassword).click().type(password);
    }

    clickSubmit()
    {
        cy.xpath(this.signUpbtn).click();
    }
    verifySuccessMsg(successMsg)
    {
     cy.on('window:alert',(t)=>{
        expect(t).to.contains(successMsg);
     })   
    }

    verifyUserexist(userExistMsg)
    {
        cy.on('window:alert',(t)=>{
            expect(t).to.contains(userExistMsg);
         })
    }

    verifyInvalidData(InvalidDataMsg)
    {
        cy.on('window:alert',(t)=>{
            expect(t).to.contains(InvalidDataMsg);
         })
    }
}

export default SignUp;