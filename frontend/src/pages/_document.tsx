import Document, { Head, Html, Main, NextScript } from 'next/document'
import { ReactElement } from 'react'
import { Theme, defaultTheme, themeConfig } from '../lib/theme'

function themeLink(theme: Theme): ReactElement {
  let disabledProps = {}

  if (theme.id !== defaultTheme) {
    disabledProps = {
      disabled: true,
      'aria-disabled': true,
    }
  }

  return (
    <link
      rel="stylesheet"
      href={`/${theme.publicPath}`}
      data-name="eui-theme"
      data-theme-name={theme.name}
      data-theme={theme.id}
      key={theme.id}
      {...disabledProps}
    />
  )
}

/**
 * A custom `Document` is commonly used to augment your application's
 * `<html>` and `<body>` tags. This is necessary because Next.js pages skip
 * the definition of the surrounding document's markup.
 *
 * In this case, we customize the default `Document` implementation to
 * inject the available EUI theme files.  Only the `light` theme is
 * initially enabled.
 *
 * @see https://nextjs.org/docs/advanced-features/custom-document
 */

export default class MyDocument extends Document {
  render(): ReactElement {
    const favicon16Prod = `/images/favicon/favicon-16x16.png`
    const favicon32Prod = `/images/favicon/favicon-32x32.png`
    const favicon48Prod = `/images/favicon/favicon-48x48.png`

    return (
      <Html lang="en">
        <Head>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="eui-styles" />

          {themeConfig.availableThemes
            .filter(x => x.id !== 'dark')
            .map(each => themeLink(each))}

          <meta name="eui-styles-utility" />

          <link
            rel="icon"
            type="image/png"
            href={favicon16Prod}
            sizes="16x16"
          />
          <link
            rel="icon"
            type="image/png"
            href={favicon32Prod}
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href={favicon48Prod}
            sizes="96x96"
          />
          <link
            href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
