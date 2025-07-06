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
    const [gameState, setGameState] = useState<'playing' | 'win'>('playing')
    const [totalGuessCount, setTotalGuessCount] = useState(guessCount);

    const handleGuess = async (guessedCard: Card) => {
        setGuessHistory(prev => [guessedCard, ...prev]);
        if (guessedCard.id === todaysCard.id) {
            setGameState('win');
            setTotalGuessCount(count => count + 1);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/stats/incrementguesses`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (err) {
                console.error("Fehler beim Beendes des Spiels:", err);
            }
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-1/3">
                {
                    gameState !== 'win' && (
                        <CardGuess
                            todaysCard={todaysCard}
                            cards={cards}
                            onGuess={handleGuess}
                            guessHistory={guessHistory}
                        />
                    )
                }
                <GuessCounter count={totalGuessCount} />
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
