import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AURA — Automated Architectural Drapery & Circadian Living",
  description:
    "Whisper-silent motorized architectural drapery, acoustic isolation, and circadian daylight automation for luxury alpine penthouses and modern villas.",
  keywords: [
    "motorized drapery",
    "architectural curtains",
    "smart home circadian",
    "luxury interior design",
    "acoustic blackout curtains",
    "Swiss engineering"
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#060709] text-[#f4f4f5] selection:bg-amber-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}
