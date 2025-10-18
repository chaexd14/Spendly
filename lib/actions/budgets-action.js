'use server';

import prisma from '../prisma';

export const addBudget = async (userId, periodType, totalBudget, startDate) => {
  const start = new Date(startDate);

  const endDate =
    periodType === 'weekly'
      ? new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000)
      : new Date(start.getTime() + 29 * 24 * 60 * 60 * 1000);

  const existingBudget = await prisma.budgets.findFirst({
    where: {
      userId,
      endDate: {
        gte: new Date(),
      },
    },
  });

  if (existingBudget) {
    throw new Error(
      'You already have an active budget. Please wait until it ends.'
    );
  }

  const result = await prisma.budgets.create({
    data: {
      userId,
      periodType,
      totalBudget: Number(totalBudget),
      totalExpenses: 0,
      remainingBudget: Number(totalBudget),
      startDate: start,
      endDate,
    },
  });

  return result;
};

export const getBudget = async (userId) => {
  const result = await prisma.budgets.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return result;
};
