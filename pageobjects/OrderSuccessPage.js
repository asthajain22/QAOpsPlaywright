const {expect} = require('@playwright/test');

class OrderSuccessPage
{
    constructor(page)
    {
        this.orderConfirmation = page.locator(".hero-primary");
        this.orderIdDetail = page.locator(".em-spacer-1 .ng-star-inserted");
        this.orders = page.locator("button[routerlink*='myorders']");
    }

    async orderSuccessful(orderSuccessfulText)
    {
        await expect(this.orderConfirmation).toHaveText(orderSuccessfulText);
        const orderId = await this.orderIdDetail.first().textContent();
        return orderId;
    }

    async navigateToOrders()
    {
        await this.orders.click();
    }
}
module.exports = {OrderSuccessPage};