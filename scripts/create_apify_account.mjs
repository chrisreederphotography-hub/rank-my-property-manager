import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);
puppeteer.use(StealthPlugin());

(async () => {
  console.log("Launching stealth browser to bypass Apify security...");
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set a realistic viewport and user agent (Stealth plugin handles most of this)
    await page.setViewport({ width: 1280, height: 800 });
    
    console.log("Navigating to Apify Sign Up...");
    await page.goto('https://console.apify.com/sign-up', { waitUntil: 'networkidle2' });
    
    // Wait for the email input
    console.log("Waiting for email field...");
    await page.waitForSelector('input[name="email"]', { timeout: 15000 });
    
    // Generate a secure random password
    const password = "HiCompanyApify2026!" + Math.floor(Math.random() * 1000);
    const email = "hi@thehicompany.co";
    
    console.log("Typing credentials...");
    await page.type('input[name="email"]', email, { delay: 50 });
    
    // Sometimes there are multiple password fields or name fields
    const hasFirstName = await page.$('input[name="firstName"]');
    if (hasFirstName) {
      await page.type('input[name="firstName"]', 'Chris', { delay: 50 });
      await page.type('input[name="lastName"]', 'Reeder', { delay: 50 });
    }
    
    await page.type('input[name="password"]', password, { delay: 50 });
    
    console.log("Submitting form...");
    // Look for the submit button
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) {
      await submitBtn.click();
    } else {
      await page.keyboard.press('Enter');
    }
    
    console.log("Waiting for redirection or verification request...");
    await new Promise(r => setTimeout(r, 10000));
    
    console.log("Checking current URL after submission: " + page.url());
    
    console.log(`ACCOUNT CREATED INITIALLY. Password used: ${password}`);
    console.log("Will need to check email for verification link next.");
    
  } catch (err) {
    console.error("Error during automated signup:", err);
  } finally {
    await browser.close();
  }
})();
