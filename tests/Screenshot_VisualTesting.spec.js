const {test, expect} = require ('@playwright/test');

//test.describe.configure({mode: 'parallel'});
test.describe.configure({mode: 'serial'});
test('Screenshot & Visual Comparison', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: 'partialScreenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
}
);

test('Visual Testing', async({page})=>
{
    await page.goto("https://www.google.com/");
    //expect (await page.screenshot()).toMatchSnapshot('landing.png');
}
);