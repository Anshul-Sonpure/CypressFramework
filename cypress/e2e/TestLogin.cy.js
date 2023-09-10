import { before } from "mocha";
import Login from "../PageClass/Login";
import '../support/commands';

const startTime = Date.now();
describe('Validate User is Register',()=>{

    beforeEach(() => {
        // Launch the application URL
        cy.visit('https://www.demoblaze.com/');
        cy.logger('application',"Launched Application-->Login Test");
      });
    
   
    it('Verify User is able to login',()=>{
        cy.fixture('Testdata').then((registerUserdata) => {
                    const loginobj = new Login();
                       loginobj.clickLogin();
                       loginobj.setUserName(registerUserdata.UserName);
                       loginobj.setPassword(registerUserdata.UserPassword);
                       cy.logger('application',"Entered User Details-->Login Test");
                       loginobj.clickLoginbtn();
                       loginobj.verifyLoginSuccessMsg(registerUserdata.loginmsg);
                       cy.logger('application',"Validated success Login Msg-->Login Test");
                       const loadTime = Date.now() - startTime;
                       cy.logger('performance',`TotalTime taken to LoginUser: ${loadTime}ms`);
           })
        
    })

})