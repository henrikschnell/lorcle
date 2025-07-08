import Image from 'next/image';
import ModeSelect from "@/components/landing_page/GamemodeButton";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center">
            <Link href="/">
                <Image
                    src="/images/lorcle_logo.png"
                    height={300}
                    width={1100}
                    className="w-64 mb-10 hover:scale-105 duration-150 cursor-pointer"
                    alt="Lorcana Logo"
                />
            </Link>
            <div id="mode_wrapper" className="flex flex-col gap-5">
                <ModeSelect mode='classic' label='Classic' description='Guess the card with clues'/>
                <ModeSelect mode='timeattack' label='Time Attack' description='How quick are you?'/>
                <ModeSelect mode='duel' label='Duel' description='Challenge your friends!'/>
                <ModeSelect mode='flavour' label='Flavour' description='Who said that?'/>
            </div>
            <div id="guide"></div>
        </div>
    );
}
