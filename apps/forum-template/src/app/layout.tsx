import type { Metadata, Viewport } from 'next'
import StyledComponentsRegistry from '~/lib/registry'
import Providers from './providers'
import { OG_DESC, OG_TITLE, staticFileDestination } from '~/config'

const SITE_TITLE = '鏡週刊 Mirror Media'
const FB_APP_ID = '175313259598308'
const FB_PAGE_ID = '1855418728011324'

const TITLE = OG_TITLE ? `${OG_TITLE} - ${SITE_TITLE}` : SITE_TITLE
// 靜態匯出後只有單一頁面，網址固定為 index.html（原本由 router.asPath 組出）
const PAGE_URL = `${staticFileDestination}/index.html`
const OG_IMAGE = `${staticFileDestination}/images/og.jpg`

export const metadata: Metadata = {
  metadataBase: new URL(staticFileDestination),
  title: TITLE,
  description: OG_DESC,
  applicationName: TITLE,
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: true,
    'max-image-preview': 'large',
  },
  icons: {
    icon: [
      { url: `${staticFileDestination}/favicon.ico`, type: 'image/x-icon' },
      {
        url: `${staticFileDestination}/favicon-32x32.png`,
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: `${staticFileDestination}/favicon-16x16.png`,
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: `${staticFileDestination}/apple-touch-icon.png`,
        sizes: '180x180',
      },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: `${staticFileDestination}/safari-pinned-tab.svg`,
        color: '#5bbad5',
      },
    ],
  },
  openGraph: {
    locale: 'zh_TW',
    type: 'website',
    siteName: SITE_TITLE,
    title: TITLE,
    description: OG_DESC,
    url: PAGE_URL,
    images: [
      {
        url: OG_IMAGE,
        secureUrl: OG_IMAGE.replace('http://', 'https://'),
        width: 1200,
        height: 630,
        type: 'images/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: OG_DESC,
    images: [OG_IMAGE],
  },
  verification: {
    google: '8tUjQvQoBEANJ6nRE9fMnsw2qODvbAgqDjSkLj-Mdw0',
  },
  other: {
    'fb:app_id': FB_APP_ID,
    'fb:pages': FB_PAGE_ID,
    'twitter:url': PAGE_URL,
    'msapplication-TileColor': '#5bbad5',
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-Hant-TW">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router root layout 對所有頁面生效，此規則僅適用 Pages Router */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
