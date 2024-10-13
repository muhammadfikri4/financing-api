import { Role } from "app/users/constant";
import { userRepo } from "repository";
import { MESSAGE_CODE } from "utils/ErrorCode";
import { ErrorApp } from "utils/HttpError";
import { MESSAGES } from "utils/Messages";
import * as bcrypt from "bcrypt";
import { InitialUserRequest } from "./initial-dao";

export const initialService = async (data: InitialUserRequest) => {
  const users = await userRepo.getUserByRole(Role.ADMIN);

  if (users) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.INITIAL,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }
  const password = await bcrypt.hash(data.password, 10);
  const result = await userRepo.createUser(
    {
      departmentId: undefined,
      email: data.email,
      password,
      name: data.name,
    },
    true,
    Role.ADMIN
  );
  return result;
};
