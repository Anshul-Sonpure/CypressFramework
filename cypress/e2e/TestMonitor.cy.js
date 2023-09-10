import Monitor from "../PageClass/Monitor";
import Login from "../PageClass/Login";
import { beforeEach } from "mocha";
import "../support/commands";
const startTime = Date.now();

describe('Validate Data Displayed on MonitorPage',()=>{

    beforeEach(() => {
        // Launch the application URL
        cy.visit('https://www.demoblaze.com/');
        cy.logger('application',"Launched Application-->Login Test");
      });
    it('Validate Price and Monitor Name is correct',()=>{
        cy.fixture('monitor').then((data) => {
            const loginobj = new Login();
               loginobj.clickLogin();
               loginobj.setUserName(data.UserName);
               loginobj.setPassword(data.UserPassword);
               cy.logger('application',"Entered User Details-->Login Test");
               loginobj.clickLoginbtn();
               loginobj.verifyLoginSuccessMsg(data.loginmsg);
               cy.logger('application',"Validated success Login Msg-->Login Test");
               const monitorobj = new Monitor();
               monitorobj.isMonitorDisplayed();
               monitorobj.ValidateMonitor1(data.monitor1);
               monitorobj.Validatemonitor1Price(data.m1Price);
               monitorobj.ValidateMonitor2(data.monitor2);
               monitorobj.Validatemonitor2Price(data.m2Price);
               const loadTime = Date.now() - startTime;
                cy.logger('performance', `TotalTime taken to ValidateMonitor's: ${loadTime}ms`);
    })

})
})