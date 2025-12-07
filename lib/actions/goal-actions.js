import prisma from '../prisma';

// CREATE GOAL
export const createGoal = async (
  userId,
  goalName,
  goalAmount,
  goalTargetDate
) => {
  const status = 'Not Started';
  const currentAmmount = 0;

  const result = await prisma.goal.create({
    data: {
      user: { connect: { id: userId } },
      goalName,
      goalAmount,
      goalCurrentAmount: currentAmmount,
      goalTargetDate,
      goalStatus: status,
    },
  });

  return result;
};

// EDIT GOAL
export const editGoal = async (goalId, goalName, goalAmount) => {
  const result = await prisma.goal.update({
    where: { goalId },
    data: {
      goalName: goalName,
      goalAmount: goalAmount,
    },
  });

  return result;
};

// ADD CONTRIBUTION TO GOAL
export const addToGoal = async (goalId, amount) => {
  const goal = await prisma.goal.findUnique({
    where: { goalId },
  });

  const newGoalCurrentAmount = goal.goalCurrentAmount + amount;

  const newStatus =
    newGoalCurrentAmount >= goal.goalAmount ? 'Completed' : 'In Progress';

  const result = await prisma.goal.update({
    where: { goalId },
    data: {
      goalCurrentAmount: newGoalCurrentAmount,
      goalStatus: newStatus,
    },
  });

  return result;
};

// FETCH GOALS
export const getGoals = async (userId) => {
  const result = await prisma.goal.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return result;
};

// DELETE GOAL
export const deleteGoal = async (goalId) => {
  const result = await prisma.goal.delete({
    where: { goalId },
  });

  return result;
};
