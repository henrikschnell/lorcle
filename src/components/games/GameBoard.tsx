'use client'

import { Card } from '@/types/card';
import React, { useState } from "react";
import ModeSelect from '../landing_page/ModeSelect';
import ClassicGame from "@/components/games/ClassicGame";
import LorcleLogo from "@/components/Logo";
import UnderConstruction from "@/components/UnderConstruction";
import { useTranslations } from "next-intl";

type Mode = 'classic' | 'timeattack' | 'duel' | 'flavor';

type Props = {
    cards: Card[];
    todaysCard: Card;
    yesterdaysCard: Card;
    guessCount: number;
}

export default function GameBoard({ cards, todaysCard, yesterdaysCard, guessCount }: Props) {
    const t = useTranslations('Games');
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
            case 'flavor':
                return <UnderConstruction logoClick={handleLogoClick}/>
            default:
                return <UnderConstruction logoClick={handleLogoClick}/>
        }
    }

    return activeMode === '' ? (
        <>
            <LorcleLogo onClick={handleLogoClick}/>
            <div className="flex flex-col gap-5">
                <ModeSelect mode="classic" label={t('classic_title')} description={t('classic_description')} onClick={handleModeSelection}/>
                <ModeSelect mode="timeattack" label={t('timeattack_title')} description={t('timeattack_description')} onClick={handleModeSelection}/>
                <ModeSelect mode="duel" label={t('duel_title')} description={t('duel_description')} onClick={handleModeSelection}/>
                <ModeSelect mode="flavor" label={t('flavor_title')} description={t('flavor_description')} onClick={handleModeSelection}/>
            </div>
        </>
    ) : (
        renderGameView(activeMode)
    );
}