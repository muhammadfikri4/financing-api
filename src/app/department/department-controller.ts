import { type NextFunction, type Request, type Response } from "express";
import {
  createDepartmentService,
  deleteDepartmentService,
  getDepartmentService,
  updateDepartmentService,
} from "./department-service";
import { ErrorApp } from "../../utils/HttpError";
import { HandleResponse } from "../../utils/HandleResponse";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { MESSAGES } from "../../utils/Messages";

export const createDepartmentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  const result = await createDepartmentService(body);
  if (result instanceof ErrorApp) {
    next(result);
    return;
  }
  HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.DEPARTMENT);
};

export const getDepartmentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { query } = req;
  const result = await getDepartmentService(query);
  if (result instanceof ErrorApp) {
    next(result);
    return;
  }
  HandleResponse(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.DEPARTMENT.GET,
    result.data,
    result.meta
  );
};

export const updateDepartmentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  const { id } = req.params;
  const result = await updateDepartmentService(Number(id), body);
  if (result instanceof ErrorApp) {
    next(result);
    return;
  }
  HandleResponse(
    res,
    201,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.DEPARTMENT.UPDATE
  );
};

export const deleteDepartmentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const result = await deleteDepartmentService(Number(id));
  if (result instanceof ErrorApp) {
    next(result);
    return;
  }
  HandleResponse(
    res,
    201,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.DEPARTMENT.DELETE
  );
};
