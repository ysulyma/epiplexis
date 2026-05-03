import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="dark:bg-stone-800 dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
