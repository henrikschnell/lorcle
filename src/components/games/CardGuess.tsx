'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizontal } from 'lucide-react';
import { Card } from '@/types/card';

type Props = {
    todaysCard: Card;
    cards: Card[];
    onGuess?: (guessedCard: Card) => void;
    guessHistory?: Card[];
};

export default function CardGuess({ todaysCard, cards, onGuess, guessHistory }: Props) {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<Card[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Compare the input card name to today's card fullname
        const userGuess = inputValue.trim();
        const todaysCardName = todaysCard.fullname;

        console.log('User guess:', userGuess);
        console.log('Today\'s card fullname:', todaysCardName);
        console.log('Match:', userGuess.toLowerCase() === todaysCardName.toLowerCase());

        // Find the guessed card and add to history
        const guessedCard = cards.find(card => 
            card.fullname.toLowerCase() === userGuess.toLowerCase()
        );

        if (guessedCard && onGuess) {
            onGuess(guessedCard);
        }

        // Clear input and hide suggestions after submission
        setInputValue('');
        setShowSuggestions(false);
        setSuggestions([]);
        setActiveSuggestionIndex(-1);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        if (value.trim().length > 0) {
            // Karten auf Basis der Suche filtern (maximal 30 Vorschläge werden angezeigt)
            const filteredCards = cards
                .filter(
                    card =>
                        !(guessHistory ?? []).some(guessed => guessed.id === card.id) && // exclude already guessed
                        (
                            card.fullname.toLowerCase().includes(value.toLowerCase()) ||
                            card.name.toLowerCase().includes(value.toLowerCase())
                        )
                )
                .slice(0, 30);

            setSuggestions(filteredCards);
            setShowSuggestions(true);
            setActiveSuggestionIndex(-1);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
            setActiveSuggestionIndex(-1);
        }
    };

    const handleSuggestionClick = (cardName: string) => {
        // Hide suggestions immediately
        setShowSuggestions(false);
        setSuggestions([]);
        setActiveSuggestionIndex(-1);

        // Directly check if the suggestion matches today's card
        const userGuess = cardName.trim();
        const todaysCardName = todaysCard.fullname;

        console.log('User guess:', userGuess);
        console.log('Today\'s card fullname:', todaysCardName);
        console.log('Match:', userGuess.toLowerCase() === todaysCardName.toLowerCase());

        // Find the guessed card and add to history
        const guessedCard = cards.find(card => 
            card.fullname.toLowerCase() === userGuess.toLowerCase()
        );

        if (guessedCard && onGuess) {
            onGuess(guessedCard);
        }

        // Keep input field clear - don't set the selected value
        setInputValue('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showSuggestions || suggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setActiveSuggestionIndex(prev => 
                    prev < suggestions.length - 1 ? prev + 1 : 0
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setActiveSuggestionIndex(prev => 
                    prev > 0 ? prev - 1 : suggestions.length - 1
                );
                break;
            case 'Enter':
                if (activeSuggestionIndex >= 0) {
                    e.preventDefault();
                    handleSuggestionClick(suggestions[activeSuggestionIndex].fullname);
                }
                break;
            case 'Escape':
                setShowSuggestions(false);
                setActiveSuggestionIndex(-1);
                break;
        }
    };

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                inputRef.current && 
                !inputRef.current.contains(event.target as Node) &&
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
                setActiveSuggestionIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative w-full">
            <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
                <div className="relative flex-1">
                    <Input 
                        ref={inputRef}
                        type="text" 
                        placeholder="Enter a card name" 
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                    />

                    {showSuggestions && suggestions.length > 0 && (
                        <div 
                            ref={suggestionsRef}
                            className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto bg-gray-800 border border-gray-600 rounded-lg shadow-lg"
                        >
                            {suggestions.map((card, index) => (
                                <div
                                    key={card.id}
                                    className={`px-4 py-2 cursor-pointer transition-colors ${
                                        index === activeSuggestionIndex 
                                            ? 'bg-[#d3ba84]/20 text-[#d3ba84]' 
                                            : 'text-gray-300 hover:bg-gray-700'
                                    }`}
                                    onClick={() => handleSuggestionClick(card.fullname)}
                                >
                                    <div className="text-sm font-medium">{card.fullname}</div>
                                    {card.fullname !== card.name && (
                                        <div className="text-xs text-gray-400">{card.name}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <Button 
                    type="submit" 
                    variant="outline" 
                    size="icon" 
                    className="size-8"
                >
                    <SendHorizontal />
                </Button>
            </form>
        </div>
    );
}
