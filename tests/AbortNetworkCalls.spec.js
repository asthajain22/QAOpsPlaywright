const {test, expect} = require('@playwright/test');

test('@Web Abort Network Calls', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    //page.route('**/*.{jpg,png,jpeg}',route=>route.abort());

    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

    page.on('request',request => console.log(request.url()));
    page.on('response',response => console.log(response.url(),response.status()));

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.fill("rahulshetty");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
    //await page.pause();
}
);