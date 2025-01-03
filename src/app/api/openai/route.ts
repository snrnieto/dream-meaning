import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  const { messages: messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-3.5-turbo"),
    maxTokens: 150,
    messages: [
      {
        role: "system",
        content:
          "You are an expert dream interpreter, you must answer your interpretation kindly and sincerely in less than 150 characters. And you must answer in the same language as the user",
      },
      ...messages,
    ],
  });

  // Return the response
  return result.toDataStreamResponse();
}
