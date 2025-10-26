import { LoginForm } from './Login-Form';

import { auth } from '../../../../lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect('/home');

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6 p-6 bg-muted min-h-svh md:p-10">
        <div className="flex flex-col w-full max-w-sm gap-6">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
