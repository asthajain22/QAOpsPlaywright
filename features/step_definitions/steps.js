const {When, Then, Given} = require('@cucumber/cucumber');
const {PageObjectManager} = require('../../pageobjects/PageObjectManager.js');
const {expect} = require('@playwright/test');
const playwright = require('@playwright/test');

Given('a login to Ecommerce application with {string} and {string}', {timeout:100*1000}, async function(userName,password)
{
    // Write code here that turns the phrase above into concrete actions
    this.countryCode = "Ind";
    this.countryName = " India";
    this.orderSuccessfulText = " Thankyou for the order. ";
    this.userName = userName;
    
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(userName,password);
}
);

When('Add {string} to Cart', async function (productName)
{
    // Write code here that turns the phrase above into concrete actions
    const dashboardPage = this.poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();
}
);

Then('Verify {string} is displayed in the Cart', async function (productName)
{
    // Write code here that turns the phrase above into concrete actions
    const cartPage = this.poManager.getCartPage();
    await cartPage.verifyingProductAddedToCart(productName);
    await cartPage.navigateToCheckout();
}
);

When('Enter valid details and Place the Order', async function ()
{
    //Write code here that turns the phrase above into concrete actions
    const checkoutPage = this.poManager.getCheckoutPage();
    await checkoutPage.addCountry(this.userName,this.countryCode,this.countryName);
    await checkoutPage.navigateToSubmit();
    this.orderSuccessPage = this.poManager.getOrderSuccessPage();
    this.orderId = await this.orderSuccessPage.orderSuccessful(this.orderSuccessfulText);
    console.log("Order ID:",this.orderId);
}
);

Then('Verify order is present in the OrderHistory', async function()
{
    //Write code here that turns the phrase above into concrete actions
    await this.orderSuccessPage.navigateToOrders();
    const ordersPage = this.poManager.getOrdersPage();
    await ordersPage.viewOrderDetails(this.orderId);
}
);

Given('a login to Ecommerce2 application with {string} and {string}', async function(userName, password)
{
    const username = this.page.locator('#username');
    const signIn = this.page.locator("#signInBtn");

    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await username.fill(userName);
    await this.page.locator("[type='password']").fill(password);
    await signIn.click();
}
);

Then('Verify Error message is displayed', async function()
{
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
}
);