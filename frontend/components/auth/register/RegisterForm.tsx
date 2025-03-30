'use client';

import { useActionState } from 'react';
import registerAction from './registerAction';
import PendingSubmitButton from '../PendingSubmitButton';

type InputErrorsT = {
  username?: string[];
  email?: string[];
  password?: string[];
};

type RegisterFormInitialStateT = {
  error: false;
};

type RegisterFormErrorStateT = {
  error: true;
  message: string;
  inputErrors?: InputErrorsT;
};

export type RegisterFormStateT = RegisterFormInitialStateT | RegisterFormErrorStateT;

const initialState: RegisterFormInitialStateT = {
  error: false,
};

export default function SignUpForm() {
  const [state, formAction] = useActionState<RegisterFormStateT, FormData>(
    registerAction,
    initialState
  );

  return (
    <form className="space-y-6" action={formAction}>
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username *
        </label>
        <input
          type="text"
          id="username"
          name="username"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
        />
        {state.error && state?.inputErrors?.username && (
          <div className="text-sm text-red-600 mt-1">{state.inputErrors.username[0]}</div>
        )}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
        />
        {state.error && state?.inputErrors?.email && (
          <div className="text-sm text-red-600 mt-1">{state.inputErrors.email[0]}</div>
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
        />
        {state.error && state?.inputErrors?.password && (
          <div className="text-sm text-red-600 mt-1">{state.inputErrors.password[0]}</div>
        )}
      </div>
      <div>
        <PendingSubmitButton text="Register" />
      </div>
      {state.error && state.message && (
        <div className="text-sm text-red-600 mt-2">{state.message}</div>
      )}
    </form>
  );
}