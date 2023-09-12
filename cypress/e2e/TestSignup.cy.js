import SignUp from "../PageClass/SignUp";
import '../support/commands';
import { before } from "mocha";
const startTime = Date.now();
describe('Validate User is Register',()=>{

    beforeEach(() => {
        // Launch the application URL
        cy.visit('https://www.demoblaze.com/');
        cy.logger('application', 'Launched Application-->SignUp Test');
      });
    
   
    it('Verify User is able to signup',()=>{

       
        cy.fixture('Testdata').then((registerUserdata) => {
            
                    const SignUpobj = new SignUp();
                       SignUpobj.clickSignUp();
                       SignUpobj.setUserName(registerUserdata.UserName+Math.floor(Math.random() * 101));
                       SignUpobj.setPassword(registerUserdata.UserPassword);
                       cy.logger('application', 'Entered User details-->SignUp Test');
                       SignUpobj.clickSubmit();
                       SignUpobj.verifySuccessMsg(registerUserdata.expectedsignupMsg);
                       cy.logger('application', 'Verified User SignUp-->SignUp Test');
                       const loadTime = Date.now() - startTime;
                       cy.logger('performance', `TotalTime taken to registerUser: ${loadTime}ms`);
           })
        
    })

    it('Verify User Exist message',()=>{
        cy.fixture('Testdata').then((registerUserdata) => {
            const SignUpobj = new SignUp();
                       SignUpobj.clickSignUp();
                       SignUpobj.setUserName(registerUserdata.UserName);
                       SignUpobj.setPassword(registerUserdata.UserPassword);
                       SignUpobj.clickSubmit();
                       SignUpobj.verifyUserexist(registerUserdata.userExistMsg)
                       cy.logger('application',"Verify User Exist message");
           })
        
    })

    it('Verify Invalid Data message',()=>{
        cy.fixture('Testdata').then((registerUserdata) => {
            const SignUpobj = new SignUp();
                       SignUpobj.clickSignUp();
                       SignUpobj.clickSubmit();
                       SignUpobj.verifyUserexist(registerUserdata.InvalidDataMsg)
                       cy.logger('application',"Verify Invalid Data message");
           })
        
    })





})
