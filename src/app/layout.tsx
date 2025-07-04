import type { Metadata } from "next";
import "./globals.css";
import {dynapuff} from "@/lib/fonts";

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
    <html lang="en">
      <head>
          <meta name="google-site-verification" content="eO-qdUpzfUBpAICgku7EmDiGiV8ktHuaXtIgioMpn5w" />
          <title>{title}</title>
      </head>
      <body className={dynapuff.className}>
        {children}
      </body>
    </html>
  );
}
