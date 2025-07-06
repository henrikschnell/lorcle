import { supabase } from "@/lib/db";

export async function getClassicCount(): Promise<number> {
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
        .from('history')
        .select('total_correct_guesses')
        .eq('date', today)
        .single();

    if (error) {
        console.error("Error fetching guess count:", error);
        return 0;
    }

    return data?.total_correct_guesses ?? 0;
}
