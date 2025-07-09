import { getClassicCount } from '@/lib/games/getStats';
import { NextResponse } from 'next/server';
import { validateApiKeyAuth } from "@/utils/auth";

export const revalidate = 180; // Cache for 3 minutes on the edge/server

export async function GET(req: Request) {
    const authError = validateApiKeyAuth(req);
    if (authError) {
        return authError;
    }

    const count = await getClassicCount();

    return NextResponse.json({ count });
}
