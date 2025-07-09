import React from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { signOut } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";

type Props = {
    mode?: 'default' | 'loginonly';
}

export async function AuthAwareSignInLink(props: Props) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const isLoggedIn = !!data.user;
    const mode = props.mode ?? 'default';

    if (isLoggedIn) {
        return (
            mode === 'default' ? (
                <div className="flex justify-center pb-3">
                    <form action={signOut}>
                        <Button
                            type="submit"
                            variant="destructive"
                            className="cursor-pointer group relative w-fit flex justify-center py-2 px-4 mt-4 border border-gray-500 text-sm font-medium rounded-md text-white transition duration-150 ease-in-out"
                        >

                            <LogOut size={16}/>Sign out
                        </Button>
                    </form>
                </div>
            ) : null
        );
    }

    return (
        <div className="flex justify-center pb-3">
            <Link
                href='/login'
                className="group relative w-fit flex justify-center items-center gap-2 py-2 px-4 mt-4 border border-gray-500 text-sm font-medium rounded-md text-white transition duration-150 ease-in-out"
            >
                <LogIn size={16}/>Sign in
            </Link>
        </div>
    );
}