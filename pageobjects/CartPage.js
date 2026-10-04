const {expect} = require('@playwright/test');

class CartPage
{
    constructor(page)
    {
        this.page = page;
        this.cartProducts = this.page.locator('div li').first();
        this.checkout = page.locator("text=Checkout");
    }

    async verifyingProductAddedToCart(productName)
    {
        await this.cartProducts.waitFor();
        const bool = await this.productOnCart(productName).isVisible();
        expect(bool).toBeTruthy();
    }

    async navigateToCheckout()
    {
        await this.checkout.click();
    }

    productOnCart(productName)
    {
        return this.page.locator(`h3:has-text("${productName}")`);
    }
}
module.exports = {CartPage};