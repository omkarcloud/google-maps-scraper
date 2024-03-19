import Head from 'next/head'

export default function Seo({
  title = 'Omkar Cloud',
  description = 'Elementasaurus is The Best Free Website Builder for Web Designers',
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/images/twitter-card.png" />
      <meta property="og:url" content="/images/twitter-card.png" />
    </Head>
  )
}

// ·
