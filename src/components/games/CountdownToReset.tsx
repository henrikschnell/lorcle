import { useEffect, useState } from "react";

type Props = {
    className?: string;
}

export default function CountdownToReset({ className }: Props) {
    const [time, setTime] = useState('00:00:00');

    useEffect(() => {
        const tick = () => {
            const now = new Date();
            const nextMidnightUTC = new Date(Date.UTC(
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate() + 1,
                0, 0, 0
            ));
            const diffMs = nextMidnightUTC.getTime() - now.getTime();

            const totalSeconds = Math.floor(diffMs / 1000);
            const hours   = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            // Padding
            const hh = String(hours).padStart(2, '0');
            const mm = String(minutes).padStart(2, '0');
            const ss = String(seconds).padStart(2, '0');

            setTime(`${hh}:${mm}:${ss}`);
        };

        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className={`flex justify-center items-center flex-col gap-2 ${className}`}>
            <span className="text-accent text-3xl">Time until daily reset</span>
            <span className="text-accent text-5xl">{time}</span>
        </div>
    )
}