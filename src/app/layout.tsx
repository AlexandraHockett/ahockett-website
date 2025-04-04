// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import "./styles/animations.css";
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
  metadataBase: new URL("https://ahockett.com"),
  title: {
    default: "Alexandra Hockett | Web Development Expert | Stunning Websites",
    template: "%s | Alexandra Hockett Web Development",
  },
  description:
    "Transforming businesses with cutting-edge web development. Custom websites, web applications, and digital solutions that captivate and convert. Next.js, React, GSAP expert.",
  applicationName: "Alexandra Hockett Web Development",
  authors: [{ name: "Alexandra Hockett", url: "https://ahockett.com" }],
  generator: "Next.js",
  keywords: [
    "web development",
    "website design",
    "web application",
    "frontend development",
    "React developer",
    "Next.js expert",
    "GSAP animations",
    "responsive web design",
    "digital solutions",
    "e-commerce websites",
    "portfolio website",
    "web design services",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ahockett.com",
    siteName: "Alexandra Hockett Web Development",
    title: "Alexandra Hockett | Web Development Expert",
    description:
      "Crafting stunning, high-performance websites and web applications that elevate your digital presence.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Alexandra Hockett - Web Development Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexandra Hockett | Web Development Expert",
    description:
      "Transform your digital presence with cutting-edge web development solutions.",
    images: ["/images/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code", // Replace with actual verification
  },
  alternates: {
    canonical: "https://ahockett.com",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  category: "Web Development Services",
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
