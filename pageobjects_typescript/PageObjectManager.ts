import {expect, type Page, type Locator} from '@playwright/test';

import { LoginPage } from './LoginPage.ts';
import { DashboardPage } from './DashboardPage.ts';
import {CartPage} from './CartPage.ts';
import { CheckoutPage } from './CheckoutPage.ts';
import { OrderSuccessPage } from './OrderSuccessPage.ts';
import { OrdersPage } from './OrdersPage.ts';

export class PageObjectManager
{
    page: Page;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    orderSuccessPage: OrderSuccessPage;
    ordersPage: OrdersPage;
    constructor(page: any)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.orderSuccessPage = new OrderSuccessPage(this.page);
        this.ordersPage = new OrdersPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }

    getCartPage()
    {
        return this.cartPage;
    }

    getCheckoutPage()
    {
        return this.checkoutPage;
    }

    getOrderSuccessPage()
    {
        return this.orderSuccessPage;
    }

    getOrdersPage()
    {
        return this.ordersPage;
    }
}
module.exports = {PageObjectManager};