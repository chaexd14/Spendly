import BudgetPage from './BudgetPage';
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
      <BudgetPage session={session} />
    </div>
  );
}

export default page;
