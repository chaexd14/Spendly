import UserHome from './UserHome';
import { auth } from '../../../lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { getAllUser } from '../../../lib/actions/user-actions';
import { getBudget } from '../../../lib/actions/budgets-action';
import { getExpenses } from '../../../lib/actions/expenses-actions';

async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/auth/signin');
  }

  const allUsers = await getAllUser();
  const userBudget = await getBudget(session.user.id);
  const userExpenses = await getExpenses(session.user.id);

  return (
    <>
      <section className="flex justify-center w-full min-h-screen border border-red-400">
        <div className="flex justify-center w-full gap-10 h-fit">
          <UserHome
            session={session}
            allUsers={allUsers}
            userBudget={userBudget}
            userExpenses={userExpenses}
          />
        </div>
      </section>
    </>
  );
}

export default page;
