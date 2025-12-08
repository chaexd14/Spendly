import {
  addSavings,
  getSavings,
} from '../../../../lib/actions/savings-actions';

import { auth } from '../../../../lib/auth';

// ADD SAVINGS
export async function POST(req) {
  const { userId, savingsTitle, savingsAmount } = await req.json();

  try {
    const result = await addSavings(userId, savingsTitle, savingsAmount);

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Failed to ADD savings' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// FETCH SAVINGS
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

    const result = await getSavings(session.user.id);

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: 'Failed to FETCH savings' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
