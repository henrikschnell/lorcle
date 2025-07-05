import { requireAuth } from "@/lib/auth";
import { getAllCards } from "@/lib/games/getCards";
import CardSelector from "@/components/CardSelector";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default async function Classic() {
    await requireAuth();
    // const todaysCard = await getTodaysCard();
    const allCards = await getAllCards();

    return (
        <div>
            <CardSelector cards={allCards} />
            <ModeToggle />
        </div>
    );
}