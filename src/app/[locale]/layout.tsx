import "./globals.css";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Itim } from "next/font/google";
import { ComponentType, ReactNode } from "react";
import { ToasterProps } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Link from "next/link";

const inter = Itim({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Dream Meaning App",
  description:
    "Dream Meaning is an AI-powered dream analysis app that helps you uncover the meanings and symbolism behind your dreams. Submit your dreams, and our advanced AI algorithms will provide you with personalized insights into your subconscious mind. Keep a dream journal, track emotions, and discover yourself through the language of dreams.",
};

export const languages = [
  { name: "English", code: "en" },
  { name: "Español", code: "es" },
  { name: "Italian", code: "it" },
];

const Toaster = dynamic(() => import("react-hot-toast"), {
  ssr: false,
}) as ComponentType<ToasterProps>;
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }, { locale: "it" }];
}
export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: any;
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex gap-2">
            {languages
              .filter((l) => locale !== l.code)
              .map((l, index) => {
                return (
                  <span key={l.code}>
                    <Link href={`/${l.code}`}>{l.name}</Link>
                  </span>
                );
              })}
          </div>

          {children}
          <Toaster />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
