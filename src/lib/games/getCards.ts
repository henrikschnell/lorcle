type Card = {
    id: number,
    number: number,
    setcode: string,
    type: string,
    color: string,
    cost: number,
    willpower: number,
    fullname: string,
    name: string,
    version: string,
    fullnamegerman: string,
    namegerman: string,
    versiongerman: string,
    flavortext: string,
    flavortextgerman: string,
    inkwell: boolean,
    lore: number,
    rarity: string,
    raritygerman: string,
    subtypes: string[],
    subtypesgerman: string,
}

export async function getAllCards(): Promise<Card[]> {
    const CACHE_TTL = 43200;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cards`, {
        next: { revalidate: CACHE_TTL },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch cards');
    }

    return res.json();
}