const playwright = require('@playwright/test');
const {PageObjectManager} = require('../../pageobjects/PageObjectManager.js');
const {Before, After, BeforeStep, AfterStep, Status} = require('@cucumber/cucumber');

Before({timeout:100*1000}, async function()
{
    const browser = await playwright.chromium.launch({headless: false});
    const context = await browser.newContext();
    this.page = await context.newPage();

    this.poManager = new PageObjectManager(this.page);
}
);

After(function()
{
    console.log("I am last to execute");
}
);

BeforeStep(function()
{

}
);

AfterStep(async function({result})
{
    if(result.status === Status.FAILED)
    {
        await this.page.screenshot({path: 'BeforeStepScreenshot.png'});
    }
}
);