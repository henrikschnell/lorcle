import { supabase } from '@/lib/db';
import { Card } from '@/types/card';
import seedrandom from 'seedrandom';

export async function getTodaysCard(date = new Date()): Promise<Card> {
    const dateToday = date.toISOString().split('T')[0];
    console.log('--- getTodaysCard.ts: called ---');
    console.log(`--- getTodaysCard.ts: Datum: ${dateToday} ---`);

    const { data: historyEntry, error: historyError } = await supabase
        .from('history')
        .select(`
            card_id,
            cards (
                *,
                sets (name, namegerman)
            )
        `)
        .eq('date', dateToday)
        .single();

    console.log(`--- getTodaysCard.ts: HistoryEntry: ${historyEntry} ---`);

    if (!historyError && historyEntry?.cards) {
        return historyEntry.cards[0] as Card;
    }

    // Fallback
    console.warn(`--- getTodaysCard.ts: Keine Karte für ${dateToday} gefunden. Fallback wird durchlaufen ---`);

    const { data: cards, error: cardsError } = await supabase
        .from('cards')
        .select('*, sets(name, namegerman)')
        .order('name', { ascending: true });

    if (cardsError || !cards) {
        throw new Error('Failed to fetch cards for fallback generation');
    }

    const salt = 'uAnkHJmSgX';
    const rng = seedrandom(dateToday + salt);
    const index = Math.floor(rng() * cards.length);

    return cards[index] as Card;
}
