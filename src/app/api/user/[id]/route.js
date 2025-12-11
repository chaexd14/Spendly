import { editUser, deleteUser } from '../../../../../lib/actions/admin-actions';
import { headers } from 'next/headers';
import { auth } from '../../../../../lib/auth';

// EDIT USER
export async function PATCH(req) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return new Response(
      JSON.stringify({ message: 'Unauthorized. Please log in.' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { id, role } = await req.json();

  try {
    const result = await editUser(id, role);

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Failed to EDIT user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// DELETE USER
export async function DELETE(req) {
  const { id } = await req.json();

  try {
    const result = await deleteUser(id);
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Failed to DELETE user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
