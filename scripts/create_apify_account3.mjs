import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ 
    headless: false,
    args: ['--no-sandbox']
  });
  try {
    const page = await browser.newPage();
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    });
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    console.log("Navigating to Apify...");
    await page.goto('https://console.apify.com/sign-up', { waitUntil: 'networkidle2' });
    
    console.log("Typing email...");
    await page.waitForSelector('input[name="email"]', { timeout: 10000 });
    const email = "hi+apify2026@thehicompany.co";
    await page.type('input[name="email"]', email, { delay: 50 });
    
    // Look for a continue button
    console.log("Clicking continue...");
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text && (text.includes('Continue') || text.includes('Sign up'))) {
        await btn.click();
        break;
      }
    }
    
    console.log("Waiting for password field...");
    await new Promise(r => setTimeout(r, 3000));
    
    const hasPassword = await page.$('input[name="password"], input[type="password"]');
    if (hasPassword) {
      console.log("Typing password...");
      const password = "HiCompanyApify2026!" + Math.floor(Math.random() * 1000);
      await page.type('input[type="password"]', password, { delay: 50 });
      
      const hasFirstName = await page.$('input[name="firstName"]');
      if (hasFirstName) {
        await page.type('input[name="firstName"]', 'Chris', { delay: 50 });
        await page.type('input[name="lastName"]', 'Reeder', { delay: 50 });
      }
      
      console.log("Submitting password...");
      await page.keyboard.press('Enter');
      await new Promise(r => setTimeout(r, 8000));
      console.log(`ACCOUNT CREATED. Password: ${password}`);
    } else {
      console.log("No password field found. Could be an email-only flow or blocked.");
      await page.screenshot({ path: 'apify_debug.png' });
    }
  } catch (err) {
    console.error("Test failed:", err.message);
  } finally {
    await browser.close();
  }
})();
