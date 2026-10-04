const {test, expect} = require('@playwright/test');

test('Security test request intercept', async ({page})=>
{
    //login and reach orders page
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('#userEmail').fill("anshika@gmail.com");
    await page.locator('#userPassword').fill('Iamking@000');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body h5 b').first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();

    await page.route
    (
        "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route=>route.continue  //intercept request calls
        (
            {
                url : 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'
            }
        )
    )
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
}
);