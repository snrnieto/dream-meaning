"use client";
import { LanguageContext } from "@/context/LanguageContext";
import { useTranslations } from "next-intl";
import React, { useContext } from "react";

export const ChangeLanguages = () => {
  const { locale, setLocale } = useContext(LanguageContext);
  const t = useTranslations("Languages");

  const languages = [
    { name: "english", code: "en" },
    { name: "spanish", code: "es" },
    { name: "italian", code: "it" },
  ];
  if (!locale) {
    return null;
  }

  return (
    <div className="flex gap-2">
      {languages
        .filter((l) => locale !== l.code)
        .map((l, index) => {
          return (
            <span
              key={l.code}
              onClick={() => {
                setLocale(l.code as any);
              }}
            >
              {t(l.name)}
            </span>
          );
        })}
    </div>
  );
};
