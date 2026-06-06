import type { Metadata } from "next";
import { Inter, Space_Grotesk, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arasstech.com"),
  title: {
    default: "ARASS Tech | Web Development & AI Company in Kerala, India",
    template: "%s | ARASS Tech"
  },
  description:
    "ARASS Tech is a leading web, SaaS, and AI development company in Kerala, India. We build high-performance websites, AI solutions, and digital products for growing businesses.",
  keywords: [
    "Web Development Company India",
    "Website Development Company Kerala",
    "AI Development Company India",
    "SaaS Development Company",
    "Software Development Company",
    "Website Design Agency",
    "Website Designer Trivandrum",
    "Startup Website Development India"
  ],
  authors: [{ name: "ARASS Tech" }],
  openGraph: {
    title: "ARASS Tech | Web & AI Development Company India",
    description:
      "Leading web, SaaS, and AI development company in Kerala, India. We build high-performance websites, AI solutions, and digital products.",
    type: "website",
    url: "https://arasstech.com",
    siteName: "ARASS Tech"
  },
  alternates: {
    canonical: "https://arasstech.com",
  }
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://arasstech.com/#organization",
      "name": "ARASS Tech",
      "url": "https://arasstech.com",
      "logo": "https://arasstech.com/favicon.svg",
      "sameAs": [
        "https://www.linkedin.com/company/arass-tech",
        "https://github.com/arasstech",
        "https://www.behance.net/arasstech"
      ]
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://arasstech.com/#localbusiness",
      "name": "ARASS Tech",
      "image": "https://arasstech.com/favicon.svg",
      "url": "https://arasstech.com",
      "telephone": "",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Trivandrum",
        "addressRegion": "Kerala",
        "addressCountry": "IN"
      },
      "priceRange": "$$"
    },
    {
      "@type": "WebSite",
      "@id": "https://arasstech.com/#website",
      "url": "https://arasstech.com",
      "name": "ARASS Tech"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${orbitron.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="theme-color" content="#1C1C1E" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      </head>
      <body className="noise-overlay antialiased">
        {children}
      </body>
    </html>
  );
}
