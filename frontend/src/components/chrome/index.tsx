import { EuiProvider } from '@elastic/eui'
import createCache from '@emotion/cache'

/**
 * Renders the UI that surrounds the page content.
 */
const Chrome = ({ children }: any) => {
  /**
   * This `@emotion/cache` instance is used to insert the global styles
   * into the correct location in `<head>`. Otherwise they would be
   * inserted after the static CSS files, resulting in style clashes.
   * Only necessary until EUI has converted all components to CSS-in-JS:
   * https://github.com/elastic/eui/issues/3912
   */
  const defaultCache = createCache({
    key: 'eui',
    container:
      typeof document !== 'undefined'
        ? document.querySelector('meta[name="eui-styles"]')
        : null,
  })
  const utilityCache = createCache({
    key: 'util',
    container:
      typeof document !== 'undefined'
        ? document.querySelector('meta[name="eui-styles-utility"]')
        : null,
  })

  return (
    <EuiProvider
      colorMode={'light'}
      cache={{ default: defaultCache, utility: utilityCache }}>
      {children}
    </EuiProvider>
  )
}

export default Chrome
