import { supabase } from "@/lib/db";
import { Card } from "@/types/card";

export async function getAllCards(): Promise<Card[]> {
    const { data, error } = await supabase
        .from('cards')
        .select('id, type, setcode, color, cost, fullname, name, version, fullnamegerman, versiongerman, namegerman, flavortext, flavortextgerman, rarity, raritygerman, image_full, image_thumbnail, sets(name, namegerman)')
        .order('name', { ascending: true });

    if (error) {
        console.error('Fehler beim Abrufen der Karten:', error);
        return [];
    }

    return data as unknown as Card[];
}
