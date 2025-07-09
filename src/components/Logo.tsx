import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function LorcleLogo() {
    return (
        <Link href="/">
            <Image
                src="/images/lorcle_logo.png"
                height={200}
                width={350}
                className="hover:scale-105 duration-150 cursor-pointer w-auto"
                alt="Lorcana Logo"
                priority={true}
            />
        </Link>
    )
}