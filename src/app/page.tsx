import React from "react";
import GameBoard from "@/components/games/GameBoard";
import { getCardsFromHistory } from "@/lib/games/getCardsFromHistory";
import { getAllCards } from "@/lib/games/getCards";
import { getClassicCount } from "@/lib/games/getStats";
import { getTranslations } from "next-intl/server";

export default async function Home() {
    const t = await getTranslations('Home');

    const [relevantCards, allCards, guessCount] = await Promise.all([
        getCardsFromHistory(),
        getAllCards(),
        getClassicCount(),
    ]);

    return (
        <div className="flex flex-col justify-center items-center gap-10">
            <h1>{t('title')}</h1>
            <GameBoard cards={allCards} todaysCard={relevantCards[1]} yesterdaysCard={relevantCards[0]} guessCount={guessCount}/>
        </div>
    );
}
