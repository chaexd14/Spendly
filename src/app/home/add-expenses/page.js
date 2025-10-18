import ExpensesPage from './ExpensesPage';
import { auth } from '../../../../lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div>
      <ExpensesPage session={session} />
    </div>
  );
}

export default page;
