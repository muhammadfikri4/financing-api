import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { loginSchema, registerSchema } from "./auth-request";
import { loginController, registerController } from "./auth-controller";

const router = Router();

router.post(
  "/sign-up",
  validateRequest(registerSchema),
  CatchWrapper(registerController)
);
router.post(
  "/sign-in",
  validateRequest(loginSchema),
  CatchWrapper(loginController)
);

export default router;
