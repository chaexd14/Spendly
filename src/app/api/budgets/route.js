import { auth } from '../../../../lib/auth';
import { addBudget, getBudget } from '../../../../lib/actions/budgets-action';

export async function POST(req) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { periodType, totalBudget, startDate, budgetTitle } = await req.json();

  const budget = await addBudget(
    session.user.id,
    budgetTitle,
    periodType,
    Number(totalBudget),
    new Date(startDate)
  );

  return new Response(JSON.stringify(budget), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function GET(req) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return new Response('Unauthorized', { status: 401 });

  const { searchParams } = new URL(req.url);
  const limit = searchParams.has('limit')
    ? parseInt(searchParams.get('limit'))
    : undefined;

  const budgets = await getBudget(session.user.id, limit);

  return new Response(JSON.stringify(budgets), {
    headers: { 'Content-Type': 'application/json' },
  });
}
