const{test, expect} = require('@playwright/test');

test('Wait Mechanism', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('#userEmail').fill("anshika@gmail.com");
    await page.locator('#userPassword').fill('Iamking@000');
    await page.locator('#login').click();
    console.log(await page.locator('.card-body h5 b').first().textContent());

    //await page.waitForLoadState('networkidle');
    await page.locator('.card-body h5 b').first().waitFor();
    const titles = await page.locator('.card-body h5 b').allTextContents();
    console.log(titles);
}
);

test.skip('Client App E2E', async ({page})=>
{
    const email = "anshika@gmail.com";  
    const productName = 'ZARA COAT 3';
    const products = page.locator('.card-body');
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill('Iamking@000');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body h5 b').first().waitFor();
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);
    const count = await products.count();
    for(let i=0;i<count;++i)
    {
        if(await products.nth(i).locator('b').textContent() === productName)
        {
            //await products.nth(i).locator('.w-10').click();
            await products.nth(i).locator("text= Add to Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator('div li').first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();
    await page.locator("[placeholder='Select Country']").pressSequentially("Ind",{delay: 150});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i=0;i<optionsCount;i++)
    {
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").first().textContent();
    console.log(orderId);

    // const finalorderId = orderId.split("|")[1].split(" ")[1];
    // console.log(finalorderId);

    await page.locator("button[routerlink*='myorders']").click();
    //await page.waitForLoadState('networkidle');
    await page.locator("tr.ng-star-inserted td").first().waitFor();
    const orders = page.locator("tr.ng-star-inserted");
    const orderIdcount = await orders.locator("th").count();
    console.log(orderIdcount);
    for(let i=0;i<orderIdcount;i++)
    {
        // if(await orders.nth(i).locator("th").textContent() === finalorderId)
        // {
        //     await orders.nth(i).locator("text=View").click();
        //     break;
        // }
        if(orderId.includes(await orders.nth(i).locator("th").textContent()))
        {
            await orders.nth(i).locator("text=View").click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
}
);