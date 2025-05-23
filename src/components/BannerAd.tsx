"use client";
import { useEffect, useRef } from "react";
const atOptions = {
  key: "0a4b4beff2dde5d37b7670d17fda5a3b",
  format: "iframe",
  height: 90,
  width: 728,
  params: {},
};

const srcScript = `//www.highperformanceformat.com/${atOptions.key}/invoke.js`;
const src2Script = `//pl26653978.profitableratecpm.com/3e/e3/0f/3ee30f2e1f56f49cb08d28644f0ffbea.js`;
export const BannerAd = () => {
  const banner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bannerElement = banner.current;
    if (bannerElement) {
      // Create the script elements
      const conf = document.createElement("script");
      const script = document.createElement("script");
      const scriptBanner = document.createElement("script");
      const body = document.getElementsByTagName("body")[0];
      script.type = "text/javascript";
      script.src = src2Script;
      scriptBanner.type = "text/javascript";
      scriptBanner.src = srcScript;
      conf.type = "text/javascript";
      conf.text = `atOptions = ${JSON.stringify(
        atOptions
      )}; console.log("script",atOptions);`;

      body.appendChild(conf);

      // Append to the banner container
      body.appendChild(script);
      bannerElement.appendChild(scriptBanner);

      // Cleanup function
      return () => {
        if (bannerElement) {
          bannerElement.innerHTML = ""; // Clear appended elements
        }
      };
    }
  }, []);

  return (
    <div
      // className="mx-2 border border-gray-200 justify-center items-center text-white text-center fixed bottom-2 left-0 right-0 h-[90px]"
      className="mx-2 fixed bottom-2 left-0 right-0 h-[90px]"
      ref={banner}
    ></div>
  );
};
