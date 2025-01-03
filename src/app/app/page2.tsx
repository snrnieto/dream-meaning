"use client";
import { createLLMService } from "usellm";
import { useState } from "react";

export default function Demo() {
  console.log({
    key: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  const llm = createLLMService({
    openaiApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  const [result, setResult] = useState("");
  const [inputText, setInputText] = useState("");
  const maxLength = 150;

  async function handleClick() {
    if (result.length > 0) {
      setResult("");
      setInputText("");
    } else {
      try {
        if (inputText.length > 0) {
          llm.chat({
            messages: [
              {
                role: "system",
                content:
                  "You are an expert dream interpreter, you must answer your interpretation kindly and sincerely in less than 150 characters. And you must answer in the same language as the user",
              },
              { role: "user", content: inputText },
            ],
            stream: true,
          });
        } else {
          alert("Write a dream");
        }
      } catch (error) {
        console.error("Something went wrong!", error);
      }
    }
  }
  return (
    <main className="flex justify-center items-center h-screen text-justify  px-3 sm:px-0">
      <div className="max-w-xl flex flex-col gap-4 w-full">
        <h1 className="text-center text-3xl uppercase">Dream Meaning</h1>
        <p className="text-center text-xl my-2">Write your dream</p>
        {result.length == 0 && (
          <p className="font-sans text-sm">
            Dive deep into your dream with rich emotions and clear details.
            Describe it as if you're telling a friend about a movie scene—bring
            it to life! This helps our AI analyze and decode its true meaning.
            <br /> <br />
            For instance, instead of saying 'I dreamed of flying,' try 'I
            dreamed of i soared through the clouds with wings like an eagle,
            feeling exhilarated and free.' Your dream's essence will guide our
            powerful analysis.
          </p>
        )}
        <div className="w-full relative">
          <textarea
            value={inputText}
            maxLength={maxLength}
            className="bg-white bg-opacity-10 rounded-3xl p-3 w-full h-[30vh]"
            onChange={(e) => setInputText(e.target.value)}
            placeholder="I dreamed..."
            disabled={result.length > 0}
          />
          <span className="absolute bottom-3 right-3">
            {inputText.length}/{maxLength}
          </span>
        </div>
        {result.length > 0 && (
          <textarea
            value={result}
            style={{ whiteSpace: "pre-wrap" }}
            className="bg-white bg-opacity-10  rounded-3xl p-3 w-full h-[30vh] text-white"
            disabled
          />
        )}
        <button
          onClick={handleClick}
          className="border border-white rounded-xl py-2"
        >
          {result.length > 0 ? "Analize other dream" : "Analize my dream"}
        </button>
      </div>
    </main>
  );
}
