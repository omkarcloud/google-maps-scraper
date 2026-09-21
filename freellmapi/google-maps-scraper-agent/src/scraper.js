import axios from "axios";
import config from "../src/config.js";
import { enrichBusinessData } from "../utils/emailExtractor.js";
import { exportToCSV, exportToJSON } from "../utils/csvExporter.js";
import path from "path";
import fs from "fs";

class GoogleMapsScraperAgent {
  constructor() {
    this.apiKey = config.googlePlacesApiKey;
    this.composioApiKey = config.composioApiKey;
    this.leads = [];
    this.scrapedPlaces = new Set();
  }

  /**
   * Search for places using Google Places API
   */
  async searchPlaces(query, location, radius = 50000) {
    try {
      const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

      const params = {
        key: this.apiKey,
        location: location,
        radius: radius,
        type: "shopping_mall", // Primary search
        keyword: query,
      };

      const response = await axios.get(url, { params });

      if (response.data.status !== "OK" && response.data.status !== "ZERO_RESULTS") {
        throw new Error(`Google Places API error: ${response.data.status}`);
      }

      return response.data.results || [];
    } catch (error) {
      console.error("Error searching places:", error.message);
      return [];
    }
  }

  /**
   * Get place details using Google Places API
   */
  async getPlaceDetails(placeId) {
    try {
      const url = "https://maps.googleapis.com/maps/api/place/details/json";

      const params = {
        key: this.apiKey,
        place_id: placeId,
        fields: [
          "name",
          "formatted_address",
          "formatted_phone_number",
          "website",
          "rating",
          "review_count",
          "types",
          "url",
          "photos",
          "opening_hours",
          "business_status",
        ].join(","),
      };

      const response = await axios.get(url, { params });

      if (response.data.status !== "OK") {
        throw new Error(
          `Place details API error: ${response.data.status}`
        );
      }

      return response.data.result;
    } catch (error) {
      console.error("Error getting place details:", error.message);
      return null;
    }
  }

  /**
   * Filter places based on criteria
   */
  filterPlaces(place) {
    // Avoid duplicates
    if (this.scrapedPlaces.has(place.place_id)) {
      return false;
    }

    // Check rating and review count
    if (!place.rating || place.rating < config.minRating) {
      return false;
    }

    if (!place.review_count || place.review_count < config.minReviewCount) {
      return false;
    }

    // Check business status
    if (place.business_status && place.business_status !== "OPERATIONAL") {
      return false;
    }

    return true;
  }

  /**
   * Check if business is multi-location
   */
  async isMultiLocationBusiness(businessName) {
    try {
      const url = "https://maps.googleapis.com/maps/api/place/textsearch/json";

      const params = {
        key: this.apiKey,
        query: businessName,
        fields: ["name", "place_id"].join(","),
      };

      const response = await axios.get(url, { params });

      return (
        response.data.results &&
        response.data.results.length >= config.multiLocationThreshold
      );
    } catch (error) {
      return false;
    }
  }

  /**
   * Normalize place data to standard format
   */
  async normalizePlaceData(place, details) {
    const businessName = place.name || details?.name || "N/A";

    return {
      businessName,
      address: place.formatted_address || details?.formatted_address || "N/A",
      phone:
        place.formatted_phone_number || details?.formatted_phone_number || "",
      website: details?.website || "",
      email: "", // Will be enriched later
      rating: place.rating || 0,
      reviewCount: place.user_ratings_total || 0,
      businessType: place.types ? place.types.join(", ") : "shopping_mall",
      isMultiLocation: await this.isMultiLocationBusiness(businessName),
      googleMapsUrl: place.url || details?.url || "",
      scrapedAt: new Date().toISOString(),
      placeId: place.place_id,
    };
  }

  /**
   * Main scraping function
   */
  async scrapeLeads(searchQueries, locations, radius = 50000) {
    console.log("🚀 Starting Google Maps Scraper Agent...\n");

    for (const location of locations) {
      for (const query of searchQueries) {
        console.log(`🔍 Searching for "${query}" in ${location.name}...`);

        // Search for places
        const places = await this.searchPlaces(query, location.coords, radius);
        console.log(`   Found ${places.length} results`);

        for (const place of places) {
          // Filter places
          if (!this.filterPlaces(place)) {
            continue;
          }

          // Mark as scraped
          this.scrapedPlaces.add(place.place_id);

          // Get detailed information
          const details = await this.getPlaceDetails(place.place_id);
          if (!details) {
            continue;
          }

          // Normalize data
          let businessData = await this.normalizePlaceData(place, details);

          // Enrich with email extraction
          businessData = await enrichBusinessData(businessData);

          // Add to leads
          this.leads.push(businessData);
          console.log(`   ✅ Added: ${businessData.businessName}`);
        }

        // Rate limiting
        await this.sleep(500);
      }
    }

    console.log(
      `\n✨ Scraping completed! Found ${this.leads.length} qualified leads.`
    );
    return this.leads;
  }

  /**
   * Rate limiting helper
   */
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Export results
   */
  async exportResults() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const csvPath = path.join(
      config.outputDir,
      `leads_${timestamp}.csv`
    );
    const jsonPath = path.join(
      config.outputDir,
      `leads_${timestamp}.json`
    );

    await exportToCSV(this.leads, csvPath);
    await exportToJSON(this.leads, jsonPath);

    console.log(`\n📊 Results exported:`);
    console.log(`   📄 CSV: ${csvPath}`);
    console.log(`   📄 JSON: ${jsonPath}`);

    return { csvPath, jsonPath };
  }

  /**
   * Get summary statistics
   */
  getStatistics() {
    const stats = {
      totalLeads: this.leads.length,
      leadsWithEmail: this.leads.filter((l) => l.email).length,
      leadsWithWebsite: this.leads.filter((l) => l.website).length,
      multiLocationCount: this.leads.filter((l) => l.isMultiLocation).length,
      averageRating:
        this.leads.length > 0
          ? (
              this.leads.reduce((sum, l) => sum + l.rating, 0) /
              this.leads.length
            ).toFixed(2)
          : 0,
      averageReviews:
        this.leads.length > 0
          ? Math.round(
              this.leads.reduce((sum, l) => sum + l.reviewCount, 0) /
                this.leads.length
            )
          : 0,
    };

    return stats;
  }
}

export default GoogleMapsScraperAgent;
