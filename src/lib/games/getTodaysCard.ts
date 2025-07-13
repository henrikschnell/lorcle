import { supabase } from '@/lib/db';
import type { Card, Set } from '@/types/card';

type HistoryEntry = {
    card_id: number;
    cards: Card & { sets: Set };
};

/**
 * Ruft die heutige Karte aus der Historien-Tabelle ab
 * @returns {Promise<Card>} Die heutige Karte
 * @throws Error Wenn keine Karte gefunden werden konnte oder es einen Fehler in der Query gibt
 */
export async function getTodaysCard(): Promise<Card> {
    const dateToday = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
        .from('history')
        .select(
            `card_id,
     cards (
       id, type, setcode, color, cost,
       fullname, name, version,
       fullnamegerman, versiongerman, namegerman,
       flavortext, flavortextgerman,
       rarity, raritygerman,
       image_full, image_thumbnail,
       sets (name, namegerman)
     )`
        )
        .eq('date', dateToday)
        .single<HistoryEntry>();

    if (error) {
        throw new Error(`Abrufen der Historie fehlgeschlagen: ${error.message}`);
    }

    if (!data?.cards) {
        throw new Error(`Es konnte keine Karte für das heutige Datum gefunden werden: ${dateToday}`);
    }

    return data.cards;
}