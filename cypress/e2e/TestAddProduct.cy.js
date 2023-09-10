import { before } from "mocha";
import Login from "../PageClass/Login";
import AddProduct from "../PageClass/AddProduct";
import '../support/commands';

describe('Validate User is able to make Purchase',()=>{

    beforeEach(() => {
        // Launch the application URL
        cy.visit('https://www.demoblaze.com/');
        cy.logToExternalFile("Launched Application-->Login Test");
      });

      it('Validate Add Product',()=> {
        cy.fixture('product').then((data) => {
            const loginobj = new Login();
                       loginobj.clickLogin();
                       loginobj.setUserName(data.UserName);
                       loginobj.setPassword(data.UserPassword);
                       cy.logToExternalFile("Entered User Details-->Login Test");
                       loginobj.clickLoginbtn();
                       loginobj.verifyLoginSuccessMsg(data.loginmsg);
                       cy.logToExternalFile("Validated success Login Msg-->Login Test");
                       cy.logToExternalFile("Validated success Login Msg-->Login Test");
                       const prdobj = new AddProduct();
                       prdobj.addProduct();
                       prdobj.enterName(data.name);
                       prdobj.entercountry(data.Country);
                       prdobj.entercity(data.City);
                       prdobj.entercard(data.Creditcard);
                       prdobj.entermonth(data.Month);
                       prdobj.enteryear(data.Year);
                       prdobj.clickPurchase();
                       prdobj.validateOrder();
             
      })



    })

})
