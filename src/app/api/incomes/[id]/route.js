import {
  editIncome,
  deleteIncome,
} from '../../../../../lib/actions/income-actions';
import { headers } from 'next/headers';
import { auth } from '../../../../../lib/auth';

// EDIT INCOME
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

  const { incomeId, incomeTitle, incomeSource, incomeAmount } =
    await req.json();

  try {
    const result = await editIncome(
      incomeId,
      incomeTitle,
      incomeSource,
      incomeAmount
    );

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: 'Failed to UPDATE income' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

// DELETE INCOME
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

  const { incomeId } = await req.json();

  try {
    const result = await deleteIncome(incomeId);

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: 'Failed to DELETE income' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
