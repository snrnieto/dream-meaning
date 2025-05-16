import "./globals.css";
import type { Metadata } from "next";
import { Itim } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import { LanguageProvider } from "@/context/LanguageContext";
import { ChangeLanguages } from "@/components/ChangeLanguages";
import { BannerAd } from "@/components";

const inter = Itim({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Dream Meaning App",
  description:
    "Dream Meaning is an AI-powered dream analysis app that helps you uncover the meanings and symbolism behind your dreams. Submit your dreams, and our advanced AI algorithms will provide you with personalized insights into your subconscious mind. Keep a dream journal, track emotions, and discover yourself through the language of dreams.",
};

// export function generateStaticParams() {
//   return [{ locale: "en" }, { locale: "es" }, { locale: "it" }];
// }
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <ChangeLanguages />

          <Toaster />
          <Analytics />
          {children}
          <BannerAd />
        </LanguageProvider>
      </body>
    </html>
  );
}
