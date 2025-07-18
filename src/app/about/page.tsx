import LorcleLogo from "@/components/Logo";

export const metadata = {
    title: "About Lorcle – Daily Disney Lorcana Puzzle",
    description:
        "Test your Disney Lorcana knowledge with Lorcle – a Wordle-style daily puzzle game. Guess the card using clues like ink type, set, and rarity.",
    alternates: {
        canonical: "https://lorcle.net/about",
    },
};

export default function AboutUs() {
    return (
        <>
            <div className="flex items-center flex-col gap-10">
                <LorcleLogo/>
                <div id="content" className="lg:w-1/2 md:w-2/3 sm:w-full">
                    <h2 className="pt-4 font-bold text-accent">About Lorcle</h2>
                    <p>
                        Welcome to Lorcle – the daily puzzle challenge for all fans of the Disney Lorcana TCG!
                        <br/>
                        Inspired by the popular game Wordle, this site lets you guess a Lorcana card each day using clues like
                        card type, ink color, rarity, and more. Whether you're a seasoned player or just starting out, it's a
                        fun way to test your knowledge of the game.
                    </p>
                    <h2 className="pt-4 font-bold text-accent">What is Lorcana</h2>
                    <p>
                        Disney Lorcana is a collectible card game featuring beloved Disney characters, magical artwork, and
                        strategic gameplay. Designed for both new and experienced TCG players, it offers a rich world full of
                        lore and competition.
                    </p>
                    <h2 className="pt-4 font-bold text-accent">What You'll find here</h2>
                    <ul>
                        <li>Daily Lorcana based puzzles and a variety of gamemodes to come</li>
                        <li>Clues based on card properties (type, ink, set, rarity, etc.)</li>
                        <li>A Wordle-like experience tailored to Lorcana fans</li>
                        <li>A fun challenge to share with your friends and the community</li>
                    </ul>
                    <h2 className="pt-4 font-bold text-accent">Why This Exists</h2>
                    <p>
                        As a Lorcana enthusiast, I wanted a way to combine my love for the game with a fun, brain-teasing
                        experience. That’s how Lorcana Wordle was born as a mix of trivia, memory, and daily excitement for the
                        Lorcana community.
                    </p>
                    <h2 className="pt-4 font-bold text-accent">Get In Touch</h2>
                    <p>
                        Have feedback, suggestions, or just want to say hi? Reach out via the contact page or email. I’d love to
                        hear from you!
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