// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import "./styles/animations.css"; // Import the animations CSS
import { Inter, Poppins } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LocaleProvider } from "@/contexts/LocaleContext";

// Define fonts
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Alexandra Hockett | Web Developer",
  description:
    "Expert web developer creating stunning, animated websites with Next.js, React, GSAP, and Framer Motion. Get a website that wows.",
  openGraph: {
    title: "Alexandra Hockett | Web Developer",
    description:
      "Creating stunning, animated websites that leave a lasting impression. Specializing in Next.js, React, GSAP, and Framer Motion.",
    type: "website",
    locale: "en_US",
    url: "https://ahockett.com",
    siteName: "Alexandra Hockett",
    images: [
      {
        url: "https://ahockett.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Alexandra Hockett Web Developer",
      },
    ],
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://ahockett.com"
  ),
  robots: { index: true, follow: true },
  creator: "Alexandra Hockett",
  authors: [{ name: "Alexandra Hockett", url: "https://www.ahockett.com" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <LocaleProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
