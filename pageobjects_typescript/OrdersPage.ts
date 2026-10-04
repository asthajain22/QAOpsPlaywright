import {expect, type Page, type Locator} from '@playwright/test';

export class OrdersPage
{
    page: Page;
    orders: Locator;
    ordersTitle: Locator;
    constructor(page: Page)
    {
        this.page = page;
        this.orders = page.locator("tr.ng-star-inserted");
        this.ordersTitle = page.locator("tr.ng-star-inserted td");
    }
    
    async viewOrderDetails(orderId: any)
    {
        await this.ordersTitle.first().waitFor();
        const orderIdcount = await this.orders.locator("th").count();
        console.log(orderIdcount);
        for(let i=0;i<orderIdcount;i++)
        {
            if(orderId.includes(await this.orders.nth(i).locator("th").textContent()))
            {
                await this.orders.nth(i).locator("text=View").click();
                break;
            }
        }
        const orderIdDetails = await this.page.locator(".col-text").textContent();
        expect(orderId.includes(orderIdDetails)).toBeTruthy();
    }
}
module.exports = {OrdersPage};