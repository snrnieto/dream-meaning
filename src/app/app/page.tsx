"use client";
import React from "react";
import { useChat } from "ai/react";
import { useTranslations } from "next-intl";

export default function AppPage() {
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      api: "api/openai",
    });
  const maxLength = 150;
  const hasStartedConversation = messages.length > 0;
  const t = useTranslations("Home");

  return (
    <main className="flex justify-center sm:items-center min-h-[80vh] text-justify  px-3 sm:px-0">
      <div className="max-w-xl flex flex-col gap-2 sm:gap-4 w-full">
        <h1 className="text-center text-xl md:text-3xl uppercase">
          Dream Meaning
        </h1>
        <p className="text-center text-base md:text-xl my-1 sm:my-2">
          {t("helper")}
        </p>
        {!hasStartedConversation && (
          <p className="font-sans text-xs md:text-sm">
            {t("subHelper")}
            <br /> <br />
            {t("forExample")}
          </p>
        )}
        <div className="w-full relative" hidden={hasStartedConversation}>
          <textarea
            value={input}
            onChange={handleInputChange}
            maxLength={maxLength}
            className="bg-white bg-opacity-10 rounded-3xl p-3 w-full h-[30vh]"
            placeholder={t("placeholder")}
          />
          <span className="absolute bottom-3 right-3">
            {input.length}/{maxLength}
          </span>
        </div>
        {hasStartedConversation && (
          <textarea
            value={messages[messages.length - 1].content}
            style={{ whiteSpace: "pre-wrap" }}
            className="bg-white bg-opacity-10  rounded-3xl p-3 w-full h-[30vh] text-white"
            disabled
          />
        )}
        <button
          onClick={() =>
            hasStartedConversation ? setMessages([]) : handleSubmit()
          }
          disabled={!hasStartedConversation && input.length === 0}
          className="border border-white rounded-xl py-2"
        >
          {hasStartedConversation ? t("buttonReset") : t("buttonAnalize")}
        </button>
      </div>
    </main>
  );
}
