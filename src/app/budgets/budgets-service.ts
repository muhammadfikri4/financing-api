import { ErrorApp } from "../../utils/HttpError";
import {
  approvalRepository,
  budgetsRepository,
  userRepository,
} from "../../repository";
import { MESSAGES } from "../../utils/Messages";
import { BudgetStatus } from "./constant";
import { MESSAGE_CODE } from "../../utils/ErrorCode";

export const createBudgetService = async (userId: string, purpose: string) => {
  const yearNow = new Date().getFullYear();

  const user = await userRepository.getUserById(userId);
  if (!user) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  if (user.role !== "MANAGER") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.REQUEST_BUDGET,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const existingBudget = await budgetsRepository.getBudgetByCreatedBy(
    userId,
    yearNow
  );

  if (existingBudget && existingBudget.status === BudgetStatus.PENDING) {
    return new ErrorApp(
      MESSAGES.ERROR.ALREADY.BUDGET_PENDING,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (existingBudget && existingBudget.status === BudgetStatus.APPROVE) {
    return new ErrorApp(
      MESSAGES.ERROR.ALREADY.BUDGET,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }
  const result = await budgetsRepository.createBudget({
    purpose,
    userId,
    year: yearNow,
  });
  if (!result) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.FAILED_REQUEST,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }
  await approvalRepository.createManyApproval(3, result.id);
};

export const getBudgetService = async () => {};
