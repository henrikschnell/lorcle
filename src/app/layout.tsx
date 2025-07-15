import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { barlow } from "@/lib/fonts";
import SettingsSheet from "@/components/landing_page/SettingsSheet";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";

const title = "Lorcle: Guess the Lorcana Card - Daily Puzzle Game!";

export const metadata: Metadata = {
  title: title,
  description: "Lorcle: The ultimate free daily Disney Lorcana card guessing game! Uncover mystery cards from all sets, including The First Chapter & Into the Inklands. A fun, Wordle-style puzzle for Lorcana TCG fans. Play now!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const locale = await getLocale();
    return (
        <>
            <html lang={locale} suppressHydrationWarning>
            <head>
                <meta name="google-site-verification" content="eO-qdUpzfUBpAICgku7EmDiGiV8ktHuaXtIgioMpn5w" />
                <link rel="canonical" href="https://lorcle.net"/>
                <title>{title}</title>
            </head>
            <body className={`${barlow.className}`}>
                <main className="w-full mt-12">
                    <NextIntlClientProvider>{children}</NextIntlClientProvider>
                </main>
                <footer className="w-full flex flex-col items-center gap-3 fixed bottom-4">
                    <NextIntlClientProvider><SettingsSheet /></NextIntlClientProvider>
                    <p className="text-accent">&copy; Lorcle.net 2025 - Version 1.0</p>
                </footer>
            </body>
            </html>
        </>
    );
}
