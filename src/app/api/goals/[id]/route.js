import { editGoal, deleteGoal } from '../../../../../lib/actions/goal-actions';
import { headers } from 'next/headers';

// EDIT GOAL
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

  const { goalId, goalName, goalAmount } = await req.json();

  try {
    const result = await editGoal(goalId, goalName, goalAmount);

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Failed to UPDATE goal' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// DELETE GOAL
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

  const { goalId } = await req.json();

  try {
    const result = await deleteGoal(goalId);

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Failed to DELETE goal' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
