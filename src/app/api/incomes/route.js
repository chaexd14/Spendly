import { auth } from '../../../../lib/auth';
import { addIncome, getIncome } from '../../../../lib/actions/income-actions';

export async function POST(req) {
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

    const { title, source, amount, date, note } = await req.json();

    if (amount === null || amount === undefined) {
      return new Response(
        JSON.stringify({
          message:
            'Please fill in all required fields (title, source, amount, and date).',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const income = await addIncome(
      session.user.id,
      title,
      source,
      Number(amount),
      new Date(date),
      note
    );

    return new Response(JSON.stringify(income), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error adding income:', error);

    return new Response(
      JSON.stringify({
        message:
          error.message || 'Failed to add income. Please try again later.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

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

    const income = await getIncome(session.user.id);
    return new Response(JSON.stringify(income), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching income:', error);
    return new Response(
      JSON.stringify({
        message: 'Failed to fetch income. Please try again later.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
