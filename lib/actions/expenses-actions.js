'use server';

import prisma from '../prisma';

// ADD EXPENSES
export const addExpenses = async (
  userId,
  expenseTitle,
  expenseCategory,
  expenseDescription,
  expenseAmount,
  expenseDate
) => {
  const amount = Number(expenseAmount);

  const activeBudget = await prisma.budget.findFirst({
    where: {
      userId,
      budgetEndDate: { gte: new Date() },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (!activeBudget) {
    throw new Error(
      'No active budget found. Please create a new budget first.'
    );
  }

  const result = await prisma.expense.create({
    data: {
      user: { connect: { id: userId } },
      budget: { connect: { budgetId: activeBudget.budgetId } },
      expenseTitle,
      expenseCategory,
      expenseDescription,
      expenseAmount: amount,
      expenseDate: new Date(expenseDate),
    },
  });

  const currentBudget = await prisma.budget.findUnique({
    where: { budgetId: activeBudget.budgetId },
    select: {
      totalBudget: true,
      totalBudgetExpenses: true,
    },
  });

  const updatedTotalExpenses = currentBudget.totalBudgetExpenses + amount;
  const updatedRemaining = currentBudget.totalBudget - updatedTotalExpenses;

  await prisma.budget.update({
    where: { budgetId: activeBudget.budgetId },
    data: {
      totalBudgetExpenses: updatedTotalExpenses,
      remainingBudget: updatedRemaining,
    },
  });

  return result;
};

// GET EXPENSES
export const getExpenses = async (userId) => {
  const result = await prisma.expense.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return result;
};
