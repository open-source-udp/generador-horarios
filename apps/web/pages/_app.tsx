import type { AppProps } from "next/app";
import ThemeProvider from "@/providers/Theme";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
  );
}
export default MyApp;
