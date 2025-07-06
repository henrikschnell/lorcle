import type { Metadata } from "next";

import "./globals.css";

import React from "react";
import { barlow } from "@/lib/fonts";

const title = "Lorcle: Guess the Lorcana Card - Daily Puzzle Game!";

export const metadata: Metadata = {
  title: title,
  description: "Lorcle: The ultimate free daily Disney Lorcana card guessing game! Uncover mystery cards from all sets, including The First Chapter & Into the Inklands. A fun, Wordle-style puzzle for Lorcana TCG fans. Play now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
          <html lang="en" suppressHydrationWarning>
          <head>
              <meta name="google-site-verification" content="eO-qdUpzfUBpAICgku7EmDiGiV8ktHuaXtIgioMpn5w" />
              <link rel="canonical" href="https://lorcle.net"/>
              <title>{title}</title>
          </head>
          <body className={barlow.className}>
              <main className="p-4">
                  {/*
                      <ThemeProvider
                          attribute="class"
                          defaultTheme="system"
                          enableSystem
                          disableTransitionOnChange
                      >
                          <div className="flex justify-end">
                              <ModeToggle />
                          </div>
                          {children}
                      </ThemeProvider>
                  */}
                  {children}
              </main>
          </body>
          </html>
      </>
  );
}
