import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

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
    title: "XCoin — Built for the Community",
    description:
      "XCoin is a community-first digital token experiment built around participation, transparency, and meaningful utility.",
    keywords: [
      "XCoin",
      "XCN",
      "community token",
      "digital community",
      "token project",
    ],
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: "XCoin — Built for the Community",
      description:
        "A community-first digital token experiment. Launching soon.",
      type: "website",
      locale: "en_US",
      siteName: "XCoin",
      images: [
        {
          url: "/og.png",
          width: 1734,
          height: 907,
          alt: "XCoin — Built for the community. Ready for what’s next.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "XCoin — Built for the Community",
      description:
        "A community-first digital token experiment. Launching soon.",
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
      </body>
    </html>
  );
}
