import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import seedrandom from 'seedrandom';

export async function GET(req: Request) {
    if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowFormatted = tomorrow.toISOString().split('T')[0];

        // Prüfung, ob für die heutige Karte schon ein Eintrag existiert
        const { data: existingCard } = await supabase
            .from('history')
            .select('*')
            .eq('date', tomorrowFormatted)
            .single();

        if (existingCard) {
            return NextResponse.json({ 
                message: 'Nächste Karte bereits vorhanden',
                cardId: existingCard.card_id,
                date: existingCard.date
            });
        }

        // Kein Eintrag zur nächsten Karte gefunden
        const { data: cards, error: cardsError } = await supabase
            .from('cards')
            .select('*');

        if (cardsError || !cards) {
            throw new Error('Fehler beim Abrufen aller Karten');
        }

        const salt = process.env.SEED_SALT;
        const rng = seedrandom(tomorrowFormatted + salt);
        const index = Math.floor(rng() * cards.length);
        const nextCard = cards[index];

        // Speichern der morgigen Karte in der Datenbank
        const { error: insertError } = await supabase
            .from('history')
            .insert({
                date: tomorrowFormatted,
                card_id: nextCard.id
            });

        if (insertError) {
            throw new Error(`Fehler beim Speichern der Karte in der Historie: ${insertError.message}`);
        }

        return NextResponse.json({
            message: 'Morgige Karte erfolgreich generiert',
            cardId: nextCard.id,
            date: tomorrowFormatted
        });

    } catch (error) {
        console.error('Cron job error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
