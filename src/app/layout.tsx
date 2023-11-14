import { Flex, Theme } from '@radix-ui/themes'
import './globals.css'

import '@radix-ui/themes/styles.css'

import type { Metadata } from 'next'
import Header from './components/Header'
import Nav from './components/Nav'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'AI辅助合成设计',
  description: 'AI辅助合成设计',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='zh' suppressHydrationWarning>
      <body>
        <Theme accentColor='green' appearance='dark' radius='large'>
          <Script id='51la'>
            {`
!function(p){"use strict";!function(t){var s=window,e=document,i=p,c="".concat("https:"===e.location.protocol?"https://":"http://","sdk.51.la/js-sdk-pro.min.js"),n=e.createElement("script"),r=e.getElementsByTagName("script")[0];n.type="text/javascript",n.setAttribute("charset","UTF-8"),n.async=!0,n.src=c,n.id="LA_COLLECT",i.d=n;var o=function(){s.LA.ids.push(i)};s.LA?s.LA.ids&&o():(s.LA=p,s.LA.ids=[],o()),r.parentNode.insertBefore(n,r)}()}({id:"KFmFL3EbZEJht92x",ck:"KFmFL3EbZEJht92x",hashMode:true});


					`}
          </Script>
          <Header />
          <Nav />
          <Flex direction='column' className='w-full pt-12 pl-28'>
            {children}
          </Flex>
        </Theme>
      </body>
    </html>
  )
}
