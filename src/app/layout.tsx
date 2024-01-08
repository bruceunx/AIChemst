import { Flex, Theme } from "@radix-ui/themes";
import "@/globals.css";

import "@radix-ui/themes/styles.css";

import type { Metadata } from "next";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Script from "next/script";
import { NextAuthProvider } from "./provider";

export const metadata: Metadata = {
  title: "AIChemist",
  description: "AI 合成设计，AI提供合成路线，提供反应条件, retrosynthesis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-GWTY7T217R" />
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GWTY7T217R');
           `}
        </Script>
        <Theme accentColor="blue" appearance="dark" radius="large">
          <Flex direction="column" className="h-screen w-full">
            <NextAuthProvider>
              <Header />
              <Nav />
              <Flex
                direction="column"
                className="h-full rounded-3xl mb-2 ml-52 mt-16 mr-20 bg-gray-800"
              >
                {children}
              </Flex>
            </NextAuthProvider>
          </Flex>
        </Theme>
      </body>
    </html>
  );
}
