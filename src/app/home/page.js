import UserHome from './UserHome';
import { auth } from '../../../lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { getAllUser } from '../../../lib/actions/user-actions';
import { getBudget } from '../../../lib/actions/budgets-action';
import { getExpenses } from '../../../lib/actions/expenses-actions';
import { getIncome } from '../../../lib/actions/income-actions';

async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/auth/signin');
  }

  // Fetch initial data securely on the server
  const [allUsers, userBudget, userExpenses, userIncome] = await Promise.all([
    getAllUser(),
    getBudget(session.user.id),
    getExpenses(session.user.id),
    getIncome(session.user.id),
  ]);

  return (
    <UserHome
      session={session}
      initialUsers={allUsers}
      initialBudgets={userBudget}
      initialExpenses={userExpenses}
      initialIncomes={userIncome}
    />
  );
}

export default page;
