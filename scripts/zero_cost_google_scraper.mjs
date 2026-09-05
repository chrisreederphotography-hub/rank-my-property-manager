import puppeteer from 'puppeteer';
import fs from 'fs/promises';

const CITIES = [
  { name: "Alpharetta", state: "GA" },
  { name: "Marietta", state: "GA" }
];

async function scrapeGoogleLocal(city, state) {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
  
  const results = [];
  try {
    const query = `Property Management ${city}, ${state}`;
    console.log(`Searching Google for: ${query}`);
    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}&hl=en`, { waitUntil: 'networkidle2' });
    
    // Extract Local Pack (Google Maps 3-pack on search results)
    const localBusinesses = await page.evaluate((city, state) => {
      const places = [];
      // Google local pack items usually have role="heading" inside a specific container, or we can look for star ratings
      const elements = document.querySelectorAll('div[data-async-context] > div');
      
      // Let's try a broader approach: find any element that looks like a business name with a rating
      const ratingSpans = document.querySelectorAll('span[aria-label*="stars"]');
      
      ratingSpans.forEach(span => {
        try {
          // Navigate up to find the container
          let container = span.closest('div');
          // This is a naive extraction for the sake of the zero-cost proof of concept
          const text = container.innerText;
          if (text && text.includes('Property')) {
            places.push({
              rawText: text,
              city: city,
              state: state
            });
          }
        } catch (e) {}
      });
      return places;
    }, city, state);

    console.log(`Extracted raw data for ${city}:`, localBusinesses.length, `items.`);
    results.push(...localBusinesses);

  } catch (error) {
    console.error(`Error scraping ${city}:`, error.message);
  } finally {
    await browser.close();
  }
  return results;
}

async function main() {
  console.log("Executing Zero-Cost Google Scraper...");
  let allData = [];
  for (const c of CITIES) {
    const data = await scrapeGoogleLocal(c.name, c.state);
    allData = allData.concat(data);
    await new Promise(r => setTimeout(r, 2000)); // sleep to avoid immediate block
  }
  
  await fs.writeFile('zero_cost_test_results.json', JSON.stringify(allData, null, 2));
  console.log("Done.");
}

main();
