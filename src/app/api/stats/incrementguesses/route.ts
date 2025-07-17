import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function POST() {
    try {
        const today = new Date().toISOString().split('T')[0];

        const { error } = await supabase
            .rpc('increment_correct_guesses_classic', {
                date_param: today
            });

        if (error) {
            console.error("Fehler beim Inkrementieren des Counters in der Datenbank", error);
            return NextResponse.json(
                { error: 'Failed to increment correct guesses' },
                { status: 500 }
            );
        } else {
            console.log('Counter erfolgreich inkrementiert');
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}