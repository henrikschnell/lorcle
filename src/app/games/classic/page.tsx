import { Card } from "@/types/card";
import { getAllCards } from "@/lib/games/getCards";
import ClassicGame from "@/components/games/ClassicGame";

export const dynamic = 'force-dynamic';

async function getTodaysCardFromAPI(): Promise<Card> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/todays-card?key=${process.env.INTERNAL_API_KEY}`, {
        next: { tags: ['todays-card'] }
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch today's card: ${res.status} - ${errorText}`);
    }

    return await res.json();
}

async function getGuessCountFromAPI(): Promise<number> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/stats/counter?key=${process.env.INTERNAL_API_KEY}`, {
        next: { revalidate: 180 } // Cache for 3 minutes
    });

    if (!res.ok) {
        console.error(`Failed to fetch guess count: ${res.status}`);
        return 0;
    }

    const data = await res.json();
    return data.count;
}

export default async function Classic() {
    const todaysCard = await getTodaysCardFromAPI();
    const allCards = await getAllCards();
    const guessCount = await getGuessCountFromAPI();
    return <ClassicGame todaysCard={todaysCard} cards={allCards} guessCount={guessCount} />;
}
