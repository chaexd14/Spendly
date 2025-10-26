'use server';

import prisma from '../prisma';

export const addBudget = async (
  userId,
  budgetPeriodType,
  totalBudget,
  budgetStartDate
) => {
  const start = new Date(budgetStartDate);

  const budgetEndDate =
    budgetPeriodType === 'weekly'
      ? new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000)
      : new Date(start.getTime() + 29 * 24 * 60 * 60 * 1000);

  const result = await prisma.budget.create({
    data: {
      userId,
      budgetPeriodType,
      totalBudget: Number(totalBudget),
      totalBudgetExpenses: 0,
      remainingBudget: Number(totalBudget),
      budgetStartDate: start,
      budgetEndDate,
    },
  });

  return result;
};

export const getBudget = async (userId) => {
  const result = await prisma.budget.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return result;
};
