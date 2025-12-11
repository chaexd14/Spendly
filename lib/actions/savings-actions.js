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
    orderBy: { createdAt: 'asc' },
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

// GET TOTAL SAVINGS + GROWTH RATE + LATEST SAVING RECORD
export const getTotalSavings = async (userId) => {
  // Total savings
  const total = await prisma.savings.aggregate({
    _sum: {
      savingsAmount: true,
    },
    where: { userId },
    orderBy: { createdAt: 'asc' },
  });
  const totalSavings = total._sum.savingsAmount ?? 0;

  // Get the last two savings records
  const lastTwo = await prisma.savings.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 2,
  });

  const latestSavingRecord = lastTwo.length > 0 ? lastTwo[0].savingsAmount : 0;

  let growthPercentage = 0;

  if (lastTwo.length === 2) {
    const [latest, previous] = lastTwo;

    // Total up to the previous record
    const previousTotal =
      (
        await prisma.savings.aggregate({
          _sum: { savingsAmount: true },
          where: {
            userId,
            createdAt: { lte: previous.createdAt },
          },
        })
      )._sum.savingsAmount ?? 0;

    if (previousTotal !== 0) {
      growthPercentage = ((totalSavings - previousTotal) / previousTotal) * 100;
    }
  }

  return {
    totalSavings,
    growthPercentage: Number(growthPercentage.toFixed(2)),
    latestSavingRecord,
  };
};
