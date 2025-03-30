import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

async function AuthNavBar() {
  const session = await getServerSession(authOptions);

  return (
    <nav>
      {session ? (
        <button
          onClick={() => signOut()}
          className="flex items-center justify-center text-sm leading-[110%] px-4 py-2 rounded-md hover:bg-slate-600 hover:text-white/80 text-white hover:shadow-[0px_1px_0px_0px_var(--neutral-600)_inset] transition duration-200"
        >
          Logout
        </button>
      ) : (
        <div className="flex space-x-2"> {/* Wrap links in a flex div */}
          <Link
            href="/signin"
            className="flex items-center justify-center text-sm leading-[110%] px-4 py-2 rounded-md hover:bg-slate-600 hover:text-white/80 text-white hover:shadow-[0px_1px_0px_0px_var(--neutral-600)_inset] transition duration-200"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="flex items-center justify-center text-sm leading-[110%] px-4 py-2 rounded-md hover:bg-slate-600 hover:text-white/80 text-white hover:shadow-[0px_1px_0px_0px_var(--neutral-600)_inset] transition duration-200"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

export default AuthNavBar;