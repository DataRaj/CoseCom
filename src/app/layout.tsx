import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CoseCom . Luxury skin care cosmetics store",
  description:
    "Experience luxury skincare with CoseCom – a beautifully designed Ecommerce store offering premium skincare products with a seamless shopping experience.",
  keywords:
    "Luxury Skincare, Premium Beauty, High-end Skincare, Anti-Aging, Hydrating Serums, Next.js Ecommerce",
  authors: [{ name: "dat.dev" }],
  metadataBase: new URL("https://cosecom.dat.dev"),
  openGraph: {
    title: "CoseCom • Luxury Skincare Ecommerce",
    description:
      "Discover CoseCom – a high-end skincare brand with a modern, elegant, and seamless shopping experience.",
    url: "https://",
    siteName: "CoseCom - Skincare Cosmetics Ecommerce",
    images: [
      {
        url: "https://cosecom.dat.dev/cover.jpg",
        width: 1200,
        height: 630,
        alt: "CoseCom Products",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "cosecom® • Luxury Skincare Ecommerce",
    description:
      "Shop premium skincare products with cosecom® – a luxury Ecommerce brand designed for elegance and performance.",
    images: ["https://cosecom.dat.dev/cover.jpg"],
  },
  alternates: {
    canonical: "https://cosecom.dat.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta name="theme-color" content="#09090b" />
        </head>
        <body className={`${inter.className} antialiased select-none`}>

            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>

        </body>
      </html>
    </>
  );
}
