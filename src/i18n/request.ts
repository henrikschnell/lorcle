import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { isLocale } from './i18n';

export default getRequestConfig(async ({ requestLocale }) => {
    const rawLocale = await requestLocale;
    const baseLocale = rawLocale?.split('-')[0];

    const cookieStore  = await cookies();
    const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;

    const headerStore  = await headers();
    const headerLang   = headerStore.get('accept-language')?.split(',')[0];
    const headerLocale = headerLang?.split('-')[0];

    const candidate = cookieLocale ?? baseLocale ?? headerLocale ?? 'en';
    if (!isLocale(candidate)) notFound();
    const locale = candidate;

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});
