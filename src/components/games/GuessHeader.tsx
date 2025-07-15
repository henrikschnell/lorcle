import { useTranslations } from "next-intl";

export default function GuessHeader() {
    const t = useTranslations('Games');
    const categories = ['card', 'set', 'type', 'ink', 'cost', 'rarity'];

    return (
        <div id="guess-header" className="flex justify-around mt-8 px-2">
            { categories.map((category) => (
                <div key={category} className="flex-1 text-center">
                    <p className="text-primary drop-shadow-[0_1.2px_1.5px_rgba(0,0,0,0.8)] underline underline-offset-8">{t(`classic_category_${category}`)}</p>
                </div>
            ))}
        </div>
    );
}