import { NextResponse } from 'next/server';
import { getTodaysCard } from '@/utils/getTodaysCard';
import { validateApiKeyAuth } from "@/utils/auth";

const CLIENT_CACHE_TTL = 600;

export async function GET(req: Request) {
    const authError = validateApiKeyAuth(req);
    if (authError) {
        return authError;
    }

    try {
        const todaysCard = await getTodaysCard();

        return NextResponse.json(todaysCard, {
            status: 200,
            headers: {
                'Cache-Control': `max-age=${CLIENT_CACHE_TTL}, stale-while-revalidate`,
            },
        });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to fetch today\'s card' },
            { status: 500 }
        );
    }
}
