import { supabase } from '@/lib/db';
import type { Card, Set } from '@/types/card';

type HistoryEntry = {
    card_id: number;
    cards: Card & { sets: Set };
};

/**
 * Ruft die gestrige und heutige Karte aus der Historien-Tabelle ab
 * @returns {Promise<Card[]>} Ein Array mit zwei Karten: [gestern, heute]
 * @throws Error Wenn eine der Karten nicht gefunden werden konnte oder es einen Query-Fehler gibt
 */
export async function getCardsFromHistory(): Promise<Card[]> {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const dates = [yesterday, today].map(d => d.toISOString().split('T')[0]);

    const { data, error } = await supabase
        .from('history')
        .select(`
      card_id,
      cards (
        id, type, setcode, color, cost,
        fullname, name, version,
        fullnamegerman, versiongerman, namegerman,
        flavortext, flavortextgerman,
        rarity, raritygerman,
        image_full, image_thumbnail,
        sets (name, namegerman)
      )
    `)
        .in('date', dates)
        .order('date', { ascending: true });

    if (error) {
        throw new Error(`Abrufen der Historie fehlgeschlagen: ${error.message}`);
    }
    if (!data) {
        throw new Error('Es wurden keine History-Einträge zurückgegeben.');
    }

    const historyEntries = data as unknown as HistoryEntry[];

    if (historyEntries.length < 2) {
        throw new Error(
            `Es konnten nicht beide Karten für ${dates.join(' und ')} gefunden werden.`
        );
    }

    // historyEntries[0] → gestern, historyEntries[1] → heute
    return historyEntries.map(entry => entry.cards);
}
