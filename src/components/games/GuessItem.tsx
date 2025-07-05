import React from 'react';
import Image from 'next/image';

type GuessState = 'correct' | 'wrong' | 'partial';

type Props = {
    value: string | number;
    state: GuessState;
    type?: string;
};

export default function GuessItem({ value, state, type }: Props) {
    if (type && type === 'img') {
        switch (value) {
            case 'Amber':
                value = '/images/inks/amber.png';
                break;
            case 'Amethyst':
                value = '/images/inks/amethyst.png';
                break;
            case 'Emerald':
                value = '/images/inks/emerald.png';
                break;
            case 'Ruby':
                value = '/images/inks/ruby.png';
                break;
            case 'Sapphire':
                value = '/images/inks/sapphire.png';
                break;
            case 'Steel':
                value = '/images/inks/steel.png';
                break;
            default:
                type = 'text';
                value = value === '' ? 'None' : value;
        }
    }

    const getStateClasses = () => {
        switch (state) {
            case 'correct':
                return 'bg-green-600';
            case 'wrong':
                return 'bg-red-600';
            case 'partial':
                return 'bg-yellow-600';
            default:
                return 'border-white';
        }
    };

    return (
        <div className={`rounded-md w-23 aspect-square flex justify-center items-center border-2 border-primary ${getStateClasses()}`}>
            {type === 'text' ? (
                <span className="text-wrap text-center text-md text-white">{value}</span>
            ) : type === 'img' ? (
                <Image
                    src={`${value}`}
                    alt="Ink Image"
                    width={160}
                    height={160}
                    className="w-3/4 h-3/4 object-cover"
                />
            ) : null}
        </div>
    );
}
