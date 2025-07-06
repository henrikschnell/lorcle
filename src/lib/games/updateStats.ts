import { supabase } from "@/lib/db";

export async function incrementCorrectGuesses(): Promise<void> {
    const today = new Date().toISOString().split('T')[0];

    const { error } = await supabase
        .rpc('increment_correct_guesses_classic', {
            date_param: today
        });

    if (error) {
        console.error("Fehler beim Inkrementieren des Counters in der Datenbank", error);
        throw error;
    }
}