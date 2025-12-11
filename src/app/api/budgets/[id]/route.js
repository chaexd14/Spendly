import {
  editBudget,
  deleteBudget,
} from '../../../../../lib/actions/budgets-action';
import { headers } from 'next/headers';
import { auth } from '../../../../../lib/auth';

// EDIT BUDGET
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

  const { budgetId, budgetTitle, budgetPeriodType, totalBudget } =
    await req.json();

  try {
    const result = await editBudget(
      budgetId,
      budgetTitle,
      budgetPeriodType,
      totalBudget
    );

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Failed to Edit budget' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// DELETE BUDGET
export async function DELETE(req) {
  const { budgetId } = await req.json();

  try {
    const result = await deleteBudget(budgetId);
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: 'Failed to Delete budget' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
