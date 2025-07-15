import { Card } from "@/types/card";
import { useTranslations } from "next-intl";

type Props = {
    card: Card;
};

export default function YesterdaysCard({ card }: Props) {
    const t = useTranslations('Games');

    return (
        <div className="text-center mt-4">
            <p>
                {t('yesterdays_card')}<span className="text-primary pl-2">{card.fullname} ({card.rarity})</span>
            </p>
        </div>
    );
}
