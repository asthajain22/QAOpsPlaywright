const {LoginPage} = require('./LoginPage.js');
const {DashboardPage} = require('./DashboardPage.js');
const {CartPage} = require('./CartPage.js');
const {CheckoutPage} = require('./CheckoutPage.js');
const {OrderSuccessPage} = require('./OrderSuccessPage.js');
const {OrdersPage} = require('./OrdersPage.js');

class PageObjectManager
{
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.orderSuccessPage = new OrderSuccessPage(this.page);
        this.ordersPage = new OrdersPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }

    getCartPage()
    {
        return this.cartPage;
    }

    getCheckoutPage()
    {
        return this.checkoutPage;
    }

    getOrderSuccessPage()
    {
        return this.orderSuccessPage;
    }

    getOrdersPage()
    {
        return this.ordersPage;
    }
}
module.exports = {PageObjectManager};