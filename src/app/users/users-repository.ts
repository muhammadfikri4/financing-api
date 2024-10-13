import { Role } from "@prisma/client";
import { prisma } from "../../config";
import { CreateUserDAO } from "./users-dao";

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
