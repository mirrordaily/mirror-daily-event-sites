import type { NextConfig } from 'next'

let assetPrefixPath = ''
switch (process.env.NEXT_PUBLIC_ENV) {
  case 'prod':
    assetPrefixPath = `https://www.mirrormedia.mg/projects/${process.env.NEXT_PUBLIC_PROJECT_NAME}`
    break
  case 'staging':
    assetPrefixPath = `https://staging.mirrormedia.mg/projects/${process.env.NEXT_PUBLIC_PROJECT_NAME}`
    break
  case 'dev':
    assetPrefixPath = `https://dev.mirrormedia.mg/projects/${process.env.NEXT_PUBLIC_PROJECT_NAME}`
    break
  default:
    assetPrefixPath = ''
    break
}

let basePath = ''

switch (process.env.NEXT_PUBLIC_ENV) {
  case 'prod':
    basePath = `/projects/${process.env.NEXT_PUBLIC_PROJECT_NAME}`
    break
  case 'staging':
    basePath = `/projects/${process.env.NEXT_PUBLIC_PROJECT_NAME}`
    break
  case 'dev':
    basePath = `/projects/${process.env.NEXT_PUBLIC_PROJECT_NAME}`
    break
  default:
    basePath = ''
    break
}

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: assetPrefixPath,
  images: {
    loader: 'custom',
    loaderFile: './loader.ts',
  },
  basePath: basePath,
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
}

export default nextConfig
