import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div className="flex justify-center items-center h-full">
            <Link href={"/"}>
                <Image
                    src={"/images/404page.png"}
                    alt={"Page not found image"}
                    height={600}
                    width={400}
                />
            </Link>
        </div>
    )
}