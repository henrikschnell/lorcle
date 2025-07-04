import Image from 'next/image';
import { AuthAwareSignInLink } from "@/components/AuthAwareLink";

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Image
                src="/images/lorcana_logo.png"
                height={872}
                width={872}
                className="w-64"
                alt="Lorcana Logo"
            />
            <p className="text-2xl">Coming soon...</p>
            <AuthAwareSignInLink />
        </div>
    );
}
