import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import seedrandom from 'seedrandom';
import { revalidateTag } from 'next/cache';

export async function GET(req: Request) {
    if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const today = new Date().toISOString().split('T')[0];

        // Prüfung, ob für die heutige Karte schon ein Eintrag existiert
        const { data: existingCard } = await supabase
            .from('history')
            .select('*')
            .eq('date', today)
            .single();

        if (existingCard) {
            return NextResponse.json({ 
                message: 'Card fetched',
                cardId: existingCard.card_id,
                date: today 
            });
        }

        // Kein Eintrag zur heutigen Karte gefunden. Startet das Aussuchen einer Karte
        const { data: cards, error: cardsError } = await supabase
            .from('cards')
            .select('*');

        if (cardsError || !cards) {
            throw new Error('Failed to fetch cards');
        }

        const salt = 'uAnkHJmSgX';
        const rng = seedrandom(today + salt);
        const index = Math.floor(rng() * cards.length);
        const todaysCard = cards[index];

        // Speichern der heutigen Karte in der Datenbank
        const { error: insertError } = await supabase
            .from('history')
            .insert({
                date: today,
                card_id: todaysCard.id
            });

        if (insertError) {
            throw new Error(`Failed to save card to history: ${insertError.message}`);
        }

        // Cache invalidieren, nachdem eine neue Karte erzeugt wurde
        revalidateTag('todays-card');

        return NextResponse.json({ 
            message: 'Successfully generated and saved today\'s card',
            cardId: todaysCard.id,
            date: today 
        });

    } catch (error) {
        console.error('Cron job error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
