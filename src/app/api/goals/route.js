import { createGoal, getGoals } from '../../../../lib/actions/goal-actions';

import { auth } from '../../../../lib/auth';
import { headers } from 'next/headers';

// Create Goal
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

  const { goalName, goalAmount, goalTargetDate } = await req.json();

  try {
    const result = await createGoal(
      session.user.id,
      goalName,
      goalAmount,
      goalTargetDate
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

// FETCH GOALS
export async function GET(req) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      return new Response(
        JSON.stringify({ message: 'Unauthorized. Please log in.' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const result = await getGoals(session.user.id);

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Failed to FETCH goals' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
