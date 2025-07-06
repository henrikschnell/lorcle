'use client';

import React, { useState } from 'react';
import { Card } from '@/types/card';
import CardGuess from '@/components/games/CardGuess';
import GuessHeader from '@/components/games/GuessHeader';
import GuessRow from '@/components/games/GuessRow';
import GuessCounter from "@/components/games/GuessCounter";

type Props = {
    todaysCard: Card;
    cards: Card[];
    guessCount: number;
};

export default function ClassicGame({ todaysCard, cards, guessCount }: Props) {
    const [guessHistory, setGuessHistory] = useState<Card[]>([]);

    const handleGuess = (guessedCard: Card) => {
        setGuessHistory(prev => [guessedCard, ...prev]);
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-1/3">
                <CardGuess 
                    todaysCard={todaysCard} 
                    cards={cards} 
                    onGuess={handleGuess}
                    guessHistory={guessHistory}
                />
                <GuessCounter count={guessCount} />
                {
                    guessHistory.length > 0 && (
                        <>
                            <GuessHeader />
                            <div id="history" className="h-108 overflow-y-scroll snap-y mt-6">
                                {guessHistory.map((card, index) => (
                                    <GuessRow
                                        key={`${card.id}-${index}`}
                                        card={card}
                                        todaysCard={todaysCard}
                                        animate={index === 0} // Only animate the newest row
                                    />
                                ))}
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
}
