'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/types/card';
import CardGuess from '@/components/games/CardGuess';
import GuessHeader from '@/components/games/GuessHeader';
import GuessRow from '@/components/games/GuessRow';
import GuessCounter from "@/components/games/GuessCounter";
import { getGameState, updateGameStateStatus, updateGuessHistory } from '@/utils/localStorage';
import YesterdaysCard from "@/components/games/YesterdaysCard";
import LorcleLogo from "@/components/Logo";
import { incrementCorrectGuesses } from "@/utils/api";

type Props = {
    todaysCard: Card;
    yesterdaysCard: Card;
    cards: Card[];
    guessCount: number;
    logoClick: () => void;
};

export default function ClassicGame({ todaysCard, yesterdaysCard, cards, guessCount, logoClick }: Props) {
    const [guessHistory, setGuessHistory] = useState<Card[]>([]);
    const [gameState, setGameState] = useState<'playing' | 'win'>('playing')
    const [totalGuessCount, setTotalGuessCount] = useState(guessCount);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedState = getGameState('classic');

        if (savedState) {
            setGuessHistory(savedState.guessHistory);
            setGameState(savedState.state);
        }

        setIsLoaded(true);
    }, []);

    const handleGuess = async (guessedCard: Card) => {
        const newGuessHistory = [guessedCard, ...guessHistory];
        setGuessHistory(newGuessHistory);
        updateGuessHistory('classic', guessedCard);

        if (guessedCard.id === todaysCard.id) {
            setGameState('win');
            setTotalGuessCount(count => count + 1);
            updateGameStateStatus('classic', 'win');

            try {
                await incrementCorrectGuesses();
            } catch (err) {
                console.error('Fehler beim Inkrementieren des Counters:', err);
            }
        }
    };

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
        <>
            <LorcleLogo onClick={logoClick}/>
            <div className="flex flex-col">
                <GuessCounter count={totalGuessCount}/>
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
                {
                    guessHistory.length > 0 && (
                        <>
                            <GuessHeader/>
                            <div id="history" className="h-108 overflow-y-auto snap-y mt-6">
                                {guessHistory.map((card, index) => (
                                    <GuessRow
                                        key={`${card.id}`}
                                        card={card}
                                        todaysCard={todaysCard}
                                        animate={index === 0 && gameState !== 'win'}
                                    />
                                ))}
                            </div>
                        </>
                    )
                }
                <YesterdaysCard card={yesterdaysCard}/>
            </div>
        </>
    );
}
