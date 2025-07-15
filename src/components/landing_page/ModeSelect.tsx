import Image from "next/image";

type Mode = 'classic' | 'timeattack' | 'duel' | 'flavor';

type Props = {
    mode: Mode;
    label: string;
    description: string;
    onClick: (mode: Mode) => void;
}

export default function ModeSelect({mode, label, description, onClick}: Props) {
    return (
        <div
            className="relative hover:scale-103 duration-150 cursor-pointer"
            onClick={() => onClick(mode)}>
            <Image
                src={`/images/modes/${mode}.png`}
                height={235}
                width={330}
                alt={`${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode Icon`}
            />
            <span className="absolute top-5 left-29.5 text-3xl text-background">{label}</span>
            <span className="absolute top-13.5 left-30 text-sm text-background">{description}</span>
        </div>
    )
}