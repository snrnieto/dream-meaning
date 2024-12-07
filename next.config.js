/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_MAILERLITE_API_KEY: process.env.NEXT_PUBLIC_MAILERLITE_API_KEY,
    NEXT_PUBLIC_OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
};

module.exports = nextConfig;
