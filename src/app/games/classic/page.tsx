export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { getAllCards } from "@/lib/games/getCards";
import { getCardsFromHistory } from "@/lib/games/getCardsFromHistory";
import { getClassicCount } from "@/lib/games/getStats";
import ClassicGame from "@/components/games/ClassicGame";

export default async function Classic() {
    const [relevantCards, allCards, guessCount] = await Promise.all([
        getCardsFromHistory(),
        getAllCards(),
        getClassicCount(),
    ]);
    const yesterdaysCard = relevantCards[0];
    const todaysCard = relevantCards[1];
    return (
        <ClassicGame
            todaysCard={todaysCard}
            yesterdaysCard={yesterdaysCard}
            cards={allCards}
            guessCount={guessCount}
        />
    );
}
