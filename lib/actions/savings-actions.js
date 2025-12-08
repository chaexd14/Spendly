import prisma from '../prisma';

// ADD SAVINGS
export const addSavings = async (userId, savingsTitle, savingsAmount) => {
  const result = await prisma.savings.create({
    data: {
      userId,
      savingsTitle,
      savingsAmount,
    },
  });

  return result;
};

// FETCH SAVINGS
export const getSavings = async (userId) => {
  const result = await prisma.savings.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return result;
};

// EDIT SAVINGS
export const editSavings = async (savingsId, savingsTitle, savingsAmount) => {
  const result = await prisma.savings.update({
    where: { savingsId },
    data: {
      savingsTitle: savingsTitle,
      savingsAmount: savingsAmount,
    },
  });

  return result;
};

// DELETE SAVINGS
export const deleteSavings = async (savingsId) => {
  const result = await prisma.savings.delete({
    where: { savingsId },
  });

  return result;
};
