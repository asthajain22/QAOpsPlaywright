const {test, expect, request} = require ('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');

const loginPayLoad = {userEmail:"anshika@gmail.com",userPassword:"Iamking@000"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
let token;
let orderId;
let response;

test.beforeAll( async()=>
{
    //Login API
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
    
}
);

// test.beforeEach( ()=>
// {

// }
// );

//test1, test2, test3
//beforeEach will execute before each test so it will execute thrice here
//beforeAll will execute only once before all the test cases and then it will run all 3 test cases in sequence

test('API Test - Place the Order', async ({page})=>
{
    await page.addInitScript(value=>
    {
        window.localStorage.setItem('token',value);
    }, response.token
    );

    await page.goto("https://rahulshettyacademy.com/client/");

    await page.locator("button[routerlink*='myorders']").click();
    //await page.waitForLoadState('networkidle');
    await page.locator("tr.ng-star-inserted td").first().waitFor();
    const orders = page.locator("tr.ng-star-inserted");
    const orderIdcount = await orders.locator("th").count();
    console.log(orderIdcount);
    for(let i=0;i<orderIdcount;i++)
    {
        // if(await orders.nth(i).locator("th").textContent() === finalorderId)
        // {
        //     await orders.nth(i).locator("text=View").click();
        //     break;
        // }
        if(response.orderId.includes(await orders.nth(i).locator("th").textContent()))
        {
            await orders.nth(i).locator("text=View").click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
}
);

//verify if order created is showing in history page
// Precondition - create order, take order id