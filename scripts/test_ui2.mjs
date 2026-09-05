import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Capture browser console logs
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  
  try {
    await page.goto('https://rankmypropertymanager.com/austin', { waitUntil: 'networkidle2' });
    
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
      await targetButton.click();
      await page.waitForSelector('input[name="name"]');
      
      await page.type('input[name="name"]', 'Chris Test (Automated)');
      await page.type('input[name="email"]', 'chris@thehicompany.co');
      await page.type('input[name="phone"]', '555-555-5555');
      await page.type('input[name="units"]', '12');
      
      await page.click('button[type="submit"]');
      
      // Wait a few seconds to let errors log
      await new Promise(r => setTimeout(r, 5000));
      
    }
  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    await browser.close();
  }
})();
