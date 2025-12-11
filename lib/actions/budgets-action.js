'use server';

import prisma from '../prisma';

export const addBudget = async (
  userId,
  budgetTitle,
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
      budgetTitle,
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

// EDIT BUDGET
export const editBudget = async (
  budgetId,
  budgetTitle,
  budgetPeriodType,
  totalBudget
) => {
  const result = await prisma.budget.update({
    where: { budgetId },
    data: {
      budgetTitle: budgetTitle,
      budgetPeriodType: budgetPeriodType,
      totalBudget: totalBudget,
      remainingBudget: Number(totalBudget),
    },
  });

  return result;
};

// DELETE BUDGET
export const deleteBudget = async (budgetId) => {
  const result = await prisma.budget.delete({
    where: { budgetId },
  });

  return result;
};

export const getBudget = async (userId, limit) => {
  const budgets = await prisma.budget.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    ...(limit ? { take: limit } : {}),
  });

  const budgetSum = await prisma.budget.aggregate({
    _sum: {
      totalBudget: true,
    },
    where: { userId },
  });
  const totalBudgetSum = budgetSum._sum.totalBudget || 0;

  const expensesSum = await prisma.budget.aggregate({
    _sum: {
      totalBudgetExpenses: true,
    },
    where: { userId },
  });
  const totalExpensesSum = expensesSum._sum.totalBudgetExpenses || 0;

  return { budgets, totalBudgetSum, totalExpensesSum };
};
