import {expect, type Page, type Locator} from '@playwright/test';

export class DashboardPage
{
    page: Page;
    products: Locator;
    productsText: Locator;
    cart: Locator;
    constructor(page: Page)
    {
        this.page = page;
        this.products = page.locator('.card-body');
        this.productsText = page.locator('.card-body b');
        this.cart = page.locator("[routerlink*='cart']");
    }

    async searchProductAddCart(productName: string)
    {
        await this.page.waitForLoadState('networkidle');
        await this.productsText.last().waitFor();
        const titles = await this.productsText.allTextContents();
        console.log(titles);
        const count = await this.products.count();
        console.log("count : "+count);
        for(let i=0;i<count;++i)
        {
            if(await this.products.nth(i).locator('b').textContent() === productName)
            {
                await this.products.nth(i).locator("text= Add to Cart").click();
                break;
            }
        }
    }

    async navigateToCart()
    {
        await this.cart.click();
    }
}
module.exports = {DashboardPage};