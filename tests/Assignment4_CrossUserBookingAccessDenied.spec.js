const {test, expect, request} = require('@playwright/test');

const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const API_URL = BASE_URL + "/api";
const YAHOO_USER = { email: 'astha@yahoo.com', password: 'Iamking@000'};
const GMAIL_USER = { email: 'astha@gmail.com', password: 'Iamking@000'};

async function loginAs(page, user)
{
    await page.goto(`${BASE_URL}/login`);
    await page.getByPlaceholder('you@email.com').fill(user.email);
    await page.getByLabel('Password').fill(user.password);
    await page.locator('#login-btn').click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
};

test('YahooUser creates Booking, Verify GmailUser gets Access Denied in Bookings', async({page, request})=>
{
    // Step 1 — Login as Yahoo user via API  -
    // - Use request.post() to call POST /api/auth/login - (Refer below API Doc link to construct )- https://api.eventhub.rahulshettyacademy.com/api/docs/#/Auth/post_auth_login)
    // - Pass { email, password } as the request body under the data key
    // - Assert the response is OK (loginRes.ok() is truthy)
    // - Parse the JSON response and extract token — you will use this for all subsequent API calls

    const loginRes = await request.post
    (
        "https://api.eventhub.rahulshettyacademy.com/api/auth/login",
        {
            data : 
            {
                email:YAHOO_USER.email,
                password:YAHOO_USER.password
            }
        }
    );
    console.log("Status:", loginRes.status());
    console.log("URL:", loginRes.url());
    console.log("Response:", await loginRes.text());

    expect(loginRes.ok()).toBeTruthy();
    const loginResJSON = await loginRes.json();
    const token = loginResJSON.token;

    // Step 2 — Fetch events via API to get a valid event ID
    // - Use request.get() to call GET /api/events - (Refer below API Doc link to construct )- https://api.eventhub.rahulshettyacademy.com/api/docs/#/Events/get_events)
    // - Pass Authorization: Bearer <token> in the request headers
    // - Assert the response is OK
    // - Parse the JSON, read data[0].id — store this as eventId

    const eventRes = await request.get
    (
        "https://api.eventhub.rahulshettyacademy.com/api/events?page=1&limit=12",
        {
            headers :
            {
                'Authorization' : `Bearer ${token}`
            }
        }
    );
    expect(eventRes.ok()).toBeTruthy();
    const eventResJSON = await eventRes.json();
    console.log(eventResJSON);
    const eventId = eventResJSON.data[0].id;
    console.log(eventId);

    // Step 3 — Create a booking via API as Yahoo user
    // - Use request.post() to call POST /api/bookings  - (Refer below API Doc link to construct )-
    // https://api.eventhub.rahulshettyacademy.com/api/docs/#/Bookings/post_bookings
    // - Pass Authorization: Bearer <token> in headers
    // - Pass the booking payload in data:
    // - eventId — from Step 2
    // - customerName — any name e.g. 'Yahoo User'
    // - customerEmail — Yahoo user's email
    // - customerPhone — any 10-digit number
    // - quantity — 1
    // - Assert the response is OK
    // - Parse the JSON and extract data.id — store as yahooBookingId

    const bookingRes = await request.post
    (
        "https://api.eventhub.rahulshettyacademy.com/api/bookings?page=1&limit=10",
        {
            data : 
            {
                eventId, 
                customerName : 'Yahoo User', 
                customerEmail : YAHOO_USER.email,
                customerPhone : 9876543210,
                quantity : 1
            },
            headers :
            {
                'Authorization' : `Bearer ${token}`
            }
        }
    );
    expect(bookingRes.ok()).toBeTruthy();
    const bookingResJSON = await bookingRes.json();
    const yahooBookingId = bookingResJSON.data.id;
    console.log(yahooBookingId);

    // Step 4 — Login as Gmail user via browser UI
    // - Call your loginAs(page, GMAIL_USER) helper
    await loginAs(page,GMAIL_USER);

    // Step 5 — Navigate to Yahoo's booking URL as Gmail user
    // - Navigate directly to /bookings/${yahooBookingId}
    // - Pass { waitUntil: 'networkidle' } as the navigation option so the page fully resolves before asserting
    await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`);
    await page.waitForLoadState('networkidle');

    // Step 6 — Validate Access Denied
    // - Assert text Access Denied is visible
    // - Assert text You are not authorized to view this booking is visible
    await expect(page.getByText("Access Denied")).toBeVisible();
    await expect(page.getByText("You are not authorized to view this booking")).toBeVisible();
}
);