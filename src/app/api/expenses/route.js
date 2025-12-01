import { auth } from '../../../../lib/auth';
import {
  addExpenses,
  getExpenses,
} from '../../../../lib/actions/expenses-actions';

import { headers } from 'next/headers';

export async function POST(req) {
  console.time('getSession');

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.timeEnd('getSession');

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

  if (!expenseTitle || !expenseCategory || !expenseAmount || !expenseDate) {
    return new Response(
      JSON.stringify({ message: 'Missing required fields' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const parsedAmount = Number(expenseAmount);

  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return new Response(JSON.stringify({ message: 'Invalid expense amount' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const expense = await addExpenses(
    session.user.id,
    budgetId,
    expenseTitle,
    expenseCategory,
    expenseDescription,
    parsedAmount,
    new Date(expenseDate)
  );

  return new Response(JSON.stringify(expense), {
    headers: { 'Content-Type': 'application/json' },
    status: 201,
  });
}

export async function GET(req) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  const expense = await getExpenses(session.user.id);

  return new Response(JSON.stringify(expense), {
    headers: { 'Content-Type': 'application/json' },
  });
}
