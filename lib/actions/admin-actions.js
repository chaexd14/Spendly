import prisma from '../prisma';

export const getUsers = async () => {
  const result = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return result;
};

// EDIT USER
export const editUser = async (id, role) => {
  const result = await prisma.user.update({
    where: { id },
    data: {
      role: role,
    },
  });

  return result;
};

// DELETE USER
export const deleteUser = async (id) => {
  const result = await prisma.user.delete({
    where: { id },
  });

  return result;
};

export const getUserCount = async () => {
  try {
    const result = await prisma.user.count();
    return result;
  } catch (err) {
    console.error('Error counting users:', err);
  }
};
