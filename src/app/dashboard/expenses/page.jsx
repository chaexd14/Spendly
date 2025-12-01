'use server';

import ExpensesPage from './ExpensesPage';
import { getBudget } from '../../../../lib/actions/budgets-action';

import { getSessionWithRole } from '../../../../lib/session';
import { redirect } from 'next/navigation';

export default async function page() {
  const session = await getSessionWithRole();

  if (!session) {
    redirect('/auth/signin');
  }

  const [userBudgets] = await Promise.all([getBudget(session.user.id)]);

  return (
    <>
      <ExpensesPage userBudgets={userBudgets} />
    </>
  );
}
