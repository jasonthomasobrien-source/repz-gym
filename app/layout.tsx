import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import Script from "next/script";
import { PublicChrome } from "@/components/layout/PublicChrome";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Repz Gym — Plainwell",
  description: "No glamour. Just a great workout. Monthly memberships and day passes.",
  keywords: "gym, Plainwell, Michigan, fitness, membership, classes",
  openGraph: {
    title: "Repz Gym",
    description: "No glamour. Just a great workout.",
    url: "https://repzgym.com",
    siteName: "Repz Gym",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <PublicChrome>{children}</PublicChrome>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "LocalBusiness",
              name: "Repz Gym",
              image: "https://repzgym.com/logo.png",
              description: "No glamour. Just a great workout. Gym in Plainwell, Michigan since 1998.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "585 10th St A",
                addressLocality: "Plainwell",
                addressRegion: "MI",
                postalCode: "49080",
                addressCountry: "US",
              },
              telephone: "(269) 685-1493",
              url: "https://repzgym.com",
              priceRange: "$",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                opens: "06:00",
                closes: "20:30",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
