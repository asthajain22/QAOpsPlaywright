
const {test, expect} = require ('@playwright/test');
let webContext;

test.beforeAll(async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill("anshika@gmail.com");
    await page.locator('#userPassword').fill('Iamking@000');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'});
}
);

test('ClientApp API', async ()=>
{
    //const email = "anshika@gmail.com";
    const productName = "ZARA COAT 3";
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator('.card-body');

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

test('Test case 2', async()=>
{
    const productName = "ZARA COAT 3";
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator('.card-body');
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
}
);