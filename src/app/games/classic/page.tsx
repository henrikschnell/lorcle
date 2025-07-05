import { requireAuth } from "@/lib/auth";
import { getAllCards } from "@/lib/games/getCards";
import CardSelector from "@/components/CardSelector";

export default async function Classic() {
    await requireAuth();
    // const todaysCard = await getTodaysCard();
    const allCards = await getAllCards();

    return (
        <div>
            <CardSelector cards={allCards} />
        </div>
    );
}