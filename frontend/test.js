const realPmData = require('./src/data/real_pm_database.json');
const seoData = require('./src/data/seo_city_database.json');

const pageData = seoData.find(d => d.city === 'Austin');
const citySlug = pageData.city.toLowerCase().replace(/\s+/g, '-');
const realManagers = realPmData[citySlug] || [];
console.log('citySlug:', citySlug);
console.log('length:', realManagers.length);
