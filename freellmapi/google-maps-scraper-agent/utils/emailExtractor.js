import axios from "axios";
import cheerio from "cheerio";

/**
 * Extract email from website
 */
export async function extractEmailFromWebsite(websiteUrl) {
  try {
    if (!websiteUrl) return null;

    const response = await axios.get(websiteUrl, {
      timeout: 5000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    const $ = cheerio.load(response.data);

    // Look for email in common locations
    let email = null;

    // Check mailto links
    const mailtoLink = $('a[href^="mailto:"]').attr("href");
    if (mailtoLink) {
      email = mailtoLink.replace("mailto:", "").split("?")[0];
      return email;
    }

    // Check text content for email patterns
    const emailRegex =
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const bodyText = $("body").text();
    const matches = bodyText.match(emailRegex);

    if (matches && matches.length > 0) {
      // Filter out common false positives
      email = matches.find(
        (e) =>
          !e.includes("noreply") &&
          !e.includes("no-reply") &&
          !e.includes("example.com")
      );
      return email || null;
    }

    // Check in specific sections
    const contactSection = $(
      'section[class*="contact"], div[class*="contact"], footer'
    ).text();
    const contactMatches = contactSection.match(emailRegex);

    if (contactMatches && contactMatches.length > 0) {
      return contactMatches[0];
    }

    return null;
  } catch (error) {
    console.error(`Error extracting email from ${websiteUrl}:`, error.message);
    return null;
  }
}

/**
 * Validate email format
 */
export function isValidEmail(email) {
  if (!email) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Enrich business data with email
 */
export async function enrichBusinessData(business) {
  try {
    const enriched = { ...business };

    // Extract email from website if available
    if (business.website) {
      const email = await extractEmailFromWebsite(business.website);
      if (email && isValidEmail(email)) {
        enriched.email = email;
      }
    }

    return enriched;
  } catch (error) {
    console.error("Error enriching business data:", error.message);
    return business;
  }
}

export default {
  extractEmailFromWebsite,
  isValidEmail,
  enrichBusinessData,
};
