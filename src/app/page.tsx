"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  function handleSubmitEmail(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const body = {
      email,
      groups: ["94785456626992475"],
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MAILERLITE_API_KEY}`,
    };

    setTimeout(() => {
      toast.success("Thanks for subscribing!");
    }, 300);

    fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      body: JSON.stringify(body),
      headers,
    })
      .then((res) => res.json())
      .then((res) => {
        router.push("/app");
      });
  }

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="gap-8 items-center py-16 px-8 lg:px-20 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 ">
        <img
          className="w-full max-h-[40vh] object-cover rounded-xl block md:hidden mb-4"
          src="https://image.lexica.art/full_jpg/0187b21f-4c3c-438a-8e82-444a3162c066"
          alt="dashboard image"
        />
        <div>
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white text-center lg:text-start">
            Unlock the Hidden Secrets of Your Dreams
          </h2>
          <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
            Dream Meaning is an AI-powered dream analysis app. Uncover dream
            meanings & symbolism. Get personalized insights from advanced AI.
            Keep a dream journal & discover yourself through dreams.
          </p>
          <form
            className="flex flex-col md:flex-row items-center justify-between gap-6 "
            onSubmit={handleSubmitEmail}
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <button
              className="whitespace-nowrap inline-flex items-center justify-center px-5 py-2  w-full md:w-auto text-base font-medium text-center text-white rounded-lg  bg-blue-600 hover:bg-blue-800"
              type="submit"
            >
              Try for free
            </button>
          </form>
        </div>
        <img
          className="w-full max-h-[40vh] object-cover rounded-xl hidden md:block"
          src="https://image.lexica.art/full_jpg/0187b21f-4c3c-438a-8e82-444a3162c066"
          alt="dashboard image"
        />
      </div>
    </main>
  );
}
