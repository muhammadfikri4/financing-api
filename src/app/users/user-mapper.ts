import { Department, User } from "@prisma/client";
import { UserDTO } from "./users-dto";

export interface UserData extends User {
  department: Department;
}

export const getUserDTOMapper = (users: UserData[]): UserDTO[] => {
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
