import { prisma } from "config";

export const createManyApproval = async (length: number, budgetId: string) => {
  const array = new Array(length).fill(length);
  return await prisma.approval.createMany({
    data: array.map((_, index) => ({
      budgetId: budgetId,
      step: index + 1,
    })),
  });
};
