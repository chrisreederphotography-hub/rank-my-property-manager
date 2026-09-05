import puppeteer from 'puppeteer';
import fs from 'fs/promises';

const CITIES = [
  {
    "name": "Alpharetta",
    "state": "GA"
  },
  {
    "name": "Marietta",
    "state": "GA"
  },
  {
    "name": "Roswell",
    "state": "GA"
  },
  {
    "name": "Sandy Springs",
    "state": "GA"
  },
  {
    "name": "Johns Creek",
    "state": "GA"
  },
  {
    "name": "Smyrna",
    "state": "GA"
  },
  {
    "name": "Dunwoody",
    "state": "GA"
  },
  {
    "name": "Brookhaven",
    "state": "GA"
  },
  {
    "name": "Peachtree City",
    "state": "GA"
  },
  {
    "name": "Gainesville",
    "state": "GA"
  },
  {
    "name": "East Point",
    "state": "GA"
  },
  {
    "name": "Milton",
    "state": "GA"
  },
  {
    "name": "Newnan",
    "state": "GA"
  },
  {
    "name": "Woodstock",
    "state": "GA"
  },
  {
    "name": "Canton",
    "state": "GA"
  },
  {
    "name": "Tucker",
    "state": "GA"
  },
  {
    "name": "Duluth",
    "state": "GA"
  },
  {
    "name": "Suwanee",
    "state": "GA"
  },
  {
    "name": "Decatur",
    "state": "GA"
  },
  {
    "name": "Kennesaw",
    "state": "GA"
  },
  {
    "name": "Plano",
    "state": "TX"
  },
  {
    "name": "Irving",
    "state": "TX"
  },
  {
    "name": "Garland",
    "state": "TX"
  },
  {
    "name": "McKinney",
    "state": "TX"
  },
  {
    "name": "Frisco",
    "state": "TX"
  },
  {
    "name": "Grand Prairie",
    "state": "TX"
  },
  {
    "name": "Mesquite",
    "state": "TX"
  },
  {
    "name": "Carrollton",
    "state": "TX"
  },
  {
    "name": "Denton",
    "state": "TX"
  },
  {
    "name": "Richardson",
    "state": "TX"
  },
  {
    "name": "Lewisville",
    "state": "TX"
  },
  {
    "name": "Allen",
    "state": "TX"
  },
  {
    "name": "Flower Mound",
    "state": "TX"
  },
  {
    "name": "Rowlett",
    "state": "TX"
  },
  {
    "name": "Euless",
    "state": "TX"
  },
  {
    "name": "DeSoto",
    "state": "TX"
  },
  {
    "name": "Grapevine",
    "state": "TX"
  },
  {
    "name": "Wylie",
    "state": "TX"
  },
  {
    "name": "Coppell",
    "state": "TX"
  },
  {
    "name": "Duncanville",
    "state": "TX"
  },
  {
    "name": "Aurora",
    "state": "IL"
  },
  {
    "name": "Joliet",
    "state": "IL"
  },
  {
    "name": "Naperville",
    "state": "IL"
  },
  {
    "name": "Elgin",
    "state": "IL"
  },
  {
    "name": "Waukegan",
    "state": "IL"
  },
  {
    "name": "Cicero",
    "state": "IL"
  },
  {
    "name": "Arlington Heights",
    "state": "IL"
  },
  {
    "name": "Evanston",
    "state": "IL"
  },
  {
    "name": "Schaumburg",
    "state": "IL"
  },
  {
    "name": "Bolingbrook",
    "state": "IL"
  },
  {
    "name": "Palatine",
    "state": "IL"
  },
  {
    "name": "Skokie",
    "state": "IL"
  },
  {
    "name": "Des Plaines",
    "state": "IL"
  },
  {
    "name": "Orland Park",
    "state": "IL"
  },
  {
    "name": "Tinley Park",
    "state": "IL"
  },
  {
    "name": "Oak Lawn",
    "state": "IL"
  },
  {
    "name": "Berwyn",
    "state": "IL"
  },
  {
    "name": "Mount Prospect",
    "state": "IL"
  },
  {
    "name": "Wheaton",
    "state": "IL"
  },
  {
    "name": "Normal",
    "state": "IL"
  },
  {
    "name": "Long Beach",
    "state": "CA"
  },
  {
    "name": "Anaheim",
    "state": "CA"
  },
  {
    "name": "Santa Ana",
    "state": "CA"
  },
  {
    "name": "Irvine",
    "state": "CA"
  },
  {
    "name": "Glendale",
    "state": "CA"
  },
  {
    "name": "Huntington Beach",
    "state": "CA"
  },
  {
    "name": "Santa Clarita",
    "state": "CA"
  },
  {
    "name": "Garden Grove",
    "state": "CA"
  },
  {
    "name": "Pomona",
    "state": "CA"
  },
  {
    "name": "Palmdale",
    "state": "CA"
  },
  {
    "name": "Pasadena",
    "state": "CA"
  },
  {
    "name": "Torrance",
    "state": "CA"
  },
  {
    "name": "Lancaster",
    "state": "CA"
  },
  {
    "name": "Orange",
    "state": "CA"
  },
  {
    "name": "Fullerton",
    "state": "CA"
  },
  {
    "name": "El Monte",
    "state": "CA"
  },
  {
    "name": "Downey",
    "state": "CA"
  },
  {
    "name": "Costa Mesa",
    "state": "CA"
  },
  {
    "name": "Inglewood",
    "state": "CA"
  },
  {
    "name": "West Covina",
    "state": "CA"
  },
  {
    "name": "Yonkers",
    "state": "NY"
  },
  {
    "name": "New Rochelle",
    "state": "NY"
  },
  {
    "name": "Mount Vernon",
    "state": "NY"
  },
  {
    "name": "White Plains",
    "state": "NY"
  },
  {
    "name": "Hempstead",
    "state": "NY"
  },
  {
    "name": "Freeport",
    "state": "NY"
  },
  {
    "name": "Valley Stream",
    "state": "NY"
  },
  {
    "name": "Long Beach",
    "state": "NY"
  },
  {
    "name": "Glen Cove",
    "state": "NY"
  },
  {
    "name": "Rye",
    "state": "NY"
  },
  {
    "name": "Peekskill",
    "state": "NY"
  },
  {
    "name": "Ossining",
    "state": "NY"
  },
  {
    "name": "Port Chester",
    "state": "NY"
  },
  {
    "name": "Harrison",
    "state": "NY"
  },
  {
    "name": "Mamaroneck",
    "state": "NY"
  },
  {
    "name": "Scarsdale",
    "state": "NY"
  },
  {
    "name": "Tarrytown",
    "state": "NY"
  },
  {
    "name": "Dobbs Ferry",
    "state": "NY"
  },
  {
    "name": "Bronxville",
    "state": "NY"
  },
  {
    "name": "Tuckahoe",
    "state": "NY"
  }
];

