import { Role } from "@prisma/client";

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  department: {
    id: number;
    name: string;
  } | null;
}
