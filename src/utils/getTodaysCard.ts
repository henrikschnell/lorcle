import { supabase } from '@/lib/db';
import { Card } from '@/types/card';
import seedrandom from 'seedrandom';

export async function getTodaysCard(date = new Date()): Promise<Card> {
    const dateToday = date.toISOString().split('T')[0];

    try {
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

        if (!historyError && historyEntry?.cards) {
            return historyEntry.cards as unknown as Card;
        }
    } catch (error) {
        console.error('--- getTodaysCard.ts: Error in history query:', error);
    }

    // Fallback
    console.warn(`--- Keine Karte für ${dateToday} gefunden. Fallback wird durchlaufen ---`);

    try {
        const { data: cards, error: cardsError } = await supabase
            .from('cards')
            .select('*, sets(name, namegerman)')
            .order('name', { ascending: true });

        if (cardsError || !cards) {
            throw new Error('Fallback Erzeugung fehlgeschlagen');
        }

        const salt = 'uAnkHJmSgX';
        const rng = seedrandom(dateToday + salt);
        const index = Math.floor(rng() * cards.length);

        return cards[index] as Card;
    } catch (error) {
        throw error;
    }
}
