'use server';

import ExpensesPage from './ExpensesPage';
import { getBudget } from '../../../../lib/actions/budgets-action';
import {
  getExpenses,
  getExpensesCategory,
} from '../../../../lib/actions/expenses-actions';

import { getSessionWithRole } from '../../../../lib/session';
import { redirect } from 'next/navigation';

export default async function page() {
  const session = await getSessionWithRole();

  if (!session) {
    redirect('/auth/signin');
  }

  const [userBudgets] = await Promise.all([getBudget(session.user.id)]);
  const [userExpenses, expensesCategory] = await Promise.all([
    getExpenses(session.user.id),
    getExpensesCategory(session.user.id),
  ]);

  return (
    <>
      <ExpensesPage
        userBudgets={userBudgets}
        userExpenses={userExpenses}
        expensesCategory={expensesCategory}
      />
    </>
  );
}
