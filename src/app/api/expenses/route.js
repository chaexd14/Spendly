import { auth } from '../../../../lib/auth';
import {
  addExpenses,
  getExpenses,
} from '../../../../lib/actions/expenses-actions';

import { headers } from 'next/headers';

export async function POST(req) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return new Response(
      JSON.stringify({ message: 'Unauthorized. Please log in.' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const {
    budgetId,
    expenseTitle,
    expenseCategory,
    expenseDescription,
    expenseAmount,
    expenseDate,
  } = await req.json();

  try {
    const result = await addExpenses(
      session.user.id,
      budgetId,
      expenseTitle,
      expenseCategory,
      expenseDescription,
      expenseAmount,
      expenseDate
    );

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: 'Failed to record expense' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  const expense = await getExpenses(session.user.id);

  return new Response(JSON.stringify(expense), {
    headers: { 'Content-Type': 'application/json' },
  });
}
