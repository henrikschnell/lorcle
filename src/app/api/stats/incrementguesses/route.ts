import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function POST() {
    console.log('Inkrementierungsfunktion aufgerufen');
    try {
        const date_param = new Date().toISOString().split('T')[0];
        const { error } = await supabase.rpc(
            'increment_correct_guesses_classic',
            { date_param }
        );

        if (error) {
            console.error(
                'Fehler beim Inkrementieren des Counters in der Datenbank',
                error
            );
            return NextResponse.json(
                { error: 'Failed to increment correct guesses' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('API error:', err);
        const message = err instanceof Error ? err.message : 'Unknown error';
        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}