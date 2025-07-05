interface Card {
    id: number;
    number: number;
    setcode: string;
    type: string;
    color: string;
    cost: number;
    willpower: number | null;
    fullname: string;
    name: string;
    version: string | null;
    fullnamegerman: string;
    namegerman: string;
    versiongerman: string | null;
    flavortext: string;
    flavortextgerman: string;
    inkwell: boolean;
    lore: string | null;
    rarity: string;
    raritygerman: string;
    subtypes: string | null;
    subtypesgerman: string | null;
}

export async function getAllCards(): Promise<Card[]> {
    const CACHE_TTL = 43200;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cards`, {
        next: { revalidate: CACHE_TTL },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch cards');
    }

    return await res.json();
}