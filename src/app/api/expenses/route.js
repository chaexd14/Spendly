import { auth } from '../../../../lib/auth';
import {
  addExpenses,
  getExpenses,
} from '../../../../lib/actions/expenses-actions';

export async function POST(req) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return new Response('Unauthorized', { status: 401 });

  const { title, category, description, amount, date } = await req.json();

  const expense = await addExpenses(
    session.user.id,
    title,
    category,
    description,
    Number(amount),
    new Date(date)
  );

  return new Response(JSON.stringify(expense), {
    headers: { 'Content-Type': 'application/json' },
    status: 201,
  });
}

export async function GET(req) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return new Response('Unauthorized', { status: 401 });

  const expense = await getExpenses(session.user.id);

  return new Response(JSON.stringify(expense), {
    headers: { 'Content-Type': 'application/json' },
  });
}
