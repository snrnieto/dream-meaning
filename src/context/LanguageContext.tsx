"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { NextIntlClientProvider } from "next-intl";

type Lenguages = "es" | "en" | "it";
interface LanguageContextProps {
  locale: Lenguages;
  setLocale: (locale: Lenguages) => void;
}

export const LanguageContext = createContext<LanguageContextProps>(
  {} as LanguageContextProps
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Lenguages>("es");
  const [messages, setMessages] = useState();

  useEffect(() => {
    const lenguage = localStorage.getItem("lenguage") as Lenguages;

    if (lenguage) {
      setLocale(lenguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lenguage", locale);

    const getMessage = async () => {
      try {
        const mess = (await import(`../intl/messages/${locale}.json`)).default;
        setMessages(mess);
      } catch (error) {
        console.error({ error });
      }
    };

    getMessage();
  }, [locale]);

  if (!messages) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
};
