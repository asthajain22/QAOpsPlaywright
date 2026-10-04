const {test, expect} = require ('@playwright/test');

const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const USER_EMAIL = "astha@gmail.com";
const USER_PASSWORD = "Iamking@000";

async function loginAndGoToBooking(page)
{
    await page.goto(`${BASE_URL}/login`);
    await page.getByPlaceholder('you@email.com').fill(USER_EMAIL);
    await page.getByLabel('Password').fill(USER_PASSWORD);
    await page.locator('#login-btn').click();
    await expect(page.getByRole('link',{ name: 'Browse Events →'})).toBeVisible();
}

test('Eligible for Refund', async ({page})=>
{
    await loginAndGoToBooking(page);
    await page.goto(`${BASE_URL}/events`);
    await page.locator("[data-testid='event-card']").first().locator("[data-testid='book-now-btn']").click();
    await page.getByLabel("Full Name").fill("Rahul Shetty");
    await page.locator("#customer-email").fill("rahul@rahulshettyacademy.com");
    await page.getByPlaceholder("+91 98765 43210").fill("+919876543210");
    await page.locator(".confirm-booking-btn").click();

    await page.getByRole("button", {name: "View My Bookings"}).click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    await page.getByRole("button", {name: 'View Details'}).first().click();
    await expect(page.locator(".space-y-4")).toBeVisible();

    const bookingRef = await page.locator(".font-mono").first().textContent();
    const eventTitle = await page.locator("h1.text-2xl").textContent();
    expect(bookingRef.charAt(0) === eventTitle.charAt(0)).toBeTruthy();

    await page.locator("#check-refund-btn").click();
    await expect(page.locator("#refund-spinner")).toBeVisible();
    await expect(page.locator("#refund-spinner")).toBeHidden({timeout: 6000});

    await expect(page.locator("#refund-result")).toBeVisible();
    await expect(page.locator("#refund-result")).toContainText("Eligible for refund");
    await expect(page.locator("#refund-result")).toContainText("Single-ticket bookings qualify for a full refund");
}
);

test('Not Eligible for Refund', async ({page})=>
{
    await loginAndGoToBooking(page);
    await page.goto(`${BASE_URL}/events`);
    await page.locator("[data-testid='event-card']").first().locator("[data-testid='book-now-btn']").click();
    await page.getByRole("button", {name: "+"}).dblclick();
    await page.getByLabel("Full Name").fill("Rahul Shetty");
    await page.locator("#customer-email").fill("rahul@rahulshettyacademy.com");
    await page.getByPlaceholder("+91 98765 43210").fill("+919876543210");
    await page.locator(".confirm-booking-btn").click();

    await page.getByRole("button", {name: "View My Bookings"}).click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    await page.getByRole("button", {name: 'View Details'}).first().click();
    await expect(page.locator(".space-y-4")).toBeVisible();

    const bookingRef = await page.locator(".font-mono").first().textContent();
    const eventTitle = await page.locator("h1.text-2xl").textContent();
    expect(bookingRef.charAt(0) === eventTitle.charAt(0)).toBeTruthy();

    await page.locator("#check-refund-btn").click();
    await expect(page.locator("#refund-spinner")).toBeVisible();
    await expect(page.locator("#refund-spinner")).toBeHidden({timeout: 6000});

    await expect(page.locator("#refund-result")).toBeVisible();
    await expect(page.locator("#refund-result")).toContainText("Not eligible for refund");
    await expect(page.locator("#refund-result")).toContainText("Group bookings (3 tickets) are non-refundable");
}
);