const {expect} = require('@playwright/test');

class CheckoutPage
{
    constructor(page)
    {
        this.country = page.locator("[placeholder='Select Country']");
        this.dropdown = page.locator(".ta-results");
        this.userNameInformation = page.locator(".user__name [type='text']");
        this.submitButton = page.locator(".action__submit");
    }

    async addCountry(userName,countryCode,countryName)
    {
        await this.country.pressSequentially(countryCode,{delay: 150});
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator("button").count();
        for(let i=0;i<optionsCount;i++)
        {
            const text = await this.dropdown.locator("button").nth(i).textContent();
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