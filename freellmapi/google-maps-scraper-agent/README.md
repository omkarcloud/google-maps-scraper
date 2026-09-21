# 🗺️ Google Maps Scraper Agent

Ek powerful lead generation tool jo Google Places API aur Composio ka use karke shopping malls aur retail centers se qualified leads scrape karta hai.

## 📋 Features

✅ Google Places API integration
✅ Multi-location business detection
✅ Email extraction from websites
✅ Business rating & review filtering
✅ CSV/JSON export
✅ Rate limiting & error handling
✅ US-based location support

## 🚀 Quick Start

### 1. Prerequisites

- Node.js (v16+)
- Google Places API Key
- Composio API Key (optional)

### 2. Installation

```bash
cd freellmapi/google-maps-scraper-agent

# Install dependencies
npm install
```

### 3. Configuration

Copy `.env.example` to `.env` and fill in your API keys:

```bash
cp .env.example .env
```

Edit `.env`:
```env
GOOGLE_PLACES_API_KEY=your_api_key_here
COMPOSIO_API_KEY=your_composio_key_here
TARGET_COUNTRY=United States
TARGET_RADIUS_MILES=50
MIN_REVIEW_COUNT=10
MIN_RATING=3.5
MULTI_LOCATION_THRESHOLD=2
```

### 4. Run Scraper

```bash
npm start
```

Or:
```bash
npm run scrape
```

## 🔧 Configuration Details

| Parameter | Description | Default |
|-----------|-------------|---------|
| `TARGET_RADIUS_MILES` | Search radius in miles | 50 |
| `MIN_REVIEW_COUNT` | Minimum reviews required | 10 |
| `MIN_RATING` | Minimum rating (0-5) | 3.5 |
| `MULTI_LOCATION_THRESHOLD` | Locations to consider multi-location | 2 |

## 📊 Output Format

Results are exported as:
- **CSV**: `results/leads_TIMESTAMP.csv`
- **JSON**: `results/leads_TIMESTAMP.json`

### CSV Columns:
```
Business Name | Address | Phone | Website | Email | Rating | Review Count | Business Type | Multi-Location | Google Maps URL | Scraped At
```

## 🎯 Search Criteria

### Locations Covered:
- New York
- Los Angeles
- Chicago
- Houston
- Phoenix

### Search Queries:
- Shopping mall
- Retail center
- Shopping center
- Strip mall
- Local retail

### Filters Applied:
- ✅ Rating >= 3.5
- ✅ Reviews >= 10
- ✅ Operational status
- ✅ Unique results only

## 💡 How to Add Custom Locations

Edit `src/index.js`:

```javascript
const searchLocations = [
  {
    name: "Denver, USA",
    coords: "39.7392,-104.9903",
  },
  // Add more locations...
];
```

## 🔑 Getting API Keys

### Google Places API:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project
3. Enable "Places API"
4. Create API key from credentials
5. Add to `.env`

### Composio API:
1. Sign up at [Composio](https://composio.dev/)
2. Get your API key from dashboard
3. Add to `.env`

## 📈 Example Output

```
Google Maps Scraper Agent - Lead Generation Tool

🔍 Searching for "shopping mall" in New York, USA...
   Found 45 results
   ✅ Added: Westchester Mall
   ✅ Added: Galleria Shopping Center
   
✨ Scraping completed! Found 127 qualified leads.

📊 Statistics:
   Total Leads: 127
   With Email: 45
   With Website: 98
   Multi-Location: 23
   Average Rating: 4.2
   Average Reviews: 28
```

## ⚠️ Important Notes

1. **Rate Limiting**: Google Places API has rate limits. Script respects these.
2. **Cost**: Each API call may incur charges. Monitor your API usage.
3. **Terms of Service**: Ensure compliance with Google's Terms of Service.
4. **Email Extraction**: Some websites may not have extractable emails.

## 🛠️ Development

### Watch mode:
```bash
npm run dev
```

### Dependencies:
- `composio-core` - Composio integration
- `axios` - HTTP client
- `csv-writer` - CSV export
- `cheerio` - Web scraping
- `dotenv` - Environment variables

## 📝 Project Structure

```
google-maps-scraper-agent/
├── src/
│   ├── index.js           # Main entry point
│   ├── scraper.js         # Core scraper logic
│   └── config.js          # Configuration
├── utils/
│   ├── emailExtractor.js  # Email extraction
│   └── csvExporter.js     # Export functionality
├── data/                  # Sample data
├── results/               # Output folder
├── package.json
├── .env.example
└── README.md
```

## 🐛 Troubleshooting

### "Invalid API Key"
- Verify API key in `.env`
- Check API key has Places API enabled

### "ZERO_RESULTS"
- Adjust search radius
- Modify search queries
- Try different locations

### "Too many requests"
- Wait before running again
- Check Google Cloud Console for quota

## 📞 Support

For issues or questions:
1. Check `.env` configuration
2. Review API key permissions
3. Check console logs for detailed errors
4. Verify internet connection

## 📄 License

MIT

---

Made with ❤️ using Google Places API & Composio
