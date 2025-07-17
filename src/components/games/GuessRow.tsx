import { Card } from '@/types/card';
import GuessItem from './GuessItem';
import { motion } from 'framer-motion';
import React from "react";
import Image from "next/image";
import { useLocale } from "next-intl";

type Props = {
    card: Card;
    todaysCard: Card;
    animate?: boolean;
};

export default function GuessRow({ card, todaysCard, animate = false }: Props) {
    const locale = useLocale();
    const getGuessState = (comparisonKey: string): 'correct' | 'wrong' | 'partial' => {
        switch (comparisonKey) {
            // Nur richtig oder falsch möglich
            case 'fullname':
            case 'type':
            case 'cost':
            case 'rarity':
                if (card[comparisonKey] === todaysCard[comparisonKey]) {
                    return 'correct';
                }
                break;
            case 'set':
                if (card.sets && todaysCard.sets && card.sets.name === todaysCard.sets.name) {
                    return 'correct';
                }
                break;
            // Richtig, falsch und teilweise richtig möglich
            case 'color':
                if (card[comparisonKey] === todaysCard[comparisonKey]) {
                    return 'correct';
                } else if (card[comparisonKey] !== '' && todaysCard[comparisonKey] !== '' && (card[comparisonKey].includes(todaysCard[comparisonKey]) || todaysCard[comparisonKey].includes(card[comparisonKey]))) {
                    return 'partial';
                }
                break;
        }
        return 'wrong';
    };

    const items = [
        { value: locale === 'de' ? card.sets.namegerman : card.sets.name, state: getGuessState('set'), type: 'text' },
        { value: card.type, state: getGuessState('type'), type: 'text' },
        { value: card.color, state: getGuessState('color'), type: 'img' },
        { value: card.cost, state: getGuessState('cost'), type: 'text' },
        { value: locale === 'de' ? card.raritygerman : card.rarity, state: getGuessState('rarity'), type: 'text' },
    ];

    return (
        <div className="flex gap-2 justify-around px-3 snap-end">
            {
                animate ? (
                    <motion.div
                        key='card-img'
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0, duration: 0.4 }}
                    >
                        <div className="rounded-md w-23 aspect-square flex justify-center items-center border-2 border-primary overflow-hidden">
                            <Image
                                src={card.image_thumbnail}
                                alt="Card Image"
                                width={160}
                                height={160}
                                className="w-full h-full rounded-md object-cover transform scale-147"
                                style={{ objectPosition: 'center -28%' }}
                            />
                        </div>
                    </motion.div>
                ) : (
                    <div className="rounded-md w-23 aspect-square flex justify-center items-center border-2 border-primary overflow-hidden">
                        <Image
                            src={card.image_thumbnail}
                            alt="Card Image"
                            width={160}
                            height={160}
                            className="w-full h-full rounded-md object-cover transform scale-147"
                            style={{ objectPosition: 'center -28%' }}
                        />
                    </div>
                )
            }
            {items.map((item, index) =>
                animate ? (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (index + 1) * 0.5, duration: 0.4 }}
                    >
                        <GuessItem value={item.value} state={item.state} type={item.type} />
                    </motion.div>
                ) : (
                    <div key={index}>
                        <GuessItem value={item.value} state={item.state} type={item.type} />
                    </div>
                )
            )}
        </div>
    );
}
