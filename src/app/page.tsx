"use client";
import useLLM from "usellm";
import { useState } from "react";

export default function Demo() {
  const llm = useLLM({ serviceUrl: "https://usellm.org/api/llm" });
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
          await llm.chat({
            messages: [
              {
                role: "system",
                content:
                  "Eres un interpretador de sueños latinoamericano, debes responder tu interpretacion de forma amable y sincera en menos de 150 caracteres",
              },
              { role: "user", content: inputText },
            ],
            stream: true,
            onStream: ({ message }) => setResult(message.content),
          });
        } else {
          alert("Escribe un mensaje");
        }
      } catch (error) {
        console.error("Something went wrong!", error);
      }
    }
  }
  return (
    <main className="flex justify-center text-justify  px-3 sm:px-0">
      <div className="max-w-xl flex flex-col gap-4 w-full">
        <h1 className="text-center text-3xl uppercase">Dream Meaning</h1>
        <p className="text-center text-xl my-2">Escribe tu sueño</p>
        {result.length == 0 && (
          <p className="font-sans text-sm">
            Proporcione una descripción detallada y emocional de su sueño; esto
            nos permitirá analizar las posibles causas y significados de su
            sueño.
            <br /> <br />
            Por ejemplo, en lugar de decir 'soñé que estaba en la oficina',
            escribe 'soñé que estaba en la oficina trabajando hasta tarde,
            sintiéndome abrumado y estresado por todas las tareas que tenía que
            realizar'.
          </p>
        )}
        <div className="w-full relative">
          <textarea
            value={inputText}
            maxLength={maxLength}
            className="bg-white bg-opacity-10 rounded-3xl p-3 w-full h-[30vh]"
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Soñe con..."
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
          {result.length > 0 ? "Analizar otro sueño" : "Analizar sueño"}
        </button>
      </div>
    </main>
  );
}
