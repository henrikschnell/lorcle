'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/types/card';
import CardGuess from '@/components/games/CardGuess';
import GuessHeader from '@/components/games/GuessHeader';
import GuessRow from '@/components/games/GuessRow';
import GuessCounter from "@/components/games/GuessCounter";
import { 
    getGameState, 
    updateGuessHistory, 
    updateGameStateStatus, 
    isGameStateValidForCard 
} from '@/utils/localStorage';

type Props = {
    todaysCard: Card;
    cards: Card[];
    guessCount: number;
};

export default function ClassicGame({ todaysCard, cards, guessCount }: Props) {
    const [guessHistory, setGuessHistory] = useState<Card[]>([]);
    const [gameState, setGameState] = useState<'playing' | 'win'>('playing')
    const [totalGuessCount, setTotalGuessCount] = useState(guessCount);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load saved state from localStorage on component mount
    useEffect(() => {
        const savedState = getGameState('classic');

        if (savedState && isGameStateValidForCard(savedState, todaysCard.id)) {
            // Restore saved state if it's for the current card
            setGuessHistory(savedState.guessHistory);
            setGameState(savedState.state);
        }

        setIsLoaded(true);
    }, [todaysCard.id]);

    const handleGuess = async (guessedCard: Card) => {
        const newGuessHistory = [guessedCard, ...guessHistory];
        setGuessHistory(newGuessHistory);

        // Save guess to localStorage
        updateGuessHistory('classic', guessedCard, todaysCard.id);

        if (guessedCard.id === todaysCard.id) {
            setGameState('win');
            setTotalGuessCount(count => count + 1);

            // Save win state to localStorage
            updateGameStateStatus('classic', 'win', todaysCard.id);

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

    // Don't render until localStorage state is loaded
    if (!isLoaded) {
        return (
            <div className="flex flex-col justify-center items-center">
                <div className="w-1/3">
                    <div className="text-center">Loading...</div>
                </div>
            </div>
        );
    }

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
