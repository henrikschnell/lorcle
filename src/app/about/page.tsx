import LorcleLogo from "@/components/Logo";
import { useTranslations } from "next-intl";

export const metadata = {
    title: "About Lorcle – Daily Disney Lorcana Puzzle",
    description:
        "Test your Disney Lorcana knowledge with Lorcle – a Wordle-style daily puzzle game. Guess the card using clues like ink type, set, and rarity.",
    alternates: {
        canonical: "https://lorcle.net/about",
    },
};

export default function AboutUs() {
    const t = useTranslations('AboutUs');
    return (
        <>
            <div className="flex items-center flex-col gap-10">
                <LorcleLogo/>
                <div id="content" className="lg:w-1/2 md:w-2/3 sm:w-full text-center">
                    <h2 className="pt-4 font-bold text-accent">{t('AboutTitle')}</h2>
                    <p>
                        {t('About')}
                        <br/>
                        {t('About2')}
                    </p>
                    <h2 className="pt-4 font-bold text-accent">{t('LorcanaTitle')}</h2>
                    <p>
                        {t('Lorcana')}
                    </p>
                    <h2 className="pt-4 font-bold text-accent">{t('WhatToExpectTitle')}</h2>
                    <ul>
                        <li>{t('WhatToExpect')}</li>
                        <li>{t('WhatToExpect2')}</li>
                        <li>{t('WhatToExpect3')}</li>
                        <li>{t('WhatToExpect4')}</li>
                    </ul>
                    <h2 className="pt-4 font-bold text-accent">{t('WhyTitle')}</h2>
                    <p>
                        {t('Why')}
                    </p>
                    <h2 className="pt-4 font-bold text-accent">{t('ContactTitle')}</h2>
                    <p>
                        {t('Contact')}
                    </p>
                </div>
            </div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "AboutPage",
                        "name": "About Lorcle",
                        "description":
                            "Lorcana Wordle-style quiz game with daily puzzles. Guess the Lorcana card using clues like ink type, rarity, and more.",
                        "url": "https://lorcle.net/about",
                        "mainEntity": {
                            "@type": "WebSite",
                            "name": "Lorcle",
                            "url": "https://lorcle.net",
                        },
                    }),
                }}
            />
        </>
    )
}