const {test, expect} = require('@playwright/test');

test('Browser Context Playwright test', async ({browser})=>
{
    //playwright code
    //step 1 - open browser
    //step 2 - enter username & password
    //step 3 - click signin

    //in JS all 3 steps execute simultaenously and this is is called asynchronous
    //so to execute steps in order before each step we have to write await keyword
    //also function needs to be marked as async
    
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
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
    // console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
}
);

test('Page Playwright test', async ({page})=>
{
    await page.goto("https://google.com");
    //get title - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
}
);

test('@Web UI Controls', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']");
    const dropdown = page.locator('select.form-control');
    await userName.fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await page.locator(".radiotextsty").nth(1).click();
    await page.locator('#okayBtn').click();
    console.log(await page.locator(".radiotextsty").nth(1).isChecked());
    await expect(page.locator(".radiotextsty").nth(1)).toBeChecked();
    await dropdown.selectOption("consult");
    //await page.pause();
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await signIn.click();
    await expect(documentLink).toHaveAttribute('class','blinkingText');
}
);

test('Child Window Handle', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const documentLink = page.locator("[href*='documents-request']");
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),   //listen for any new page 3 promise-pending, fulfilled, rejected
            documentLink.click(),
        ]
    )  //new page is opened

    const text = await newPage.locator('.red').textContent();
    const arrayText = text.split('@');
    const domain = arrayText[1].split(' ')[0];
    console.log(domain);
    await userName.fill(domain);
    console.log(await userName.inputValue());
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await page.pause();
    await signIn.click();
}
);