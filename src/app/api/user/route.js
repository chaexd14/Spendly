import { auth } from '../../../../lib/auth';
import { getAllUser } from '../../../../lib/actions/user-actions';

export async function GET(req) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return new Response('Unauthorized', { status: 401 });

  const users = await getAllUser();
  return new Response(JSON.stringify(users), {
    headers: { 'Content-Type': 'application/json' },
  });
}
