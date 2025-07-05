import { getAllCards } from "@/lib/games/getCards";
import ClassicGame from "@/components/games/ClassicGame";
import { Card } from "@/types/card";

// Force dynamic rendering since this page depends on daily-changing data
export const dynamic = 'force-dynamic';

async function getTodaysCardFromAPI(): Promise<Card> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/todays-card`, {
        next: { tags: ['todays-card'] }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch today\'s card');
    }

    return await res.json();
}

export default async function Classic() {
    const todaysCard = await getTodaysCardFromAPI();
    const allCards = await getAllCards();
    return <ClassicGame todaysCard={todaysCard} cards={allCards} />;
}
