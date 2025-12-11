import {
  addSavings,
  getSavings,
} from '../../../../lib/actions/savings-actions';

import { auth } from '../../../../lib/auth';
import { headers } from 'next/headers';

// ADD SAVINGS
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

  const { savingsTitle, savingsAmount } = await req.json();

  try {
    const result = await addSavings(
      session.user.id,
      savingsTitle,
      savingsAmount
    );

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
