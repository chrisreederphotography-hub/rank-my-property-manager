const puppeteer = require('puppeteer');
const fs = require('fs/promises');

async function scrapeReviews() {
  console.log("Starting verified Google Reviews scrape for property managers...");
  
  let db = {};
  try {
    const rawDb = await fs.readFile('seo_directory/frontend/src/data/real_pm_database.json', 'utf8');
    db = JSON.parse(rawDb);
  } catch (err) {
    console.error("Could not find real_pm_database.json");
    return;
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  let totalUpdated = 0;

  for (const city of Object.keys(db)) {
    for (const manager of db[city]) {
      // Only scrape if it doesn't already have verified rating data
      if (manager.rating !== undefined) continue;

      const query = encodeURIComponent(`${manager.companyName} property management ${city}`);
      const searchUrl = `https://www.google.com/search?q=${query}`;
      
      try {
        await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
        
        // Wait briefly for knowledge panel to render
        await new Promise(r => setTimeout(r, 1000));
        
        const reviewData = await page.evaluate(() => {
          // Look for the standard Google Search Knowledge Panel rating block
          const ratingElement = document.querySelector('span.Aq14fc');
          const countElement = document.querySelector('span.hqzQac span');
          
          if (ratingElement && countElement) {
            return {
              rating: parseFloat(ratingElement.innerText),
              count: parseInt(countElement.innerText.replace(/[^0-9]/g, ''), 10)
            };
          }
          return null;
        });

        if (reviewData) {
          manager.rating = reviewData.rating;
          manager.reviewCount = reviewData.count;
          console.log(`[VERIFIED] ${manager.companyName} in ${city} -> ${manager.rating} stars (${manager.reviewCount} reviews)`);
          totalUpdated++;
        } else {
          console.log(`[NOT FOUND] No Google Reviews found for ${manager.companyName} in ${city}.`);
          // We mark it as null so we don't try to scrape it again next time
          manager.rating = null; 
          manager.reviewCount = null;
        }

      } catch (err) {
        console.error(`[ERROR] Failed to scrape ${manager.companyName}: ${err.message}`);
      }
      
      // Delay to prevent getting blocked by Google
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  await browser.close();
  
  // Write the updated database back
  await fs.writeFile('seo_directory/frontend/src/data/real_pm_database.json', JSON.stringify(db, null, 2));
  console.log(`Scrape complete. Successfully verified and updated ${totalUpdated} property managers with real reviews.`);
}

if (require.main === module) {
  scrapeReviews();
}
