import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

type LocaleKey = 'de' | 'en';

type Set = {
    number: number;
    name: string;
    type: 'expansion' | 'quest';
    hasAllCards: boolean;
    releaseDate: string;
    prereleaseDate: string;
}

type Card = {
    id: number;
    number: number;
    setCode: string;
    type: string;
    color: string;
    cost: number;
    willpower?: number;
    fullName: string;
    name: string;
    version?: string;
    flavorText?: string;
    inkwell: boolean;
    lore?: number;
    rarity: string;
    subtypes?: string[];
};

export async function GET(req: Request) {
    const url = new URL(req.url);
    const key = url.searchParams.get('key');

    if (key !== process.env.INTERNAL_SYNC_KEY) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Rohdaten laden
        const dataDE: { sets: Set[]; cards: Card[] } = await fetchData('de');
        const dataEN: { sets: Set[]; cards: Card[] } = await fetchData('en');

        const setsDEArray = Object.values(dataDE.sets);
        const cardsDEArray = Object.values(dataDE.cards);
        const setsENArray = Object.values(dataEN.sets);
        const cardsENArray = Object.values(dataEN.cards);

        // Maps aufbauen
        const setsDEMap = new Map<string, Set>();
        setsDEArray.forEach(set => {
            const key = `${set.number}-${set.type}`;
            setsDEMap.set(key, set);
        });

        const cardsDEMap = new Map<number, Card>();
        cardsDEArray.forEach(card => cardsDEMap.set(card.id, card));

        // Sets mergen und an DB-Spaltennamen anpassen (case-sensitive)
        const dbSets = setsENArray.map(setEN => {
            const key = `${setEN.number}-${setEN.type}`;
            const setDE = setsDEMap.get(key);
            return {
                number: setEN.number,
                name: setEN.name,
                namegerman: setDE?.name ?? '',
                type: setEN.type,
                hasallcards: setEN.hasAllCards,
                releasedate: setEN.releaseDate,
                prereleasedate: setEN.prereleaseDate,
            };
        });

        // Karten mergen und an DB-Spaltennamen anpassen (case-sensitive)
        const dbCards = cardsENArray.map(cardEN => {
            const cardDE = cardsDEMap.get(cardEN.id);
            return {
                id: cardEN.id,
                number: cardEN.number,
                setcode: cardEN.setCode,
                type: cardEN.type,
                color: cardEN.color,
                cost: cardEN.cost,
                willpower: cardEN.willpower ?? null,
                fullname: cardEN.fullName,
                name: cardEN.name,
                version: cardEN.version ?? null,
                fullnamegerman: cardDE?.fullName ?? '',
                namegerman: cardDE?.name ?? '',
                versiongerman: cardDE?.version ?? null,
                flavortext: cardEN.flavorText ?? null,
                flavortextgerman: cardDE?.flavorText ?? null,
                inkwell: cardEN.inkwell,
                lore: cardEN.lore ?? null,
                rarity: cardEN.rarity,
                raritygerman: cardDE?.rarity ?? '',
                subtypes: cardEN.subtypes ?? null,
                subtypesgerman: cardDE?.subtypes ?? null,
            };
        });

// Speichern
        const { error: setError } = await supabase
            .from('sets')
            .upsert(dbSets, { onConflict: 'number', ignoreDuplicates: true });
        if (setError) throw new Error(`Fehler beim Speichern der Sets: ${setError.message}`);

        const { error: cardError } = await supabase
            .from('cards')
            .upsert(dbCards, { onConflict: 'id', ignoreDuplicates: true });
        if (cardError) throw new Error(`Fehler beim Speichern der Karten: ${cardError.message}`);

        return NextResponse.json({
            success: true,
        });
    } catch (error: any) {
        console.error('Sync-Fehler:', error);
        return NextResponse.json(
            { error: error.message || 'Unbekannter Fehler' },
            { status: 500 }
        );
    }
}

async function fetchData(locale: LocaleKey) {
    const response = await fetch(`https://lorcanajson.org/files/current/${locale}/allCards.json`);
    if (!response.ok) {
        throw new Error(`Fehler beim Abrufen der JSON-Datei: ${response.status}`);
    }
    return await response.json();
}