import { prisma } from "../../config";
import { CreateDepartmentDAO } from "./department-dao";

export const getDepartmentById = async (id: number) => {
  return await prisma.department.findUnique({
    where: {
      id,
    },
  });
};

export const getDepartmentByName = async (name: string) => {
  return await prisma.department.findFirst({
    where: {
      name
    },
  });
};

export const createDepartment = async (data: CreateDepartmentDAO) => {
    return await prisma.department.create({
      data: {
        name: data.name,
        isActive: data.isActive,
      },
    });
  };