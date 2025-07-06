import { Card } from '@/types/card';

export async function getAllCards(): Promise<Card[]> {
    const CACHE_TTL = 86400;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cards?key=${process.env.INTERNAL_API_KEY}`, {
        next: { revalidate: CACHE_TTL },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch cards');
    }

    return await res.json();
}
