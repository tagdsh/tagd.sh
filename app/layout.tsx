import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Footer } from "@/components/home/Footer";
import { EcosystemBanner } from "@/components/site/EcosystemBanner";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import { TopNav } from "@/components/nav/TopNav";
import { DocsSearchModalHost } from "@/components/docs/DocsSearchModalHost";
import "@/app/globals.css";
import "@/styles/tokens.css";

const display = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display-next",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body-next",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-next",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tagd.sh"),
  title: {
    default: "tagd.sh — Signal Tags",
    template: "%s | tagd.sh",
  },
  description:
    "Signal Tags is an open schema and verification protocol for product authentication.",
  authors: [{ name: "Better Data", url: "https://betterdata.co" }],
  creator: "Better Data",
  publisher: "Better Data",
  openGraph: {
    type: "website",
    siteName: "Signal Tags",
    url: "https://tagd.sh",
  },
  twitter: {
    card: "summary_large_image",
    site: "@betterdatainc",
    creator: "@betterdatainc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <GoogleAnalytics />
        <PostHogProvider>
          <EcosystemBanner />
          <TopNav />
          <DocsSearchModalHost />
          {children}
          <Footer />
        </PostHogProvider>
      </body>
    </html>
  );
}
