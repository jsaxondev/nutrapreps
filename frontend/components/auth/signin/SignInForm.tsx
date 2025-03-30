'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

type FormErrorsT = {
  identifier?: undefined | string[];
  password?: undefined | string[];
  strapiError?: string;
};

const initialState = {
  identifier: '',
  password: '',
};

const formSchema = z.object({
  identifier: z.string().min(2).max(30),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 8 characters long.' })
    .max(30),
});

function ConfirmationError() {
  return (
    <p className="text-sm text-red-600 mt-2">
      It looks like you haven't confirmed your email yet. Check your email
      client for a confirmation email. Did not find it?{' '}
      <Link href="/confirmation/newrequest" className="underline text-blue-600">
        Resend the confirmation email.
      </Link>
    </p>
  );
}

export default function SignInForm() {
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState<FormErrorsT>({});
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const router = useRouter();

  const hasConfirmationError =
    errors.strapiError === 'Your account email is not confirmed';

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const validatedFields = formSchema.safeParse(data);

    if (!validatedFields.success) {
      setErrors(validatedFields.error.formErrors.fieldErrors);
      setLoading(false);
    } else {
      const signInResponse = await signIn('credentials', {
        identifier: data.identifier,
        password: data.password,
        redirect: false,
      });

      if (signInResponse && !signInResponse?.ok) {
        setErrors({
          strapiError: signInResponse.error
            ? signInResponse.error
            : 'Something went wrong.',
        });
        setLoading(false);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} method="post" className="space-y-6">
      <div>
        <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
          Email or username *
        </label>
        <input
          type="text"
          id="identifier"
          name="identifier"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
          value={data.identifier}
          onChange={handleChange}
        />
        {errors?.identifier && (
          <div className="text-sm text-red-600 mt-1">{errors.identifier[0]}</div>
        )}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password *
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
          value={data.password}
          onChange={handleChange}
        />
        {errors?.password && (
          <div className="text-sm text-red-600 mt-1">{errors.password[0]}</div>
        )}
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          disabled={loading}
          aria-disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        <div className="mt-2 text-sm">
          <Link href="/password/requestreset" className="text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>
      </div>
      {(errors.password || errors.identifier) && (
        <div className="text-sm text-red-600 mt-2">
          Something went wrong. Please check your data.
        </div>
      )}
      {hasConfirmationError && <ConfirmationError />}
      {!hasConfirmationError && errors.strapiError && (
        <div className="text-sm text-red-600 mt-2">
          Something went wrong: {errors.strapiError}
        </div>
      )}
    </form>
  );
}