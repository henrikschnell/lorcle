import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

const CACHE_TTL = 43200;

export async function GET() {
    const { data, error } = await supabase
        .from('cards')
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, {
        status: 200,
        headers: {
            'Cache-Control': `s-maxage=${CACHE_TTL}, stale-while-revalidate`,
        },
    });
}
