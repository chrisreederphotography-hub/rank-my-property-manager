import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  try {
    console.log("Navigating to live site (Austin)...");
    await page.goto('https://rankmypropertymanager.com/austin', { waitUntil: 'networkidle2' });
    
    console.log("Looking for 'Get a Free Quote' button...");
    const buttons = await page.$$('button');
    let targetButton = null;
    
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text && text.includes('Get a Free Quote')) {
        targetButton = btn;
        break;
      }
    }
    
    if (targetButton) {
      console.log("Clicking button to open modal...");
      await targetButton.click();
      
      console.log("Waiting for modal to render...");
      await page.waitForSelector('input[name="name"]');
      
      console.log("Filling out form data...");
      await page.type('input[name="name"]', 'Chris Test (Automated)');
      await page.type('input[name="email"]', 'chris@thehicompany.co');
      await page.type('input[name="phone"]', '555-555-5555');
      await page.type('input[name="units"]', '12');
      
      console.log("Submitting form...");
      await page.click('button[type="submit"]');
      
      console.log("Waiting for success message...");
      await page.waitForFunction(
        'document.querySelector("body").innerText.includes("Request Sent!")'
      );
      
      console.log("SUCCESS: End-to-end test passed. Firebase captured the lead.");
    } else {
      console.log("ERROR: Button not found");
    }
  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    await browser.close();
  }
})();
