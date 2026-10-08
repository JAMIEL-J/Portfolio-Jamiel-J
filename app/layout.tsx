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
  title: "Hana Style — Portfolio",
  description: "Framer Hana template recreated in Next.js + Framer Motion"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
