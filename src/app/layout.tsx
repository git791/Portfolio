import type { Metadata } from "next";
import { Barlow_Condensed, IBM_Plex_Sans, IBM_Plex_Sans_Devanagari, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/context/SmoothScrollContext";

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
      className={`${display.variable} ${body.variable} ${deva.variable} ${mono.variable}`}
    >
      <body>
        {/* Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--fg)] focus:text-[var(--bg)] focus:font-mono focus:text-xs focus:uppercase focus:outline-2 focus:outline-[var(--signal)]"
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
