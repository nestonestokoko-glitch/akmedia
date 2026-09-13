import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AK Media India — Influencer Marketing & Creator Growth",
  description:
    "India's influencer marketing platform connecting brands with authentic creators who drive real growth. Creator-first campaigns, verified networks, measurable results.",
  keywords: [
    "influencer marketing",
    "creator economy",
    "creator network",
    "brand campaigns",
    "AK Media India",
  ],
  openGraph: {
    title: "AK Media India — Influence that actually moves people",
    description:
      "Brands scale with creators. Creators grow with brands. India's creator-first growth platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrument.variable}`}>
      <body className="font-sans">
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}