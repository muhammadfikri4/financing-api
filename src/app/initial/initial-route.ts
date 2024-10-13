import { Router } from "express";
import { initialController } from "./initial-controller";
import { validateRequest } from "../../middleware/validateRequest";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { initialUserSchema } from "./initial-request";

const router = Router();

router.post(
  "/",
  validateRequest(initialUserSchema),
  CatchWrapper(initialController)
);

export default router;
