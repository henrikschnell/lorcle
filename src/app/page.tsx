import React from "react";

export default async function Home() {
    /*
    const [relevantCards, allCards, guessCount] = await Promise.all([
        getCardsFromHistory(),
        getAllCards(),
        getClassicCount(),
    ]);
    */

    return (
        /*
        <div className="flex flex-col justify-center items-center gap-10">
            <GameBoard cards={allCards} todaysCard={relevantCards[1]} yesterdaysCard={relevantCards[0]} guessCount={guessCount}/>
        </div>
         */
        <div className="flex justify-center items-center h-100 text-3xl">
            <p className="text-accent text-center leading-20">
                - Under Maintenance -
                <br/>
                Sorry for the inconvenience!
            </p>
        </div>
    );
}
