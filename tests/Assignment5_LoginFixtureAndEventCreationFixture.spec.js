const {expect} = require('@playwright/test');
const {customtest} = require('../utils/Assignment5_fixtures.js');

customtest('Build a Two-Fixture Test — Login Fixture + Event Creation Fixture', async({authenticatedPage, createEvent})=>
{
    // Task 3 — The test
    // Write a test that:
    // Uses authenticatedPage to land on the events page (already logged in)
    // Uses createEvent to know what event was just created
    // Asserts that event's name is visible on the page
    // The test body should contain no login code and no API call — just a navigation line and an assertion line, 
    // reading off what the two fixtures already set up.

    await authenticatedPage.goto("https://eventhub.rahulshettyacademy.com/events");
    await expect(authenticatedPage.getByText(createEvent.title)).toBeVisible();
}
);