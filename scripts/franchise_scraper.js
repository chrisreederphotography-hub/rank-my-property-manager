const puppeteer = require('puppeteer');
const fs = require('fs/promises');

async function scrapeFranchiseDirectory(url, franchiseName, extractLocationsFn) {
  console.log(`Starting scrape for ${franchiseName} at ${url}...`);
  
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // Navigate and wait for DOM to load
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    // Evaluate the custom extraction function in the page context
    const rawLocations = await page.evaluate(extractLocationsFn);
    
    // Format them into our standard DB schema
    const formattedData = rawLocations.map(loc => ({
      companyName: franchiseName,
      contactPhone: loc.phone || "N/A",
      website: loc.website || url,
      city: loc.city,
      state: loc.state,
      feeStructure: "Contact for pricing",
      minUnitRequirement: null,
      isFeatured: true
    }));
    
    console.log(`Successfully extracted ${formattedData.length} verified locations for ${franchiseName}.`);
    return formattedData;
    
  } catch (error) {
    console.error(`Error scraping ${franchiseName}:`, error.message);
    return [];
  } finally {
    await browser.close();
  }
}

async function main() {
  // Example implementation for a hypothetical directory
  // In production, we'll write specific extractLocationsFn for each franchise's unique DOM
  const exampleExtractFn = () => {
    // This is injected into the browser. Assume the site has <div class="location-card">
    const cards = document.querySelectorAll('.location-card');
    const results = [];
    
    cards.forEach(card => {
      const cityState = card.querySelector('.city-state')?.innerText.split(',');
      if (cityState && cityState.length === 2) {
        results.push({
          city: cityState[0].trim(),
          state: cityState[1].trim(),
          phone: card.querySelector('.phone')?.innerText.trim(),
          website: card.querySelector('a.website-link')?.href
        });
      }
    });
    
    return results;
  };

  const data = await scrapeFranchiseDirectory(
    'https://example-franchise.com/locations', 
    'Example Property Management', 
    exampleExtractFn
  );
  
  if (data.length > 0) {
    await fs.writeFile('franchise_locations.json', JSON.stringify(data, null, 2));
    console.log('Saved to franchise_locations.json');
  } else {
    console.log('No data extracted to save.');
  }
}

if (require.main === module) {
  main();
}

module.exports = { scrapeFranchiseDirectory };
