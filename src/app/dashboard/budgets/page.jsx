'use server';
import BudgetPage from './BudgetPage';

import { getBudget } from '../../../../lib/actions/budgets-action';
import { getSessionWithRole } from '../../../../lib/session';
import { redirect } from 'next/navigation';

export default async function page() {
  const session = await getSessionWithRole();

  if (!session) {
    redirect('/auth/signin');
  }

  // Fetch initial data
  const [userBudgets] = await Promise.all([getBudget(session.user.id, 3)]);

  return (
    <>
      <BudgetPage userBudgets={userBudgets} />
    </>
  );
}
