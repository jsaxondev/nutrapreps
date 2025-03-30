"use client";

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { NavbarItem } from './navbar-item'; // Import NavbarItem

function AuthNavbarClient() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return null; // Or a loading indicator
    }

    return (
        <>
            {session ? (
                <button
                    onClick={() => signOut()}
                    className="flex items-center justify-center text-sm leading-[110%] px-4 py-2 rounded-md hover:bg-slate-600 hover:text-white/80 text-white hover:shadow-[0px_1px_0px_0px_var(--neutral-600)_inset] transition duration-200"
                >
                    Logout
                </button>
            ) : (
                <>
                    <Link
                        href="/signin"
                        className="relative max-w-[15rem] text-left text-2xl"
                    >
                        <span className="block text-[26px] text-white">
                            Login
                        </span>
                    </Link>
                    <Link
                        href="/signup"
                        className="relative max-w-[15rem] text-left text-2xl"
                    >
                        <span className="block text-[26px] text-white">
                            Register
                        </span>
                    </Link>
                </>
            )}
        </>
    );
}

export default AuthNavbarClient;