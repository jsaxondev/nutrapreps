"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AccountPage() {

    const  {data: session, status} = useSession();

    if (status === "unauthenticated") {
        return (
            <div className='bg-zinc-100 rounded-sm px-4 py-8 mb-8'>
                <h2 className='font-bold text-lg mb-4'>Not allowed</h2>
                <p>
                    You need to be{' '}
                    <Link href='/signin' className='underline'>
                        signed in
                    </Link>{' '}
                    to view this page.
                </p>
            </div>
        );
    }
    
    return <></>;

}