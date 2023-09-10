class AddProduct
{

    phonesbtn = "//a[.='Phones']";
    mobile = "//a[.='Samsung galaxy s6']";
    price = "//h3[text()='$360']";
    addtoCart = "//a[.='Add to cart']";
    cart = "//a[.='Cart']";
    totalprice = "//h3[@id='totalp']";
    placeOrder = "//button[.='Place Order']";
    name = "//input[@id='name']";
    country = "//input[@id='country']";
    city = "//input[@id='city']";
    card = "//input[@id='card']";
    month = "//input[@id='month']";
    year = "//input[@id='year']";
    purchasebtn = "//button[.='Purchase']";
    thankmsg = "//h2[.='Thank you for your purchase!']";
    orderdetails = "//p[@class='lead text-muted ']";
    okbtn = "//button[.='OK']";
    logout = "//a[.='Log out']";
    login = "//a[.='Log in']";

    addProduct()
    {
        cy.xpath(this.phonesbtn).click();
        cy.xpath(this.mobile).click();
        cy.xpath(this.price).should('have.text','$360 *includes tax');
        cy.xpath(this.addtoCart).click();
        cy.xpath(this.cart).click();
        cy.xpath(this.totalprice).should('have.text','360');
        cy.xpath(this.placeOrder).click();
        cy.logToExternalFile('Product Added to Cart and Placed Order');
    }
    enterName(data)
    {
        cy.xpath(this.name).click().type(data);
        cy.logToExternalFile('User Name Entered');
    }
    entercountry(data)
    {
        cy.xpath(this.country).click().type(data);
        cy.logToExternalFile('Country Entered');

    }
    entercity(data)
    {
        cy.xpath(this.city).click().type(data);
        cy.logToExternalFile('City Entered');
    }
    entercard(data)
    {
        cy.xpath(this.card).click().type(data);
        cy.logToExternalFile('Card Entered');
    }
    entermonth(data)
    {
        cy.xpath(this.month).click().type(data);
        cy.logToExternalFile('Month Entered');
    }
    enteryear(data)
    {
        cy.xpath(this.year).click().type(data);
        cy.logToExternalFile('Year Entered');
    }
    clickPurchase()
    {
        cy.xpath(this.purchasebtn).click();
        cy.logToExternalFile('Clicked On Purchased');
    }
    validateOrder()
    {
        cy.xpath(this.thankmsg).should('have.text','Thank you for your purchase!');
        cy.xpath(this.orderdetails).then(($value) => {
            let orderid = $value.text()
            cy.logToExternalFile('Order Id :'+orderid );
        })
          cy.xpath(this.okbtn).click();
          cy.xpath(this.logout).click({force: true});
          cy.xpath(this.login).should('have.text','Log in')
          cy.logToExternalFile('Validated Order & Logout');
    }
}
export default AddProduct;