import { type NextFunction, type Request, type Response } from "express";
import { createDepartmentService } from "./department-service";
import { ErrorApp } from "../../utils/HttpError";
import { HandleResponse } from "../../utils/HandleResponse";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { MESSAGES } from "../../utils/Messages";

export const createDepartmentController = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { body } = req
    const result = await createDepartmentService(body)
    if (result instanceof ErrorApp) {
        next(result)
        return
    }
    HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.DEPARTMENT)
}