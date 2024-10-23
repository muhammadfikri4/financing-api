import { Router } from "express";
import { createBudgetController } from "./budgets-controller";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { VerifyToken } from "../../middleware/verifyToken";
import { validateRequest } from "middleware/validateRequest";
import { createBudgetSchema } from "./budgets-request";

const route = Router();

route.post(
  "/",
  VerifyToken(["MANAGER"]),
  validateRequest(createBudgetSchema),
  CatchWrapper(createBudgetController)
);

export default route;
