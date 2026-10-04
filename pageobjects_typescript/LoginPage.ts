import {expect, type Page, type Locator} from '@playwright/test';

export class LoginPage
{
    page: Page;
    signInButton: Locator;
    userName: Locator;
    password: Locator;
    constructor(page: any)
    {
        this.page = page;
        this.signInButton = page.locator('#login');
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
    }

    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async validLogin(userName: string,password: string)
    {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = {LoginPage};