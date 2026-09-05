const fs = require('fs/promises');

async function main() {
  let db = {};
  try {
    const rawDb = await fs.readFile('seo_directory/frontend/src/data/real_pm_database.json', 'utf8');
    db = JSON.parse(rawDb);
  } catch (err) {
    console.error("No real_pm_database.json found!");
    return;
  }

  let totalRemoved = 0;

  for (const city of Object.keys(db)) {
    const managers = db[city];
    const uniqueManagers = [];
    const seenNames = new Set();
    
    // We reverse the array to prioritize the NEWEST entries (added at the end) 
    // so they are kept over the old manual entries.
    for (let i = managers.length - 1; i >= 0; i--) {
      const m = managers[i];
      // Normalize name to catch "Evernest" vs "Evernest Property Management"
      let normalizedName = m.companyName.toLowerCase().replace(/property management/g, '').trim();
      
      if (!seenNames.has(normalizedName)) {
        seenNames.add(normalizedName);
        uniqueManagers.push(m);
      } else {
        console.log(`Removed duplicate in ${city}: ${m.companyName}`);
        totalRemoved++;
      }
    }
    
    // Reverse back to original chronological order (newest at bottom)
    db[city] = uniqueManagers.reverse();
  }

  await fs.writeFile('seo_directory/frontend/src/data/real_pm_database.json', JSON.stringify(db, null, 2));
  console.log(`Deduplication complete. Removed ${totalRemoved} duplicate entries.`);
}

main();
