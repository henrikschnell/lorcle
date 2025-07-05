'use client';

import React from "react";

interface Card {
    id: number;
    number: number;
    setcode: string;
    type: string;
    color: string;
    cost: number;
    willpower: number | null;
    fullname: string;
    name: string;
    version: string | null;
    fullnamegerman: string;
    namegerman: string;
    versiongerman: string | null;
    flavortext: string;
    flavortextgerman: string;
    inkwell: boolean;
    lore: string | null;
    rarity: string;
    raritygerman: string;
    subtypes: string | null;
    subtypesgerman: string | null;
}

type Props = {
    cards: Card[];
    onChange?: (id: string) => void; // optionaler Callback
};

export default function CardSelector({ cards, onChange }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        if (onChange) onChange(id);
    };

    return (
        <div className="relative inline-block w-full max-w-md">
            <select 
                onChange={handleChange}
                className="
                    w-full
                    px-4 py-3
                    bg-gray-800/50
                    border border-gray-600/50
                    rounded-lg
                    text-[#d3ba84]
                    font-medium
                    text-base
                    appearance-none
                    cursor-pointer
                    transition-all duration-200
                    hover:border-gray-500/70
                    focus:outline-none
                    focus:border-[#d3ba84]/70
                    backdrop-blur-sm
                "
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23d3ba84' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.75rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em'
                }}
            >
                <option value="" className="bg-gray-800 text-[#d3ba84]">
                    Karte auswählen
                </option>
                {cards.map(card => (
                    <option 
                        key={card.id} 
                        value={card.id}
                        className="bg-gray-800 text-[#d3ba84] py-2"
                    >
                        {`${card.number}. ${card.fullname}`}
                    </option>
                ))}
            </select>

            {/* Custom styling for better visual hierarchy */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#d3ba84]/5 to-transparent pointer-events-none opacity-0 transition-opacity duration-200 peer-hover:opacity-100"></div>
        </div>
    );
}
