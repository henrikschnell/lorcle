import { getAllCards } from "@/lib/games/getCards";
import ClassicGame from "@/components/games/ClassicGame";
import { Card } from "@/types/card";

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
    console.log(`--- classic/page.tsx: Heutige Karte fürs Spiel: ${todaysCard.id}`)
    const allCards = await getAllCards();
    return <ClassicGame todaysCard={todaysCard} cards={allCards} />;
}
