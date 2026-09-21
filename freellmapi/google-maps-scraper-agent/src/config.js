import dotenv from "dotenv";

dotenv.config();

export const config = {
  // Google Places API
  googlePlacesApiKey: process.env.GOOGLE_PLACES_API_KEY,

  // Composio API
  composioApiKey: process.env.COMPOSIO_API_KEY,

  // Scraping Configuration
  targetCountry: process.env.TARGET_COUNTRY || "United States",
  targetRadiusMiles: parseInt(process.env.TARGET_RADIUS_MILES || "50"),
  minReviewCount: parseInt(process.env.MIN_REVIEW_COUNT || "10"),
  minRating: parseFloat(process.env.MIN_RATING || "3.5"),
  multiLocationThreshold: parseInt(
    process.env.MULTI_LOCATION_THRESHOLD || "2"
  ),

  // Output Configuration
  outputDir: process.env.OUTPUT_DIR || "./results",
  csvFilename: process.env.CSV_FILENAME || "leads_export.csv",

  // API Rate Limiting
  apiRateLimit: parseInt(process.env.API_RATE_LIMIT || "100"),
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "60000"),

  // Proxy Configuration
  useProxy: process.env.USE_PROXY === "true",
  proxyUrl: process.env.PROXY_URL,
};

export default config;
