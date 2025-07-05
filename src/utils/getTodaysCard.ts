import seedrandom from 'seedrandom';
import { getAllCards } from '@/lib/games/getCards';

export async function getTodaysCard(date = new Date()) {
    const cards = await getAllCards();
    const dateSeed = date.toISOString().split('T')[0];
    const rng = seedrandom(dateSeed);

    const index = Math.floor(rng() * cards.length);
    return cards[index];
}
