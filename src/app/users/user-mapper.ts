import { Department, User } from "@prisma/client";
import { UserDTO } from "./users-dto";

export interface UserData extends User {
  department: Department;
}

export const getUsersDTOMapper = (users: UserData[]): UserDTO[] => {
  return users.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    role: item.role,
    isActive: item.isActive,
    department: item.department
      ? {
          id: item.department.id,
          name: item.department.name,
        }
      : null,
  }));
};

export const getUserDTOMapper = (user: UserData): UserDTO => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    department: user.department
      ? {
          id: user.department.id,
          name: user.department.name,
        }
      : null,
  }
};
