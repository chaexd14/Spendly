'use server';

import prisma from '../prisma';

// ADD EXPENSES
export const addExpenses = async (
  userId,
  budgetId,
  expenseTitle,
  expenseCategory,
  expenseDescription,
  expenseAmount,
  expenseDate
) => {
  const amount = Number(expenseAmount);

  const result = await prisma.expense.create({
    data: {
      userId,
      budgetId,
      expenseTitle,
      expenseCategory,
      expenseDescription,
      expenseAmount: amount,
      expenseDate: new Date(expenseDate),
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
