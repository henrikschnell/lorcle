import React from 'react';

type GuessState = 'correct' | 'wrong' | 'partial';

type Props = {
    value: string | number;
    state: GuessState;
};

export default function GuessItem({ value, state }: Props) {
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
        <div className={`rounded-md w-20 aspect-square flex justify-center items-center border-2 border-primary ${getStateClasses()}`}>
            <span className="text-wrap text-center px-1 text-sm text-white">{value}</span>
        </div>
    );
}
