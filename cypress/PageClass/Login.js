class Login
{
   loginbtn = "//a[.='Log in']";
   usernametxt = "//input[@id='loginusername']";
   passwordtxt = "//input[@id='loginpassword']";
   signInbtn = "//button[.='Log in']";
    welcomemsg = "//a[.='Welcome PeterPanter']";
    clickLogin()
    {
        cy.xpath(this.loginbtn).click();
        cy.xpath("//h5[.='Log in']").should('be.visible');
        
    }


    setUserName(username)
    {
        cy.wait(2000)
        cy.xpath(this.usernametxt).click().type(username);
    }
    setPassword(password)
    {
        cy.xpath(this.passwordtxt).click().type(password);
    }

    clickLoginbtn()
    {
        cy.xpath(this.signInbtn).click();
    }
    verifyLoginSuccessMsg(successMsg)
    {
     cy.xpath(this.welcomemsg).should('have.text',successMsg) 
    }

}

export default Login;