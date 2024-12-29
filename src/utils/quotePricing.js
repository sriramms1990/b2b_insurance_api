// Base rates per coverage type (monthly)
const BASE_RATES = {
  liability: 20,
  property: 25,
  'workers-comp': 15,
  cyber: 30
};

// Multipliers based on company size (number of employees)
const EMPLOYEE_MULTIPLIERS = [
  { max: 10, multiplier: 1 },
  { max: 50, multiplier: 1.5 },
  { max: 200, multiplier: 2 },
  { max: 1000, multiplier: 3 },
  { max: Infinity, multiplier: 4 }
];

// Industry risk factors
const INDUSTRY_RISK_FACTORS = {
  technology: 1.2,
  healthcare: 1.5,
  retail: 1.0,
  manufacturing: 1.3,
  finance: 1.4,
  construction: 1.6,
  default: 1.1
};

function calculateMonthlyPremium(quoteData) {
  const {
    coverageType,
    coverageAmount,
    businessDetails: { industry, employees, revenue }
  } = quoteData;

  // Get base rate
  const baseRate = BASE_RATES[coverageType];

  // Calculate employee multiplier
  const employeeMultiplier = EMPLOYEE_MULTIPLIERS.find(
    tier => employees <= tier.max
  ).multiplier;

  // Get industry risk factor
  const industryRisk = INDUSTRY_RISK_FACTORS[industry] || INDUSTRY_RISK_FACTORS.default;

  // Calculate coverage multiplier (0.1% of coverage amount divided by 10000)
  const coverageMultiplier = (coverageAmount * 0.001) / 10000;

  // Calculate final monthly premium
  const monthlyPremium = baseRate * employeeMultiplier * industryRisk * coverageMultiplier;

  return Math.round(monthlyPremium * 100) / 100; // Round to 2 decimal places
}

module.exports = {
  calculateMonthlyPremium,
  BASE_RATES,
  EMPLOYEE_MULTIPLIERS,
  INDUSTRY_RISK_FACTORS
};