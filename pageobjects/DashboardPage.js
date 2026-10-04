class DashboardPage
{
    constructor(page)
    {
        this.page = page;
        this.products = page.locator('.card-body');
        this.productsText = page.locator('.card-body b');
        this.cart = page.locator("[routerlink*='cart']");
    }

    async searchProductAddCart(productName)
    {
        const titles = await this.productsText.allTextContents();
        await this.productsText.last().waitFor();
        console.log(titles);
        await this.page.waitForLoadState('networkidle');
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