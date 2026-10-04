import {expect, type Page, type Locator} from '@playwright/test';

export class CartPage
{
    page: Page;
    cartProducts: Locator;
    checkout: Locator;
    constructor(page: any)
    {
        this.page = page;
        this.cartProducts = this.page.locator('div li').first();
        this.checkout = page.locator("text=Checkout");
    }

    async verifyingProductAddedToCart(productName: string)
    {
        await this.cartProducts.waitFor();
        const bool = await this.productOnCart(productName).isVisible();
        expect(bool).toBeTruthy();
    }

    async navigateToCheckout()
    {
        await this.checkout.click();
    }

    productOnCart(productName: string)
    {
        return this.page.locator(`h3:has-text("${productName}")`);
    }
}
module.exports = {CartPage};