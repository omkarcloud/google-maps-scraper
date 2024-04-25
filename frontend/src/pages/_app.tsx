import 'regenerator-runtime/runtime'
import { EuiErrorBoundary } from '@elastic/eui'
import { Global } from '@emotion/react'
import Head from 'next/head'
import Chrome from '../components/chrome'
import { Theme } from '../components/theme'
import { globalStyles } from '../styles/global.styles'

/**
 * Next.js uses the App component to initialize pages. You can override it
 * and control the page initialization. Here use use it to render the
 * `Chrome` component on each page, and apply an error boundary.
 *
 * @see https://nextjs.org/docs/advanced-features/custom-app
 */

const EuiApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <></>
      </Head>
      <Global styles={globalStyles} />
      <Theme>
        <Chrome>
          <EuiErrorBoundary>
            <Component {...pageProps} />
          </EuiErrorBoundary>
        </Chrome>
      </Theme>
    </>
  )
}
export default EuiApp
