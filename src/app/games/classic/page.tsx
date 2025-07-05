import { getAllCards } from "@/lib/games/getCards";
import { getTodaysCard } from "@/utils/getTodaysCard";
import ClassicGame from "@/components/games/ClassicGame";

export default async function Classic() {
    const todaysCard = await getTodaysCard();
    const allCards = await getAllCards();

    return <ClassicGame todaysCard={todaysCard} cards={allCards} />;
}