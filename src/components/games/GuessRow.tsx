import { Card } from '@/types/card';
import GuessItem from './GuessItem';
import { motion } from 'framer-motion';

type Props = {
    card: Card;
    todaysCard: Card;
    animate?: boolean;
};

export default function GuessRow({ card, todaysCard, animate = false }: Props) {
    const getGuessState = (guessValue: any, correctValue: any): 'correct' | 'wrong' | 'partial' => {
        if (guessValue === correctValue) {
            return 'correct';
        }
        return 'wrong';
    };

    const items = [
        { value: card.fullname, state: getGuessState(card.fullname, todaysCard.fullname) },
        { value: card.setcode, state: getGuessState(card.setcode, todaysCard.setcode) },
        { value: card.type, state: getGuessState(card.type, todaysCard.type) },
        { value: card.color, state: getGuessState(card.color, todaysCard.color) },
        { value: card.cost, state: getGuessState(card.cost, todaysCard.cost) },
        { value: card.rarity, state: getGuessState(card.rarity, todaysCard.rarity) },
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
