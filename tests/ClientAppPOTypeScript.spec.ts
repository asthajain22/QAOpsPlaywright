import {test} from '@playwright/test';
import {customTest} from '../utils_typescript/test-base.ts';
import { PageObjectManager } from '../pageobjects_typescript/PageObjectManager.ts';
//JSON -> string -> JS object
const dataset = JSON.parse(JSON.stringify(require('../utils/ClientAppPlaceOrderTestData.json')));

for(const data of dataset)
{
test(`@Web Client App login for ${data.productName}`, async ({page})=>
{
    const countryCode = "Ind";
    const countryName = " India";
    const orderSuccessfulText = " Thankyou for the order. ";

    const poManager = new PageObjectManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.userName,data.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();
    
    const cartPage = poManager.getCartPage();
    await cartPage.verifyingProductAddedToCart(data.productName);
    await cartPage.navigateToCheckout();

    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.addCountry(data.userName,countryCode,countryName);
    await checkoutPage.navigateToSubmit();

    const orderSuccessPage = poManager.getOrderSuccessPage();
    const orderId = await orderSuccessPage.orderSuccessful(orderSuccessfulText);
    console.log("Order ID:",orderId);
    await orderSuccessPage.navigateToOrders();

    const ordersPage = poManager.getOrdersPage();
    await ordersPage.viewOrderDetails(orderId);
}
);
}

customTest(`Client App login Passing TestData using Fixtures`, async ({page, testDataForOrder})=>
{
    const countryCode = "Ind";
    const countryName = " India";
    const orderSuccessfulText = " Thankyou for the order. ";

    const poManager = new PageObjectManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.userName,testDataForOrder.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();
    
    const cartPage = poManager.getCartPage();
    await cartPage.verifyingProductAddedToCart(testDataForOrder.productName);
    await cartPage.navigateToCheckout();
}
);