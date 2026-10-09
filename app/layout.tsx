import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jakarta",
  display: "swap"
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-manrope",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jamiel-j.me"),
  title: {
    default: "Jamiel J — Data Analyst",
    template: "%s | Jamiel J"
  },
  description:
    "Portfolio of Jamiel J — data analyst specializing in financial modeling, FP&A, and machine learning. Explore projects across JP Morgan, Citi, and more.",
  keywords: [
    "Jamiel J",
    "Data Analyst",
    "Financial Modeling",
    "FP&A",
    "Machine Learning",
    "Portfolio",
    "Data Science",
    "Business Intelligence",
    "JP Morgan",
    "Citi"
  ],
  authors: [{ name: "Jamiel J", url: "https://jamiel-j.me" }],
  creator: "Jamiel J",
  publisher: "Jamiel J",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jamiel-j.me",
    siteName: "Jamiel J — Portfolio",
    title: "Jamiel J — Data Analyst",
    description:
      "Portfolio of Jamiel J — data analyst specializing in financial modeling, FP&A, and machine learning.",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Jamiel J — Data Analyst Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Jamiel J — Data Analyst",
    description:
      "Portfolio of Jamiel J — data analyst specializing in financial modeling, FP&A, and machine learning.",
    images: ["/hero.jpg"],
    creator: "@jamiel_j"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    google: ""   // add your Google Search Console token here when available
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
