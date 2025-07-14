import { Card } from "@/types/card";

type Props = {
    card: Card;
};

export default function YesterdaysCard({ card }: Props) {
    return (
        <div className="text-center mt-4">
            <p>
                Yesterdays card was: <span className="text-primary">{card.fullname} ({card.rarity})</span>
            </p>
        </div>
    );
}
