"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getLanguageData, locales } from "@/i18n/i18n";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

export default function LanguageSwitcher() {
    const [locale, setLocale] = useState('');
    const router = useRouter();

    const onChangeLocale = (newLocale: string) => {
        // Cookie setzen (Ablauf 1 Jahr)
        document.cookie = [
            `NEXT_LOCALE=${newLocale}`,
            `path=/`,
            `max-age=${60 * 60 * 24 * 365}`,
        ].join("; ");

        setLocale(newLocale);
        router.refresh();
    };

    return (
        <Select
            value={locale}
            onValueChange={onChangeLocale}
        >
            <SelectTrigger
                className="w-[180px]"
                id='language-select'
            >
                <SelectValue placeholder="Choose a language" />
            </SelectTrigger>
            <SelectContent>
                {locales.map((locale) => (
                    <SelectItem
                        key={locale}
                        value={locale}
                    >
                        <Image src={getLanguageData(locale).icon} alt={`${getLanguageData(locale).label}-Icon`} width={16} height={16} />
                        {getLanguageData(locale).label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
