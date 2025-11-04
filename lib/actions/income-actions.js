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

// FETCH ALL INCOME
export const getIncome = async (userId) => {
  const result = await prisma.income.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return result;
};

// GET TOTAL INCOME + GROWTH RATE + LATEST INCOME RECORD
export const getTotalIncome = async (userId) => {
  const total = await prisma.income.aggregate({
    _sum: {
      incomeAmount: true,
    },
    where: { userId },
  });

  const totalIncome = total._sum.incomeAmount ?? 0;

  const lastTwo = await prisma.income.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 2,
  });

  const latestIncomeRecord = lastTwo.length > 0 ? lastTwo[0].incomeAmount : 0;

  let growthPercentage = 0;

  if (lastTwo.length === 2) {
    const [latest, previous] = lastTwo;

    const previousTotal =
      (
        await prisma.income.aggregate({
          _sum: { incomeAmount: true },
          where: {
            userId,
            createdAt: { lte: previous.createdAt },
          },
        })
      )._sum.incomeAmount ?? 0;

    if (previousTotal !== 0) {
      growthPercentage = ((totalIncome - previousTotal) / previousTotal) * 100;
    }
  }

  return {
    totalIncome,
    growthPercentage: Number(growthPercentage.toFixed(2)),
    latestIncomeRecord,
  };
};
