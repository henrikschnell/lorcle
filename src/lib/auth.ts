import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

async function checkAuth() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect('/login');
    }

    return data.user;
}

export async function getCurrentUser() {
    return checkAuth();
}

export async function requireAuth() {
    await checkAuth();
}
