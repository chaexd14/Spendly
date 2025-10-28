import { auth } from './auth';
import { headers } from 'next/headers';
import prisma from './prisma';

export async function getSessionWithRole() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) return session;

  // Fetch the full user (including role)
  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  // Merge the DB role into the session user
  return {
    ...session,
    user: {
      ...session.user,
      role: dbUser?.role || null,
      createdAt: dbUser?.createdAt,
      updatedAt: dbUser?.updatedAt,
    },
  };
}
