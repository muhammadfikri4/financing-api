import { Query } from "interface/Query";
import { prisma } from "../../config";
import { CreateDepartmentDAO, UpdateDepartmentDAO } from "./department-dao";
import { queryPagination } from "utils/Pagination";

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
      name,
    },
  });
};

export const getDepartment = async (query: Query) => {
  const { search } = query;
  return await prisma.department.findMany({
    where: {
      name: {
        contains: search,
      },
    },
    ...queryPagination(query),
  });
};

export const getDepartmentCount = async (query: Query) => {
  const { search } = query;
  return await prisma.department.count({
    where: {
      name: {
        contains: search,
      },
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

export const updateDepartemnt = async (
  id: number,
  data: UpdateDepartmentDAO
) => {
  return await prisma.department.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      isActive: data.isActive,
    },
  });
};

export const deleteDepartment = async (id: number) => {
  return await prisma.department.delete({
    where: {
      id,
    },
  });
};
