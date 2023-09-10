import SignUp from "../PageClass/SignUp";
import '../support/commands';
import { before } from "mocha";
describe('Validate User is Register',()=>{

    beforeEach(() => {
        // Launch the application URL
        cy.visit('https://www.demoblaze.com/');
        cy.logToExternalFile("Launched Application-->SignUp Test");
      });
    
   
    it('Verify User is able to signup',()=>{

       
        cy.fixture('Testdata').then((registerUserdata) => {
                    const SignUpobj = new SignUp();
                       SignUpobj.clickSignUp();
                       SignUpobj.setUserName(registerUserdata.UserName);
                       SignUpobj.setPassword(registerUserdata.UserPassword);
                       cy.logToExternalFile("Entered User Details-->SignUp Test");
                       SignUpobj.clickSubmit();
                       SignUpobj.verifySuccessMsg(registerUserdata.expectedsignupMsg);
                       cy.logToExternalFile("Verify User is able to signup-->SignUp Test");
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
                       cy.logToExternalFile("Verify User Exist message");
           })
        
    })

    it('Verify Invalid Data message',()=>{
        cy.fixture('Testdata').then((registerUserdata) => {
            const SignUpobj = new SignUp();
                       SignUpobj.clickSignUp();
                       SignUpobj.clickSubmit();
                       SignUpobj.verifyUserexist(registerUserdata.InvalidDataMsg)
                       cy.logToExternalFile("Verify Invalid Data message");
           })
        
    })





})
