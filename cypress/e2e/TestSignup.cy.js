import SignUp from "../PageClass/SignUp";
import '../support/commands';
import { before } from "mocha";
const startTime = Date.now();
describe('Validate User is Register',()=>{

    beforeEach(() => {
        // Launch the application URL
        cy.visit('https://www.demoblaze.com/');
        cy.UILogs("Launched Application-->SignUp Test");
      });
    
   
    it('Verify User is able to signup',()=>{

       
        cy.fixture('Testdata').then((registerUserdata) => {
            
                    const SignUpobj = new SignUp();
                       SignUpobj.clickSignUp();
                       SignUpobj.setUserName(registerUserdata.UserName+Math.floor(Math.random() * 101));
                       SignUpobj.setPassword(registerUserdata.UserPassword);
                       cy.UILogs("Entered User Details-->SignUp Test");
                       SignUpobj.clickSubmit();
                       SignUpobj.verifySuccessMsg(registerUserdata.expectedsignupMsg);
                       cy.UILogs("Verify User is able to signup-->SignUp Test");
                       const loadTime = Date.now() - startTime;
                       cy.PerformanceLogs(`TotalTime taken to registerUser: ${loadTime}ms`);
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
                       cy.UILogs("Verify User Exist message");
           })
        
    })

    it('Verify Invalid Data message',()=>{
        cy.fixture('Testdata').then((registerUserdata) => {
            const SignUpobj = new SignUp();
                       SignUpobj.clickSignUp();
                       SignUpobj.clickSubmit();
                       SignUpobj.verifyUserexist(registerUserdata.InvalidDataMsg)
                       cy.UILogs("Verify Invalid Data message");
           })
        
    })





})
