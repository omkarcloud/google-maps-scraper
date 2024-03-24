import Links from '../utils/data/links'

function generateSiteMap() {
  function wrapInPath(ls) {
    return ls.map(x => ({ path: x }))
  }
  const links = [
    ...wrapInPath([
      Links.home,
      Links.output,
      Links.about,
      Links.api,
      Links.notFound,
    ]),
  ]

  return `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${links
      .map(
        url => `
      <url>
          <loc>${url.path}</loc>
      </url>
    `
      )
      .join('')}
  `.trim()
}

function SiteMap() {}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap()

  res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
