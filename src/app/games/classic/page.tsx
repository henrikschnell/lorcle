export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { getAllCards } from "@/lib/games/getCards";
import { getTodaysCard } from "@/lib/games/getTodaysCard";
import { getClassicCount } from "@/lib/games/getStats";
import ClassicGame from "@/components/games/ClassicGame";

export default async function Classic() {
    const [todaysCard, allCards, guessCount] = await Promise.all([
        getTodaysCard(),
        getAllCards(),
        getClassicCount(),
    ]);
    return (
        <ClassicGame
            todaysCard={todaysCard}
            cards={allCards}
            guessCount={guessCount}
        />
    );
}
