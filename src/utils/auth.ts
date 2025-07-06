import { NextResponse } from 'next/server';

/**
 * Validates API key authentication from query parameters
 * @param req - The incoming request object
 * @returns NextResponse with error if unauthorized, null if authorized
 */
export function validateApiKeyAuth(req: Request): NextResponse | null {
    const url = new URL(req.url);
    const authKey = url.searchParams.get('key');

    if (authKey !== process.env.INTERNAL_API_KEY) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return null; // null means authorized
}