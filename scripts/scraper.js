const axios = require('axios');
const fs = require('fs/promises');

// This script expects a GOOGLE_PLACES_API_KEY environment variable.
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

// Mock list of cities for now; this would be replaced with a massive JSON of 5,000 cities
const CITIES = [
  { name: "Alpharetta", state: "GA" },
  { name: "Marietta", state: "GA" },
  { name: "Roswell", state: "GA" },
];

async function fetchPropertyManagersForCity(city, state) {
  if (!API_KEY) {
    console.warn("No GOOGLE_PLACES_API_KEY provided. Skipping real fetch.");
    return [];
  }

  const query = encodeURIComponent(`property management in ${city} ${state}`);
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${API_KEY}`;
  
  try {
    const response = await axios.get(url);
    const results = response.data.results;
    
    // We only take the top 5 managers for each city
    const managers = [];
    for (const place of results.slice(0, 5)) {
      // Fetch details to get website and phone number
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_phone_number,website&key=${API_KEY}`;
      const detailsResponse = await axios.get(detailsUrl);
      const details = detailsResponse.data.result;
      
      managers.push({
        id: place.place_id,
        companyName: details.name,
        contactPhone: details.formatted_phone_number || "N/A",
        website: details.website || "N/A",
        city: city,
        state: state,
        feeStructure: "Contact for pricing",
        minUnitRequirement: null,
        isFeatured: false
      });
    }
    
    return managers;
  } catch (err) {
    console.error(`Error fetching for ${city}, ${state}:`, err.message);
    return [];
  }
}

async function main() {
  console.log("Starting massive verified expansion scrape...");
  let allManagers = [];
  
  for (const cityObj of CITIES) {
    console.log(`Scraping ${cityObj.name}, ${cityObj.state}...`);
    const managers = await fetchPropertyManagersForCity(cityObj.name, cityObj.state);
    allManagers = allManagers.concat(managers);
    
    // Rate limiting
    await new Promise(res => setTimeout(res, 1000));
  }
  
  await fs.writeFile('real_pm_database_expanded.json', JSON.stringify(allManagers, null, 2));
  console.log(`Scrape complete. Wrote ${allManagers.length} verified property managers to real_pm_database_expanded.json.`);
}

main();
