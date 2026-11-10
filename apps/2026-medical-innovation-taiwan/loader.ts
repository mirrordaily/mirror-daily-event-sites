import { ImageLoaderProps } from 'next/image'
import { staticFileDestination } from './src/config'

function imageLoader(imageInfo: ImageLoaderProps) {
  return `${staticFileDestination}${imageInfo.src}`
}

export { imageLoader }
