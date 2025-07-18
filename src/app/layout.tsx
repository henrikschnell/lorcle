import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { barlow } from "@/lib/fonts";
import SettingsSheet from "@/components/landing_page/SettingsSheet";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import Footer from "@/components/Footer";

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
                <meta name="google-site-verification" content="eO-qdUpzfUBpAICgku7EmDiGiV8ktHuaXtIgioMpn5w"/>
                <link rel="canonical" href="https://lorcle.net"/>
                <title>{title}</title>
            </head>
            <body className={`min-h-screen ${barlow.className}`}>
                <main className="min-h-screen w-full flex flex-col justify-between sm:p-8">
                    <NextIntlClientProvider>
                        <div>
                            <div className="w-full">
                                <SettingsSheet className="ml-auto"/>
                            </div>
                            {children}
                        </div>
                        <Footer />
                    </NextIntlClientProvider>
                </main>
            </body>
            </html>
        </>
    );
}
