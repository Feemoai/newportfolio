import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ahmad Fajril Falah — Portfolio",
  description:
    "Computer Engineering Student & Aspiring Web Developer. Cinematic digital portfolio of Ahmad Fajril Falah.",
  keywords: ["Ahmad Fajril Falah", "Portfolio", "Web Developer", "Computer Engineering"],
  openGraph: {
    title: "Ahmad Fajril Falah — Portfolio",
    description: "Interactive digital identity — Computer Engineering & Web Development",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased bg-black text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
