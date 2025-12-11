import {
  editExpenses,
  deleteExpenses,
} from '../../../../../lib/actions/expenses-actions';
import { headers } from 'next/headers';
import { auth } from '../../../../../lib/auth';

// EDIT EXPENSES
export async function PATCH(req) {
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
    expenseId,
    expenseTitle,
    expenseCategory,
    expenseDescription,
    expenseAmount,
  } = await req.json();

  try {
    const result = await editExpenses(
      expenseId,
      expenseTitle,
      expenseCategory,
      expenseDescription,
      expenseAmount
    );

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: 'Failed to UPDATE expenses' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

// DELETE EXPENSES
export async function DELETE(req) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return new Response(
      JSON.stringify({ message: 'Unauthorized. Please log in.' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { expenseId } = await req.json();

  try {
    const result = await deleteExpenses(expenseId);

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: 'Failed to DELETE expenses' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
