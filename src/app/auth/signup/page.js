// app/auth/signup/page.js
import SignUp from './SignUp';
import { auth } from '../../../../lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function SignUpPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect('/home');

  return (
    <>
      <section className="flex justify-center w-full min-h-screen border border-red-400">
        <div>
          <SignUp />
        </div>
      </section>
    </>
  );
}
