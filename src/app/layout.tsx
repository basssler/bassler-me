import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bassler.me'),
  title: {
    default: "Max Bassler | Creative Developer & Engineer",
    template: "%s | Max Bassler",
  },
  description: "Engineering and Business student bridging technical execution with strategic vision.",
  verification: {
    google: "d_11iTj-427J-XUv9drMycjpoagJdkdC86jZy2WCoqc",
  },
  openGraph: {
    title: "Max Bassler | Creative Developer",
    description: "Building scalable digital experiences with minimalism and precision.",
    url: 'https://www.bassler.me',
    siteName: 'Max Bassler',
    images: [
      {
        url: '/images/og/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Max Bassler - Creative Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Max Bassler',
    description: 'Creative developer building digital experiences.',
    images: ['/images/og/og-default.png'],
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Navbar />
          <main className="flex-grow w-full max-w-screen-2xl mx-auto px-6 md:px-12 pt-12 md:pt-24 pb-12">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
