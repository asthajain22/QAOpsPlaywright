const {test, expect} = require ('@playwright/test');

test('ClientApp E2E using GetBy Locators', async ({page})=>
{
    const email = "anshika@gmail.com";
    const productName = "ZARA COAT 3";
    const products = page.locator('.card-body');
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.getByRole("button",{name:'Login'}).click();
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    await page.locator('.card-body').filter({hasText: productName}).getByRole("button",{name: ' Add To Cart'}).click();

    await page.getByRole("listitem").getByRole("button",{name: 'Cart'}).click();
    await page.locator('div li').first().waitFor();
    await expect(page.getByText(productName)).toBeVisible();

    await page.getByRole("button", {name: 'Checkout'}).click();
    await page.getByPlaceholder("Select Country").pressSequentially("Ind");
    await page.getByRole("button", {name: 'India'}).nth(1).click();

    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();

    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const finalorderId = orderId.split("|")[1].split(" ")[1];
    console.log(finalorderId);

    await page.getByRole("button", {name: 'ORDERS'}).click();
    await page.locator("tr.ng-star-inserted td").first().waitFor();
    const orders = page.locator("tr.ng-star-inserted");
    await orders.filter({hasText: finalorderId}).getByRole("button", {name: "View"}).click();

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
}
);