import "./globals.css";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Itim } from "next/font/google";
import { ComponentType } from "react";
import { ToasterProps } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

const inter = Itim({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Dream Meaning App",
  description:
    "Dream Meaning is an AI-powered dream analysis app that helps you uncover the meanings and symbolism behind your dreams. Submit your dreams, and our advanced AI algorithms will provide you with personalized insights into your subconscious mind. Keep a dream journal, track emotions, and discover yourself through the language of dreams.",
};

const Toaster = dynamic(() => import("react-hot-toast"), {
  ssr: false,
}) as ComponentType<ToasterProps>;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
