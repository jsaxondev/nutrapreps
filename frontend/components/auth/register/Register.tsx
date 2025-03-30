"use client";
import { useSession } from "next-auth/react";
import RegisterForm from "./RegisterForm";
import Link from "next/link";

const Register = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="mx-auto my-12 p-8 max-w-md bg-white rounded-lg shadow-md border border-gray-200">
        <div className="text-center p-4 bg-blue-100 rounded-md text-blue-800">
          Loading...
        </div>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="mx-auto my-12 p-8 max-w-md bg-white rounded-lg shadow-md border border-gray-200">
        <div className="text-center p-4 bg-blue-100 rounded-md text-blue-800">
          <p>You are already signed in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto my-12 p-8 max-w-md bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
        Sign Up
      </h2>

      <div>
        <p className="mb-4 text-gray-700">
          Sign up for a new account or{' '}
          <Link href="/signin" className="text-blue-600 hover:underline">
            sign in
          </Link>{' '}
          when you already have an account.
        </p>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;