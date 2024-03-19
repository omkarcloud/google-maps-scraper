/* eslint-disable @typescript-eslint/no-explicit-any */

// These type definitions allow us to import image files in JavaScript without
// causing type errors. They tell the TypeScript compiler that such imports
// simply return a value, which they do, thanks to Webpack.

// This section works with the `typescript-plugin-css-modules` plugin, and
// allows us to type-check the name in our CSS modules (and get IDE completion!)

import 'axios'

declare module '*.png' {
  const value: any
  export = value
}

declare module '*.svg' {
  const value: any
  export = value
}

declare module '*.module.scss' {
  const content: { [className: string]: string }
  export default content
}

declare module 'axios' {
  export declare interface AxiosRequestConfig<D = any> {
    silent?: boolean
    message?:
      | 'Deleting'
      | 'Creating'
      | 'Loading'
      | 'Uploading'
      | 'Submitting'
      | 'Downloading'
      | (string & {})
    redirectToSignInOn404?: boolean
    silenceError?: boolean
  }
}
