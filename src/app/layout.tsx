import type { Metadata } from "next";
import {
  Big_Shoulders,
  Big_Shoulders_Stencil,
  Newsreader,
  Noto_Serif_Devanagari,
  Doto,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/context/SmoothScrollContext";

const display = Big_Shoulders({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--ff-display",
  display: "swap",
  adjustFontFallback: false,
});

const stencil = Big_Shoulders_Stencil({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--ff-stencil",
  display: "swap",
  adjustFontFallback: false,
});

const body = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--ff-body",
  display: "swap",
});

const deva = Noto_Serif_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500"],
  variable: "--ff-deva",
  display: "swap",
});

const dot = Doto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--ff-dot",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--ff-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mohammedayaan.me"),
  title: "Mohammed Ayaan: agentic AI & cloud builder, Bengaluru",
  description:
    "Third-year CSE student in Bengaluru building agentic AI and cloud apps. Projects, hackathons, and a commit history back to 2019.",
  keywords: [
    "Agentic AI",
    "Cloud",
    "AWS",
    "Backend",
    "Python",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Mohammed Ayaan Adil Ahmed" }],
  openGraph: {
    title: "Mohammed Ayaan: agentic AI & cloud builder, Bengaluru",
    description:
      "Third-year CSE student in Bengaluru building agentic AI and cloud apps. Projects, hackathons, and a commit history back to 2019.",
    url: "https://mohammedayaan.me",
    siteName: "Mohammed Ayaan Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Ayaan: agentic AI & cloud builder, Bengaluru",
    description:
      "Third-year CSE student in Bengaluru building agentic AI and cloud apps. Projects, hackathons, and a commit history back to 2019.",
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
      className={`${display.variable} ${stencil.variable} ${body.variable} ${deva.variable} ${dot.variable} ${mono.variable}`}
    >
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--chalk)] focus:text-[var(--night)] focus:font-mono focus:text-xs focus:uppercase focus:outline-2 focus:outline-current"
        >
          Skip to content
        </a>

        <SmoothScrollProvider>
          <div
            id="main-content"
            tabIndex={-1}
            className="min-h-screen focus:outline-none"
          >
            {children}
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
