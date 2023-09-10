class Monitor
{
    monitorbtn = "//a[.='Monitors']";
    monitor1 = "//a[.='Apple monitor 24']";
    m1price= "//h5[.='$400']";
    monitor2 ="//a[.='ASUS Full HD']";
    m2price = "//h5[.='$230']";

    isMonitorDisplayed()
    {
        cy.xpath(this.monitorbtn).click();
        cy.xpath(this.monitor1).should('be.visible');
        cy.xpath(this.m1price).should('be.visible');
        cy.xpath(this.monitor2).should('be.visible');
        cy.xpath(this.m2price).should('be.visible');
    }

    ValidateMonitor1(data)
    {
        cy.xpath(this.monitor1).should('have.text',data);
    }
    Validatemonitor1Price(data)
    {
        cy.xpath(this.m1price).should('have.text',data) 
    }

    ValidateMonitor2(data)
    {
        cy.xpath(this.monitor2).should('have.text',data);
    }
    Validatemonitor2Price(data)
    {
        cy.xpath(this.m2price).should('have.text',data) ;
    }
    
}

export default Monitor;