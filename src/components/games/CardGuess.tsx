'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizontal } from 'lucide-react';
import { Card } from '@/types/card';
import { useLocale, useTranslations } from 'next-intl';

type Props = {
    todaysCard: Card;
    cards: Card[];
    onGuess?: (guessedCard: Card) => void;
    guessHistory?: Card[];
};

export default function CardGuess({ todaysCard, cards, onGuess, guessHistory }: Props) {
    const t = useTranslations('Games');
    const locale = useLocale();
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<Card[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const userGuess = inputValue.trim();

        if (suggestions.length > 0) {
            const firstSuggestion = suggestions[0];
            if (onGuess) {
                onGuess(firstSuggestion);
            }
        } else {
            const matchingCards = cards.filter(card => 
                card.fullname.toLowerCase() === userGuess.toLowerCase()
            );

            let guessedCard: Card | undefined;

            if (matchingCards.length === 1) {
                guessedCard = matchingCards[0];
            } else if (matchingCards.length > 1) {
                const todaysCardMatch = matchingCards.find(card => 
                    card.fullname.toLowerCase() === todaysCard.fullname.toLowerCase() &&
                    card.rarity === todaysCard.rarity
                );
                guessedCard = todaysCardMatch || matchingCards[0];
            }

            if (guessedCard && onGuess) {
                onGuess(guessedCard);
            }
        }

        // Clear input and hide suggestions after submission
        setInputValue('');
        setShowSuggestions(false);
        setSuggestions([]);
        setActiveSuggestionIndex(-1);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        setInputValue(raw);

        const searchValue = raw.trim().toLowerCase(); // <- Normalisierung

        if (searchValue.length > 0) {
            const startsWith = cards.filter(card =>
                !(guessHistory ?? []).some(g => g.id === card.id) &&
                (
                    card.fullname.toLowerCase().startsWith(searchValue) ||
                    card.name    .toLowerCase().startsWith(searchValue)
                )
            );

            const startsWithIds = new Set(startsWith.map(c => c.id));

            const includes = cards.filter(card =>
                !(guessHistory ?? []).some(g => g.id === card.id) &&
                !startsWithIds.has(card.id) &&
                (
                    card.fullname.toLowerCase().includes(searchValue) ||
                    card.name    .toLowerCase().includes(searchValue)
                )
            );

            const filteredCards = [...startsWith, ...includes]
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

    const handleSuggestionClick = (selectedCard: Card) => {
        setShowSuggestions(false);
        setSuggestions([]);
        setActiveSuggestionIndex(-1);

        if (onGuess) {
            onGuess(selectedCard);
        }

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
                    handleSuggestionClick(suggestions[activeSuggestionIndex]);
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
                <div className="flex-1">
                    <Input 
                        ref={inputRef}
                        type="text" 
                        placeholder={t('card_search')}
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
                                    onClick={() => handleSuggestionClick(card)}
                                >
                                    <div className="text-sm font-medium">{`${locale === 'de' ? card.fullnamegerman : card.fullname} (${locale === 'de' ? card.raritygerman : card.rarity})`}</div>
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
