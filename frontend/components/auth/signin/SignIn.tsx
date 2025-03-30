"use client";
import Link from 'next/link';
import SignInForm from './SignInForm';
import { useSession } from 'next-auth/react';

export default function SignIn() {
  const { data: session, status } = useSession();

  return (
    <div className="mx-auto my-12 p-8 max-w-lg bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
        Sign In
      </h2>
      {status === "authenticated" ? (
        <div className="text-center p-4 bg-blue-100 rounded-md text-blue-800">
          <p>You are already signed in.</p>
        </div>
      ) : (
        <div>
          <p className="mb-4 text-gray-700">
            Sign in to your account or{' '}
            <Link href="/register" className="text-blue-600 hover:underline">
              create a new account.
            </Link>
          </p>
          <SignInForm />
        </div>
      )}
    </div>
  );
}