import type { Metadata } from "next";
import { Playfair_Display, JetBrains_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/context/SmoothScrollContext";
import Cursor from "@/components/ui/Cursor";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
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
      className={`${playfair.variable} ${jetbrains.variable} ${dmSans.variable}`}
    >
      <body>
        <SmoothScrollProvider>
          <Cursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}