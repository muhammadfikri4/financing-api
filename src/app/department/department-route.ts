import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import {
  createDepartmentSchema,
  updateDepartmentSchema,
} from "./department-request";
import { CatchWrapper } from "../../utils/CatchWrapper";
import {
  createDepartmentController,
  deleteDepartmentController,
  getDepartmentController,
  updateDepartmentController,
} from "./department-controller";

const router = Router();

router.get('/', CatchWrapper(getDepartmentController))

router.post(
  "/",
  validateRequest(createDepartmentSchema),
  CatchWrapper(createDepartmentController)
);

router.put(
  "/:departmentId",
  validateRequest(updateDepartmentSchema),
  CatchWrapper(updateDepartmentController)
);

router.delete("/:departmentId", CatchWrapper(deleteDepartmentController));

export default router;
