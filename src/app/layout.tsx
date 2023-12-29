import { Flex, Theme } from "@radix-ui/themes";
import "./globals.css";

import "@radix-ui/themes/styles.css";

import type { Metadata } from "next";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Script from "next/script";
import AuthWrapper from "./auth/AutoWrapper";

export const metadata: Metadata = {
  title: "AI辅助合成设计",
  description: "AI辅助合成设计",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body>
        <AuthWrapper>
          <Theme accentColor="blue" appearance="dark" radius="large">
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-GWTY7T217R" />
            <Script id="google-analytics">
              {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GWTY7T217R');
           `}
            </Script>

            <Header />
            <Nav />
            <Flex direction="column" className="h-screen w-full">
              <Flex
                direction="column"
                className="h-full rounded-3xl mb-2 ml-52 mt-16 mr-20 bg-gray-800"
              >
                {children}
              </Flex>
            </Flex>
          </Theme>
        </AuthWrapper>
      </body>
    </html>
  );
}
