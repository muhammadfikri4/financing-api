import { Role } from "@prisma/client";

export interface RegisterBodyDAO {
  name: string;
  email: string;
  password: string;
  code: string;
  departmentId: number;
  position: Role;
}

export interface LoginBodyDAO {
  email: string;
  password: string;
}