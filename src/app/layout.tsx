import type { Metadata } from "next";
import { Barlow_Condensed, IBM_Plex_Sans, IBM_Plex_Sans_Devanagari, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/context/SmoothScrollContext";
import Cursor from "@/components/ui/Cursor";
import Rail from "@/components/Rail";
import TopBar from "@/components/TopBar";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--ff-display",
  display: "swap",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--ff-body",
  display: "swap",
});

const deva = IBM_Plex_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500"],
  variable: "--ff-deva",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--ff-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohammed Ayaan Portfolio",
  description:
    "Portfolio of Mohammed Ayaan, a student and developer crafting thoughtful digital experiences.",
  keywords: ["UI/UX", "Designer", "Developer", "Portfolio", "Frontend", "Cloud", "Agentic AI"],
  authors: [{ name: "Mohammed Ayaan" }],
  openGraph: {
    title: "Mohammed Ayaan Portfolio",
    description:
      "Portfolio of Mohammed Ayaan, a student and developer crafting thoughtful digital experiences.",
    type: "website",
    url: "https://yourwebsite.com",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mohammed Ayaan Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Ayaan Portfolio",
    description:
      "Portfolio of Mohammed Ayaan, a student and developer crafting thoughtful digital experiences.",
    images: ["https://yourwebsite.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${deva.variable} ${mono.variable}`}
    >
      <body>
        <SmoothScrollProvider>
          <Cursor />
          <Rail />
          <TopBar />
          <div className="pt-14 lg:pt-0 lg:pl-[var(--rail-w)] min-h-screen">
            {children}
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}