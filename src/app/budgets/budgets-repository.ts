import { prisma } from "../../config";
import { BudgetStatus } from "./constant";
import { CreateBudgetDAO } from "./budgets-dao";
import { Role } from "@prisma/client";
import { Query } from "interface/Query";

export const createBudget = async (data: CreateBudgetDAO) => {
  return await prisma.budgets.create({
    data: {
      status: BudgetStatus.PENDING,
      amount: data.amount ?? 0,
      year: data.year,
      createdBy: data.userId,
    },
  });
};

export const getBudgetByCreatedBy = async (userId: string, year: number) => {
  return await prisma.budgets.findFirst({
    where: {
      createdBy: userId,
      year,
    },
  });
};

export const getBudgets = async (
  role: Role,
  departmentId: number,
  query: Query
) => {
  const { search, status, year } = query;
  return await prisma.budgets.findMany({
    where: {
      user: {
        department: {
          id: departmentId,
          name: {
            contains: search,
          },
        },
        role
      },
      status,
      year: year ? Number(year) : undefined,
    },
    include: {
      user: {
        include: {
          department: true,
        },
      },
    },
  });
};
