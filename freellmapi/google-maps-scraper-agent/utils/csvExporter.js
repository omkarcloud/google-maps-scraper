import fs from "fs";
import path from "path";
import { createObjectCsvWriter } from "csv-writer";

/**
 * Export leads to CSV file
 */
export async function exportToCSV(leads, outputPath) {
  try {
    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Define CSV headers
    const headers = [
      { id: "businessName", title: "Business Name" },
      { id: "address", title: "Address" },
      { id: "phone", title: "Phone" },
      { id: "website", title: "Website" },
      { id: "email", title: "Email" },
      { id: "rating", title: "Rating" },
      { id: "reviewCount", title: "Review Count" },
      { id: "businessType", title: "Business Type" },
      { id: "isMultiLocation", title: "Multi-Location" },
      { id: "googleMapsUrl", title: "Google Maps URL" },
      { id: "scrapedAt", title: "Scraped At" },
    ];

    // Create writer
    const csvWriter = createObjectCsvWriter({
      path: outputPath,
      header: headers,
      encoding: "utf8",
    });

    // Prepare data
    const records = leads.map((lead) => ({
      businessName: lead.businessName || "",
      address: lead.address || "",
      phone: lead.phone || "",
      website: lead.website || "",
      email: lead.email || "",
      rating: lead.rating || "N/A",
      reviewCount: lead.reviewCount || 0,
      businessType: lead.businessType || "",
      isMultiLocation: lead.isMultiLocation ? "Yes" : "No",
      googleMapsUrl: lead.googleMapsUrl || "",
      scrapedAt: lead.scrapedAt || new Date().toISOString(),
    }));

    // Write to CSV
    await csvWriter.writeRecords(records);

    console.log(
      `✅ Successfully exported ${records.length} leads to ${outputPath}`
    );
    return outputPath;
  } catch (error) {
    console.error("Error exporting to CSV:", error.message);
    throw error;
  }
}

/**
 * Export leads to JSON file
 */
export async function exportToJSON(leads, outputPath) {
  try {
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(leads, null, 2), "utf8");

    console.log(
      `✅ Successfully exported ${leads.length} leads to ${outputPath}`
    );
    return outputPath;
  } catch (error) {
    console.error("Error exporting to JSON:", error.message);
    throw error;
  }
}

export default {
  exportToCSV,
  exportToJSON,
};
