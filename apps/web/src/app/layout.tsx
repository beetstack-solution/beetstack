import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { JsonLd } from "@/components/seo/json-ld";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Beetstack | Premium IT Solutions & Scalable Architecture",
    template: "%s | Beetstack",
  },
  description: "Architecting the next generation of scalable, enterprise-grade software. Monorepo-first solutions built with precision and the Beetroot-inspired design philosophy.",
  metadataBase: new URL("https://beetstack.it"),
  keywords: ["IT Solutions", "Software Architecture", "Monorepo", "Next.js", "Enterprise Software", "Beetstack", "Scalable Apps"],
  authors: [{ name: "Beetstack Team", url: "https://beetstack.it" }],
  creator: "Beetstack IT Solutions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://beetstack.it",
    title: "Beetstack | Premium IT Solutions & Scalable Architecture",
    description: "Architecting the next generation of scalable, enterprise-grade software.",
    siteName: "Beetstack",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Beetstack IT Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beetstack | Premium IT Solutions",
    description: "Architecting the next generation of scalable, enterprise-grade software.",
    images: ["/og-image.webp"],
    creator: "@beetstack",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { CustomCursor } from "@/components/custom-cursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased cursor-none`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
