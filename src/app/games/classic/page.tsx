export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { getAllCards } from "@/lib/games/getCards";
import { getCardFromHistory } from "@/lib/games/getCardFromHistory";
import { getClassicCount } from "@/lib/games/getStats";
import ClassicGame from "@/components/games/ClassicGame";

export default async function Classic() {
    const [todaysCard, yesterdaysCard, allCards, guessCount] = await Promise.all([
        getCardFromHistory(1),
        getCardFromHistory(2),
        getAllCards(),
        getClassicCount(),
    ]);
    return (
        <ClassicGame
            todaysCard={todaysCard}
            yesterdaysCard={yesterdaysCard}
            cards={allCards}
            guessCount={guessCount}
        />
    );
}
