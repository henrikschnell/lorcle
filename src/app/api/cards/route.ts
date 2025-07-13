import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { validateApiKeyAuth } from "@/utils/auth";

const CLIENT_CACHE_TTL = 43200; // 12 Stunden cachen

export async function GET(req: Request) {
    const authError = validateApiKeyAuth(req);
    if (authError) {
        return authError;
    }

    const { data, error } = await supabase
        .from('cards')
        .select('id, type, setcode, color, cost, fullname, name, version, fullnamegerman, versiongerman, namegerman, flavortext, flavortextgerman, rarity, raritygerman, image_full, image_thumbnail, sets(name, namegerman)')
        .order('name', { ascending: true });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, {
        status: 200,
        headers: {
            'Cache-Control': `max-age=${CLIENT_CACHE_TTL}, stale-while-revalidate`,
        },
    });
}
