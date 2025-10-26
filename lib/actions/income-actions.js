'use server';

import prisma from '../prisma';

// ADD INCOME
export const addIncome = async (
  userId,
  incomeTitle,
  incomeSource,
  incomeAmount,
  incomeDateReceived,
  incomeNotes
) => {
  const amount = Number(incomeAmount);

  const result = await prisma.income.create({
    data: {
      user: { connect: { id: userId } },
      incomeTitle,
      incomeSource,
      incomeAmount: amount,
      incomeNotes,
      incomeDateReceived: new Date(incomeDateReceived),
    },
  });

  return result;
};

// FETCH INCOME
export const getIncome = async (userId) => {
  const result = await prisma.income.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return result;
};
