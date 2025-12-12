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
        role: true,
        image: true,
      },

      orderBy: { createdAt: 'desc' },
    });

    return result;
  } catch (err) {
    console.error('Error fetching users: ', err);
  }
};

export const updateAccount = async (id, name, email, image) => {
  const result = await prisma.user.update({
    where: { id },
    data: {
      name: name,
      email: email,
      image: image,
    },
  });

  return result;
};
