import type { Metadata } from "next";
import { Noto_Serif, Inter } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"]
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"]
});

export const metadata: Metadata = {
  title: "Brisbane Window Furnishings | Custom Blinds, Plantation Shutters & Curtains Brisbane",
  description:
    "Custom blinds, shutters, curtains and outdoor shades for homes, renovations and commercial spaces across Brisbane, Moreton Bay and Sunshine Coast.",
  keywords: [
    "Brisbane Window Furnishings",
    "custom blinds Brisbane",
    "plantation shutters Brisbane",
    "curtains Brisbane",
    "outdoor shades Sunshine Coast",
    "motorised blinds Brisbane",
    "North Lakes window furnishings"
  ],
  openGraph: {
    title: "Brisbane Window Furnishings | Custom Blinds, Shutters & Curtains",
    description: "Premium window coverings tailored for Queensland living across Brisbane & Sunshine Coast.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": "Brisbane Window Furnishings",
        "image": "/frames/ezgif-frame-001.jpg",
        "description": "Custom blinds, shutters, curtains and outdoor shades for homes across Brisbane and the Sunshine Coast.",
        "telephone": "1300 73 72 79",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8/51 Cook Court",
          "addressLocality": "North Lakes",
          "addressRegion": "QLD",
          "postalCode": "4509",
          "addressCountry": "AU"
        }
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${notoSerif.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#fbf9f6] text-[#1b1c1a] font-sans antialiased selection:bg-[#d4a574] selection:text-[#2c1700]">
        {children}
      </body>
    </html>
  );
}
