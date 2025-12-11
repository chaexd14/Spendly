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

  const expense = await prisma.expense.create({
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

  const deductBudget = await prisma.budget.update({
    where: { budgetId: budgetId },

    data: {
      totalBudgetExpenses: { increment: amount }, // increase total spent
      remainingBudget: { decrement: amount }, // decrease remaining
    },
  });

  return { expense, deductBudget };
};

// EDIT INCOME
export const editExpenses = async (
  expenseId,
  expenseTitle,
  expenseCategory,
  expenseDescription,
  expenseAmount
) => {
  const result = await prisma.expense.update({
    where: { expenseId },
    data: {
      expenseTitle: expenseTitle,
      expenseCategory: expenseCategory,
      expenseDescription: expenseDescription,
      expenseAmount: expenseAmount,
    },
  });

  return result;
};

// DELETE INCOME
export const deleteExpenses = async (expenseId) => {
  const result = await prisma.expense.delete({
    where: { expenseId },
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

// GET EXPENSES CATEGORY
export const getExpensesCategory = async (userId) => {
  const result = await prisma.expense.aggregateRaw({
    pipeline: [
      {
        $match: {
          userId: userId,
        },
      },
      {
        $group: {
          _id: '$expense_category',
          total: { $sum: '$expense_amount' },
        },
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          total: 1,
        },
      },
      { $sort: { total: -1 } },
    ],
  });

  return result;
};
