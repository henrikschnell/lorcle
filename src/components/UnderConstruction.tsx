import LorcleLogo from "@/components/Logo";
import { useTranslations } from "next-intl";

type Props = {
    logoClick: () => void;
}

export default function UnderConstruction({ logoClick }: Props) {
    const t = useTranslations('Misc');

    return (
        <div className="flex flex-col items-center gap-10">
            <LorcleLogo onClick={logoClick}/>
            <span className="text-primary font-bold text-xl">{t('under_construction')}</span>
        </div>
    );
}