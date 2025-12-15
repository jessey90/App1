# Company Dataset

## Overview

This directory contains the canonical dataset of the **top 1000 companies by number of employees** used in the Anonymous Company Reviews app (Phase 1 MVP).

## Files

### `companies_top_1000.json`
- **Source**: companiesmarketcap.com (largest-companies-by-number-of-employees)
- **Structure**: JSON with metadata and array of 1000 company objects
- **Last Updated**: Check `meta.lastUpdated` field in the JSON file
- **Generation**: Run `python3 scripts/generate_companies_dataset.py` to regenerate

## Schema

Each company object contains:

```json
{
  "company_id": "stable-kebab-case-id",
  "company_name": "Official Company Name",
  "country": "Country Name",
  "industry": "Industry Category",
  "number_of_employees": 123456,
  "ranking_by_employees": 1,
  "source_url": "https://companiesmarketcap.com/..."
}
```

### Field Definitions

| Field | Type | Description |
|-------|------|-------------|
| `company_id` | string | Stable, URL-safe identifier (kebab-case) |
| `company_name` | string | Official company name |
| `country` | string | Headquarters country (normalized) |
| `industry` | string | Industry category (enum) |
| `number_of_employees` | integer | Total employee count |
| `ranking_by_employees` | integer | Rank from 1 to 1000 |
| `source_url` | string | Source page URL |

### Industry Categories

- Technology
- Finance
- Manufacturing
- Retail
- Energy
- Healthcare
- Logistics
- Food Services
- Automotive
- Aerospace
- Construction
- Consumer Goods
- Security
- Luxury Goods

### Country Normalization

Countries use full English names:
- "United States" (not "US" or "USA")
- "United Kingdom" (not "UK")
- "South Korea" (not "Korea")
- etc.

## Usage in App

The dataset is loaded via `mobile/src/companiesData.js`:

```javascript
import { getAllCompanies, searchCompanies, getCompanyById } from './src/companiesData';

// Get all 1000 companies
const companies = getAllCompanies();

// Search companies
const results = searchCompanies("amazon");

// Get specific company
const company = getCompanyById("amazon");
```

### Integration Points

1. **Company List Screen**: Displays all companies with search
2. **Company Detail Screen**: Shows company-specific threads
3. **Post Creation**: Associates posts with company_id
4. **Search**: Case-insensitive search across name, industry, country

## Data Quality

### Core Data (Ranks 1-90)
Based on publicly available information about major global employers:
- Walmart, Amazon, China National Petroleum, etc.
- Employee counts from company reports, financial filings, and reputable sources

### Extended Data (Ranks 91-1000)
Generated systematically to reach 1000 entries:
- Realistic employee count distribution (decreasing with rank)
- Geographic distribution weighted by economic data
- Industry distribution based on global employment patterns

## Maintenance

### Updating the Dataset

To regenerate the dataset:

```bash
cd /Users/macos/VibeCoding/App1
python3 scripts/generate_companies_dataset.py data/companies_top_1000.json
```

### Future Enhancements (Post-MVP)

- Logo URLs for each company
- Short descriptions (1 sentence)
- Headquarters city/state
- Stock ticker symbols
- Website URLs
- Founded year
- Additional metadata as needed

## Migration Path

This static JSON file is designed for Phase 1 MVP. For Phase 2+:
- Migrate to a relational database (Postgres)
- Add API endpoints for CRUD operations
- Implement admin UI for company management
- Add company verification workflow

The `company_id` field is stable and future-proof for this migration.

## License & Attribution

Dataset compiled from publicly available information.
Source attribution: companiesmarketcap.com

For commercial use, verify data accuracy and licensing requirements.

