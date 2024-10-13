import { ErrorApp } from "../../utils/HttpError";
import { departmentRepo } from "../../repository";
import { CreateDepartmentDAO } from "./department-dao";
import { MESSAGES } from "../../utils/Messages";
import { MESSAGE_CODE } from "../../utils/ErrorCode";

export const createDepartmentService = async (data: CreateDepartmentDAO) => {
  const department = await departmentRepo.getDepartmentByName(data.name);

  if (department) {
    return new ErrorApp(
      MESSAGES.ERROR.ALREADY.DEPARTMENT,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const result = await departmentRepo.createDepartment(data);
  return result;
};
