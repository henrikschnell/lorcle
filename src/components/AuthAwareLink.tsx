import React from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { signOut } from "@/app/login/actions";

export async function AuthAwareSignInLink() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const isLoggedIn = !!data.user;

    if (isLoggedIn) {
        return (
            <form action={signOut}>
                <button
                    type="submit"
                    className="cursor-pointer group relative w-fit flex justify-center py-2 px-4 mt-4 border border-gray-500 text-sm font-medium rounded-md text-gray-300 transition duration-150 ease-in-out"
                >
                    Sign out
                </button>
            </form>
        );
    }

    return (
        <Link
            href='/login'
            className="group relative w-fit flex justify-center py-2 px-4 mt-4 border border-gray-500 text-sm font-medium rounded-md text-gray-300 transition duration-150 ease-in-out"
        >
            Sign in
        </Link>
    );
}