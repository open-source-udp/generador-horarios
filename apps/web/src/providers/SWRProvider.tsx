"use client";
import { PropsWithChildren, memo } from "react";
import { SWRConfig } from "swr";

function localStorageProvider() {
  if (typeof window === "undefined") return new Map();
  // When initializing, we restore the data from `localStorage` into a map.
  const map = new Map<any, any>(
    JSON.parse(localStorage.getItem("app-cache") || "[]")
  );

  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener("beforeunload", () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem("app-cache", appCache);
  });

  // We still use the map for write & read for performance.
  return map;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const SWRProvider: React.FC<PropsWithChildren> = memo(
  function LocalStorageSWRConfig({ children }) {
    return (
      <SWRConfig
        value={{
          fetcher,
          provider: localStorageProvider,
        }}
      >
        {children}
      </SWRConfig>
    );
  }
);

export default SWRProvider;
