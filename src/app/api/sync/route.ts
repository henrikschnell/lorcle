import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { validateApiKeyAuth } from '@/utils/auth';

type LocaleKey = 'de' | 'en';

type Set = {
    setcode: string;
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
    images: {
        full: string;
        thumbnail: string;
        foilMask: string;
    };
};

export async function GET(req: Request) {
    const authError = validateApiKeyAuth(req);
    if (authError) {
        return authError;
    }

    try {
        // Rohdaten laden
        const dataDE: { sets: Set[]; cards: Card[] } = await fetchData('de');
        const dataEN: { sets: Set[]; cards: Card[] } = await fetchData('en');

        const cardsDEArray = Object.values(dataDE.cards);
        const cardsENArray = Object.values(dataEN.cards);

        // Maps aufbauen
        const setsDEMap = new Map<string, Set>();
        Object.entries(dataDE.sets).forEach(([key, set]) => {
            setsDEMap.set(key, set);
        });

        const cardsDEMap = new Map<number, Card>();
        cardsDEArray.forEach(card => cardsDEMap.set(card.id, card));

        const dbSets = Object.entries(dataEN.sets).map(([setcode, setEN]) => {
            const setDE = setsDEMap.get(setcode);
            return {
                setcode, // ← actual key from setsEN object
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
                image_full: cardEN.images.full ?? '',
                image_thumbnail: cardEN.images.thumbnail ?? '',
                image_foilmask: cardEN.images.foilMask ?? '',
            };
        });

        // Insert in die Datenbank, Dubletten werden ignoriert
        const { error: setError } = await supabase
            .from('sets')
            .upsert(dbSets, { onConflict: 'setcode', ignoreDuplicates: true });
        if (setError) throw new Error(`Fehler beim Speichern der Sets: ${setError.message}`);

        const { error: cardError } = await supabase
            .from('cards')
            .upsert(dbCards, { onConflict: 'id', ignoreDuplicates: true });
        if (cardError) throw new Error(`Fehler beim Speichern der Karten: ${cardError.message}`);

        return NextResponse.json({
            success: true,
        });
    } catch (error: unknown) {
        let errorMessage = 'Unbekannter Fehler';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error('Sync-Fehler:', error);
        return NextResponse.json(
            { error: errorMessage },
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
