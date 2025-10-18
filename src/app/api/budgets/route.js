import { auth } from '../../../../lib/auth';
import { addBudget, getBudget } from '../../../../lib/actions/budgets-action';

export async function POST(req) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return new Response('Unauthorized', { status: 401 });

  const { periodType, totalBudget, startDate } = await req.json();

  const budget = await addBudget(
    session.user.id,
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

  const budgets = await getBudget(session.user.id);

  return new Response(JSON.stringify(budgets), {
    headers: { 'Content-Type': 'application/json' },
  });
}
