import Image from "next/image";
import Link from "next/link";

type Props = {
    mode: 'classic' | 'timeattack' | 'duel' | 'flavour' | 'zoom';
    label: string;
    description: string;
}

export default function ModeSelect({mode, label, description}: Props) {
    return (
        <Link href={`/games/${mode}`}>
            <div className="relative hover:scale-103 duration-150 cursor-pointer">
                <Image
                    src={`/images/modes/${mode}.png`}
                    height={235}
                    width={330}
                    alt={`${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode Icon`}
                />
                <span className="absolute top-5 left-31.5 text-3xl text-background">{label}</span>
                <span className="absolute top-13.5 left-32 text-md text-background">{description}</span>
            </div>
        </Link>
    )
}