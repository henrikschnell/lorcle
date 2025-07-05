import { NextResponse } from 'next/server';
import { getTodaysCard } from '@/utils/getTodaysCard';
import { unstable_cache } from 'next/cache';

const CACHE_TTL = 86400;

const getCachedTodaysCard = unstable_cache(
    async () => {
        return await getTodaysCard();
    },
    ['todays-card'],
    {
        tags: ['todays-card'],
        revalidate: CACHE_TTL,
    }
);

export async function GET() {
    try {
        console.log('--- Function getCachedTodaysCard called ---')
        const todaysCard = await getCachedTodaysCard();

        return NextResponse.json(todaysCard, {
            status: 200,
            headers: {
                'Cache-Control': `s-maxage=${CACHE_TTL}, stale-while-revalidate`,
            },
        });
    } catch (error) {
        console.error('Error fetching today\'s card:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to fetch today\'s card' },
            { status: 500 }
        );
    }
}
