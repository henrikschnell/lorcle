import Link from "next/link";
import React from "react";

export default function Footer() {
    const links = [
        { label: 'About us', href: 'about' },
    ]

    return (
        <div id="footer" className="flex flex-col items-center gap-2 text-accent">
            <div id="links">
                {
                    links.map(({ label, href }) => (
                        <Link
                            key={href}
                            href={`/${href}`}
                            className="hover:underline"
                        >
                            {label}
                        </Link>
                    ))
                }
            </div>
            © Lorcle.net 2025 – Version 1.0
        </div>
    )
}