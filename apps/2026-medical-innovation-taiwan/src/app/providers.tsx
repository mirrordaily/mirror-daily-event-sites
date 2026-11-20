'use client'

import { useEffect } from 'react'
import TagManager from 'react-gtm-module'
import { GlobalStyles } from '~/styles/global-style'
import { GTM_ID } from '~/config'

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: GTM_ID })
  }, [])

  return (
    <>
      <GlobalStyles />
      {children}
    </>
  )
}
