import { ImageLoader } from 'next/image'

export const imageLoader: ImageLoader = ({ src, width, quality }) =>
  `${src}?w=${width}&q=${quality || 75}`
