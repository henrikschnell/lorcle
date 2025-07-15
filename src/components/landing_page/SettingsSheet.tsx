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

export default function SettingsSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Settings size={42} strokeWidth={.75} color="var(--primary)" className="cursor-pointer"/>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Change settings</SheetTitle>
                    <SheetDescription>
                        Customize your experience here. Make sure to click save when you&apos;re done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min px-4">
                    <LanguageSwitcher/>
                </div>
                <SheetFooter>
                    <AuthAwareSignInLink />
                    <Button type="submit">Save changes</Button>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
