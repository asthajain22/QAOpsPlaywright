const {test, expect} = require('@playwright/test');
const {customtest} = require('../utils/fixtures.js')

customtest("Fixtures demo", async({authenticatedPage, createOrder, testDataForOrder})=>
{
    //Login to application, create order and verify if the order is created from History page.
    await authenticatedPage.goto("https://rahulshettyacademy.com/client");
    await authenticatedPage.locator("button[routerlink*='myorders']").click();
    await authenticatedPage.locator("tr.ng-star-inserted td").first().waitFor();
    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
    console.log(testDataForOrder.productName);
}
);