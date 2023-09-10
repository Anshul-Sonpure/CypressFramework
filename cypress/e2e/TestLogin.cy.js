import { before } from "mocha";
import Login from "../PageClass/Login";
import '../support/commands';


describe('Validate User is Register',()=>{

    beforeEach(() => {
        // Launch the application URL
        cy.visit('https://www.demoblaze.com/');
        cy.logToExternalFile("Launched Application-->Login Test");
      });
    
   
    it('Verify User is able to login',()=>{
        cy.fixture('Testdata').then((registerUserdata) => {
                    const loginobj = new Login();
                       loginobj.clickLogin();
                       loginobj.setUserName(registerUserdata.UserName);
                       loginobj.setPassword(registerUserdata.UserPassword);
                       cy.logToExternalFile("Entered User Details-->Login Test");
                       loginobj.clickLoginbtn();
                       loginobj.verifyLoginSuccessMsg(registerUserdata.loginmsg);
                       cy.logToExternalFile("Validated success Login Msg-->Login Test");
           })
        
    })

})