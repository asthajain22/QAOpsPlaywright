const base = require('@playwright/test');
const {expect} = require('@playwright/test');

exports.customtest = base.test.extend
(
    {
        // Task 1 — authenticatedPage fixture
        // Build a fixture that logs into EventHub through the UI (fill email/password, click login) and yields a page object 
        // that's already past the login screen. Any test that asks for this fixture should be able to go straight to /events
        //  without writing a single login step itself.

        authenticatedPage : async({page}, use)=>
        {
            //const context = await browser.newContext();
            //const page = await context.newPage();
            await page.goto("https://eventhub.rahulshettyacademy.com");
            await page.getByPlaceholder("you@email.com").fill("astha@gmail.com");
            await page.getByLabel("password").fill("Iamking@000");
            await page.locator("#login-btn").click();
            await expect(page.getByRole('link',{ name: 'Browse Events →'})).toBeVisible();
            await page.goto("https://eventhub.rahulshettyacademy.com/events");
            await use(page);
        },

        // Task 2 — createEvent fixture
        // Build a fixture that calls the POST /events API directly (no UI) to create a new event before the test runs, 
        // and yields the API response (containing the new event's name/ID) to the test.

        createEvent : async ({request}, use)=>
        {
            const loginRes = await request.post
            (
                "https://api.eventhub.rahulshettyacademy.com/api/auth/login",
                {
                    data :
                    {
                        email : "astha@gmail.com",
                        password : "Iamking@000"
                    }
                }
            );
            await expect(loginRes.ok()).toBeTruthy();
            const loginResJSON = await loginRes.json();
            const token = loginResJSON.token;

            const createEventRes = await request.post
            (
                "https://api.eventhub.rahulshettyacademy.com/api/events",
                {
                    data :
                    {
                        title      : `Test Event ${Date.now()}`,
                        category   : "Conference",
                        venue      : "Aryan Twin Tower",
                        city       : "Pune",
                        eventDate  : "2026-09-30T16:31:00.000Z",
                        price      : 25,
                        totalSeats : 50
                    },
                    headers :
                    {
                        'Authorization' : `Bearer ${token}`,
                        'Content-Type' : 'application/json'
                    }
                }
            );
            await expect(createEventRes.ok()).toBeTruthy();
            const createEventResJSON = await createEventRes.json();
            const event = createEventResJSON.data;
            const eventId = createEventResJSON.data.id;
            const eventName = createEventResJSON.data.title;
            console.log(eventId);
            console.log(eventName);
            await use(event);
        }
    }
);