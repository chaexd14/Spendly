import { auth } from '../../../../../lib/auth';
import { deductIncome } from '../../../../../lib/actions/income-actions';

// Income Deduction
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
    const { amount } = await req.json();

    await deductIncome(session.user.id, amount);

    return new Response(
      JSON.stringify({ message: 'Deduction recorded successfully' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
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
