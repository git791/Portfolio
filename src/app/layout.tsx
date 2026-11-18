import type { Metadata } from "next";
import {
  Bowlby_One,
  Patrick_Hand,
  Kalam,
  Bangers,
  Atkinson_Hyperlegible,
  Space_Mono,
} from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/context/SmoothScrollContext";

const display = Bowlby_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--ff-display",
  display: "swap",
});

const letter = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
  variable: "--ff-letter",
  display: "swap",
});

const deva = Kalam({
  subsets: ["devanagari", "latin"],
  weight: ["400", "700"],
  variable: "--ff-deva",
  display: "swap",
});

const sfx = Bangers({
  subsets: ["latin"],
  weight: "400",
  variable: "--ff-sfx",
  display: "swap",
});

const body = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--ff-body",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
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
      className={`${display.variable} ${letter.variable} ${deva.variable} ${sfx.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        {/* Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--ink)] focus:text-[var(--paper)] focus:font-mono focus:text-xs focus:uppercase focus:outline-2 focus:outline-[var(--yellow)]"
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
