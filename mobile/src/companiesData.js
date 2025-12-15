/**
 * Companies dataset loader
 * Loads top 1000 companies by number of employees
 * Source: data/companies_top_1000.json (generated from companiesmarketcap.com data)
 */

import companiesDataset from "../../data/companies_top_1000.json";

/**
 * Get all companies from the dataset
 * @returns {Array} Array of company objects with id, name, country, industry, employees
 */
export function getAllCompanies() {
  return companiesDataset.companies.map((c) => ({
    id: c.company_id,
    name: c.company_name,
    country: c.country,
    industry: c.industry,
    employees: c.number_of_employees,
    ranking: c.ranking_by_employees,
  }));
}

/**
 * Get company by ID
 * @param {string} companyId - The company_id
 * @returns {object|null} Company object or null
 */
export function getCompanyById(companyId) {
  const company = companiesDataset.companies.find((c) => c.company_id === companyId);
  if (!company) return null;
  
  return {
    id: company.company_id,
    name: company.company_name,
    country: company.country,
    industry: company.industry,
    employees: company.number_of_employees,
    ranking: company.ranking_by_employees,
  };
}

/**
 * Get company by name (case-insensitive partial match)
 * @param {string} query - Search query
 * @returns {Array} Matching companies
 */
export function searchCompanies(query) {
  if (!query || !query.trim()) return getAllCompanies();
  
  const q = query.toLowerCase().trim();
  return getAllCompanies().filter((c) =>
    c.name.toLowerCase().includes(q) ||
    c.industry.toLowerCase().includes(q) ||
    c.country.toLowerCase().includes(q)
  );
}

/**
 * Get top N companies by employee count
 * @param {number} limit - Number of companies to return
 * @returns {Array} Top companies
 */
export function getTopCompanies(limit = 100) {
  return getAllCompanies()
    .sort((a, b) => a.ranking - b.ranking)
    .slice(0, limit);
}

/**
 * Get companies by country
 * @param {string} country - Country name
 * @returns {Array} Companies in that country
 */
export function getCompaniesByCountry(country) {
  return getAllCompanies().filter((c) => c.country === country);
}

/**
 * Get companies by industry
 * @param {string} industry - Industry name
 * @returns {Array} Companies in that industry
 */
export function getCompaniesByIndustry(industry) {
  return getAllCompanies().filter((c) => c.industry === industry);
}

/**
 * Get dataset metadata
 * @returns {object} Metadata about the dataset
 */
export function getDatasetMeta() {
  return companiesDataset.meta;
}