async function scrapeRealGoogleReviews(city, state) {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
    
    const query = encodeURIComponent(`Property Management ${city} ${state}`);
    const url = `https://www.google.com/maps/search/${query}`;
    console.log(`Navigating to: ${url}`);
    
    try {
        await page.goto(url, { waitUntil: 'networkidle2' });
        
        // Wait a little bit for the dynamic content to load
        await new Promise(r => setTimeout(r, 3000));
        
        const businesses = await page.evaluate(() => {
            const results = [];
            // Find all elements that look like business links
            const items = document.querySelectorAll('a[href*="/maps/place/"]');
            items.forEach(item => {
                const name = item.getAttribute('aria-label');
                if (!name) return;
                
                let container = item.parentElement;
                let foundRating = false;
                
                // Search upwards in the DOM to find the review string e.g. "4.8(123)" or "4.8 (123)"
                for (let i = 0; i < 6; i++) {
                    if (!container) break;
                    const text = container.innerText;
                    if (text) {
                        const match = text.match(/([0-9]\.[0-9])\s*\(([0-9,]+)\)/);
                        if (match) {
                            results.push({
                                companyName: name,
                                rating: parseFloat(match[1]),
                                reviewCount: parseInt(match[2].replace(/,/g, '')),
                            });
                            foundRating = true;
                            break;
                        }
                    }
                    container = container.parentElement;
                }
                
                // If no rating found, still add them but with 0 reviews
                if (!foundRating) {
                     results.push({
                        companyName: name,
                        rating: 0,
                        reviewCount: 0,
                     });
                }
            });
            
            // Deduplicate
            const unique = [];
            const seen = new Set();
            for (const r of results) {
                if (!seen.has(r.companyName)) {
                    seen.add(r.companyName);
                    unique.push(r);
                }
            }
            // Sort by rating and review count to simulate our "mathematical ranking"
            unique.sort((a, b) => {
                if (b.rating === a.rating) {
                    return b.reviewCount - a.reviewCount;
                }
                return b.rating - a.rating;
            });
            return unique.slice(0, 5); // top 5
        });
        
        await browser.close();
        return businesses.map(b => ({ ...b, city, state, isFeatured: false }));
        
    } catch(err) {
        console.error("Error:", err.message);
        await browser.close();
        return [];
    }
}

async function main() {
  console.log("Executing Native Zero-Cost Google Maps Scraper...");
  let allData = [];
  for (const c of CITIES) {
    const data = await scrapeRealGoogleReviews(c.name, c.state);
    console.log(`Extracted ${data.length} real businesses with Google Reviews for ${c.name}.`);
    allData = allData.concat(data);
    await new Promise(r => setTimeout(r, 2000));
  }
  
  await fs.writeFile('zero_cost_database.json', JSON.stringify(allData, null, 2));
  console.log(`Done. Saved ${allData.length} records.`);
}

main();
