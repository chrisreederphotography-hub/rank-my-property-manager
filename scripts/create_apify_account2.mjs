import puppeteer from 'puppeteer';

(async () => {
  console.log("Launching standard browser with stealth evasions...");
  const browser = await puppeteer.launch({ 
    headless: false, // Sometimes headful bypasses Cloudflare easier
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Basic stealth evasions without puppeteer-extra
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    });
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setViewport({ width: 1280, height: 800 });
    
    console.log("Navigating to Apify Sign Up...");
    await page.goto('https://console.apify.com/sign-up', { waitUntil: 'networkidle2' });
    
    console.log("Waiting for email field...");
    await page.waitForSelector('input[name="email"]', { timeout: 15000 });
    
    const password = "HiCompanyApify2026!" + Math.floor(Math.random() * 1000);
    const email = "hi@thehicompany.co";
    
    console.log("Typing credentials...");
    await page.type('input[name="email"]', email, { delay: 50 });
    
    const hasFirstName = await page.$('input[name="firstName"]');
    if (hasFirstName) {
      await page.type('input[name="firstName"]', 'Chris', { delay: 50 });
      await page.type('input[name="lastName"]', 'Reeder', { delay: 50 });
    }
    
    await page.type('input[name="password"]', password, { delay: 50 });
    
    console.log("Submitting form...");
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) {
      await submitBtn.click();
    } else {
      await page.keyboard.press('Enter');
    }
    
    console.log("Waiting for redirection...");
    await new Promise(r => setTimeout(r, 10000));
    
    console.log(`ACCOUNT CREATED INITIALLY. Password used: ${password}`);
    
  } catch (err) {
    console.error("Error during automated signup:", err.message);
  } finally {
    await browser.close();
  }
})();
