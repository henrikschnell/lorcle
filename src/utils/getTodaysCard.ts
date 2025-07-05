import { supabase } from '@/lib/db';
import { Card } from '@/types/card';
import seedrandom from 'seedrandom';

export async function getTodaysCard(date = new Date()): Promise<Card> {
    console.log('--- Function getTodaysCard called ---');
    const dateToday = date.toISOString().split('T')[0];

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
        console.log(historyEntry);
        return historyEntry.cards[0] as Card;
    }

    // Fallback
    console.log(`No card found in history for ${dateToday}, falling back to generation`);

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
