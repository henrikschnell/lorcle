import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Settings } from "lucide-react";
import { AuthAwareSignInLink } from "@/components/AuthAwareLink";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function SettingsSheet() {
    const t = useTranslations('Settings');

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Settings size={42} strokeWidth={.75} color="var(--primary)" className="cursor-pointer"/>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{t('title')}</SheetTitle>
                    <SheetDescription>
                        {t('description')}
                    </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min px-4">
                    <LanguageSwitcher/>
                </div>
                <SheetFooter>
                    <AuthAwareSignInLink />
                    <Button type="submit">{t('button_save')}</Button>
                    <SheetClose asChild>
                        <Button variant="outline">{t('button_close')}</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
