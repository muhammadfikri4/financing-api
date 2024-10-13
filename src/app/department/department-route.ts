import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createDepartmentSchema } from "./department-request";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { createDepartmentController } from "./department-controller";

const router = Router();

router.post(
  "/",
  validateRequest(createDepartmentSchema),
  CatchWrapper(createDepartmentController)
);

export default router;
