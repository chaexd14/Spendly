import { addToGoal } from '../../../../../../lib/actions/goal-actions';
import { headers } from 'next/headers';
import { auth } from '../../../../../../lib/auth';

// ADD CONTRIBUTION TO GOAL
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

  const { goalId, amount } = await req.json();

  try {
    const result = await addToGoal(goalId, amount);

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
