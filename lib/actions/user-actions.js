'use server';

import prisma from '../prisma';

// GET ALL REGISTERD
export const getAllUser = async () => {
  try {
    const result = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },

      orderBy: { createdAt: 'desc' },
    });

    return result;
  } catch (err) {
    console.error('Error fetching users: ', err);
  }
};
