import React from "react";
import GameBoard from "@/components/games/GameBoard";
import { getCardsFromHistory } from "@/lib/games/getCardsFromHistory";
import { getAllCards } from "@/lib/games/getCards";
import { getClassicCount } from "@/lib/games/getStats";

export default async function Home() {
    const [relevantCards, allCards, guessCount] = await Promise.all([
        getCardsFromHistory(),
        getAllCards(),
        getClassicCount(),
    ]);

    return (
        <div className="flex flex-col justify-center items-center gap-10">
            <GameBoard cards={allCards} todaysCard={relevantCards[1]} yesterdaysCard={relevantCards[0]} guessCount={guessCount}/>
        </div>
    );
}
