import {expect, type Page, type Locator} from '@playwright/test';

export class OrderSuccessPage
{
    page: Page;
    orderConfirmation: Locator;
    orderIdDetail: Locator;
    orders: Locator;
    constructor(page: Page)
    {
        this.page = page;
        this.orderConfirmation = page.locator(".hero-primary");
        this.orderIdDetail = page.locator(".em-spacer-1 .ng-star-inserted");
        this.orders = page.locator("button[routerlink*='myorders']");
    }

    async orderSuccessful(orderSuccessfulText: string)
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