import "../pages/global.css";

import Script from "next/script";

import { darkModeScript } from "@/lib/api/dark-mode-server.ts";

import { Providers } from "./providers.tsx";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <meta content="light dark" id="meta-color-scheme" name="color-scheme" />
        <style
          // biome-ignore lint/security/noDangerouslySetInnerHtml: ampersand should not be sanitized
          dangerouslySetInnerHTML={{
            __html: `:root {
  color-scheme: light;

  &.dark {
    color-scheme: dark;
  }
}`,
          }}
        />
        <Script id="dark-mode-script">{darkModeScript}</Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
