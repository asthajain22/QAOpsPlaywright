# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: AbortNetworkCalls.spec.js >> @Web Abort Network Calls
- Location: tests\AbortNetworkCalls.spec.js:3:1

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('[style*=\'block\']')
Expected substring: "Incorrect"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" locator('[style*=\'block\']') with timeout 5000ms
  - waiting for locator('[style*=\'block\']')

```

```yaml
- link "Free Access to InterviewQues/ResumeAssistance/Material":
  - /url: https://rahulshettyacademy.com/documents-request
- link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator.":
  - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
- heading [level=3]:
  - img
- text: "Username:"
- textbox "Username:": rahulshetty
- text: "Password:"
- textbox "Password:": Learning@830$3mK2
- text: Admin
- radio "Admin" [checked]
- text: User
- radio "User"
- combobox:
  - option "Student" [selected]
  - option "Teacher"
  - option "Consultant"
- checkbox "I Agree to the terms and conditions"
- text: I Agree to the
- link "terms and conditions":
  - /url: "#"
- button "Sign In"
- paragraph: (username is rahulshettyacademy and Password is Learning@830$3mK2)
```

# Test source

```ts
  1  | const {test, expect} = require('@playwright/test');
  2  | 
  3  | test('@Web Abort Network Calls', async({browser})=>
  4  | {
  5  |     const context = await browser.newContext();
  6  |     const page = await context.newPage();
  7  | 
  8  |     //page.route('**/*.{jpg,png,jpeg}',route=>route.abort());
  9  | 
  10 |     const userName = page.locator('#username');
  11 |     const signIn = page.locator("#signInBtn");
  12 |     const cardTitles = page.locator(".card-body a");
  13 | 
  14 |     page.on('request',request => console.log(request.url()));
  15 |     page.on('response',response => console.log(response.url(),response.status()));
  16 | 
  17 |     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  18 |     console.log(await page.title());
  19 |     await userName.fill("rahulshetty");
  20 |     await page.locator("[type='password']").fill("Learning@830$3mK2");
  21 |     await signIn.click();
  22 |     console.log(await page.locator("[style*='block']").textContent());
> 23 |     await expect(page.locator("[style*='block']")).toContainText('Incorrect');
     |                                                    ^ Error: expect(locator).toContainText(expected) failed
  24 |     await userName.fill("");
  25 |     await userName.fill("rahulshettyacademy");
  26 |     await signIn.click();
  27 |     const allTitles = await cardTitles.allTextContents();
  28 |     console.log(allTitles);
  29 |     //await page.pause();
  30 | }
  31 | );
```