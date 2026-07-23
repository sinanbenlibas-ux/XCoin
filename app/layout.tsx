import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import CookieConsent from "./components/CookieConsent";
import { siteConfig } from "./site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: "XQNT Coin — X Quantum Network Token",
    description:
      "XQNT Coin is a community-first digital token experiment built around open networks, participation, transparency, and meaningful utility.",
    keywords: [
      siteConfig.brand.name,
      siteConfig.brand.shortName,
      siteConfig.brand.expansion,
      "community token",
      "digital community",
      "token project",
    ],
    alternates: {
      canonical: siteConfig.siteUrl,
    },
    openGraph: {
      title: "XQNT Coin — X Quantum Network Token",
      description:
        "The official XQNT Coin website is live. The token remains in pre-launch.",
      type: "website",
      locale: "en_US",
      siteName: siteConfig.brand.name,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "XQNT Coin — official website live, token pre-launch.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "XQNT Coin — X Quantum Network Token",
      description:
        "The official XQNT Coin website is live. The token remains in pre-launch.",
      images: ["/og.png"],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#050816",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
