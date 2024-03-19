import { useState } from 'react'
import { EmptyScraper } from '../Empty/Empty'
import MarkdownComponent from '../MarkdownComponent/MarkdownComponent'
import ScraperSelector from '../ScraperSelector/ScraperSelector'

// todos: write it
function createApiREADME(baseUrl: string, scraperType: string): string {
  
  return "# Coming Soon"
  return `
  # ${scraperType} API Documentation
  
  Welcome to the ${scraperType} API! This document provides essential information about how to interact with the API to leverage its functionalities.
  
  ## Base URL
  
  The base URL for all API endpoints is:
  \`\`\`
  ${baseUrl}
  \`\`\`
  
  ## Authentication
  
  To use the ${scraperType} API, you may need to authenticate your requests. Please refer to the authentication section for details on how to obtain and use your API keys.
  
  ## Endpoints
  
  Below is a list of available endpoints within the ${scraperType} API:
  
  ### Endpoint 1: /example-endpoint
  
  - **Description**: Brief description of the endpoint.
  - **Method**: \`GET\` or \`POST\`
  - **Parameters**: List of required or optional parameters.
  - **Response**: Expected JSON response format.
  
  ## Rate Limits
  
  Please note that the ${scraperType} API has rate limits to ensure fair usage. Refer to the rate limits section for more details.
  
  ## Examples
  
  Here are some example requests to get you started:
  
  \`\`\`bash
  curl -X GET "${baseUrl}/example-endpoint" -H "Authorization: Bearer YOUR_API_KEY"
  \`\`\`
  
  ## Support
  
  If you have any questions or need further assistance, please reach out to our support team.
  
  Thank you for using our API!
  `
}

function getBaseUrl(): string {
  // Check if window is defined
  if (typeof window === 'undefined') {
    return ''
  }

  // Extract the hostname from the current URL
  const hostname = window.location.hostname

  // Check for localhost addresses and return '' if matched
  if (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '0.0.0.0'
  ) {
    return ''
  }

  // Return the current page URL enclosed in double quotes if none of the above conditions are met
  return `"${window.location.origin}"`
}

const ContentContainer = ({ selectedScraper }) => {
  const baseUrl = getBaseUrl()
  const readmeContent = createApiREADME(baseUrl, selectedScraper.scraper_name)

  return <MarkdownComponent content={readmeContent} />
}

const ScraperContainer = ({ scrapers }) => {
  const [selectedScraper, setSelectedScraper] = useState(scrapers[0])

  return (
    <div>
      {scrapers.length <= 1 ? null : (
        <ScraperSelector
          scrapers={scrapers}
          selectedScraper={selectedScraper}
          onSelectScraper={setSelectedScraper}
        />
      )}
      <ContentContainer selectedScraper={selectedScraper} />
    </div>
  )
}

const ApiIntegrationComponent = ({ scrapers }) => {
  if (!scrapers || scrapers.length === 0) {
    return <EmptyScraper />
  }

  return <ScraperContainer scrapers={scrapers} />
}

export default ApiIntegrationComponent
