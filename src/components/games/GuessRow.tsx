import { Card } from '@/types/card';
import GuessItem from './GuessItem';
import { motion } from 'framer-motion';

type Props = {
    card: Card;
    todaysCard: Card;
    animate?: boolean;
};

export default function GuessRow({ card, todaysCard, animate = false }: Props) {
    const getGuessState = (comparisonKey: string): 'correct' | 'wrong' | 'partial' => {
        console.log(todaysCard['color']);
        console.log(card['color']);

        switch (comparisonKey) {
            // Nur richtig oder falsch möglich
            case 'fullname':
            case 'setcode':
            case 'type':
            case 'cost':
            case 'rarity':
                if (card[comparisonKey] === todaysCard[comparisonKey]) {
                    return 'correct';
                }
                break;
            // Richtig, falsch und teilweise richtig möglich
            case 'color':
                if (card[comparisonKey] === todaysCard[comparisonKey]) {
                    return 'correct';
                } else if (card[comparisonKey].includes(todaysCard[comparisonKey]) || todaysCard[comparisonKey].includes(card[comparisonKey])) {
                    return 'partial';
                }
                break;
        }
        return 'wrong';
    };

    const items = [
        { value: card.fullname, state: getGuessState('fullname') },
        { value: card.setcode, state: getGuessState('setcode') },
        { value: card.type, state: getGuessState('type') },
        { value: card.color, state: getGuessState('color') },
        { value: card.cost, state: getGuessState('cost') },
        { value: card.rarity, state: getGuessState('rarity') },
    ];

    return (
        <div className="flex justify-around mt-4 snap-center">
            {items.map((item, index) =>
                animate ? (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.5, duration: 0.4 }}
                    >
                        <GuessItem value={item.value} state={item.state} />
                    </motion.div>
                ) : (
                    <div key={index}>
                        <GuessItem value={item.value} state={item.state} />
                    </div>
                )
            )}
        </div>
    );
}
