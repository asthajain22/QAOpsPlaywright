import {expect, type Page, type Locator} from '@playwright/test';

export class CheckoutPage
{
    page: Page;
    country: Locator;
    dropdown: Locator;
    userNameInformation: Locator;
    submitButton: Locator;
    constructor(page: Page)
    {
        this.page = page;
        this.country = page.locator("[placeholder='Select Country']");
        this.dropdown = page.locator(".ta-results");
        this.userNameInformation = page.locator(".user__name [type='text']");
        this.submitButton = page.locator(".action__submit");
    }

    async addCountry(userName: string,countryCode: string,countryName: string)
    {
        await this.country.pressSequentially(countryCode,{delay: 150});
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator("button").count();
        for(let i=0;i<optionsCount;i++)
        {
            let text: any;
            text = await this.dropdown.locator("button").nth(i).textContent();
            if(text === countryName)
            {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }
        await expect(this.userNameInformation.first()).toHaveText(userName);
    }

    async navigateToSubmit()
    {
        await this.submitButton.click();
    }
}
module.exports = {CheckoutPage};