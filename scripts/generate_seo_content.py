import json

with open('zero_cost_database.json', 'r') as f:
    pms = json.load(f)

suburbs = {}
for pm in pms:
    city = pm.get('city')
    state = pm.get('state')
    if not city or not state:
        continue
    key = f"{city}|{state}"
    if key not in suburbs:
        suburbs[key] = []
    suburbs[key].append(pm)

seo_data = []

for key, pm_list in suburbs.items():
    city, state = key.split('|')
    total_pms = len(pm_list)
    valid_ratings = [pm['rating'] for pm in pm_list if pm['rating'] > 0]
    avg_rating = sum(valid_ratings) / len(valid_ratings) if valid_ratings else 0
    top_pm = max(pm_list, key=lambda x: (x['rating'], x['reviewCount'])) if valid_ratings else pm_list[0]
    
    # Hub-and-Spoke logic: identify if this is a hub city (top 5) or a spoke (suburb)
    is_hub = total_pms > 20 # Just a heuristic for the text
    
    intro = (
        f"Looking for the best property management in {city}, {state}? Our verified directory analyzes {total_pms} local property managers serving the {city} area. "
        f"Based on real Google Reviews, the average property manager rating in {city} is {avg_rating:.1f} stars. "
        f"Top-rated providers like {top_pm['companyName']} are leading the market in tenant placement and maintenance coordination. "
        f"Whether you own a single-family home or a multi-unit complex in {state}, comparing local fees and reviews is critical to protecting your real estate investment."
    )
    
    seo_data.append({
        "city": city,
        "state": state,
        "meta_title": f"Best Property Management in {city}, {state} | RankMyPropertyManager",
        "h1": f"Top-Rated Property Management Companies in {city}, {state}",
        "intro_paragraph": intro,
        "stats": {
            "total_pms": total_pms,
            "average_rating": round(avg_rating, 1),
            "top_pm_name": top_pm['companyName']
        }
    })

with open('../frontend/src/data/seo_city_database.json', 'w') as f:
    json.dump(seo_data, f, indent=2)

print(f"Generated SEO data for {len(seo_data)} suburbs.")
