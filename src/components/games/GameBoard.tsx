'use client'

import { Card } from '@/types/card';
import React, { useState } from "react";
import ModeSelect from '../landing_page/ModeSelect';
import ClassicGame from "@/components/games/ClassicGame";
import LorcleLogo from "@/components/Logo";
import UnderConstruction from "@/components/UnderConstruction";

type Mode = 'classic' | 'timeattack' | 'duel' | 'flavour';

type Props = {
    cards: Card[];
    todaysCard: Card;
    yesterdaysCard: Card;
    guessCount: number;
}

export default function GameBoard({ cards, todaysCard, yesterdaysCard, guessCount }: Props) {
    const [activeMode, setActiveMode] = useState<Mode | ''>('');

    function handleModeSelection(mode: Mode) {
        setActiveMode(mode);
    }

    function handleLogoClick() {
        setActiveMode('');
    }

    function renderGameView(activeMode: Mode) {
        switch (activeMode) {
            case 'classic':
                return <ClassicGame cards={cards} todaysCard={todaysCard} yesterdaysCard={yesterdaysCard} guessCount={guessCount} logoClick={handleLogoClick}/>
            case 'timeattack':
                return <UnderConstruction logoClick={handleLogoClick}/>
            case 'duel':
                return <UnderConstruction logoClick={handleLogoClick}/>
            case 'flavour':
                return <UnderConstruction logoClick={handleLogoClick}/>
            default:
                return <UnderConstruction logoClick={handleLogoClick}/>
        }
    }

    return activeMode === '' ? (
        <>
            <LorcleLogo onClick={handleLogoClick}/>
            <div className="flex flex-col gap-5">
                <ModeSelect mode="classic" label="Classic" description="Guess the card with clues" onClick={handleModeSelection}/>
                <ModeSelect mode="timeattack" label="Time Attack" description="How quick are you?" onClick={handleModeSelection}/>
                <ModeSelect mode="duel" label="Duel" description="Challenge your friends!" onClick={handleModeSelection}/>
                <ModeSelect mode="flavour" label="Flavour" description="Who said that?" onClick={handleModeSelection}/>
            </div>
        </>
    ) : (
        renderGameView(activeMode)
    );
}