import { departmentRepo, userRepo } from "../../repository";
import { LoginBodyDAO, RegisterBodyDAO } from "./auth-dao";
import { ErrorApp } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { Role } from "../users/constant";
import * as bcrypt from "bcrypt";
import { config } from "../../libs";
import { GenerateToken } from "../../utils/GenerateToken";

export const registerService = async (data: RegisterBodyDAO) => {
  const userExist = await userRepo.getUserByEmail(data.email);

  if (userExist) {
    return new ErrorApp(
      MESSAGES.ERROR.ALREADY.USER,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const department = await departmentRepo.getDepartmentById(data.departmentId);
  if (!department) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.DEPARTMENT,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  const roleDepartment = await userRepo.getUserByRoleDepartment(
    data.position,
    data.departmentId
  );

  if (roleDepartment && roleDepartment.role === Role.ADMIN) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ROLE_ADMIN,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }
  if (data.code !== config.CODE) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.CODE,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }
  const password = await bcrypt.hash(data.password, 10);

  const result = await userRepo.createUser({
    email: data.email,
    name: data.email,
    password,
    departmentId: data.departmentId,
  });

  return result;
};

export const loginService = async (data: LoginBodyDAO) => {
  const user = await userRepo.getUserByEmail(data.email);
  if (!user) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }
  const isValidPassword = await bcrypt.compare(data.password, user.password);
  if (!isValidPassword) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.USER.PASSWORD,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }
  const accessToken = GenerateToken(user.id);

  return {
    accessToken,
  };
};
