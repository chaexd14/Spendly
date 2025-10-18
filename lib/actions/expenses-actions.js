'use server';

import prisma from '../prisma';

// ADD EXPENSES
export const addExpenses = async (
  userId,
  title,
  category,
  description,
  amount,
  date
) => {
  const expenseAmount = Number(amount);

  const activeBudget = await prisma.budgets.findFirst({
    where: {
      userId,
      endDate: { gte: new Date() },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (!activeBudget) {
    throw new Error(
      'No active budget found. Please create a new budget first.'
    );
  }

  const result = await prisma.expenses.create({
    data: {
      user: { connect: { id: userId } },
      budgets: { connect: { id: activeBudget.id } },
      title,
      category,
      description,
      amount: expenseAmount,
      date: new Date(date),
    },
  });

  const currentBudget = await prisma.budgets.findUnique({
    where: { id: activeBudget.id },
    select: {
      totalBudget: true,
      totalExpenses: true,
    },
  });

  const updatedTotalExpenses = currentBudget.totalExpenses + expenseAmount;
  const updatedRemaining = currentBudget.totalBudget - updatedTotalExpenses;

  await prisma.budgets.update({
    where: { id: activeBudget.id },
    data: {
      totalExpenses: updatedTotalExpenses,
      remainingBudget: updatedRemaining,
    },
  });

  return result;
};

// GET EXPENSES
export const getExpenses = async (userId) => {
  const result = await prisma.expenses.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return result;
};
