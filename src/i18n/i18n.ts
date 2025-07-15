export const locales = ['en', 'de'] as const;
export type Locale = typeof locales[number];   // 'en' | 'de'

type LanguageData = {
    label: string;
    icon: string;
}

export function isLocale(x: string): x is Locale {
    return (locales as readonly string[]).includes(x);
}

export function getLanguageData(locale: string) {
    const localeMap: Record<string, LanguageData> = {
        en: { label: 'English', icon: '/countryflags/uk.svg' },
        de: { label: 'Deutsch', icon: '/countryflags/germany.svg' },
    }

    return (
        localeMap[locale] || {
            label: locale,
            icon: '',
        }
    )
}