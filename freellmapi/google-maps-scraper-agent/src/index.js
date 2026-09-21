import GoogleMapsScraperAgent from "./scraper.js";
import config from "./config.js";

/**
 * Define search parameters for US locations
 */
const searchLocations = [
  {
    name: "New York, USA",
    coords: "40.7128,-74.0060",
  },
  {
    name: "Los Angeles, USA",
    coords: "34.0522,-118.2437",
  },
  {
    name: "Chicago, USA",
    coords: "41.8781,-87.6298",
  },
  {
    name: "Houston, USA",
    coords: "29.7604,-95.3698",
  },
  {
    name: "Phoenix, USA",
    coords: "33.4484,-112.0742",
  },
];

const searchQueries = [
  "shopping mall",
  "retail center",
  "shopping center",
  "strip mall",
  "local retail",
];

/**
 * Main execution
 */
async function main() {
  try {
    // Validate API key
    if (!config.googlePlacesApiKey) {
      throw new Error(
        "❌ GOOGLE_PLACES_API_KEY is not configured. Please set it in .env file"
      );
    }

    console.log("╔════════════════════════════════════════════════════════╗");
    console.log("║  Google Maps Scraper Agent - Lead Generation Tool     ║");
    console.log("╚════════════════════════════════════════════════════════╝\n");

    // Initialize scraper
    const scraper = new GoogleMapsScraperAgent();

    // Start scraping
    const leads = await scraper.scrapeLeads(
      searchQueries,
      searchLocations,
      config.targetRadiusMiles * 1609.34 // Convert miles to meters
    );

    // Export results
    const { csvPath, jsonPath } = await scraper.exportResults();

    // Display statistics
    const stats = scraper.getStatistics();
    console.log("\n📈 Statistics:");
    console.log(`   Total Leads: ${stats.totalLeads}`);
    console.log(`   With Email: ${stats.leadsWithEmail}`);
    console.log(`   With Website: ${stats.leadsWithWebsite}`);
    console.log(`   Multi-Location: ${stats.multiLocationCount}`);
    console.log(`   Average Rating: ${stats.averageRating}`);
    console.log(`   Average Reviews: ${stats.averageReviews}`);

    // Display sample leads
    console.log("\n🎯 Sample Leads (First 5):");
    console.log("─".repeat(60));
    scraper.leads.slice(0, 5).forEach((lead, idx) => {
      console.log(`\n${idx + 1}. ${lead.businessName}`);
      console.log(`   📍 ${lead.address}`);
      console.log(`   📞 ${lead.phone || "N/A"}`);
      console.log(`   🌐 ${lead.website || "N/A"}`);
      console.log(`   📧 ${lead.email || "N/A"}`);
      console.log(`   ⭐ ${lead.rating} (${lead.reviewCount} reviews)`);
    });

    console.log(
      "\n✅ Scraping completed successfully! Check the results folder for full export."
    );
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

main();
