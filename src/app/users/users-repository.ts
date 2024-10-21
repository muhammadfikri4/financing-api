import { Role } from "@prisma/client";
import { prisma } from "../../config";
import { CreateUserDAO } from "./users-dao";
import { queryPagination } from "../../utils/Pagination";
import { Query } from "../../interface/Query";

export const createUser = async (
  data: CreateUserDAO,
  isActive: boolean = false,
  role: Role = "MANAGER"
) => {
  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      departmentId: data.departmentId,
      isActive,
      role,
    },
  });
};

export const getUsers = async (query: Query) => {
  const { search } = query;
  return prisma.user.findMany({
    where: {
      name: {
        contains: search,
      },
    },
    include: {
      department: true,
    },
    ...queryPagination(query),
  });
};

export const getUsersCount = async (query: Query) => {
  const { search } = query;
  return prisma.user.count({
    where: {
      name: {
        contains: search,
      },
    },
  });
};

export const getUserByRole = async (role: Role) => {
  return await prisma.user.findFirst({
    where: {
      role,
    },
  });
};
export const getUserByRoleDepartment = async (
  role: Role,
  departmentId: number
) => {
  return await prisma.user.findFirst({
    where: {
      role,
      departmentId,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const getUserById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};
