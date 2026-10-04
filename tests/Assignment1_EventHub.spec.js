const {test, expect} = require ('@playwright/test');

test('Event Hub E2E', async ({page})=>
{
    const BASE_URL = "https://eventhub.rahulshettyacademy.com";
    await page.goto(BASE_URL);
    await page.getByPlaceholder("you@email.com").fill("astha@gmail.com");
    await page.getByLabel("password").fill("Iamking@000");
    await page.locator("#login-btn").click();
    await page.getByRole("button", {name: 'Admin'}).click();
    await page.locator("div.relative a[href*='events']").first().click();

    const eventTitle = `Test Event ${Date.now()}`;
    await page.locator("#event-title-input").fill(eventTitle);
    await page.locator("#admin-event-form textarea").fill("Description");
    await page.getByLabel("city").fill("Indore");
    await page.getByLabel("venue").fill("Sayaji");
    await page.locator("input[type='datetime-local']").fill("2026-10-10T14:30");
    await page.getByLabel("price ($)").fill("100");
    await page.getByLabel("total seats").fill("50");
    await page.locator("#add-event-btn").click();
    await expect(page.getByText("Event created!")).toBeVisible();

    await page.locator("#nav-events").click();
    await page.locator("[data-testid='event-card']").first().waitFor();
    const events = page.locator("[data-testid='event-card']");
    await expect(events.first()).toBeVisible();
    await expect(events.getByText(eventTitle)).toBeVisible({timeout: 5000});
    //const eventName = await events.filter({hasText: eventTitle}).locator("h3").textContent();
    //console.log(eventName);
    const seatsAvailableBeforeBooking= await events.filter({hasText: eventTitle}).getByText("seats available").textContent();
    console.log(seatsAvailableBeforeBooking);
    const seatsBeforeBooking = parseInt(seatsAvailableBeforeBooking);
    console.log(seatsBeforeBooking);

    await events.filter({hasText: eventTitle}).locator("[data-testid='book-now-btn']").click();

    //await page.waitForLoadState('networkidle');
    //await page.locator("img").waitFor({state: "visible"});
    const defaultQuantity = "1";
    await expect(page.locator("#ticket-count")).toHaveText(defaultQuantity);
    await page.getByLabel("Full Name").fill("Rahul Shetty");
    await page.locator("#customer-email").fill("rahul@rahulshettyacademy.com");
    await page.getByPlaceholder("+91 98765 43210").fill("+919876543210");
    await page.locator(".confirm-booking-btn").click();

    await expect(page.locator(".booking-ref")).toBeVisible();
    const bookingRef = await page.locator(".booking-ref").textContent();
    console.log(bookingRef);

    await page.getByRole("button", {name: "View My Bookings"}).click();
    await expect(page).toHaveURL(BASE_URL+ "/bookings");
    const bookingCards = page.locator("#booking-card");
    await expect(bookingCards.first()).toBeVisible();
    await expect(bookingCards.filter({hasText: bookingRef})).toBeVisible();
    await expect(bookingCards.filter({hasText: bookingRef})).toContainText(eventTitle);

    await page.locator("#nav-events").click();
    await expect(events.first()).toBeVisible();
    await expect(events.filter({hasText: eventTitle})).toBeVisible();
    const seatsAvailableAfterBooking= await events.filter({hasText: eventTitle}).getByText("seats available").textContent();
    console.log(seatsAvailableAfterBooking);
    const seatsAfterBooking = parseInt(seatsAvailableAfterBooking);
    console.log(seatsAfterBooking);
    expect(seatsAfterBooking === seatsBeforeBooking - 1).toBeTruthy();
    //await page.pause();
}
);