const seoData = require('./src/data/seo_city_database.json');
const cityParam = "austin";
const pageData = seoData.find(d => d.city?.toLowerCase().replace(/\s+/g, '-') === cityParam);
console.log("pageData:", pageData);
