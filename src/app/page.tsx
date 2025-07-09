import ModeSelect from "@/components/landing_page/GamemodeButton";
import React from "react";
import LorcleLogo from "@/components/Logo";

export default function Home() {
    return (
        <div className="flex flex-col gap-10 justify-center items-center">
            <LorcleLogo />
            <div id="mode_wrapper" className="flex flex-col gap-5">
                <ModeSelect mode='classic' label='Classic' description='Guess the card with clues'/>
                <ModeSelect mode='timeattack' label='Time Attack' description='How quick are you?'/>
                <ModeSelect mode='duel' label='Duel' description='Challenge your friends!'/>
                <ModeSelect mode='flavour' label='Flavour' description='Who said that?'/>
            </div>
        </div>
    );
}
