import { auth } from '../../../../../lib/auth';
import { getTotalIncome } from '../../../../../lib/actions/income-actions';

// GET TOTAL INCOME
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

    const income = await getTotalIncome(session.user.id);
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
