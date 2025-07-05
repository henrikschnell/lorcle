export default function GuessHeader() {
    return (
        <div id="guess-header" className="flex justify-around mt-8 px-2">
            <div className="flex-1 text-center">
                <p className="text-primary drop-shadow-[0_1.2px_1.5px_rgba(0,0,0,0.8)] underline underline-offset-8">Card</p>
            </div>
            <div className="flex-1 text-center">
                <p className="text-primary drop-shadow-[0_1.2px_1.5px_rgba(0,0,0,0.8)] underline underline-offset-8">Set</p>
            </div>
            <div className="flex-1 text-center">
                <p className="text-primary drop-shadow-[0_1.2px_1.5px_rgba(0,0,0,0.8)] underline underline-offset-8">Type</p>
            </div>
            <div className="flex-1 text-center">
                <p className="text-primary drop-shadow-[0_1.2px_1.5px_rgba(0,0,0,0.8)] underline underline-offset-8">Ink</p>
            </div>
            <div className="flex-1 text-center">
                <p className="text-primary drop-shadow-[0_1.2px_1.5px_rgba(0,0,0,0.8)] underline underline-offset-8">Cost</p>
            </div>
            <div className="flex-1 text-center">
                <p className="text-primary drop-shadow-[0_1.2px_1.5px_rgba(0,0,0,0.8)] underline underline-offset-8">Rarity</p>
            </div>
        </div>
    );
}