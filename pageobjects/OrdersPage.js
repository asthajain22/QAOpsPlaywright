const {expect} = require('@playwright/test');

class OrdersPage
{
    constructor(page)
    {
        this.page = page;
        this.orders = page.locator("tr.ng-star-inserted");
        this.ordersTitle = page.locator("tr.ng-star-inserted td");
    }
    
    async viewOrderDetails(orderId)
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