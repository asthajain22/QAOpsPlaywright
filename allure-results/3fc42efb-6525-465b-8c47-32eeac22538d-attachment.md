# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientAppPageObjectImplementation.spec.js >> @Web Client App login for ZARA COAT 3
- Location: tests\ClientAppPageObjectImplementation.spec.js:9:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('div li').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator." [ref=e11] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [aria-hidden] [ref=e24]: 
          - text: Sign Out
  - generic [ref=e25]:
    - generic [ref=e26]:
      - heading "My Cart" [level=1] [ref=e27]
      - button "Continue Shopping❯" [ref=e28] [cursor=pointer]
    - heading "No Products in Your Cart !" [level=1] [ref=e30]
```

# Test source

```ts
  1  | const {expect} = require('@playwright/test');
  2  | 
  3  | class CartPage
  4  | {
  5  |     constructor(page)
  6  |     {
  7  |         this.page = page;
  8  |         this.cartProducts = this.page.locator('div li').first();
  9  |         this.checkout = page.locator("text=Checkout");
  10 |     }
  11 | 
  12 |     async verifyingProductAddedToCart(productName)
  13 |     {
> 14 |         await this.cartProducts.waitFor();
     |                                 ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  15 |         const bool = await this.productOnCart(productName).isVisible();
  16 |         expect(bool).toBeTruthy();
  17 |     }
  18 | 
  19 |     async navigateToCheckout()
  20 |     {
  21 |         await this.checkout.click();
  22 |     }
  23 | 
  24 |     productOnCart(productName)
  25 |     {
  26 |         return this.page.locator(`h3:has-text("${productName}")`);
  27 |     }
  28 | }
  29 | module.exports = {CartPage};
```