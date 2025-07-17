import { useTranslations } from "next-intl";

type Props = {
    count: number;
};

export default function GuessCounter({ count }: Props) {
    const t = useTranslations('Games');

    return (
        <div className="text-center">
            <p>
                <span className="text-primary px-2">{count}</span>{t('guess_count')}
            </p>
        </div>
    );
}
