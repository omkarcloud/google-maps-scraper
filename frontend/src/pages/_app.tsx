import 'regenerator-runtime/runtime'
import { EuiErrorBoundary } from '@elastic/eui'
import { Global } from '@emotion/react'
import NextApp from 'next/app'
import Head from 'next/head'
import Chrome from '../components/chrome'
import { Theme } from '../components/theme'
import { globalStyles } from '../styles/global.styles'

import { AuthProvider } from '../components/auth/context'
import Api from '../utils/api'
import { baseUrl } from '../utils/axios'
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
            <AuthProvider {...pageProps}>
              <Component {...pageProps} />
            </AuthProvider>
          </EuiErrorBoundary>
        </Chrome>
      </Theme>
    </>
  )
}

EuiApp.getInitialProps = async props => {
  const {
    ctx,
    Component: { getInitialProps },
  } = props

  const getResponse = async () => {
    const res = await fetch(`${baseUrl}/config`)

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const data = await res.json()
    return data
  }

  const data = await getResponse()

  const appProps = await NextApp.getInitialProps(props)
  Api.getConfig

  const componentPageProps = getInitialProps ? await getInitialProps(ctx) : {}

  const result = {
    ...appProps,
    pageProps: {
      ...data,
      ...componentPageProps,
    },
  }
  return result
}

export default EuiApp
