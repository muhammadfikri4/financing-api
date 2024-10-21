import { ErrorApp } from "../../utils/HttpError";
import { departmentRepo } from "../../repository";
import { CreateDepartmentDAO, UpdateDepartmentDAO } from "./department-dao";
import { MESSAGES } from "../../utils/Messages";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { Query } from "interface/Query";
import { Meta } from "utils/Meta";

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

export const getDepartmentService = async (query: Query) => {
  const { page = "1", perPage = "10" } = query;
  const [department, totalData] = await Promise.all([
    departmentRepo.getDepartment(query),
    departmentRepo.getDepartmentCount(query),
  ]);
  const meta = Meta(Number(page), Number(perPage), totalData);
  return { data: department, meta };
};

export const updateDepartmentService = async (
  id: number,
  data: UpdateDepartmentDAO
) => {
  const department = await departmentRepo.getDepartmentById(id);
  if (!department) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.DEPARTMENT,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }
  const existName = await departmentRepo.getDepartmentByName(data.name);

  if (existName && existName?.id !== department.id) {
    return new ErrorApp(
      MESSAGES.ERROR.ALREADY.DEPARTMENT,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const result = await departmentRepo.updateDepartemnt(id, data);
  return result;
};

export const deleteDepartmentService = async (id: number) => {
  const department = await departmentRepo.getDepartmentById(Number(id));

  if (!department) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.DEPARTMENT,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }
  const result = await departmentRepo.deleteDepartment(id);
  return result;
};
